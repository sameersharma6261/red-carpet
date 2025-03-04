const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataRoutes = require("./routes/dataRoutes");
const twilio = require("twilio");
const User = require("./models/data");
const http = require("http");
const socketIo = require("socket.io");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menuRoutes"); // ✅ Add this line

// load enviromental variables
require("dotenv").config();

// initialize express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// import routes (after initializing app)
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api", menuRoutes); // ✅ Add this line

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error: ", err));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(express.json({ limit: "200mb" })); // Reduced size to prevent crashes
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// API route
app.use("/api", dataRoutes);

// Schema and Model
const InfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: Number, required: true },
});

const Info = mongoose.model("Info", InfoSchema);



// Schema
const displaySchema = new mongoose.Schema({
  backgroundImage: String,
  phoenixText: String,
  pText: String,
  royalPassText: String,
  displayid: String,
});
const DisplayModel = mongoose.model("Display", displaySchema);


const ShopSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Shop = require("./models/Shop"); // ✅ Ensure single import
const {
  NetworkAccessProfileNetworkContextImpl,
} = require("twilio/lib/rest/supersim/v1/networkAccessProfile/networkAccessProfileNetwork");

// Twilio Credentials
const otpStore = {};
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = twilio(accountSid, authToken);

// Routes
app.post("/api/information", async (req, res) => {
  console.log("Data received:", req.body);
  const { name, mobile, email, token, shopid } = req.body;
  try {
    const newInfo = new User({ name, mobile, email, token, shopid });
    await newInfo.save();
    console.log("Data saved successfully:", newInfo);
    res.status(201).json({ message: "Data saved successfully!", newInfo });
  } catch (err) {
    console.log("Error saving data:", err);
    res.status(500).json({ message: "Error saving data", error: err });
  }
});

// Countdown Schema
const CountdownSchema = new mongoose.Schema({
  startTime: Number,
  duration: Number,
});
const Countdown = mongoose.model("Countdown", CountdownSchema);

// Start Countdown API
app.post("/start-countdown", async (req, res) => {
  const { duration, phoneNumber } = req.body;
  const startTime = Date.now();

  try {
    await Countdown.deleteMany({});
    const newCountdown = new Countdown({ startTime, duration });
    await newCountdown.save();

    // Emit countdown start event
    io.emit("countdown-start", { startTime, duration });

    // Twilio SMS Notification
    const countdownLink = `${process.env.REACT_APP_API_BASE_URL}/countdown`;
    await client.messages.create({
      body: `Countdown started! Track live here: ${countdownLink}`,
      from: process.env.TWILIO_PHONE,
      to: phoneNumber,
    });

    res.json({ message: "Countdown started", startTime, duration });
  } catch (error) {
    console.error("Error starting countdown:", error);
    res.status(500).json({ message: "Error starting countdown", error });
  }
});

// Get Current Countdown
app.get("/get-countdown", async (req, res) => {
  try {
    const countdown = await Countdown.findOne();
    res.json(countdown);
  } catch (error) {
    res.status(500).json({ message: "Error fetching countdown", error });
  }
});

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStore[mobile] = otp;

  try {
    if (process.env.IS_OTP_SERVICE_AVAILABLE === "true") {
      await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: twilioPhone,
        to: `+91${mobile}`,
      });
    } else {
      console.log(`OTP for ${mobile} is ${otp}`);
    }

    res.json({
      message: "OTP sent successfully",
      phone: mobile,
      success: true,
      otp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error sending OTP",
      details: error.message,
    });
  }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;

  if (!otpStore[mobile]) {
    return res
      .status(400)
      .json({ error: "No OTP found for this mobile number" });
  }

  if (parseInt(otp) === otpStore[mobile]) {
    delete otpStore[mobile];
    return res.json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid OTP, please try again" });
  }
});

// Retrieve Latest Token
app.get("/get-token", async (req, res) => {
  try {
    console.log("---------------------------------------");
    const now = new Date();
    const latestUser = await User.findOne({
      mobile: req.query.phone,
      updatedAt: { $gte: new Date(now.getTime() - 60 * 1000 * 5) },
    }).sort({ updatedAt: -1 });

    if (!latestUser) {
      return res.status(404).json({ message: "No token found" });
    }
    res.json({ token: latestUser.token });
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ message: "Error fetching token", error });
  }
});

// Send Message
app.post("/send-message", async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ error: "Number is required!" });
  }

  try {
    const message = await client.messages.create({
      body: `🎉 Congratulations! your token number should be selected, now you can visit your counter, visit your countdown undertime  ${process.env.REACT_APP_API_BASE_URL}/countdown`,
      from: twilioPhone,
      to: `+91${number}`,
    });

    res.json({
      success: true,
      message: "Message sent successfully!",
      sid: message.sid,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
});



// ✅ API to update or insert (fixing the duplicate route issue)
app.post("/api/display", async (req, res) => {
  try {
    const newData = new DisplayModel(req.body);
    await newData.save();
    res.status(201).json({ message: "Added Successfully!", newData });
  } catch (error) {
    console.error("Error adding:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ API to get saved data where project ID matches displayid
app.get("/api/display/:id", async (req, res) => {
  try {
    const { id } = req.params; // 🔹 Get ID from URL

    const data = await DisplayModel.findOne({ displayid: id });

    if (!data) {
      return res.status(404).json({ message: "No matching data found!" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});



// GET API
app.get("/shops", async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
});

app.get("/menus/:id", async (req, res) => {
  try {
    const menuItems = await Menu.find({ shopId: req.params.id });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
});

app.put("/shops/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/shops/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shop", error });
  }
});

// ye hai edit or save karne ke liye(fruits names,price example)
app.put("/shops/update-menu-item/:id/:name", async (req, res) => {
  const { id, name } = req.params;
  const { newName, newPrice, newDescription, newLink } = req.body;

  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    const itemIndex = shop.menuItems.findIndex((item) => item.name === name);
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Update the item
    shop.menuItems[itemIndex].name = newName;
    shop.menuItems[itemIndex].price = newPrice;
    shop.menuItems[itemIndex].link = newLink;
    shop.menuItems[itemIndex].description = newDescription;

    // Save to database
    await shop.save();

    res.json({ success: true, message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ye hai menu ke jo items he vo delete karne ke liye(fruits names example)
app.delete("/shops/delete-menu-item/:id/:name", async (req, res) => {
  const { id, name } = req.params;

  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    // Filter out the menu item to be deleted
    const updatedMenuItems = shop.menuItems.filter(
      (item) => item.name !== name
    );

    // If no changes were made, return an error
    if (updatedMenuItems.length === shop.menuItems.length) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Update the menuItems array
    shop.menuItems = updatedMenuItems;

    // Save the updated document
    await shop.save();

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST API
app.post("/shops", async (req, res) => {
  const shop = new Shop(req.body);
  await shop.save();
  res.json(shop);
});

app.delete("/shops/:id", async (req, res) => {
  try {
    const shopId = req.params.id;
    const deletedShop = await Shop.findByIdAndDelete(shopId);

    if (!deletedShop) {
      return res.status(404).json({ message: "Shop item not found" });
    }

    res.json({ message: "Shop item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shop item", error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

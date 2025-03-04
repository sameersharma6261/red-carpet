const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");

// ✅ Add Menu Item
router.post("/shops/:id/menu", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    shop.menuItems.push(req.body);
    await shop.save();
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Menu Items
router.get("/shops/:id/menu", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.json(shop.menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


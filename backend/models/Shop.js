const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  menuItems: [
    {
      name: String,
      image: String,
      description: String,
      link: String,
    },
  ],
});

module.exports = mongoose.model("Food", ShopSchema);

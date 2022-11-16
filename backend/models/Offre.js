const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OffreSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Offre = mongoose.model("offre", OffreSchema);

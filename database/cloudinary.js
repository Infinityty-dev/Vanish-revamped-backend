const cloudinery = require("cloudinary").v2;
require("dotenv").config();

cloudinery.config({
  cloud_name: "samOkolie",
  api_key: "286662455724369",
  api_secret: "Iacli-aZwAVuw7JYTpDI55IBdis",
  secure: true,
});

module.exports = cloudinery;

const mongoose = require('mongoose');


const DB = process.env.DATABASE

mongoose.connect(DB, {
})
  .then(() => console.log("Connection successful"))
  .catch((error) => console.log("Connection error: ", error.message));
  
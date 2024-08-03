const express = require("express");
require('dotenv').config();
require('./db/Conn'); 

const users = require('./modal/userSchema'); 

const app = express();

const cors = require("cors");

const router = require('./routes/router'); 

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads')); 

app.use(router); 

const port = process.env.PORT || 8003;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

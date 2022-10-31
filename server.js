const mongoose = require('mongoose')
require("dotenv").config();
const app = require('./app')
const http = require('http')

//mongoose connection

mongoose.connect("mongodb://localhost:27017/Book-Library");
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error)=> {
    console.log("error is:", error);
  });



const PORT = process.env.PORT|| 3000;
const server = http.createServer(app)
server.listen(PORT, (req, res)=>{
    console.log(`its running on port: ${PORT}`);
});

const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { AstroRouter } = require("./routes/astrologers.routes");

require("dotenv").config()




const app = express();


app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/api", AstroRouter)



// server home page
app.get("/", (req,res)=> {
  res.send("Welcome to do astrologers server")
  })




const port = process.env.PORT || 4000;
app.listen(port, async() => {
try {
  await connection
  console.log("database is connected")
console.log(`Server is running on http://localhost:${port}`);
} catch (error) {
  console.log(error.message)
}
 
});

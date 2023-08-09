const express = require("express")
const route = require("./route/route")
const app = express()
app.use(express.json())

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
// test
app.get('/', function (req, res) {
  return res.status(200).send({ status: true, message: 'working fine 🚀 🚀 🚀' });
});

app.use('/', route);

 // Start the server using http module instead of app.listen
 
app.listen(PORT , (err)=>{
  if(err)return res.status(400).send({message :err.message})
  console.log(`Worker ${process.pid} is running on ${PORT} 🟢`);
})


const express = require("express");
const router = require("./components");

const app = express();
app.use(express.json());
app.use("/api/v1/contact-app",router)


app.listen(4000, ()=>{
    console.log("started at 4000")
}) 
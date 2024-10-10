const express = require("express");
const router = require("./components");
const PORT = 4000;
const app = express();
const errorMiddleware = require("./middleware/error.js");
app.use(express.json());
app.use("/api/v1/contact-app",router)

app.use(errorMiddleware);
app.listen(PORT, ()=>{
    console.log("started at 4000")
}) 
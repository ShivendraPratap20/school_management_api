require("dotenv").config();
const Express = require("express");
const app = Express();
const PORT = process.env.port || 8000;
require("./db/connection/conn");

const schoolRoutes = require("./routers/route")

app.use(Express.json())

app.get("/", (req, res)=>{
    res.send("Welcome to school management API");
});
app.use("/api", schoolRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is started at port ${PORT}`);
})
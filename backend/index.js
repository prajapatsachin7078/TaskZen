const cors = require("cors");
const express = require("express");
const { Todo } = require("./database");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
userRouter
const app = express();
// use cors for cross orign resource sharing 
app.use(cors());
// use json to to parse body 
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message: "That's great if you're good.."})
})

app.use("/",userRouter);

app.use("/todos",todoRouter)
app.listen(3000,()=>{
    console.log("Server is running...")
});
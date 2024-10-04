const {Router} = require("express");
const { Todo } = require("../database");
const { userAuthMiddleware } = require("../middleware/auth");

const todoRouter = Router();
todoRouter.post('/', userAuthMiddleware, async (req, res) => {
    const userId = req.user;
    const { task, category, priority } = req.body.task;

    if (!task || !category || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const todo = new Todo({ task, category, userId, priority });
        const savedTask = await todo.save();
        // console.log(savedTask);

        const todos = await Todo.find({ userId });
        res.json({ message: "Task created successfully!", user: savedTask, todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Couldn't add task to the list..." });
    }
});

todoRouter.get("/",userAuthMiddleware, async (req,res)=>{
    const userId = req.user;
    try{
        const todos = await Todo.find({userId});
        res.json({todos})
    }catch(error){
        res.status(500).json({message: "Couldn't get the list..."})
    }
})

todoRouter.delete("/",userAuthMiddleware, async (req,res)=>{
    const {taskId} = req.body;
    const userId = req.user;
    // console.log(userId);
    
    try{
        const task = await Todo.deleteOne({ _id: taskId });
        if(task.deletedCount!=1){
            return res.status(404).json({message: "Couldn't delete the task.."})
        }
        const todos = await Todo.find({userId});
        res.json({message:"Deleted successfully..", todos})
    }catch(err){
        res.status(500).json({message: "Error while deleting"})
    }
})
todoRouter.put("/",userAuthMiddleware, async (req,res)=>{
    const {taskId} = req.body;
    const userId = req.user;
    try{    
        // getting the task document from the collection
        let task = await Todo.findById(taskId);
        // getting current status
        let status = task.isCompleted;
        let category = task.category;
        // update current status to true/false
        task.isCompleted = !status;
        // save the document
        await task.save()
        // get the updatedList
        const list = await Todo.find({userId});
        res.status(200).json({message: "Task completed successfully!", status: task.isCompleted,list});
    }catch(err){
    res.status(404).json({message: "Task Could'nt be completed"});
    }
})
todoRouter.get("/:category",userAuthMiddleware,async (req,res)=>{
    const {category} = req.params;
    const userId = req.user;
    try{
        if(category==="All"){
            const todos = await Todo.find({userId});
            return res.json({message: "Gotten selected category..",todos});
        }
        const todos = await Todo.find({
            $and: [{ userId }, { category }]
          });
        res.json({message: "Gotten selected category..",todos})
    }catch(err){
        // console.log(err);
        res.status(404).json({message: "Some error... in fetching category wise list"})
    }
    
})

module.exports = todoRouter;
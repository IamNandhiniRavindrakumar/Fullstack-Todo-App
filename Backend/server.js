const express = require("express");

const app = express();

//integrating this library integrating mongoDB in node js
const mongoose = require('mongoose')

// CROSS-ORIGIN RESOURCE SHARING - used to make allow requests from different domains (e.g., frontend hosted elsewhere and not from the backend)
//By default, browsers block requests from different origins (e.g., your React frontend on localhost:3000 trying to call your Express backend on localhost:3210).
//When you use:
//app.use(cors());
//You're telling Express to add the correct CORS headers to every response:
const cors = require("cors");
app.use(cors())

app.use(express.json());

//creating Database name using this connect method and also for connect

// importing this specific line of code to make mongo db run from RENDER
const mongoURI = process.env.MONGODB_URI;

// connecting the mongo db through this variable(mongo db url) to mongoose - this is the old line of code " mongoose.connect("mongodb://localhost:27017/TodoApp") ", this used localhost to connect
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
    console.log("DB connected")
})
.catch((error)=>{
    console.log("mongoDB error"+error)
}
)

//creating schema for document
// Defines the structure for the todo documents in MongoDB.
const todoSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String
},{timestamps: true})

//creating collection data in DB
//Creates a model (class) called todo, linked to a MongoDB collection. 
// You can use it to create, read, update, and delete documents.
//1st parameter - collection name, 2nd parameter - for document(schema)
const todoModel = mongoose.model('todo', todoSchema);

//storing variable to join the all coming data
const todos=[]

//create item
// post methos since the data comes from the form and we use post method for form always
//we are making a POST method api url, "to give a response" when a "request" comes for POST method:
//we use app.post() instead of if else condition to check the method(post or get etc.,) 
// and we receive data from the first url, which is the request
// and we will send the response with the second parameter
app.post("/todo", async(req,res)=>{
    const {title, description} = req.body;
    // const todoList = {
    //     id:todos.length+1,
    //     title,
    //     description
    // };
    // todos.push(todoList);
   try{
    //here, the schema accepts only if the keynames are matched.
    //notice that, we saved the format to be an object with title and description keynames,and their values must be in string.
    //here, we set the title and description keynames into the schema format, but now, the keynames have values in it.
    //we set the destructured FE data object and set it into the schema
    // **  even if we give the keynames only and not the values(data),it will store it, in an object model only.**
    //eg. let a=10; let obj = {a}; output => obj = {a:10}
    //same as above eg, even if give only the keynames, the values are there, if it presents(values) and get stored.
    //but why we give only the keynames? we could set it in the normal format as a:10;
    //but we don't know the data(values), and everytime it changes. 
    // so to store the data, we could simply name the keynames,
    //  and the values(data) will be stored in the DB 
    const newTools=new todoModel({title, description});
    //var a = 10,b = 12
    //var obj = {a,b};
    //var {a,b} = obj
    //console.log(a);  =>  10 (when we destructure, the keyname becomes a variable)
    await newTools.save();
    res.json(newTools)
   }catch(error){
    console.log(error);
    res.status(500)
   }
   
})

//getting items
// app.get("/todo", (req,res)=>{
//     res.json(todos)
// })
app.get("/todo", async(req,res)=>{
    try{
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

//------------ update data

app.put("/todo/:abc",async(req,res)=>{
    try{
            const {title, description} = req.body;
            const id = req.params.abc;
            const updateTodos =  await todoModel.findByIdAndUpdate(id, {title, description})

//when id is not found in DB, it will return null
//so we are puttin a condition to return a message back to the user
//Because if no todo is found by findByIdAndUpdate, it returns null
//null is a falsy value in JavaScript
//So !null becomes true, and the if block runs
//You could also write:
//if (updateTodos === null) { ... }
//But !updateTodos is shorter 
           if(!updateTodos){
            return res.status(404).json({message: "item is not found"})
           }
           res.json(updateTodos);
    }catch(error){
       console.log(error);
       res.status(500).json({message : error.message})

    }
})

//--------------- Delete item

app.delete("/todo/:bcd", async(req,res) => {
    try{
        const id = req.params.bcd;
        await todoModel.findByIdAndDelete(id);
        res.status(204).end();

    }catch (error){
        console.log(error);
        res.status(500).json({message: error.message})
    }
})


//creating server

const portNo =  process.env.PORT || 3210;

app.listen(portNo, ()=> {
    console.log("server running on port number"+portNo)
})
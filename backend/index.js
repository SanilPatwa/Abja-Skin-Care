const express = require("express");
const app = express();
app.use(express.json())

const clients = [
  { id: 1, name: "Shejal Beauty Parlour", type: "Salon", phone: "6232933057", city: "Jaipur" },
  { id: 2, name: "Samiksha Beauty Parlour", type: "Salon", phone: "6232933059", city: "Delhi" }
];


app.get('/',(req,res)=>{
    res.send("Hello world")
});

app.get("/api/clients",(req,res)=>{
    res.json(clients)
})

app.post("/api/clients",(req,res)=>{
    const newClient = {
        id:clients.length+1,
        ...req.body
    };
    clients.push(newClient);
    res.status(201).json(newClient)
})

app.listen(3000,()=>{
    console.log('server is running at port 3000')
})
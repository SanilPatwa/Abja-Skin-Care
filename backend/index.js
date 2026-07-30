const express = require("express");
const pool = require("./db"); 
const app = express();
app.use(express.json())

pool.query(`CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100)
  )`).then(()=>console.log("Table created")).catch(err=>console.error("DB setup error: ", err))
const clients = [
  { id: 1, name: "Shejal Beauty Parlour", type: "Salon", phone: "6232933057", city: "Jaipur" },
  { id: 2, name: "Samiksha Beauty Parlour", type: "Salon", phone: "6232933059", city: "Delhi" }
];


app.get('/',(req,res)=>{
    res.send("Hello world")
});

app.get("/api/clients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/clients",async(req,res)=>{
    const {name,type,phone,city} = req.body;
    try{
        const result = await pool.query(`INSERT INTO clients (name,type,phone,city) VALUES ($1, $2, $3, $4) RETURNING *`,[name,type,phone,city]);
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Database error"})
    }
})

app.listen(3000,()=>{
    console.log('server is running at port 3000')
})
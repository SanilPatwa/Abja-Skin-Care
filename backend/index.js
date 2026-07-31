const express = require("express");
const pool = require("./db"); 
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

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

app.delete("/api/clients/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const deleteEntry = await pool.query(`DELETE FROM clients WHERE id = $1 RETURNING *`,[id])
    if(deleteEntry.rowCount ===0){
      return res.status(404).json({error:"Client not found "})
    }
    res.json({message:"Client deleted",clients:deleteEntry.rows[0]})
  }catch(err){
    res.status(500).json({error:"Database error"})
  }
  
})

app.put("/api/clients/:id",async(req,res)=>{
  const clientsId = req.params.id;
  const {name,type,phone,city} = req.body;
  try{
    const updateEntry = await pool.query("UPDATE clients SET name = $1, type = $2, phone = $3, city = $4 WHERE id = $5 RETURNING *",[name, type, phone, city, clientsId]);
    if(updateEntry.rowCount === 0){
      return res.status(404).json({
        message:"Client not found"
      })
    }
    res.json(updateEntry.rows[0])
  }catch(err){
    res.status(500).json({error:"error"})
  }
})

app.listen(3000,()=>{
    console.log('server is running at port 3000')
})
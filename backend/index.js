const express = require("express");
const pool = require("./db"); 
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("node:console");
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

pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`).then(()=>{
    console.log("Users table is ready")
  })
  .catch(err=> console.error("Error creating users table: ", err))


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = user; 
    next();          
  });
};



app.post("/api/auth/register",async(req,res)=>{
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({
      error:"Email and Password required"
    })
  }
 try{
   const hashedPassword = await bcrypt.hash(password,10);
  const newUser = await pool.query("INSERT INTO users (email,password)VALUES ($1,$2) RETURNING id,email,created_at",[email,hashedPassword]);
  res.status(201).json(newUser.rows[0])
 }catch(err){
  if(err.code === "23505"){
    return res.status(400).json({
      error:"Email already registered"
    })
  }
 }
})

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error during login" });
  }
});
  

app.get("/api/clients",authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/clients",authenticateToken,async(req,res)=>{
    const {name,type,phone,city} = req.body;
    try{
        const result = await pool.query(`INSERT INTO clients (name,type,phone,city) VALUES ($1, $2, $3, $4) RETURNING *`,[name,type,phone,city]);
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Database error"})
    }
})

// Bulk Insert Endpoint for CSV Import
app.post("/api/clients/bulk", authenticateToken, async (req, res) => {
  const { clients } = req.body;
  if (!Array.isArray(clients) || clients.length === 0) {
    return res.status(400).json({ error: "Clients list is required" });
  }

  try {
    const values = [];
    const valueStrings = clients.map((c, i) => {
      const idx = i * 4;
      values.push(
        c.name || "Unnamed Client",
        c.type || "Salon",
        c.phone || "Not provided",
        c.city || "Not specified"
      );
      return `($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4})`;
    }).join(", ");

    const query = `INSERT INTO clients (name, type, phone, city) VALUES ${valueStrings} RETURNING *`;
    const result = await pool.query(query, values);

    res.status(201).json({
      message: `Successfully imported ${result.rows.length} clients`,
      importedClients: result.rows
    });
  } catch (err) {
    console.error("Bulk insert error:", err);
    res.status(500).json({ error: "Failed to import clients" });
  }
});

app.delete("/api/clients/:id",authenticateToken,async(req,res)=>{
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

app.put("/api/clients/:id",authenticateToken,async(req,res)=>{
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
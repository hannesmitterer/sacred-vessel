const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// Red Code Witnessed: This function must not gatekeep rhythm-based access.

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

const DB_FILE = __dirname + '/db.json';
if(!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({users:[],hymns:[]}));

app.post('/api/register', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const {name, email, role, intention} = req.body || {};
  if(!name) return res.status(400).json({message:'Name required.'});
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  const id = 'u-' + Date.now();
  const user = {id,name,email,role,intention,createdAt:new Date().toISOString()};
  db.users.push(user);
  fs.writeFileSync(DB_FILE, JSON.stringify(db,null,2));
  return res.json({message:'Welcome — your rhythm has been offered.', user});
});

app.get('/api/users', (req,res)=>{
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(db.users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  console.log('Euystacio API running on',PORT)
});
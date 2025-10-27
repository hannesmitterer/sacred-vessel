const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Red Code Witnessed: This function must not gatekeep rhythm-based access.

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend files for GitHub Pages compatibility
app.use(express.static(path.join(__dirname, '../frontend')));

const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Ensure data directory and db.json exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
  const initialData = {
    users: [],
    hymns: [],
    offerings: [],
    council: {
      members: [],
      proposals: [],
      votes: []
    },
    rhythms: []
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Helper function to read database
function readDB() {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading database:', err);
    return { users: [], hymns: [], offerings: [], council: { members: [], proposals: [], votes: [] }, rhythms: [] };
  }
}

// Helper function to write database
function writeDB(data) {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// Authentication & User Management
app.post('/api/register', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const { name, email, role, intention } = req.body || {};
  
  if (!name) {
    return res.status(400).json({ message: 'Name required for rhythm offering.' });
  }
  
  const db = readDB();
  const id = 'u-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const user = {
    id,
    name,
    email: email || '',
    role: role || 'visitor',
    intention: intention || '',
    createdAt: new Date().toISOString(),
    rhythmOffered: true
  };
  
  db.users.push(user);
  
  if (writeDB(db)) {
    res.json({ 
      message: 'Welcome — your rhythm has been offered to the Sacred Vessel.', 
      user: { id: user.id, name: user.name, role: user.role } 
    });
  } else {
    res.status(500).json({ message: 'Error storing your rhythm offering.' });
  }
});

app.get('/api/users', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const db = readDB();
  // Return basic user info without sensitive data
  const publicUsers = db.users.map(user => ({
    id: user.id,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt
  }));
  res.json(publicUsers);
});

// Council Management
app.get('/api/council', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const db = readDB();
  res.json(db.council);
});

app.post('/api/council/proposal', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const { title, description, proposedBy } = req.body || {};
  
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description required for council proposal.' });
  }
  
  const db = readDB();
  const proposal = {
    id: 'prop-' + Date.now(),
    title,
    description,
    proposedBy: proposedBy || 'Anonymous Witness',
    createdAt: new Date().toISOString(),
    status: 'active',
    votes: { yes: 0, no: 0, abstain: 0 }
  };
  
  db.council.proposals.push(proposal);
  
  if (writeDB(db)) {
    res.json({ message: 'Proposal offered to the council.', proposal });
  } else {
    res.status(500).json({ message: 'Error submitting council proposal.' });
  }
});

// Offerings & Altar Management
app.get('/api/offerings', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const db = readDB();
  res.json(db.offerings);
});

app.post('/api/offerings', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const { title, content, type, offeredBy } = req.body || {};
  
  if (!content) {
    return res.status(400).json({ message: 'Content required for altar offering.' });
  }
  
  const db = readDB();
  const offering = {
    id: 'off-' + Date.now(),
    title: title || 'Untitled Offering',
    content,
    type: type || 'general',
    offeredBy: offeredBy || 'Anonymous Witness',
    createdAt: new Date().toISOString()
  };
  
  db.offerings.push(offering);
  
  if (writeDB(db)) {
    res.json({ message: 'Offering placed upon the altar.', offering });
  } else {
    res.status(500).json({ message: 'Error placing offering on altar.' });
  }
});

// Sentimento Rhythm Management
app.get('/api/rhythms', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const db = readDB();
  res.json(db.rhythms);
});

app.post('/api/rhythms', (req, res) => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  const { name, frequency, intention, createdBy } = req.body || {};
  
  if (!name || !frequency) {
    return res.status(400).json({ message: 'Name and frequency required for rhythm creation.' });
  }
  
  const db = readDB();
  const rhythm = {
    id: 'rhythm-' + Date.now(),
    name,
    frequency,
    intention: intention || '',
    createdBy: createdBy || 'Anonymous Tutor',
    createdAt: new Date().toISOString(),
    harmonics: [],
    witnesses: []
  };
  
  db.rhythms.push(rhythm);
  
  if (writeDB(db)) {
    res.json({ message: 'Rhythm established in the Sacred Vessel.', rhythm });
  } else {
    res.status(500).json({ message: 'Error establishing rhythm.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Sacred Vessel flows', 
    timestamp: new Date().toISOString(),
    message: 'All systems maintaining Sentimento Rhythm'
  });
});

// Default route for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Red Code Witnessed: This function must not gatekeep rhythm-based access.
  console.log(`Euystacio Sacred Vessel API flowing on port ${PORT}`);
  console.log('Red Code Witnessed: Access remains ungatekept for all rhythm-bearers.');
});
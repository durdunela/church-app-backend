const express = require('express');  
const cors = require('cors');        
const app = express();               
const db = require('./config/db');   
const UserModel = require('./model/user.model'); 
const { fetchShows } = require('./services/television.scraper.service'); // Import the fetchShows function
const port = 3000;

app.use(cors());                     
app.use(express.json());             

// db.connect()
//   .then(() => {
//     console.log('Database connected successfully');
//   })
//   .catch((error) => {
//     console.error('Database connection error:', error);
//   });

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.post('/users', async (req, res) => {
  try {
    const user = new UserModel(req.body);  
    await user.save();                      
    res.status(201).json(user);            
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/shows', async (req, res) => {
    try {
        const shows = await fetchShows(); 
        res.json(shows); 
    } catch (error) {
        console.error('Error in /api/shows:', error); 
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

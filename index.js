import express, { json } from 'express';
import cors from 'cors';
const app = express();
import db from './config/db.js';
import UserModel from './model/user.model.js';
import { fetchShows } from './services/television.scraper.service.js';
import { HtmlFetcher } from './services/calendar.scraper.service.js';
const port = 4000;

app.use(cors());
app.use(json());

// db.connect()
//   .then(() => {
//     console.log('Database connected successfully');
//   })
//   .catch((error) => {
//     console.error('Database connection error:', error);
//   });

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

app.get('api/calendar', async (req, res) => {
  const { year, month } = req.query;  

  if (!year || !month) {
    return res.status(400).json({ error: 'Year and month are required' });
  }

  try {
    const data = await HtmlFetcher(year, month); 
    res.json(data);  
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

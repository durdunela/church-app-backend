import { fetchShows } from "../services/television.scraper.service.js"; // Import the fetchShows function

export const showFetchedShows = async (req, res) => {
  try {
    const shows = await fetchShows();
    res.json(shows);
  } catch (error) {
    console.error("Error in /api/shows:", error);
    res.status(500).json({ error: "Failed to fetch shows" });
  }
};

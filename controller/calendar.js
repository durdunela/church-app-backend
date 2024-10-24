import { HtmlFetcher } from "../services/calendar.scraper.service.js";
export const calendarFetcher = async (req, res) => {
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ error: "Year and month are required" });
  }

  try {
    const data = await HtmlFetcher(year, month);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch calendar data" });
  }
};

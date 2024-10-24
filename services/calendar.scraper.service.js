import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export const HtmlFetcher = async (year, month) => {
  const allItems = [];

  const url = `https://www.crkvenikalendar.com/index_ge.php?year=${year}&month=${month}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load HTML: ${response.statusText}`);
    }

    const text = await response.text();
    const dom = new JSDOM(text);
    const document = dom.window.document;

    const calendarElements = document.querySelectorAll(
      ".cssDays1, .cssPost_day1, .cssSaturdays1"
    );
    console.log(
      `URL: ${url} - Found ${calendarElements.length} calendar elements`
    );

    calendarElements.forEach((element) => {
      const imgElement = element.querySelector("img");
      let imgSrc = imgElement?.getAttribute("src") || "";
      const dateText = element.querySelector("b")?.textContent || "";

      const titleElement = element.querySelector(".tekst-ispod");
      const titleText = titleElement?.textContent || "";

      if (imgSrc && !imgSrc.startsWith("http")) {
        imgSrc = `https://www.crkvenikalendar.com/${imgSrc.replace(
          /^\/+/,
          ""
        )}`;
      }

      if (imgSrc && titleText && dateText) {
        allItems.push({
          image: imgSrc,
          name: titleText,
          date: dateText,
        });
      }
    });
  } catch (error) {
    console.error("Error fetching HTML:", error);
    throw error;
  }

  console.log("Fetched calendar items for", year, month, ":", allItems);
  return allItems;
};

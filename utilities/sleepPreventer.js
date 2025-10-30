import cron from "node-cron";
import axios from "axios";

const urls = [
  "https://cinewish-app.onrender.com",
  "https://cinewish-web.onrender.com",
  "https://wallportal.onrender.com",
  "https://turfgrid.onrender.com",
  "https://wearster.onrender.com"
];

cron.schedule("*/10 * * * *", async () => {
  console.log(`[CRON] Running at ${new Date().toISOString()}`);

  try {
    const responses = await Promise.all(
      urls.map(url => axios.get(url).catch(err => ({ error: err.message, url })))
    );

    responses.forEach(res => {
      if (res.error) {
        console.error(`❌ Error pinging ${res.url}: ${res.error}`);
      } else {
        console.log(`✅ Pinged ${res.config.url}: ${res.status}`);
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
  }
});

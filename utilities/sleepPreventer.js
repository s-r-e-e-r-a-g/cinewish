import cron from "node-cron";
import axios from "axios";

cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await axios.get(`https://cinewish-app.onrender.com/ping`);
    console.log(`Server: ${response.data.message}`);
    await axios.get(`https://turfgrid.onrender.com/`);
  } catch (error) {
    console.error('Error calling /ping:', error.message);
  }
});

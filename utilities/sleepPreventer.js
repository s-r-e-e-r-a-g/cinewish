import cron from "node-cron";
import axios from "axios";

cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await axios.get(`https://cinewish-web.onrender.com`);
    console.log(`Server: ${response.data.message}`);
    await axios.get(`https://wallportal.onrender.com`);
    await axios.get(`https://turfgrid.onrender.com`);
    await axios.get(`https://wearster.onrender.com`);
  } catch (error) {
    console.error('Error calling /ping:', error.message);
  }
});

import axios from "axios";
import TokenManager from "./TokenManager";

const FavouritesListStatisticsAPI = {
  fetchStatistics: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/favourites_statistics`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user favourites list statistics: ", error);
      throw error;
    }
  },
};

export default FavouritesListStatisticsAPI;

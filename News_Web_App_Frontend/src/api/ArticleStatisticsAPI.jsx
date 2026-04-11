import axios from "axios";
import TokenManager from "./TokenManager";

const ArticleStatisticsAPI = {
  fetchTotalArticlesByJournalist: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/statistics/total`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching journalist statistics: ", error);
      throw error;
    }
  },
  fetchArticleShareByJournalist: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/statistics/share`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching journalist statistics: ", error);
      throw error;
    }
  }
};

export default ArticleStatisticsAPI;

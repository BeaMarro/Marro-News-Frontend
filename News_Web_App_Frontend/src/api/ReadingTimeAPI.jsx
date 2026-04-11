import axios from "axios";
import TokenManager from "./TokenManager";

const ReadingTimeAPI = {
  fetchReadingTimeByArticleId: async (articleId) => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/${articleId}/reading-time`);
      return response.data;
    } catch (error) {
      console.error("Error fetching article reading-time:", error);
      throw error;
    }
  }
};

export default ReadingTimeAPI;
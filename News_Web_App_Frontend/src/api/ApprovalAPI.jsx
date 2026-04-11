import axios from "axios";
import TokenManager from "./TokenManager";

const ApprovalAPI = {
  fetchPendingArticles: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/pending`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching pending articles: ", error);
      throw error;
    }
  },
  
  approveArticle: async (articleId) => {
    try {
      await axios.patch(`http://localhost:8080/articles/approve/${articleId}`, null, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error changing the status of article with id " + articleId + " to approved: ", error);
      throw error;
    }
  },

  disapproveArticle: async (articleId) => {
    try {
      await axios.patch(`http://localhost:8080/articles/disapprove/${articleId}`, null, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error changing the status of article with id " + articleId + " to disapproved :", error);
      throw error;
    }
  }
};

export default ApprovalAPI;

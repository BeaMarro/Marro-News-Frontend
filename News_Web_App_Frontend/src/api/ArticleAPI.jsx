import axios from "axios";
import TokenManager from "./TokenManager";

const ArticleAPI = {
  fetchArticleById: async (articleId) => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/${articleId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },

  fetchArticles: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/articles`);
      return response.data;
    } catch (error) {
      console.error("Error fetching articles", error);
      throw error;
    }
  },

  fetchArticlesByGenre: async (genre) => {
    try {
      const response = await axios.get(`http://localhost:8080/articles?genre=${genre}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching articles by genre: " + genre, error);
      throw error;
    }
  },

  fetchAllArticlesByJournalistId: async (journalistId) => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/all?journalistId=${journalistId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all articles by journalist with id: " + journalistId, error);
      throw error;
    }
  },

  fetchApprovedArticlesByJournalistId: async (journalistId) => {
    try {
      const response = await axios.get(`http://localhost:8080/articles?journalistId=${journalistId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching approved articles by journalist with id: " + journalistId, error);
      throw error;
    }
  },

  postArticle: async (newArticle) => { // Create and Post the article to the API
    try {
      console.log("Post Article: " + newArticle);
      await axios.post("http://localhost:8080/articles", {
        "heading": newArticle.heading,
        "text": newArticle.text,
        "authorId": newArticle.authorId,
        "genre": newArticle.genre,
        "coverImage": newArticle.coverImage,
        "video": newArticle.video
      }, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    });
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  deleteArticle: async (articleId) => {
    try {
      await axios.delete(`http://localhost:8080/articles/${articleId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    });
    } catch(error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  },

  putArticle: async (updatedArticle) => {
    try {
      await axios.put("http://localhost:8080/articles", {
        "id": updatedArticle.id,
        "heading": updatedArticle.heading,
        "text": updatedArticle.text,
        "authorId": updatedArticle.authorId,
        "genre": updatedArticle.genre,
        "coverImage": updatedArticle.coverImage,
        "video": updatedArticle.video
      }, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    });
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  }
};

export default ArticleAPI;

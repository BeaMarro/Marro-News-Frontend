import axios from "axios";
import TokenManager from "./TokenManager";

const FavouritesListAPI = {
  fetchFavouritesList: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/favourites`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user favourites list: ", error);
      throw error;
    }
  },

  deleteFavouritesListArticle: async (articleId) => {
    try {
      await axios.delete(`http://localhost:8080/favourites/${articleId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error deleting article from user favourites list: ", error);
      throw error;
    }
  },

  addFavouritesListArticle: async (articleId) => {
    try {
      await axios.post(`http://localhost:8080/favourites/${articleId}`, null, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error adding article to user favourites list: ", error);
      throw error;
    }
  },
};

export default FavouritesListAPI;

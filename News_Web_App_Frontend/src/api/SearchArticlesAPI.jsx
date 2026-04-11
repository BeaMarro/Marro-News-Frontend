import axios from "axios";

const SearchArticlesAPI = {
  searchArticlesByQuery: async (query) => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching articles by query:", error);
      throw error;
    }
  }
};

export default SearchArticlesAPI;

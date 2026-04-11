import axios from "axios";

const SearchJournalistsAPI = {
  searchJournalistsByQuery: async (query) => {
    try {
      const response = await axios.get(`http://localhost:8080/journalists/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching journalists by query:", error);
      throw error;
    }
  }
};

export default SearchJournalistsAPI;

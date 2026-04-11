import axios from "axios";
import TokenManager from "./TokenManager";

const JournalistAPI = {
  fetchJournalistById: async (journalistId) => {
    try {
      const response = await axios.get(`http://localhost:8080/journalists/${journalistId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching journalist:", error);
      throw error;
    }
  },

  fetchJournalists: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/journalists`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      console.log("Response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching journalists:", error);
      throw error;
    }
  },

  postJournalist: async (newJournalist) => {
    try {
      await axios.post("http://localhost:8080/journalists", {
        "fullName": newJournalist.fullName,
        "username": newJournalist.username,
        "dateOfBirth": newJournalist.dateOfBirth,
        "email": newJournalist.email,
        "profilePicture": newJournalist.profilePicture,
        "password": newJournalist.password,
        "department": newJournalist.department
      }, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error adding journalist:", error);
      throw error;
    }
  },

  deleteJournalist: async (journalistId) => {
    try {
      await axios.delete(`http://localhost:8080/journalists/${journalistId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error deleting journalist:", error);
      throw error;
    }
  },

  putJournalist: async (updatedJournalist) => {
    try {
      await axios.put("http://localhost:8080/journalists", {
        "id": updatedJournalist.id,
        "fullName": updatedJournalist.fullName,
        "username": updatedJournalist.username,
        "dateOfBirth": updatedJournalist.dateOfBirth,
        "email": updatedJournalist.email,
        "profilePicture": updatedJournalist.profilePicture,
        "password": updatedJournalist.password,
        "department": updatedJournalist.department
      }, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error updating journalist:", error);
      throw error;
    }
  },
};

export default JournalistAPI;

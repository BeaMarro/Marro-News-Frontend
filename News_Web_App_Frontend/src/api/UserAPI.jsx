import axios from "axios";
import TokenManager from "./TokenManager";

const UserAPI = {
  postUser: async (newUser) => {
    try {
      await axios.post("http://localhost:8080/users", {
        "fullName": newUser.fullName,
        "username": newUser.username,
        "dateOfBirth": newUser.dateOfBirth,
        "email": newUser.email,
        "profilePicture": newUser.profilePicture,
        "password": newUser.password,
        "bio": newUser.bio
      });
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },
  fetchUserById: async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  putUser: async (updatedUser) => {
    try {
        await axios.put("http://localhost:8080/users", {
        "id": updatedUser.id,
        "fullName": updatedUser.fullName,
        "username": updatedUser.username,
        "dateOfBirth": updatedUser.dateOfBirth,
        "email": updatedUser.email,
        "profilePicture": updatedUser.profilePicture,
        "password": updatedUser.password,
        "bio": updatedUser.bio
      }, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
  deleteUser: async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
};

export default UserAPI;
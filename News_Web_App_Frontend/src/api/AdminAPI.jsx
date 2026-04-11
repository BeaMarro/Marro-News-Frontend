import axios from "axios";
import TokenManager from "./TokenManager";

const AdminAPI = {
  fetchAdminById: async (adminId) => {
    try {
      const response = await axios.get(`http://localhost:8080/admins/${adminId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching admin:", error);
      throw error;
    }
  },
  putAdmin: async (updatedAdmin) => {
    try {
      await axios.put("http://localhost:8080/admins", {
        "id": updatedAdmin.id,
        "fullName": updatedAdmin.fullName,
        "username": updatedAdmin.username,
        "dateOfBirth": updatedAdmin.dateOfBirth,
        "email": updatedAdmin.email,
        "profilePicture": updatedAdmin.profilePicture,
        "password": updatedAdmin.password,
        "company": updatedAdmin.company
      }, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    });
    } catch (error) {
      console.error("Error updating admin:", error);
      throw error;
    }
  },
  deleteAdmin: async (adminId) => {
    try {
      await axios.delete(`http://localhost:8080/admins/${adminId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      console.error("Error deleting admin:", error);
      throw error;
    }
  }
};

export default AdminAPI;
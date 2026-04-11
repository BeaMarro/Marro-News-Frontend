import axios from "axios";

const NotificationAPI = {
    fetchNotifications: async () => {
      try {
        const response = await axios.get(`http://localhost:8080/topic/notification`);
        return response.data;
      } catch (error) {
        console.error("Error fetching articles", error);
        throw error;
      }
    }
}

export default NotificationAPI;
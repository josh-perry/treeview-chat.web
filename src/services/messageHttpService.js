import axios from "axios";

class MessageHttpService {
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:8081/api/",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getMessages(parentId) {
    return this.http.get(`/messages/${parentId}`);
  }

  postMessage(parentId, body) {
    return this.http.post(`/messages/${parentId}`, body)
  }

  getRootMessage() {
    return this.http.get("/messages");
  }
}

export default new MessageHttpService();

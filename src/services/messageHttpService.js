import axios from "axios";

class MessageHttpService {
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:8081/api/messages/",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getMessages(parentId) {
    console.log("getMessages", parentId);
    return this.http.get(`/${parentId}`);
  }

  postMessage(parentId, body) {
    return this.http.post(`/${parentId}`, body)
  }

  getRootMessage() {
    return this.http.get("/");
  }
}

export default new MessageHttpService();

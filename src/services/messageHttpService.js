import axios from "axios";

class MessageHttpService {
  constructor() {
    const base = process.env.VUE_APP_API_BASE_URL;
    console.log(`Using '${base}' as API base url`);

    this.http = axios.create({
      baseURL: base,
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

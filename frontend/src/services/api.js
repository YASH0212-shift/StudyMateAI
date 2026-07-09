import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export async function chat(query, documentId) {

    const response = await api.post("/chat", {
        query,
        document_id: documentId
    });

    return response.data;
}

export default api;
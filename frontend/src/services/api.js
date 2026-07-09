import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default api;

export async function chat(query, documentId) {
    const response = await api.post("/chat", {
        query,
        document_id: documentId,
    });

    return response.data;
}
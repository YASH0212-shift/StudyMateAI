from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag_service import chat_with_pdf

router = APIRouter()


class ChatRequest(BaseModel):
    query: str
    document_id: str


@router.post("/chat")
def chat(request: ChatRequest):

    return chat_with_pdf(
        request.query,
        request.document_id
    )
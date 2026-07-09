from fastapi import APIRouter, UploadFile, File
import shutil
import os
from app.utils.text_splitter import split_text_into_chunks
from app.utils.pdf_reader import extract_text_from_pdf
from app.services.vector_store import store_chunks
import uuid
router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are allowed"}

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    pages = extract_text_from_pdf(file_path)
    chunks = split_text_into_chunks(pages)
    document_id = str(uuid.uuid4())
    store_chunks(chunks,document_id)
    return {

    "document_id": document_id,

    "pages": len(pages),

    "chunks": len(chunks),

    "message": "PDF indexed successfully"

}
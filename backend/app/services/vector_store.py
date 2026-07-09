import uuid

from app.database.chroma import collection
from app.services.embedding_service import get_embedding


def store_chunks(chunks, document_id):

    for chunk in chunks:

        embedding = get_embedding(chunk["content"])

        collection.add(

            ids=[str(uuid.uuid4())],

            embeddings=[embedding],

            documents=[chunk["content"]],

            metadatas=[

                {

                    "page": chunk["page"],

                    "document_id": document_id

                }

            ]

        )
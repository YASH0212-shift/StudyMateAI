from app.database.chroma import collection
from app.services.embedding_service import get_embedding


def retrieve_chunks(query, document_id):

    embedding = get_embedding(query)

    results = collection.query(

        query_embeddings=[embedding],

        n_results=3,

        where={

            "document_id": document_id

        }

    )

    return results
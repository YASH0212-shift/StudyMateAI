from app.services.retriever import retrieve_chunks
from app.services.gemini_service import ask_gemini

def chat_with_pdf(question, document_id):

    results = retrieve_chunks(question, document_id)

    documents = results["documents"][0]

    context = "\n\n".join(documents)

    answer = ask_gemini(
        context=context,
        question=question
    )

    # Extract unique page numbers
    pages = sorted(
        list(
            set(
                metadata["page"]
                for metadata in results["metadatas"][0]
            )
        )
    )

    return {
        "answer": answer,
        "pages": pages
    }
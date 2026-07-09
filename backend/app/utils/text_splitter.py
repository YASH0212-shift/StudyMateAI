from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_text_into_chunks(pages):
    """
    Takes extracted PDF pages and returns chunks.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    all_chunks = []

    for page in pages:

        chunks = splitter.split_text(page["text"])

        for chunk in chunks:

            all_chunks.append({
                "page": page["page"],
                "content": chunk
            })

    return all_chunks
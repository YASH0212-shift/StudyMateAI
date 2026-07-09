import fitz  # PyMuPDF


def extract_text_from_pdf(pdf_path):
    """
    Extract text page by page from a PDF.
    Returns a list of dictionaries.
    """

    document = fitz.open(pdf_path)

    pages = []

    for page_num in range(len(document)):
        page = document.load_page(page_num)

        text = page.get_text()

        pages.append({
            "page": page_num + 1,
            "text": text
        })

    document.close()

    return pages
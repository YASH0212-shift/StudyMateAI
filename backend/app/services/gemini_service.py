import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize the model
model = genai.GenerativeModel("gemini-2.5-flash")

def ask_gemini(context, question):

    prompt = f"""
You are StudyMate AI.

Answer ONLY using the provided context.

Format your answer using Markdown.

Guidelines:
- Use headings where appropriate.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use tables if useful.
- Keep answers concise and easy to read.

If the answer is not found in the context, reply exactly:

"I couldn't find this information in the uploaded PDF."

Context:
{context}

Question:
{question}

Answer:
"""

    try:
        response = model.generate_content(prompt)

       

        return response.text

    except Exception as e:
        print("===== GEMINI ERROR =====")
        print(e)
        raise
from app.services.gemini_service import ask_gemini

answer = ask_gemini(

    "Deadlock occurs when two or more processes wait indefinitely.",

    "Explain deadlock"

)

print(answer)
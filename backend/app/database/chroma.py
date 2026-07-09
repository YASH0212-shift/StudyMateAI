from chromadb import PersistentClient

# Stores the database permanently on disk
client = PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(
    name="studymate"
)
from fastapi import FastAPI

app = FastAPI(title="Dayflow API")


@app.get("/")
def home():
    return {
        "message": "Dayflow backend is running"
    }
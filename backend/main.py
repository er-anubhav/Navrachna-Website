from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routers import contact, newsletter, announcements, stats

app = FastAPI(
    title="NFED API",
    description="Navrachna Foundation for Entrepreneurship Development — Backend API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS — allow local dev and production frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://navrachna.vercel.app",
        "https://navrachnafoundation.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB and seed data on startup
@app.on_event("startup")
def on_startup():
    init_db()

# Register routers
app.include_router(contact.router)
app.include_router(newsletter.router)
app.include_router(announcements.router)
app.include_router(stats.router)


@app.get("/api/health", tags=["health"])
def health():
    return {"status": "ok", "service": "NFED API v1.0.0"}

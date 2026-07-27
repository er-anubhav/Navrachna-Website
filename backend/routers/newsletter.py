from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, NewsletterSubscriber
from schemas import NewsletterCreate, NewsletterResponse
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


@router.post("", response_model=NewsletterResponse, status_code=201)
def subscribe(payload: NewsletterCreate, db: Session = Depends(get_db)):
    subscriber = NewsletterSubscriber(email=payload.email)
    db.add(subscriber)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Email already subscribed.")
    return {"message": "Successfully subscribed! Welcome to NFED updates."}

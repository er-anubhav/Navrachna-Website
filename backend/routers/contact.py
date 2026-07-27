from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, ContactMessage
from schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactResponse, status_code=201)
def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        subject=payload.subject,
        message=payload.message,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@router.get("", response_model=list[ContactResponse])
def list_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()

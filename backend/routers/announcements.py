from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db, Announcement
from schemas import AnnouncementOut

router = APIRouter(prefix="/api/announcements", tags=["announcements"])


@router.get("", response_model=list[AnnouncementOut])
def get_announcements(db: Session = Depends(get_db)):
    return db.query(Announcement).filter(Announcement.active == 1).all()

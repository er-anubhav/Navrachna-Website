from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    created_at: datetime

    class Config:
        from_attributes = True


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    message: str


class AnnouncementOut(BaseModel):
    id: int
    tag: str
    text: str

    class Config:
        from_attributes = True


class StatsOut(BaseModel):
    startups_incubated: int
    grants_disbursed: str
    mentors_connected: int
    sq_ft_workspace: int
    programs_active: int
    students_impacted: int

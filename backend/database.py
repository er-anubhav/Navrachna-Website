from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./nfed.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=True)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(200), unique=True, nullable=False)
    subscribed_at = Column(DateTime, default=datetime.utcnow)


class Announcement(Base):
    __tablename__ = "announcements"
    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String(100), nullable=False)
    text = Column(Text, nullable=False)
    active = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)
    # Seed default announcements
    db = SessionLocal()
    if db.query(Announcement).count() == 0:
        seeds = [
            Announcement(tag="Competition", text="Applications are now open for the Annual Logo Design Competition. Submit your creative portfolios today."),
            Announcement(tag="MSME Hackathon", text="Join the upcoming MSME Hackathons to solve real-world industry challenges and secure seed funding."),
            Announcement(tag="Incubation", text="Discover funding opportunities through our Startin-Up and NewGen-IEDC programs."),
            Announcement(tag="Labs & Infra", text="Access our state-of-the-art Fabrication Lab and High-End Compute resources to accelerate your prototyping."),
        ]
        db.add_all(seeds)
        db.commit()
    db.close()

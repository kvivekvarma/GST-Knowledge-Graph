from sqlalchemy import Column, Integer, String
from database import Base

class ReconciliationRecord(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(String, index=True)
    status = Column(String)
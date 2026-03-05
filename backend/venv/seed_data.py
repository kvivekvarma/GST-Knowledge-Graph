from database import SessionLocal
from models import ReconciliationRecord

db = SessionLocal()

data = [
    ReconciliationRecord(invoice_id="INV001", status="Matched"),
    ReconciliationRecord(invoice_id="INV002", status="Mismatch"),
    ReconciliationRecord(invoice_id="INV003", status="Matched"),
    ReconciliationRecord(invoice_id="INV004", status="Pending"),
]

for record in data:
    db.add(record)

db.commit()
db.close()

print("Sample data inserted successfully!")
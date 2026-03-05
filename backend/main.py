from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

app = FastAPI()

# Enable CORS (Frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Neo4j connection
uri = "bolt://localhost:7687"
username = "neo4j"
password = "12345678"

driver = GraphDatabase.driver(uri, auth=(username, password))


# -------------------------------
# Home API
# -------------------------------
@app.get("/")
def home():
    return {"message": "Backend Running"}


# -------------------------------
# Vendors API (NEW API ADDED)
# -------------------------------
@app.get("/vendors")
def get_vendors():
    with driver.session() as session:
        result = session.run("""
        MATCH (v:Vendor)
        RETURN v
        """)

        vendors = []

        for record in result:
            v = record["v"]

            vendors.append({
                "name": v.get("name", ""),
                "gstin": v.get("gstin", ""),
                "risk": v.get("risk", "Low"),
                "location": v.get("location", "Unknown")
            })

        return vendors


# -------------------------------
# Graph API
# -------------------------------
@app.get("/graph")
def get_graph():
    with driver.session() as session:
        result = session.run("""
        MATCH (n)-[r]->(m)
        RETURN n, r, m
        """)

        nodes = []
        links = []
        node_names = set()

        for record in result:
            n = record["n"]
            m = record["m"]
            r = record["r"]

            if n["name"] not in node_names:
                nodes.append({
                    "id": n["name"],
                    "group": n.get("type", "Entity"),
                    "risk": n.get("risk", "Low"),
                    "explanation": n.get("explanation", "")
                })
                node_names.add(n["name"])

            if m["name"] not in node_names:
                nodes.append({
                    "id": m["name"],
                    "group": m.get("type", "Entity"),
                    "risk": m.get("risk", "Low"),
                    "explanation": m.get("explanation", "")
                })
                node_names.add(m["name"])

            links.append({
                "source": n["name"],
                "target": m["name"],
                "label": r.type
            })

        return {"nodes": nodes, "links": links}
    # ✅ ADD THIS PART HERE (Audit API)
@app.get("/audit")
def get_audit():
    with driver.session() as session:
        result = session.run("""
        MATCH (v:Vendor)-[:FILED]->(i:Invoice)
        RETURN v.name AS vendor, i.invoice_id AS invoice, i.amount AS amount
        """)

        logs = []

        for record in result:
            logs.append({
                "vendor": record["vendor"],
                "invoice": record["invoice"],
                "amount": record["amount"],
                "action": "GST Filed"
            })

        return logs
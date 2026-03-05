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


@app.get("/")
def home():
    return {"message": "Backend Running"}


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
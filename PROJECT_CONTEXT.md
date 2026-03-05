# GST Risk Knowledge Graph Dashboard

## 🔧 Tech Stack
- Frontend: React + Tailwind CSS
- Graph Library: react-force-graph-2d
- Backend: FastAPI (Python)
- Database: Neo4j

## 🔐 Authentication
- Simple login page using React
- Token stored in localStorage
- ProtectedRoute implemented
- Logout functionality added

## 📊 Dashboard Features
- Risk Summary Panel (High / Medium / Low / Total)
- Interactive Force-Directed Graph
- Risk-based Node Colors:
    - High → Red
    - Medium → Yellow
    - Low → Green
- Risk Legend overlay
- Click Node → Show Audit Details
- Background click clears selection

## 📈 Analytics
- Pie Chart Risk Distribution implemented

## 🔎 API Endpoint
GET http://127.0.0.1:8000/graph

Returns:
{
  nodes: [],
  links: []
}

Each node contains:
- id
- group
- risk
- explanation

## 🎯 Current Status
- Full stack working
- Graph rendering correctly
- Backend connected to Neo4j
- Authentication working

## 🚀 Future Improvements Planned
- Search functionality
- PDF report generation
- JWT authentication
- AI-based risk scoring
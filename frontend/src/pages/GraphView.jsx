import { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function GraphView() {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
  fetch("http://127.0.0.1:8000/graph")
    .then(res => res.json())
    .then(res => {
      console.log("DATA FROM API:", res);  // 👈 ADD HERE
      setData(res);
    })
    .catch(err => console.error("API error:", err));
}, []);

  return (
    <div className="p-4">
      {/* 🔎 Search Bar */}

<div className="mb-6 flex gap-3">

  <input
    type="text"
    placeholder="Search Company / Invoice / GSTIN..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border px-4 py-2 rounded w-80"
  />

  <button
    onClick={() => {
      const node = data.nodes.find(n =>
        n.id.toLowerCase().includes(search.toLowerCase())
      );

      if (node) {
        setSelected(node);
      } else {
        alert("Entity not found");
      }
    }}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Search
  </button>

</div>

      {/* 🔥 Summary Panel */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-red-100 p-4 rounded text-center shadow">
          <h3 className="font-bold text-red-700">High Risk</h3>
          <p className="text-2xl font-bold">
            {data.nodes.filter(n => n.risk === "High").length}
          </p>
        </div>

        <div className="bg-yellow-100 p-4 rounded text-center shadow">
          <h3 className="font-bold text-yellow-700">Medium Risk</h3>
          <p className="text-2xl font-bold">
            {data.nodes.filter(n => n.risk === "Medium").length}
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded text-center shadow">
          <h3 className="font-bold text-green-700">Low Risk</h3>
          <p className="text-2xl font-bold">
            {data.nodes.filter(n => n.risk === "Low").length}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded text-center shadow">
          <h3 className="font-bold text-gray-700">Total Nodes</h3>
          <p className="text-2xl font-bold">
            {data.nodes.length}
          </p>
        </div>

      </div>

      {/* Graph + Audit Layout */}
      <div className="h-[80vh] grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Graph Panel */}
<div className="bg-slate-900 rounded-xl relative">

  {/* 🔥 Risk Legend */}
  <div className="absolute top-4 right-4 bg-white shadow-lg rounded-xl p-4 text-sm space-y-2 border z-10">
    <h3 className="font-bold mb-2">Risk Legend</h3>

    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-red-500"></div>
      <span>High Risk</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
      <span>Medium Risk</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-green-500"></div>
      <span>Low Risk</span>
    </div>
  </div>

  <ForceGraph2D
  graphData={data}
  nodeLabel="id"
  linkLabel="label"
  nodeAutoColorBy="group"

  nodeCanvasObject={(node, ctx, globalScale) => {

    const label = node.id;
    const fontSize = 14/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;

    // Risk color
    let color = "#4ade80";
    if (node.risk === "High") color = "#ef4444";
    if (node.risk === "Medium") color = "#facc15";

    // Highlight selected node
    if (selected && node.id === selected.id) {
      color = "#3b82f6";
    }

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw label
    ctx.fillStyle = "white";
    ctx.fillText(label, node.x + 8, node.y + 4);
  }}

  onNodeClick={(node) => setSelected(node)}
  onBackgroundClick={() => setSelected(null)}
/>

</div>

        {/* Audit Panel */}
<div className="bg-white rounded-xl shadow p-5 overflow-y-auto max-h-[80vh]">
  <h2 className="text-xl font-bold mb-3">🧾 Audit Trail</h2>

  {selected ? (
    <div className="space-y-4">

      <div>
        <p className="text-sm text-gray-500">Entity</p>
        <p className="font-semibold text-lg">{selected.id}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Type</p>
        <p className="font-medium">{selected.group}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Risk Level</p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            selected.risk === "High"
              ? "bg-red-100 text-red-700"
              : selected.risk === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {selected.risk}
        </span>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="font-semibold mb-2">⚠ Explanation</p>
        <p className="text-sm leading-relaxed">
          {selected.explanation || "No explanation available."}
        </p>
      </div>

    </div>
  ) : (
    <div className="text-gray-400 text-center mt-20">
      👈 Click any node to view audit details
    </div>
  )}
</div>

      </div>
    </div>
  );
}
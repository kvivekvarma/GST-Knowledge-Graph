const mockVendors = [
  { gstin: "29ABCDE1234F1Z5", risk: "High", trend: "↑ Increasing" },
  { gstin: "07PQRSX9876L9Z2", risk: "Medium", trend: "→ Stable" },
  { gstin: "33LMNOP4567K8Z1", risk: "Critical", trend: "↑ Increasing" },
  { gstin: "19XYZAB1234C1Z9", risk: "Low", trend: "↓ Improving" },
]

export default function Vendors() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Vendors Compliance Risk</h2>

      <div className="bg-slate-900/70 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="text-left p-3">Vendor GSTIN</th>
              <th className="text-left p-3">Risk Level</th>
              <th className="text-left p-3">Trend</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockVendors.map((v) => (
              <tr key={v.gstin} className="border-t border-slate-800 hover:bg-slate-800/50">
                <td className="p-3 font-mono text-slate-300">{v.gstin}</td>
                <td className={`p-3 font-semibold ${
                  v.risk === "Critical" ? "text-red-500" :
                  v.risk === "High" ? "text-red-400" :
                  v.risk === "Medium" ? "text-yellow-400" :
                  "text-green-400"
                }`}>
                  {v.risk}
                </td>
                <td className="p-3 text-slate-400">{v.trend}</td>
                <td className="p-3">
                  <button className="text-blue-400 hover:underline">
                    View Graph
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
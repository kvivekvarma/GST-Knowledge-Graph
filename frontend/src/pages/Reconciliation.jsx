const mockMismatches = [
  { id: "INV-001", vendor: "29ABCDE1234F1Z5", type: "Missing in 2B", risk: "High" },
  { id: "INV-014", vendor: "07PQRSX9876L9Z2", type: "Amount Mismatch", risk: "Medium" },
  { id: "INV-103", vendor: "33LMNOP4567K8Z1", type: "Invalid GSTIN", risk: "Critical" },
]

export default function Reconciliation() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reconciliation</h2>

      <div className="bg-slate-900/70 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="text-left p-3">Invoice</th>
              <th className="text-left p-3">Vendor GSTIN</th>
              <th className="text-left p-3">Mismatch Type</th>
              <th className="text-left p-3">Risk</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockMismatches.map((row) => (
              <tr key={row.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                <td className="p-3">{row.id}</td>
                <td className="p-3 text-slate-400">{row.vendor}</td>
                <td className="p-3">{row.type}</td>
                <td className={`p-3 font-semibold ${
                  row.risk === "Critical" ? "text-red-500" :
                  row.risk === "High" ? "text-red-400" :
                  "text-yellow-400"
                }`}>
                  {row.risk}
                </td>
                <td className="p-3">
                  <button className="text-blue-400 hover:underline">
                    View Audit
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
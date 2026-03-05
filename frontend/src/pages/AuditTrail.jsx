import { useEffect, useState } from "react";

export default function AuditTrail() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/audit")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
      })
      .catch((error) => {
        console.error("Error fetching audit data:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Trail</h2>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Vendor</th>
            <th className="border p-2">Invoice</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index}>
                <td className="border p-2">{log.vendor}</td>
                <td className="border p-2">{log.invoice}</td>
                <td className="border p-2">{log.amount}</td>
                <td className="border p-2">{log.action}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No audit records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
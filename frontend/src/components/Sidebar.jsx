import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 h-screen p-4">
      <div className="text-slate-400 text-sm mb-6">MENU</div>

      <ul className="space-y-3 text-slate-300">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/reconciliation" className="hover:text-blue-400">
            Reconciliation
          </Link>
        </li>

        <li>
          <Link to="/vendors" className="hover:text-blue-400">
            Vendors
          </Link>
        </li>

        <li>
          <Link to="/graph" className="hover:text-blue-400">
            Graph View
          </Link>
        </li>

        <li>
          <Link to="/audit" className="hover:text-blue-400">
            Audit Trail
          </Link>
        </li>
      </ul>
    </div>
  )
}
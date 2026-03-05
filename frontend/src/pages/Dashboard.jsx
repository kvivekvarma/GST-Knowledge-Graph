import { useEffect, useState } from "react";
import { getVendors } from "../api/api";

function Dashboard() {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendors().then(data => setVendors(data));
  }, []);

  return (
    <div>
      <h2>Vendor Data</h2>
      <pre>{JSON.stringify(vendors, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;
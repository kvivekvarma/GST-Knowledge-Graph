const API_BASE_URL = "http://127.0.0.1:8000";

export const getVendors = async () => {
    const response = await fetch(`${API_BASE_URL}/vendors`);
    return response.json();
};

export const getReconciliation = async () => {
    const response = await fetch(`${API_BASE_URL}/reconciliation`);
    return response.json();
};
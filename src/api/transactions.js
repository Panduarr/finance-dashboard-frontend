// const BASE_URL = "http://localhost:3000/api/transactions";
const BASE_URL = "finance-dashboard-backend-five.vercel.app/api/transactions";

// ✅ GET
export const fetchTransactions = async () => {
  const res = await fetch(`${BASE_URL}/get`);
  const data = await res.json();
  return data;
};

// ✅ POST
export const addTransactionAPI = async (newData) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await res.json();
  return data;
};
// ✅ PUT (Edit)
export const updateTransactionAPI = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  const data = await res.json();
  return data;
};

// ✅ DELETE
export const deleteTransactionAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

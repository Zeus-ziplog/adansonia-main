const API_BASE_URL = '/api';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  return res.json();
};

export const api = {
  // Staff
  getStaff: async () => {
    const res = await fetch(`${API_BASE_URL}/staff`);
    return handleResponse(res);
  },

  getStaffById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/staff/${id}`);
    return handleResponse(res);
  },

  // Insights
  getInsights: async () => {
    const res = await fetch(`${API_BASE_URL}/insights`);
    return handleResponse(res);
  },

  getInsightById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/insights/${id}`);
    return handleResponse(res);
  },

  // Contact
  submitContact: async (data: { name: string; email: string; message: string }) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
};

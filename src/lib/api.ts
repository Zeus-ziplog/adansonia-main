const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Staff (advocates)
  getStaff: async () => {
    const res = await fetch(`${API_BASE}/staff`);
    if (!res.ok) throw new Error('Failed to fetch staff');
    return res.json();
  },

  // Insights (articles)
  getInsights: async () => {
    const res = await fetch(`${API_BASE}/insights`);
    if (!res.ok) throw new Error('Failed to fetch insights');
    return res.json();
  },

  // Capabilities (practice areas)
  getCapabilities: async () => {
    const res = await fetch(`${API_BASE}/capabilities`);
    if (!res.ok) throw new Error('Failed to fetch capabilities');
    return res.json();
  },

  getCapabilityById: async (id: string) => {
    const res = await fetch(`${API_BASE}/capabilities/${id}`);
    if (!res.ok) throw new Error('Failed to fetch capability');
    return res.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE}/testimonials`);
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },

  // Case Studies
  getCaseStudies: async () => {
   const res = await fetch(`${API_BASE}/case-studies`);
   if (!res.ok) throw new Error('Failed to fetch case studies');
   return res.json();
  },
  // Contact form
  sendContact: async (data: { name: string; email: string; message: string }) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to send message');
    }
    return res.json();
  }
};
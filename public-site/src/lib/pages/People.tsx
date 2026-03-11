import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import './People.css';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  capabilities: string[];
  insights: string[];
  people: string[];
  order_priority: number;
  published: boolean;
}

export default function People() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    try {
      setError('');
      const data = await api.getStaff();
      setStaff(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load staff');
      console.error('Error fetching staff:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="people-page">
      <div className="page-header">
        <h1>Our Team</h1>
        <p>Meet our experienced legal professionals</p>
      </div>

      <div className="container">
        {error && <div className="error-message">{error}</div>}

        <div className="search-section">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search by name..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading team members...</p>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="no-results">
            <p>No staff members found matching your search.</p>
          </div>
        ) : (
          <div className="staff-grid">
            {filteredStaff.map(member => (
              <div key={member.id} className="staff-card">
                <div className="staff-image">
                  <div className="placeholder">👤</div>
                </div>
                <div className="staff-info">
                  <h3>{member.name}</h3>
                  <p className="email">{member.email || 'N/A'}</p>
                  {member.capabilities.length > 0 && (
                    <p className="expertise">{member.capabilities.slice(0, 3).join(', ')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

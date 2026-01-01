import { useState, useEffect } from 'react';

export default function Campaigns({ onNavigate, currentUser, onShowAuth, searchTerm }) {
    const [filterStatus, setFilterStatus] = useState('all');

    const [campaigns, setCampaigns] = useState(() => {
        // ... (savedCampaigns logic same)
        const savedCampaigns = localStorage.getItem('campaigns');
        return savedCampaigns ? JSON.parse(savedCampaigns) : [
            {
                id: 1,
                name: 'Summer Sale 2025',
                status: 'Active',
                type: 'Email',
                audience: 1250,
                sent: 1250,
                opens: 856,
                clicks: 312,
                budget: '₹2,500',
                startDate: '2025-12-28',
                endDate: '2026-01-15',
            },
            {
                id: 2,
                name: 'Product Launch Announcement',
                status: 'Completed',
                type: 'Email',
                audience: 3200,
                sent: 3200,
                opens: 2145,
                clicks: 890,
                budget: '₹5,000',
                startDate: '2025-12-25',
                endDate: '2025-12-27',
            },
            {
                id: 3,
                name: 'Holiday Greetings',
                status: 'Scheduled',
                type: 'SMS',
                audience: 1800,
                sent: 0,
                opens: 0,
                clicks: 0,
                budget: '₹1,200',
                startDate: '2026-01-01',
                endDate: '2026-01-02',
            },
            {
                id: 4,
                name: 'Newsletter December',
                status: 'Active',
                type: 'Email',
                audience: 2100,
                sent: 2100,
                opens: 1450,
                clicks: 523,
                budget: '₹3,000',
                startDate: '2025-12-20',
                endDate: '2026-01-05',
            },
            {
                id: 5,
                name: 'Black Friday Promo',
                status: 'Draft',
                type: 'Email',
                audience: 4500,
                sent: 0,
                opens: 0,
                clicks: 0,
                budget: '₹8,000',
                startDate: '2026-11-25',
                endDate: '2026-11-27',
            },
        ];
    });

    // ... (useEffect and helper functions same)

    // Save to localStorage whenever campaigns change
    useEffect(() => {
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }, [campaigns]);

    const getStatusBadge = (status) => {
        const statusClasses = {
            Active: 'badge-success',
            Completed: 'badge-info',
            Scheduled: 'badge-warning',
            Draft: 'badge-primary',
        };
        return `badge ${statusClasses[status] || 'badge-primary'}`;
    };

    const filteredCampaigns = campaigns.filter((campaign) => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || campaign.status.toLowerCase() === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            setCampaigns(campaigns.filter((c) => c.id !== id));
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Campaigns</h1>
                    <p className="page-subtitle">
                        Manage and monitor all your marketing campaigns in one place.
                    </p>
                </div>
                <div className="page-header-actions">
                    <button className="btn btn-outline">📥 Export Data</button>
                    <button className="btn btn-primary" onClick={() => onNavigate('campaign-create')}>
                        + Create Campaign
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)', padding: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            {searchTerm ? `Results for "${searchTerm}"` : 'Filter by status'}
                        </p>
                    </div>
                    <select
                        className="form-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ width: 'auto', minWidth: '150px' }}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Campaigns Table */}
            {filteredCampaigns.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Campaign Name</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Audience</th>
                                <th>Opens</th>
                                <th>Clicks</th>
                                <th>Budget</th>
                                <th>Start Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCampaigns.map((campaign) => (
                                <tr key={campaign.id}>
                                    <td>
                                        <strong>{campaign.name}</strong>
                                    </td>
                                    <td>
                                        <span className={getStatusBadge(campaign.status)}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td>{campaign.type}</td>
                                    <td>{campaign.audience.toLocaleString()}</td>
                                    <td>
                                        {campaign.sent > 0
                                            ? `${campaign.opens} (${Math.round((campaign.opens / campaign.sent) * 100)}%)`
                                            : '-'}
                                    </td>
                                    <td>
                                        {campaign.sent > 0
                                            ? `${campaign.clicks} (${Math.round((campaign.clicks / campaign.sent) * 100)}%)`
                                            : '-'}
                                    </td>
                                    <td>
                                        {(() => {
                                            if (!campaign.budget) return '-';
                                            // Remove any existing currency symbols to avoid double symbols like ₹$
                                            const cleanValue = campaign.budget.toString().replace(/[₹$]/g, '');
                                            return `₹${cleanValue}`;
                                        })()}
                                    </td>
                                    <td>{new Date(campaign.startDate).toLocaleDateString()}</td>
                                    <td>
                                        <div className="table-actions-cell" style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                title="View"
                                                style={{ padding: '4px 8px', minWidth: '32px' }}
                                            >
                                                👁️
                                            </button>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => onNavigate('campaign-edit', campaign)}
                                                title="Edit"
                                                style={{ padding: '4px 8px', minWidth: '32px' }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(campaign.id)}
                                                title="Delete"
                                                style={{ padding: '4px 8px', minWidth: '32px', background: 'var(--danger)', color: 'white', border: 'none' }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📣</div>
                    <h3 className="empty-title">No campaigns found</h3>
                    <p className="empty-description">
                        Try adjusting your search or filter criteria, or create a new campaign.
                    </p>
                    <button className="btn btn-primary" onClick={() => onNavigate('campaign-create')}>
                        + Create First Campaign
                    </button>
                </div>
            )}
        </div>
    );
}

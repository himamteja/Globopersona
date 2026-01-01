import { useState } from 'react';

export default function Dashboard({ onNavigate, searchTerm }) {
    const [viewMessage, setViewMessage] = useState(null);
    const [actionModal, setActionModal] = useState(null);

    const [stats] = useState([
        // ... (keep stats as is)
        {
            label: 'Total Campaigns',
            value: '24',
            change: '+12%',
            trend: 'positive',
            icon: '📣',
            color: 'primary',
        },
        {
            label: 'Active Contacts',
            value: '1,842',
            change: '+8%',
            trend: 'positive',
            icon: '👥',
            color: 'success',
        },
        {
            label: 'Open Rate',
            value: '68.4%',
            change: '+5.2%',
            trend: 'positive',
            icon: '📧',
            color: 'info',
        },
        {
            label: 'Click Rate',
            value: '24.8%',
            change: '-2.1%',
            trend: 'negative',
            icon: '🖱️',
            color: 'warning',
        },
    ]);

    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: 'Summer Sale 2025',
            status: 'Active',
            sent: 1250,
            opens: 856,
            clicks: 312,
            date: '2025-12-28',
        },
        {
            id: 2,
            name: 'Product Launch Announcement',
            status: 'Completed',
            sent: 3200,
            opens: 2145,
            clicks: 890,
            date: '2025-12-25',
        },
        {
            id: 3,
            name: 'Holiday Greetings',
            status: 'Scheduled',
            sent: 0,
            opens: 0,
            clicks: 0,
            date: '2026-01-01',
        },
        {
            id: 4,
            name: 'Newsletter December',
            status: 'Active',
            sent: 2100,
            opens: 1450,
            clicks: 523,
            date: '2025-12-20',
        },
    ]);

    const getStatusBadge = (status) => {
        const statusClasses = {
            Active: 'badge-success',
            Completed: 'badge-info',
            Scheduled: 'badge-warning',
            Draft: 'badge-primary',
        };
        return `badge ${statusClasses[status] || 'badge-primary'}`;
    };

    const handleView = (campaign) => {
        const messages = [
            `"${campaign.name}" is trending with high engagement!`,
            `"${campaign.name}" has reached 50% of its target audience.`,
            `User feedback for "${campaign.name}" is overwhelmingly positive.`,
            `"${campaign.name}" is performing better than last month's average.`,
            `Don't forget to check the reports for "${campaign.name}"!`
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setViewMessage(randomMsg);
    };

    const handleQuickAction = (type) => {
        if (type === 'analytics') {
            setActionModal({
                title: 'Analytics Overview',
                icon: '📊',
                message: 'Your campaigns are performing 15% better than last month. The optimal send time is currently 10:00 AM IST.'
            });
        } else if (type === 'contacts') {
            setActionModal({
                title: 'Manage Contacts',
                icon: '👥',
                message: 'You have 45 new contacts to review! Consider creating a segment for "High Value" customers.'
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            setCampaigns(campaigns.filter(c => c.id !== id));
        }
    };

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* ... (modals same) ... */}
            {viewMessage && (
                <div className="auth-overlay" onClick={() => setViewMessage(null)} style={{ zIndex: 2000 }}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-md)' }}>
                            <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>📢</div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Campaign Insight</h3>
                            <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
                                {viewMessage}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => setViewMessage(null)}
                                style={{ width: '100%' }}
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Action Modal */}
            {actionModal && (
                <div className="auth-overlay" onClick={() => setActionModal(null)} style={{ zIndex: 2000 }}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-md)' }}>
                            <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>{actionModal.icon}</div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{actionModal.title}</h3>
                            <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
                                {actionModal.message}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => setActionModal(null)}
                                style={{ width: '100%' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">
                    Welcome back! Here's what's happening with your campaigns today.
                </p>
            </div>

            {/* ... (stats grid same) ... */}
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className={`stat-change ${stat.trend}`}>
                            <span>{stat.trend === 'positive' ? '↑' : '↓'}</span>
                            <span>{stat.change} from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Campaigns Table */}
            <div className="table-container">
                <div className="table-header">
                    <h2 className="table-title">Recent Campaigns</h2>
                    <div className="table-actions">
                        <button className="btn btn-outline btn-sm">📥 Export</button>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => onNavigate('campaign-create')}
                        >
                            + New Campaign
                        </button>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Status</th>
                            <th>Sent</th>
                            <th>Opens</th>
                            <th>Clicks</th>
                            <th>Date</th>
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
                                <td>{campaign.sent.toLocaleString()}</td>
                                <td>{campaign.opens.toLocaleString()}</td>
                                <td>{campaign.clicks.toLocaleString()}</td>
                                <td>{new Date(campaign.date).toLocaleDateString()}</td>
                                <td>
                                    <div className="table-actions-cell" style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => handleView(campaign)}
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

            {/* Quick Actions */}
            <div style={{ marginTop: 'var(--spacing-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: 'var(--spacing-md)', fontWeight: 600 }}>📊 Analytics Overview</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                        View detailed analytics and insights about your marketing performance.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleQuickAction('analytics')}
                    >
                        View Analytics
                    </button>
                </div>

                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: 'var(--spacing-md)', fontWeight: 600 }}>👥 Manage Contacts</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                        Add, edit, and organize your contact lists for better targeting.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleQuickAction('contacts')}
                    >
                        Manage Contacts
                    </button>
                </div>

                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: 'var(--spacing-md)', fontWeight: 600 }}>⚙️ Platform Settings</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                        Configure your account preferences and platform settings.
                    </p>
                    <button
                        className="btn btn-outline"
                        onClick={() => onNavigate('settings')}
                    >
                        Go to Settings
                    </button>
                </div>
            </div>
        </div>
    );
}

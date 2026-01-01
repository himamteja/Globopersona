import { useState, useEffect } from 'react';

export default function Contacts({ currentUser, onShowAuth, searchTerm, onShowAuthRequired }) {
    const [filterSegment, setFilterSegment] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone: '',
        segment: 'New',
        status: 'Active'
    });

    const [contacts, setContacts] = useState(() => {
        // ... (savedContacts logic same)
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts ? JSON.parse(savedContacts) : [
            {
                id: 1,
                name: 'Himam',
                email: 'himam@example.com',
                phone: '+91 234-567-8900',
                segment: 'Premium',
                status: 'Active',
                joinDate: '2024-03-15',
                campaigns: 12,
            },
            {
                id: 2,
                name: 'Nagaraj',
                email: 'nagaraj@example.com',
                phone: '+91 234-567-8901',
                segment: 'New',
                status: 'Active',
                joinDate: '2025-12-01',
                campaigns: 2,
            },
            {
                id: 3,
                name: 'Suresh',
                email: 'suresh@example.com',
                phone: '+91 234-567-8902',
                segment: 'Returning',
                status: 'Active',
                joinDate: '2024-08-20',
                campaigns: 8,
            },
            {
                id: 4,
                name: 'Mahendra',
                email: 'mahendra@example.com',
                phone: '+91 234-567-8903',
                segment: 'Inactive',
                status: 'Inactive',
                joinDate: '2023-06-10',
                campaigns: 15,
            },
            {
                id: 5,
                name: 'Ravi',
                email: 'ravi@example.com',
                phone: '+91 234-567-8904',
                segment: 'Premium',
                status: 'Active',
                joinDate: '2024-01-05',
                campaigns: 18,
            },
        ];
    });

    // ... (useEffect and helper functions same)

    // Save to localStorage whenever contacts change
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const getStatusBadge = (status) => {
        return status === 'Active' ? 'badge-success' : 'badge-danger';
    };

    const getSegmentBadge = (segment) => {
        const segmentClasses = {
            Premium: 'badge-primary',
            New: 'badge-success',
            Returning: 'badge-info',
            Inactive: 'badge-danger',
        };
        return `badge ${segmentClasses[segment] || 'badge-primary'}`;
    };

    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch =
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterSegment === 'all' || contact.segment.toLowerCase() === filterSegment;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            setContacts(contacts.filter((c) => c.id !== id));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = {
            id: Date.now(), // Generate a unique ID
            ...newContact,
            joinDate: new Date().toISOString(),
            campaigns: 0
        };
        setContacts([contact, ...contacts]);
        setShowModal(false);
        setNewContact({ name: '', email: '', phone: '', segment: 'New', status: 'Active' });
    };

    return (
        <div>
            {/* Add Contact Modal */}
            {showModal && (
                <div className="auth-overlay" onClick={() => setShowModal(false)} style={{ zIndex: 2000 }}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Add New Contact</h2>
                            <button className="auth-modal-close" onClick={() => setShowModal(false)} style={{ position: 'static' }}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={newContact.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={newContact.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    value={newContact.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Segment</label>
                                <select
                                    name="segment"
                                    className="form-select"
                                    value={newContact.segment}
                                    onChange={handleInputChange}
                                >
                                    <option value="New">New</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Returning">Returning</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={newContact.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
                                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Contacts</h1>
                    <p className="page-subtitle">
                        Manage your contact database and segment your audience effectively.
                    </p>
                </div>
                <div className="page-header-actions">
                    <button className="btn btn-outline" onClick={() => !currentUser ? onShowAuthRequired() : null}>📥 Import Contacts</button>
                    <button className="btn btn-primary" onClick={() => {
                        if (!currentUser) {
                            onShowAuthRequired();
                        } else {
                            setShowModal(true);
                        }
                    }}>+ Add Contact</button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div className="stat-card">
                    <div className="stat-icon success">👥</div>
                    <div className="stat-value">{contacts.length}</div>
                    <div className="stat-label">Total Contacts</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon primary">✨</div>
                    <div className="stat-value">{contacts.filter((c) => c.status === 'Active').length}</div>
                    <div className="stat-label">Active Contacts</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon warning">👑</div>
                    <div className="stat-value">{contacts.filter((c) => c.segment === 'Premium').length}</div>
                    <div className="stat-label">Premium Members</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon info">📧</div>
                    <div className="stat-value">
                        {contacts.length > 0 ? Math.round(contacts.reduce((sum, c) => sum + c.campaigns, 0) / contacts.length) : 0}
                    </div>
                    <div className="stat-label">Avg. Campaigns</div>
                </div>
            </div>

            {/* Filters */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)', padding: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            {searchTerm ? `Results for "${searchTerm}"` : 'Filter by segment'}
                        </p>
                    </div>
                    <select
                        className="form-select"
                        value={filterSegment}
                        onChange={(e) => setFilterSegment(e.target.value)}
                        style={{ width: 'auto', minWidth: '150px' }}
                    >
                        <option value="all">All Segments</option>
                        <option value="premium">Premium</option>
                        <option value="new">New</option>
                        <option value="returning">Returning</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Contacts Table */}
            {filteredContacts.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Segment</th>
                                <th>Status</th>
                                <th>Join Date</th>
                                <th>Campaigns</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>
                                        <strong>{contact.name}</strong>
                                    </td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <span className={getSegmentBadge(contact.segment)}>{contact.segment}</span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(contact.status)}`}>
                                            {contact.status}
                                        </span>
                                    </td>
                                    <td>{new Date(contact.joinDate).toLocaleDateString()}</td>
                                    <td>{contact.campaigns}</td>
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
                                                title="Edit"
                                                style={{ padding: '4px 8px', minWidth: '32px' }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(contact.id)}
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
                    <div className="empty-icon">👥</div>
                    <h3 className="empty-title">No contacts found</h3>
                    <p className="empty-description">
                        Try adjusting your search or filter criteria, or add a new contact.
                    </p>
                    <button className="btn btn-primary" onClick={() => {
                        if (!currentUser) {
                            onShowAuthRequired();
                        } else {
                            setShowModal(true);
                        }
                    }}>+ Add First Contact</button>
                </div>
            )}
        </div>
    );
}

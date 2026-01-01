import { useState } from 'react';
import './Sidebar.css';
import './AuthModal.css'; // Using the same modal styles

export default function Sidebar({
    currentPage,
    onNavigate,
    isMobileOpen,
    onCloseMobile,
    currentUser,
    onShowAuth,
    onLogout
}) {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const menuItems = [
        {
            section: 'Main',
            items: [
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'campaigns', label: 'Campaigns', icon: '📣' },
                { id: 'contacts', label: 'Contacts', icon: '👥' },
            ],
        },
        {
            section: 'Analytics',
            items: [
                { id: 'reports', label: 'Reports', icon: '📈' },
                { id: 'insights', label: 'Insights', icon: '💡' },
            ],
        },
        {
            section: 'Settings',
            items: [
                { id: 'settings', label: 'Settings', icon: '⚙️' },
                { id: 'help', label: 'Help & Support', icon: '❓' },
            ],
        },
    ];

    const handleNavClick = (pageId) => {
        onNavigate(pageId);
        if (onCloseMobile) {
            onCloseMobile();
        }
    };

    const handleProfileClick = () => {
        setShowProfileModal(true);
        if (onCloseMobile) {
            onCloseMobile();
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .filter(Boolean)
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogoutClick = () => {
        setShowProfileModal(false);
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        onLogout();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'First Login';
        try {
            return new Date(dateString).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
            });
        } catch (e) {
            return 'Date Error';
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isMobileOpen ? 'show' : ''}`}
                onClick={onCloseMobile}
                style={{ zIndex: 999 }}
            ></div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="auth-overlay" onClick={() => setShowLogoutConfirm(false)} style={{ zIndex: 10000 }}>
                    <div className="auth-modal error-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="error-icon warning">⚠️</div>
                        <h2 className="success-title">Confirm Logout</h2>
                        <p className="success-message">
                            Are you sure you want to logout from this application?
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                            <button
                                className="btn btn-danger"
                                onClick={confirmLogout}
                            >
                                Yes, Logout
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowLogoutConfirm(false)}
                            >
                                No, Stay Logged In
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Details Modal */}
            {showProfileModal && currentUser && (
                <div className="auth-overlay" onClick={() => setShowProfileModal(false)} style={{ zIndex: 10000 }}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="auth-modal-close" onClick={() => setShowProfileModal(false)}>
                            ✕
                        </button>

                        <div className="auth-modal-header">
                            <div
                                className="user-avatar"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    fontSize: '32px',
                                    margin: '0 auto var(--spacing-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    color: 'white',
                                    borderRadius: '50%'
                                }}
                            >
                                {getInitials(currentUser.name)}
                            </div>
                            <h2 className="auth-modal-title">{currentUser.name || 'User'}</h2>
                            <p className="auth-modal-subtitle">{currentUser.email || 'No email'}</p>
                        </div>

                        <div className="card" style={{ marginBottom: 'var(--spacing-lg)', background: 'var(--bg-secondary)', padding: 'var(--spacing-md)', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px border var(--border-color)', paddingBottom: '8px' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Account ID</span>
                                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>#{currentUser.id ? currentUser.id.toString().slice(-6) : 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px border var(--border-color)', paddingBottom: '8px' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Member Since</span>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatDate(currentUser.registeredAt)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Last Login</span>
                                <span style={{ fontWeight: '600', color: 'var(--success)' }}>{formatDate(currentUser.lastLogin)}</span>
                            </div>
                        </div>

                        <button
                            className="btn btn-danger"
                            style={{ width: '100%' }}
                            onClick={handleLogoutClick}
                        >
                            🔓 Logout
                        </button>
                    </div>
                </div >
            )
            }

            {/* Sidebar */}
            <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
                {/* Logo */}
                <div className="sidebar-logo">
                    <div className="logo-content">
                        <div className="logo-icon">🚀</div>
                        <div>
                            <div className="logo-text">Globopersona</div>
                            <div className="logo-subtitle">Marketing Platform</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {menuItems.map((section, idx) => (
                        <div key={idx} className="nav-section">
                            <div className="nav-section-title">{section.section}</div>
                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                                    onClick={() => handleNavClick(item.id)}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* User Profile / Login */}
                <div className="sidebar-footer">
                    {currentUser ? (
                        <div className="user-profile-dropdown">
                            <button
                                className="profile-trigger user-profile"
                                onClick={handleProfileClick}
                                style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}
                            >
                                <div className="user-avatar">{getInitials(currentUser.name)}</div>
                                <div className="user-info">
                                    <span className="user-name">{currentUser.name}</span>
                                    <span className="user-role">{currentUser.email}</span>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div style={{ padding: 'var(--spacing-md)' }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                                onClick={onShowAuth}
                            >
                                🔐 Login
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

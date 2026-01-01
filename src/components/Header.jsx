import { useState } from 'react';
import './Header.css';

export default function Header({ title, onMenuToggle, onNavigate, searchTerm, onSearchChange }) {
    const [activePopup, setActivePopup] = useState(null);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const handleIconClick = (name, message) => {
        setActivePopup({ name, message });
        setTimeout(() => setActivePopup(null), 3000); // Auto-hide after 3 seconds
    };

    return (
        <header className="header" style={{ position: 'relative' }}>
            {/* Toast Notification */}
            {activePopup && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        right: '20px',
                        background: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-color)',
                        zIndex: 1000,
                        animation: 'slideDown 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '200px'
                    }}
                >
                    <span>ℹ️</span> {activePopup.message}
                </div>
            )}

            <div className={`header-left ${isMobileSearchOpen ? 'mobile-hidden' : ''}`}>
                <button className="menu-toggle" onClick={onMenuToggle}>
                    ☰
                </button>
                <h1 className="header-title">{title}</h1>
            </div>

            <div className="header-right">
                {/* Search */}
                <div className={`header-search ${isMobileSearchOpen ? 'mobile-visible' : ''}`}>
                    <span className="header-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search campaigns, contacts, reports..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {isMobileSearchOpen && (
                        <button
                            className="mobile-search-close"
                            onClick={() => setIsMobileSearchOpen(false)}
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Mobile Search Toggle */}
                {!isMobileSearchOpen && (
                    <button
                        className="header-icon-btn mobile-search-toggle"
                        onClick={() => setIsMobileSearchOpen(true)}
                    >
                        🔍
                    </button>
                )}

                <button
                    className={`header-icon-btn ${isMobileSearchOpen ? 'mobile-hidden' : ''}`}
                    onClick={() => handleIconClick('notifications', 'You have new contacts to manage!')}
                >
                    🔔
                    <span className="notification-badge"></span>
                </button>

                <button
                    className={`header-icon-btn ${isMobileSearchOpen ? 'mobile-hidden' : ''}`}
                    onClick={() => onNavigate('settings')}
                >
                    ⚙️
                </button>
            </div>
        </header>
    );
}

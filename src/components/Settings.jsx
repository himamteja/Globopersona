import { useState, useEffect } from 'react';

export default function Settings({ onNavigate, isDarkMode, onToggleDarkMode, currentUser, onShowAuthRequired }) {
    const [settings, setSettings] = useState([
        {
            id: 1,
            title: 'Account Privacy',
            description: 'Manage who can see your profile and activity.',
            icon: '🔒',
            enabled: true
        },
        {
            id: 2,
            title: 'Email Notifications',
            description: 'Receive daily summaries and campaign alerts.',
            icon: '📧',
            enabled: true
        },
        {
            id: 3,
            title: 'Dark Mode',
            description: 'Switch between light and dark themes.',
            icon: '🌙',
            enabled: isDarkMode
        },
        {
            id: 4,
            title: 'Two-Factor Authentication',
            description: 'Add an extra layer of security to your account.',
            icon: '🛡️',
            enabled: false
        },
        {
            id: 5,
            title: 'Auto-Save Drafts',
            description: 'Automatically save your work every minute.',
            icon: '💾',
            enabled: true
        }
    ]);

    // Synchronize settings state with isDarkMode prop
    useEffect(() => {
        setSettings(prev => prev.map(s =>
            s.title === 'Dark Mode' ? { ...s, enabled: isDarkMode } : s
        ));
    }, [isDarkMode]);

    const toggleSetting = (id) => {
        // Find the setting
        const setting = settings.find(s => s.id === id);

        // If it's Dark Mode, use the special handler
        if (setting && setting.title === 'Dark Mode') {
            onToggleDarkMode();
            return;
        }

        // Restrict other settings too if not logged in
        if (!currentUser) {
            onShowAuthRequired();
            return;
        }

        setSettings(settings.map(setting =>
            setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
        ));
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-subtitle">
                        Configure your account preferences and platform settings.
                    </p>
                </div>
                <button
                    className="btn btn-outline"
                    onClick={() => onNavigate('dashboard')}
                >
                    Back to Dashboard
                </button>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-lg)', maxWidth: '800px' }}>
                {settings.map((setting) => (
                    <div
                        key={setting.id}
                        className="card"
                        style={{
                            padding: 'var(--spacing-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 'var(--spacing-md)'
                        }}
                    >
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                            <div className="stat-icon" style={{ background: 'var(--gray-100)', fontSize: '24px' }}>
                                {setting.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                                    {setting.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                                    {setting.description}
                                </p>
                            </div>
                        </div>

                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                            <input
                                type="checkbox"
                                checked={setting.enabled}
                                onChange={() => toggleSetting(setting.id)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: setting.enabled ? 'var(--primary)' : '#ccc',
                                    transition: '.4s',
                                    borderRadius: '34px'
                                }}
                            >
                                <span
                                    style={{
                                        position: 'absolute',
                                        content: '""',
                                        height: '16px',
                                        width: '16px',
                                        left: setting.enabled ? '30px' : '4px',
                                        bottom: '4px',
                                        backgroundColor: 'white',
                                        transition: '.4s',
                                        borderRadius: '50%'
                                    }}
                                />
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

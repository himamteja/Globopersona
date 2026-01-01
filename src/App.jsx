import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Campaigns from './components/Campaigns';
import CampaignForm from './components/CampaignForm';
import Contacts from './components/Contacts';
import AuthModal from './components/AuthModal';
import Settings from './components/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [campaignEditData, setCampaignEditData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage when changed
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Handle dark mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    if (!currentUser) {
      setShowLoginRequired(true);
      return;
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigate = (page, data = null) => {
    // Check if page requires authentication
    const protectedPages = ['campaign-create', 'campaign-edit'];

    if (protectedPages.includes(page) && !currentUser) {
      setShowLoginRequired(true);
      return;
    }

    setCurrentPage(page);
    if (page === 'campaign-edit') {
      setCampaignEditData(data);
    }
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    setShowLoginRequired(false);
  };

  const handleRegister = (user) => {
    // Registration is handled in AuthModal component
    console.log('User registered:', user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handleShowAuth = () => {
    setShowAuthModal(true);
  };

  const handleCloseLoginRequired = () => {
    setShowLoginRequired(false);
  };

  // Get page title based on current page
  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      campaigns: 'Campaigns',
      'campaign-create': 'Create Campaign',
      'campaign-edit': 'Edit Campaign',
      contacts: 'Contacts',
      reports: 'Reports',
      insights: 'Insights',
      settings: 'Settings',
      help: 'Help & Support',
    };
    return titles[currentPage] || 'Dashboard';
  };

  // Render current page component
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} currentUser={currentUser} searchTerm={globalSearchTerm} />;
      case 'campaigns':
        return (
          <Campaigns
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onShowAuth={handleShowAuth}
            searchTerm={globalSearchTerm}
          />
        );
      case 'campaign-create':
        return (
          <CampaignForm
            mode="create"
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        );
      case 'campaign-edit':
        return (
          <CampaignForm
            mode="edit"
            initialData={campaignEditData}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        );
      case 'contacts':
        return (
          <Contacts
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onShowAuth={handleShowAuth}
            searchTerm={globalSearchTerm}
            onShowAuthRequired={() => setShowLoginRequired(true)}
          />
        );
      case 'reports':
        return <PlaceholderPage icon="📈" title="Reports" description="Advanced reporting and analytics coming soon" onNavigate={handleNavigate} />;
      case 'insights':
        return <PlaceholderPage icon="💡" title="Insights" description="AI-powered insights and recommendations coming soon" onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings onNavigate={handleNavigate} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} currentUser={currentUser} onShowAuthRequired={() => setShowLoginRequired(true)} />;
      case 'help':
        return <PlaceholderPage icon="❓" title="Help & Support" description="Documentation and support resources coming soon" onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} currentUser={currentUser} searchTerm={globalSearchTerm} />;
    }
  };

  return (
    <div className="app">
      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}

      {/* Login Required Modal */}
      {showLoginRequired && (
        <div className="auth-overlay" onClick={handleCloseLoginRequired}>
          <div className="auth-modal error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="error-icon">🔒</div>
            <h2 className="success-title">Login Required</h2>
            <p className="success-message">
              You don't have an account or you're not logged in. Please login to access this feature.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowLoginRequired(false);
                  setShowAuthModal(true);
                }}
              >
                Click here to Login/Register
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCloseLoginRequired}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={closeMobileSidebar}
        currentUser={currentUser}
        onShowAuth={handleShowAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Header */}
        <Header
          title={getPageTitle()}
          onMenuToggle={toggleMobileSidebar}
          onNavigate={handleNavigate}
          searchTerm={globalSearchTerm}
          onSearchChange={setGlobalSearchTerm}
        />

        {/* Page Content */}
        <main className="content-wrapper">{renderPage()}</main>
      </div>
    </div>
  );
}

// Placeholder component for pages not yet implemented
function PlaceholderPage({ icon, title, description, onNavigate }) {
  return (
    <div className="empty-state" style={{ marginTop: 'var(--spacing-2xl)' }}>
      <div className="empty-icon">{icon}</div>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-description">{description}</p>
      <button
        className="btn btn-primary"
        onClick={() => onNavigate && onNavigate('dashboard')}
      >
        Go Back to Dashboard
      </button>
    </div>
  );
}

export default App;

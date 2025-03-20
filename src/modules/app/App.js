import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../common/components/loading';
import AuthenticatedContent from '../common/pages/AuthenticatedContent';
import DocsPage from '../common/pages/DocsPage';
import NotFoundPage from '../common/pages/NotFoundPage';
import logo from '../common/img/logo.svg';
import './App.css';


function App() {
  const { isLoading, user } = useAuth0();
  const navigate = useNavigate(); // Initialize useNavigate

  if (isLoading) {
    return <Loading />;
  }

  const handleDocsClick = () => {
    navigate('/docs');
  }
  
  const handleKeysClick = () => {
    navigate('/');
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Logo" className="app-logo" />
        {user && (
          <div className="user-actions">
            <button
              onClick={handleKeysClick}
              className="docs-button"
            >
              Keys
            </button>
            <button
              onClick={handleDocsClick}
              className="docs-button"
            >
              Docs
            </button>
            <div className="user-initials">
              {user.name.split(" ").map(word => word[0]).join("").toUpperCase()}
            </div>
          </div>
        )}
      </header>
      <Routes>
        <Route path="/" element={<AuthenticatedContent />} />
        <Route path="/docs" element={<DocsPage />} />
        {/* Add more routes here */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return(
      <Router>
          <App/>
      </Router>
  )
}

const AuthenticatedApp = withAuthenticationRequired(AppWrapper, {
  onRedirecting: () => <Loading />,
});

export default AuthenticatedApp;

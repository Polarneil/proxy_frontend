import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../common/components/loading';
import AuthenticatedContent from '../common/pages/AuthenticatedContent';
import logo from '../common/img/logo.svg';

function App() {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <header style={{ backgroundColor: '#f8f5f2', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
        {user && (
          <div style={{ borderRadius: '50%', width: '40px', height: '40px', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
            {user.name.split(" ").map(word => word[0]).join("").toUpperCase()}
          </div>
        )}
      </header>
      <AuthenticatedContent />
    </div>
  );
}

const AuthenticatedApp = withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
});

export default AuthenticatedApp;

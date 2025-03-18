import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../common/components/loading';
import AuthenticatedContent from '../common/pages/AuthenticatedContent';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <AuthenticatedContent />
    </div>
  );
}

const AuthenticatedApp = withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
});

export default AuthenticatedApp;

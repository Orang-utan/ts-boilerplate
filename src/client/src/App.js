import { useMemo, useState } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import auth from './api/auth';
import Navbar from './components/Navbar';
import PublicRoute from './components/routing/PublicRoute';
import { AuthContext } from './context';
import LoginPage from './pages/authflow/LoginPage';
import RegisterPage from './pages/authflow/RegisterPage';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';

const queryCache = new QueryCache();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => auth.isAuthenticated
  );

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      login: async (email, password) => {
        // This function call throws in the case of invalid credentials
        await auth.login(email, password);
        setIsAuthenticated(true);
        queryCache.clear();
      },
      logout: () => {
        auth.logout();
        setIsAuthenticated(false);
        queryCache.clear();
      },
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <ReactQueryDevtools />
          <Navbar />
          <main>
            <Switch>
              <PublicRoute exact path="/" component={IndexPage} />
              <PublicRoute exact path="/login" component={LoginPage} />
              <PublicRoute exact path="/register" component={RegisterPage} />
              <Route exact={false} component={NotFoundPage} />
            </Switch>
          </main>
        </ReactQueryCacheProvider>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import AddTask from './components/AddTask';
import Sidebar from './components/Sidebar';
import AllTasks from './components/AllTasks';
import CompleteTask from './components/CompleteTask';
import InProgressTask from './components/InProgressTask';
import Dashboard from './components/Dashboard';
import PendingTask from './components/PendingTask';
import Deployed from './components/Deployed';
import Deferred from './components/Deferred';
import './App.css';

import Login from './components/Login';
import Signup from './components/SignUp';
import { selectIsAuthenticated } from './store/userSlice';
import { login } from './store/userSlice';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  const handleSignup = (data) => {
    dispatch(login(data)); 
  };

  return (
    <div className="h-full">
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addTask"
                element={
                  <PrivateRoute>
                    <AddTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/allTask"
                element={
                  <PrivateRoute>
                    <AllTasks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/completeTask"
                element={
                  <PrivateRoute>
                    <CompleteTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pendingTask"
                element={
                  <PrivateRoute>
                    <PendingTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/deployedTask"
                element={
                  <PrivateRoute>
                    <Deployed />
                  </PrivateRoute>
                }
              />
              <Route
                path="/deferredTask"
                element={
                  <PrivateRoute>
                    <Deferred />
                  </PrivateRoute>
                }
              />
              <Route
                path="/inProgressTask"
                element={
                  <PrivateRoute>
                    <InProgressTask />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
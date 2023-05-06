import react, { useContext } from "react";
import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { Routes, Route, Navigate } from "react-router-dom";
import { userInputs, productInputs } from "./formSource";
import { DarkModeContext } from "./context/darkContext";
import { AuthContext } from "./context/authContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const [dark] = useContext(DarkModeContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/AdminDashboard/login" />;
  };
  return (
    <div className={dark ? "app dark" : "app"}>
      <Routes>
        <Route path="/AdminDashboard">
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/AdminDashboard/login" element={<Login />} />
          <Route path="/AdminDashboard/users">
            <Route
              index
              element={
                <RequireAuth>
                  <List />
                </RequireAuth>
              }
            />
            <Route
              path="/AdminDashboard/:userId"
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }
            />
            <Route
              path="/AdminDashboard/new"
              element={
                <RequireAuth>
                  <New inputs={userInputs} title="Add new User" />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
        <Route path="/AdminDashboard/products">
          <Route
            index
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            }
          />
          <Route
            path="/AdminDashboard/:productId"
            element={
              <RequireAuth>
                <Single />
              </RequireAuth>
            }
          />
          <Route
            path="/AdminDashboard/new"
            element={
              <RequireAuth>
                <New inputs={productInputs} title="Add new Product" />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

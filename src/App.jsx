//import "./App.css";
import { Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute"
import PageLayout from "./pages/PageLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TwitDetail from "./pages/TwitDetail";

function App() {
  return (
    <AuthProvider >
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <PrivateRoute path="/" exact>
          <PageLayout>
            <Home />
          </PageLayout>
        </PrivateRoute>
        <PrivateRoute path="/profile/:nick">
          <PageLayout>
            <Profile />
          </PageLayout>
        </PrivateRoute>
        <PrivateRoute path="/detail/:twitId">
          <PageLayout>
            <TwitDetail />
          </PageLayout>
        </PrivateRoute>
      </Switch>
    </div>
  </AuthProvider>
  );
}

export default App;

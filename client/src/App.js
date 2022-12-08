import { Routes, Route } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import { ProtectedRoutes, NavBar, SideBar, Feed, Login, CreateAccount, LandingFooter } from './components';

function App() {
  const { auth } = useStateContext()

  return (
    <div className="main">
      <NavBar />
      <Feed />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Route>
      </Routes>
      <SideBar />

        {!auth && <LandingFooter/>}

    </div>
  );
}

export default App;

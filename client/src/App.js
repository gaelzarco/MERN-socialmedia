import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes, NavBar, SideBar, Feed, Login, CreateAccount } from './components';

function App() {
  return (
    <div className="main">
      <NavBar />
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Feed />} exact/>
          </Route>
        </Routes>
        <SideBar />
    </div>
  );
}

export default App;

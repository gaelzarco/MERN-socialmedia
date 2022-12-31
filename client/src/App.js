import { Routes, Route } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import { ProtectedRoutes, NavBar, SideBar, Feed, Post, Login, CreateAccount, LandingFooter } from './components';

function App() {
  const { auth } = useStateContext()

  return (
    <div className="main">
      <div className="main-static">
        <NavBar />
      <Routes>
        <Route path="/" element={<Feed />}/>
        <Route path="/post/:id" element={<Post />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Route>
      </Routes>
      <SideBar />
      </div>

        {!auth && <LandingFooter/>}
    </div>
  );
}

export default App;

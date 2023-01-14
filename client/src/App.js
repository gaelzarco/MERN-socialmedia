import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import { ProtectedRoutes, NavBar, SideBar, Feed, Post, Comment, Login, CreateAccount, LandingFooter } from './components';

function App() {
  const { auth, setAuth } = useStateContext()

  const localUser = localStorage.getItem('user')

  useEffect(() => {
    if (localUser) {
      setAuth(JSON.parse(localUser))
    } 
  }, [setAuth, localUser])

  console.log(auth)

  return (
    <>
      <div className="main-static">
        <NavBar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path='comment/:id' element={<Comment />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
            </Route>
          </Routes>
        <SideBar />
      </div>

      {!auth && <LandingFooter/>}

    </>
  );
}

export default App;

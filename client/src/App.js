import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import { ProtectedRoutes, NavBar, SideBar, Feed, Post, Comment, Login, CreateAccount, Profile, LandingFooter } from './components';

function App() {
  const { auth, setAuth } = useStateContext()

  const expirationTime = 1600 * 1000
  const localUser = localStorage.getItem('user') 
  const getTokenTimestamp = () => localStorage.getItem('token_timestamp')

  useEffect(() => {
    if (Date.now() - getTokenTimestamp() > expirationTime) {
      setAuth(null)
      localStorage.clear()
    } else if (localUser) {
      setAuth(JSON.parse(localUser))
    }
  }, [ localUser, setAuth, expirationTime ])

  console.log(auth)

  return (
    <>
      <div className="main-static">
        <NavBar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path='comment/:id' element={<Comment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        <SideBar />
      </div>

      {!auth && <LandingFooter/>}

    </>
  );
}

export default App;

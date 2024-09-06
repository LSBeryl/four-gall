import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  useSearchParams,
  Link,
} from "react-router-dom";
import "./App.css";

import Header from "./common/Header.jsx";
import Footer from "./common/Footer.jsx";
import Side from "./common/Side.jsx";

import Home from "./components/Home.jsx";
import Photo from "./components/Photo.jsx";
import Calendar from "./components/Calendar.jsx";
import Feature from "./components/Feature.jsx";
import Music from "./components/Music.jsx";
import Auth from "./components/auth.jsx";
import { useState, useEffect } from "react";

import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "./firebase.jsx";
import MafiaDetail from "./components/MafiaDetail.jsx";

function Layout() {
  return (
    <>
      <Header />
      <Side />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isReady, setReady] = useState(false);

  const init = async () => {
    // 처음 마운트 될 때 실행되는 함수
    // ready 시킨 후 localStorage에 user 존재하면 자동로그인
    await auth.authStateReady();
    setPersistence(auth, browserLocalPersistence).then(() => {
      auth.onAuthStateChanged((user) => {
        if (user) setLogin(true);
      });
    });
    setReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      {isLogin ? (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/feature" element={<Feature />} />
            <Route path="/music" element={<Music />} />
            <Route path="/mafia" element={<MafiaDetail />} />
          </Route>
        </Routes>
      ) : (
        <Auth />
      )}
    </BrowserRouter>
  );
}
export default App;

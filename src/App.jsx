import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom"
import './App.css'

import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import Side from './common/Side.jsx'

import Home from './components/Home.jsx'
import Photo from './components/Photo.jsx'
import Calender from './components/Calender.jsx'
import LinkPage from './components/Link.jsx'
import Music from './components/Music.jsx'

function Layout() {
  return(
    <>
      <Header />
      <Side />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/photo" element={<Photo />}/>
          <Route path="/calender" element={<Calender />}/>
          <Route path="/link" element={<LinkPage />}/>
          <Route path="/music" element={<Music />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

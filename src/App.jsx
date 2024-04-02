import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom"
import './App.css'

import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import Side from './common/Side.jsx'

import Home from './components/Home.jsx'
import Photo from './components/Photo.jsx'
import Calendar from './components/Calendar.jsx'
import Feature from './components/Feature.jsx'
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
  console.log("%c콘솔 창에서 이상한 짓 하지 마십시오.", "color: red; font-size: 2.5rem;")
  console.log("%c - 2421 이서현", "color: red; font-size: 2rem;")
  if(localStorage.getItem('name') == 'null' || localStorage.getItem('email') == 'null' || !localStorage.getItem('name')) {
    localStorage.setItem('name', 'null')
    localStorage.setItem('email', 'null')
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/photo" element={<Photo />}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/feature" element={<Feature />}/>
          <Route path="/music" element={<Music />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

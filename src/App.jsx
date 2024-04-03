import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom"
import styled from 'styled-components'
import './App.css'
import { useState } from 'react'

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

  const [isFour, setIsFour] = useState(false)

  return (
    <BrowserRouter>
      {isFour ?
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/photo" element={<Photo />}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/feature" element={<Feature />}/>
          <Route path="/music" element={<Music />}/>
        </Route>
      </Routes>
      :
      <Wrap>
        <Contain>
          <Title>
            <img src="/img/dimigo.png" alt="/img/dimigo.png" />
            KDMHS 2-4
          </Title>
          <FormDiv>
            <input type="password" placeholder="입장 코드 입력" onChange={e => {
              if(e.target.value == import.meta.env.VITE_GALLERY_PW) setIsFour(true)
            }}/>
          </FormDiv>
        </Contain>
      </Wrap>
      }
    </BrowserRouter>
  )
}

export default App

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Contain = styled.div`
  width: 40vw;
  height: 50vh;
  border-radius: 30px;
  background: #fcfcfc;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  & > img {
    height: 8vh;
  }
`

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > input {
    border: 0;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
    &:focus{
      border: 1px solid #7e7e7e;
      outline: none;
    }
  }
`
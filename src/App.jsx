import { Route, Routes, BrowserRouter, Outlet, useSearchParams, Link } from "react-router-dom"
import styled from 'styled-components'
import './App.css'
import { useEffect, useState } from 'react'

import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import Side from './common/Side.jsx'

import Home from './components/Home.jsx'
import Photo from './components/Photo.jsx'
import Calendar from './components/Calendar.jsx'
import Feature from './components/Feature.jsx'
import Music from './components/Music.jsx'

import axios from 'axios'
import * as jose from "jose";

import { getDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

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
  const [isFour, setIsFour] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if(window.location.href.includes('localhost')) {
      document.title = '4반 갤러리 테스트'
    }
  }, [])

  useEffect(() => {
    async function get(token) {
      const public_key = await axios.get('https://auth.dimigo.net/oauth/public')
      const public_key_encodes = await jose.importSPKI(public_key.data, "RS256")
      let data
      if(localStorage.getItem('token')) {
        const decodedToken = await jose.jwtVerify(localStorage.getItem('token'), public_key_encodes)
        data = decodedToken.payload
      } else {
        const decodedToken = await jose.jwtVerify(token, public_key_encodes)
        data = decodedToken.payload
        
      }
      if(String(data.data.number).split('')[0] == '2' && String(data.data.number).split('')[1] == '4') {
        localStorage.setItem('token', token)
        setIsSubmitted(true)
      } else {
        setIsSubmitted(false)
        alert('타반 사용 불가')
      }
    }
    const query = new URLSearchParams(window.location.search)
    if(typeof query.get('token') == 'string') {
      get(query.get('token'))
    }
  }, [])

  return (
    <BrowserRouter>
      {isSubmitted ?
      <Routes>
        {/* {isSubmitted ? */}
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
            {/* <input type="password" placeholder="입장 코드 입력" onChange={async (e) => {
              const secret = doc(db, 'secret', 'secret');
              const secretSnapshot = await getDoc(secret);
              const secrett = secretSnapshot.data()
              if(secrett.str == e.target.value) setIsFour(true)
              else setIsFour(false)
            }}/>
            {isFour && <button onClick={() => {setIsSubmitted(true)}}>Join</button>} */}
            <Login to={`https://auth.dimigo.net/oauth?client=662096ea7a111ae4957030ca&redirect=${window.location.href}`}>
              <Bold>디미고인 계정</Bold>으로 로그인
              </Login>
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
  background: #fcfcfc;
`

const Contain = styled.div`
  width: 40vw;
  height: 50vh;
  border-radius: 30px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: 1000px) {
    padding: 10px;
    width: 100%;
    border-radius: 0;
  }
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
  @media (max-width: 1265px) {
    font-size: 2rem;
    & > img {
      height: 5vh;
    }
  }
`

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
  & > button {
    border: 1px solid #d2d2d2;
    background: #fff;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background: #000;
      color: #fff;
      border: 1px solid #000;
    }
  }
`

const Login = styled(Link)`
  text-decoration: none;
  color: #000;
  border-radius: 20px;
  border: 1px solid #00000069;
  padding: 0.5rem 1.5rem;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  &:hover {
    color: #fff;
    background: #000;
  border: 1px solid #000;
  }
`

const Bold = styled.span`
  font-weight: bold;
`
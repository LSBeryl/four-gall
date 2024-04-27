import { Route, Routes, BrowserRouter, Outlet, useSearchParams, Link } from "react-router-dom"
import styled from 'styled-components'
import './App.css'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import Side from './common/Side.jsx'

import Home from './components/Home.jsx'
import Photo from './components/Photo.jsx'
import Calendar from './components/Calendar.jsx'
import Feature from './components/Feature.jsx'
import Music from './components/Music.jsx'
import Meal from './components/Meal.jsx'

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
  const [meal, setMeal] = useState({})
  const mealName = ['breakfast', 'lunch', 'dinner']

  useEffect(() => {
    if(window.location.href.includes('localhost')) {
      document.title = '4반 갤러리 테스트'
    }
  }, [])

  // useEffect(() => {
  //   async function get(token) {
  //     const public_key = await axios.get('https://auth.dimigo.net/oauth/public')
  //     const public_key_encodes = await jose.importSPKI(public_key.data, "RS256")
  //     const decodedToken = await jose.jwtVerify(token, public_key_encodes)
  //     const data = decodedToken.payload
  //     if(String(data.data.number).split('')[0] == '2' && String(data.data.number).split('')[1] == '4') {
  //       setIsSubmitted(true)
  //     } else {
  //       setIsSubmitted(false)
  //       alert('타반 사용 불가')
  //     }
  //   }
  //   const query = new URLSearchParams(window.location.search)
  //   if(typeof query.get('token') == 'string') {
  //     get(query.get('token'))
  //   }
  // }, [])

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)"})
  /**
  *  yyyy-mm-dd 형식으로 날짜 리턴
  */
  function getDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dateArr = [year, month, day]
    if(String(dateArr[1]).length == 1) dateArr[1] = '0' + dateArr[1]
    if(String(dateArr[2]).length == 1) dateArr[2] = '0' + dateArr[2]
    return dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]
  }

  /**
   * 아침, 점심, 저녁 각각 0, 1, 2 리턴
   */
  function getTime() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 8) {
        return 0
      } else if (hour >= 8 && hour < 14) {
        return 1
      } else {
        return 2
      }
  }

  useEffect(() => {
		const axiosFetch = async () => {
			try {
				const response = await axios.get(`https://api.xn--299a1v27nvthhjj.com/?date=${getDate()}`)
        setMeal(response.data)
			} catch (error) {
				console.error('Error fetching meal data:', error);
			}
		}
		axiosFetch()
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
          <CodeContain>
            <Title>
              <img src="/img/dimigo.png" alt="/img/dimigo.png" />
              KDMHS 2-4
            </Title>
            <FormDiv>
              <input type="password" placeholder="입장 코드 입력"
              onChange={async (e) => {
                const secret = doc(db, 'secret', 'secret');
                const secretSnapshot = await getDoc(secret);
                const secrett = secretSnapshot.data()
                if(secrett.str == e.target.value) setIsFour(true)
                else setIsFour(false)
              }}
              onKeyDown={(e) => {
                if(e.key == 'Enter' && isFour) setIsSubmitted(true)
              }}/>
              {isFour && <button onClick={() => {setIsSubmitted(true)}} autofocus>Join</button>}
              {/* <Login to={`https://auth.dimigo.net/oauth?client=662096ea7a111ae4957030ca&redirect=${window.location.href}`}>
                <Bold>디미고인 계정</Bold>으로 로그인
              </Login> */}
            </FormDiv>
          </CodeContain>
          <VerticalLine />
          <RowLine />
          <MealContain>
            {
            !isMobile ?
            ['아침', '점심', '저녁'].map((type, i) => (
              <MealBox>
                <MealType>{type}</MealType>
                <MealMenuCon>
                  {meal[mealName[i]] ? meal[mealName[i]].split('/').map((menu) => (
                    <MealMenu>
                      - {menu}
                    </MealMenu>
                  )) : '데이터가 없습니다'}
                </MealMenuCon>
              </MealBox>
            ))
            :
            getTime() == 0 ?
            <MealBox>
              <MealType>아침</MealType>
              <MealMenuCon>
                {meal['breakfast'] ? meal['breakfast'].split('/').map((menu) => (
                  <MealMenu>
                    - {menu}
                  </MealMenu>
                )) : '데이터가 없습니다'}
              </MealMenuCon>
            </MealBox>
            :
            getTime == 1 ?
            <MealBox>
              <MealType>점심</MealType>
              <MealMenuCon>
                {meal['lunch'] ? meal['lunch'].split('/').map((menu) => (
                  <MealMenu>
                    - {menu}
                  </MealMenu>
                )) : '데이터가 없습니다'}
              </MealMenuCon>
            </MealBox>
            :
            <MealBox>
              <MealType>저녁</MealType>
              <MealMenuCon>
                {meal['dinner'] ? meal['dinner'].split('/').map((menu) => (
                  <MealMenu>
                    - {menu}
                  </MealMenu>
                )) : '데이터가 없습니다'}
              </MealMenuCon>
            </MealBox>
            }
          </MealContain>
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
  width: 90vw;
  height: 70vh;
  border-radius: 30px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1600px) {
    flex-direction: column;
    gap: 2rem;
    height: 90vh;
  }
`

const VerticalLine = styled.span`
  width: 1px;
  background: #eaeaea;
  margin-inline: 1rem;
  @media (max-width: 1600px) {
    display: none;
  }
`

const RowLine = styled.span`
  width: 100%;
  height: 1px;
  background: #eaeaea;
  @media (min-width: 1600px) {
    display: none;
  }
`

const CodeContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: 1600px) {
    gap: 3rem;
  }
`

const MealContain = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`

const MealBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 70%;
  gap: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  width: 30%;
  padding: 2rem;
  @media (max-width: 1600px) {
    width: 30%;
    height: 90%;
    align-items: center;
  }
  @media (max-width: 1000px) {
    width: 100%;
    align-items: center;
  }
`

const MealType = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 600;
`

const MealMenuCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const MealMenu = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
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
  @media (max-width: 500px) {
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
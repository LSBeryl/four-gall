import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

export default function Meal() {
  const [meal, setMeal] = useState({})
  const mealName = ['breakfast', 'lunch', 'dinner']
  const [curDate, setCurDate] = useState('')

  const isMobile = useMediaQuery({ query: "(max-width: 800px)"})

  function getDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dateArr = [year, month, day]
    if(String(dateArr[1]).length == 1) dateArr[1] = '0' + dateArr[1]
    if(String(dateArr[2]).length == 1) dateArr[2] = '0' + dateArr[2]
    setCurDate(dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2])
    return dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]
  }

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
    <Wrap>
      <Title>{curDate ? curDate : ''} 급식</Title>
      <MealCon>
        {!isMobile ?
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
          getTime() == 1 ?
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
      </MealCon>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  margin: 2rem 20rem;
  gap: 1.2rem;
  user-select: none;

  @media (max-width: 1400px) {
    margin: 2rem 0;
  }
`

const Title = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
`

const MealCon = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 800px) {
    width: 100%;
  }
`

const MealBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  width: 30%;
  padding: 2rem;

  @media (max-width: 800px) {
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
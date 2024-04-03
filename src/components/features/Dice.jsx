import styled from 'styled-components'
import { useState, useEffect } from 'react'

const ourNames = ['강민상', '고준기', '구본찬', '김도윤', '김민서', '김병규', '김승원', '김진호', '남송연', '노재원', '문석호', '박동주', '박연진', '박종윤', '손기령', '송민서', '신현솔', '윤예진', '이기원', '이기찬', '이서현', '이재영', '이준행', '이하은', '이현명', '이희탁', '조성민', '조우창', '조정환', '최희윤', '황석준']

export default function Dice() {
  const [num, setNum] = useState(0)
  const [isStop, setIsStop] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if(!isStop) setNum(Math.floor(Math.random() * 30 + 1))
		}, 100)
		return () => clearInterval(interval);
  }, [isStop])

  return (
    <Wrap>
      <Name>
        {ourNames[num]}
        <StopCon>
          <Stop onClick={() => {setIsStop(!isStop)}}>{!isStop ? '멈추기' : '다시 시작'}</Stop>
        </StopCon>
      </Name>
    </Wrap>
  )
}

const Wrap = styled.div`
  
`

const Name = styled.div`
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50vh;
`

const StopCon = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`

const Stop = styled.button`
  border: 0;
  background: #fff;
  cursor: pointer;
`
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { data } from './ads.json'

export default function Side() {
	const width1400 = useMediaQuery({ query: '(max-width: 1400px)' })
  const maxAdNum = data.length - 1
  const [adNum, setAdNum] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
			if(adNum < maxAdNum) setAdNum(adNum + 1)
      else if(adNum == maxAdNum) setAdNum(0)
		}, 5000)
		return () => clearInterval(interval);
  }, [adNum])

  return (
		<Wrap>
      <Ad style={{float: 'left'}}>
        <img src={'/img/ad/' + data[adNum].src} style={{display: width1400 ? 'none' : ''}} />
      </Ad>
      <Ad style={{float: 'right'}}>
        <img src={'/img/ad/' + data[adNum].src} style={{display: width1400 ? 'none' : ''}} />
      </Ad>
    </Wrap>
	);
}

const Wrap = styled.div`
  position: sticky;
  top: 10rem;
  padding-inline: 2rem;
`

const Ad = styled.div`
  height: 500px;
  border: 1px solid #eaeaea;
  display: inline-flex;
  align-items: center;
  background: #fff;
`
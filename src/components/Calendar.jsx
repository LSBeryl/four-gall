import styled from 'styled-components'
import { useEffect, useState } from 'react'

export default function Calendar() {
	const [what, setWhat] = useState('')
	const [day, setDay] = useState(-1)
	const [classTime, setClassTime] = useState(1)
	const [date, setDate] = useState(new Date())
	useEffect(() => {
    const id = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return (() => clearInterval(id))
  }, []);

	const schedule = [
		[
			'응화', '성직', '수학2', '화학', '문학', '자료구조', '자율'
		],
		[
			'화학', '한국사', '수학1', '중국어', '자료구조', '운동과 건강', '수학2'
		],
		[
			'국사', '진로', '영어1', '화학', '응화', '동아리', '무언가를 하는'
		],
		[
			'자료구조', '성직', '문학', '영어1', '응화', '수학1', '한국사'
		],
		[
			'수학1', '수학2', '운동과 건강', '중국어', '영어1', '문학', '진로'
		]
	]

	useEffect(() => {
		const d = date.getDay()
		const h = date.getHours()
		const m = date.getMinutes()
		if(d >= 1 && d <= 5) { // 평일
			if (h == 6) {
				if(m >= 30) setWhat('등교 준비')
			} else if(h == 7) {
				if(m < 30) setWhat('등교 준비')
				if(m >= 30) setWhat('아침 식사')
			} else if(h == 8) {
				if(m < 15) setWhat('아침 식사')
				else if(m >= 15 && m <= 40) setWhat('아침 프로그램')
				else if(m > 40 && m < 50) setWhat('개인 정비')
				else if(m >= 50) setWhat('조회')
			} else if(h == 9) {
				if(m >= 0 && m < 50) setWhat(`1교시, ${schedule[d - 1][0]}`)
				else setWhat('쉬는')
			} else if(h == 10) {
				if(m >= 0 && m < 50) setWhat(`2교시, ${schedule[d - 1][1]}`)
				else setWhat('쉬는')
			} else if(h == 11) {
				if(m >= 0 && m < 50) setWhat(`3교시, ${schedule[d - 1][2]}`)
				else setWhat('쉬는')
			} else if(h == 12) {
				if(m >= 0 && m < 50) setWhat(`4교시, ${schedule[d - 1][3]}`)
				else if(m > 50) setWhat('점심')
			} else if(h == 13) {
				if(m >= 0 && m < 50) setWhat('점심')
				else if(m >= 50) setWhat(`5교시, ${schedule[d - 1][4]}`)
			} else if(h == 14) {
				if(m < 40) setWhat(`5교시, ${schedule[d - 1][4]}`)
				else if(m >= 40 && m < 50) setWhat('쉬는')
				else if(m >= 50) setWhat(`6교시, ${schedule[d - 1][5]}`)
			} else if(h == 15) {
				if(m < 40) setWhat(`6교시, ${schedule[d - 1][5]}`)
				else if(m >= 40 && m < 50) setWhat('쉬는')
				else if(m >= 50) setWhat(`7교시, ${schedule[d - 1][6]}`)
			} else if(h == 16) {
				if(m < 40) setWhat(`7교시, ${schedule[d - 1][6]}`)
				else if(m > 40 && m <= 55) setWhat('청소')
				else if(m > 55) setWhat('종례')
			} else if(h == 17) {
				if(m >= 0 && m < 10) setWhat('방과후 준비')
				else if(m >= 10) setWhat('방과후')
			} else if(h == 18) {
				if(m <= 35) setWhat('방과후')
				else if(m > 35) setWhat('저녁')
			} else if(h == 19) {
				if(m < 50) setWhat('저녁')
				if(m >= 50) setWhat('야자 1타임')
			} else if(h == 20) {
				setWhat('야자 1타임')
			} else if(h == 21) {
				if(m <= 10) setWhat('야자 1타임')
				else if(m > 10 && m < 30) setWhat('야자 1타임 쉬는')
				else if(m >= 30) setWhat('야자 2타임')
			} else if(h == 22) {
				setWhat('야자 2타임')
			} else if(h == 23) {
				setWhat('기숙사 입실')
			}
		} else { // 주말
			setWhat('잔류')
		}
	}, [])

	useEffect(() => {
		const date = new Date()
		const d = date.getDay()
		const h = date.getHours()
		const m = date.getMinutes()

		setDay(d)

		if(d >= 1 && d <= 5) {
			if(h == 9 && m >= 0 && m <= 50) setClassTime(1)
			else if(h == 10 && m >= 0 && m <= 50) setClassTime(2)
			else if(h == 11 && m >= 0 && m <= 50) setClassTime(3)
			else if(h == 12 && m >= 0 && m <= 50) setClassTime(4)
			else if(h == 13 && m >= 50 || h == 14 && m <= 40) setClassTime(5)
			else if(h == 14 && m >= 50 || h == 15 && m <= 40) setClassTime(6)
			else if(h == 15 && m >= 50 || h == 16 && m <= 40) setClassTime(7)
			else setClassTime(-1)
		}
	}, [])

	return (
		<>
			<Wrap>
				<WhatShould>
					지금은 <span style={{color: '#ee1183'}}>{what}</span> 시간입니다.
				</WhatShould>
				<Table>
					<tr>
						<td></td>
						<td style={{fontWeight: day == 1 ? 'bold' : ''}}>월</td>
						<td style={{fontWeight: day == 2 ? 'bold' : ''}}>화</td>
						<td style={{fontWeight: day == 3 ? 'bold' : ''}}>수</td>
						<td style={{fontWeight: day == 4 ? 'bold' : ''}}>목</td>
						<td style={{fontWeight: day == 5 ? 'bold' : ''}}>금</td>
					</tr>
					<tr>
						<td>1교시</td>
						<td style={{
							fontWeight: day == 1 ? 'bold' : '',
							color: classTime == 1 && day == 1 ? '#ee1183' : ''
						}}>응화</td>
						<td style={{
							fontWeight: day == 2 ? 'bold' : '',
							color: classTime == 1 && day == 2 ? '#ee1183' : ''
						}}>화학</td>
						<td style={{
							fontWeight: day == 3 ? 'bold' : '',
							color: classTime == 1 && day == 3 ? '#ee1183' : ''
						}}>국사</td>
						<td style={{
							fontWeight: day == 4 ? 'bold' : '',
							color: classTime == 1 && day == 4 ? '#ee1183' : ''
						}}>자료</td>
						<td style={{
							fontWeight: day == 5 ? 'bold' : '',
							color: classTime == 1 && day == 5 ? '#ee1183' : ''
						}}>수1</td>
					</tr>
					<tr>
						<td>2교시</td>
						<td style={{
							fontWeight: day == 1 ? 'bold' : '',
							color: classTime == 2 && day == 1 ? '#ee1183' : ''
						}}>성직</td>
						<td style={{
							fontWeight: day == 2 ? 'bold' : '',
							color: classTime == 2 && day == 2 ? '#ee1183' : ''
						}}>국사</td>
						<td style={{
							fontWeight: day == 3 ? 'bold' : '',
							color: classTime == 2 && day == 3 ? '#ee1183' : ''
						}}>진로</td>
						<td style={{
							fontWeight: day == 4 ? 'bold' : '',
							color: classTime == 2 && day == 4 ? '#ee1183' : ''
						}}>성직</td>
						<td style={{
							fontWeight: day == 5 ? 'bold' : '',
							color: classTime == 2 && day == 5 ? '#ee1183' : ''
						}}>수2</td>
					</tr>
					<tr>
						<td>3교시</td>
						<td style={{
							fontWeight: day == 1 ? 'bold' : '',
							color: classTime == 3 && day == 1 ? '#ee1183' : ''
						}}>수2</td>
						<td style={{
							fontWeight: day == 2 ? 'bold' : '',
							color: classTime == 3 && day == 2 ? '#ee1183' : ''
						}}>수1</td>
						<td style={{
							fontWeight: day == 3 ? 'bold' : '',
							color: classTime == 3 && day == 3 ? '#ee1183' : ''
						}}>영1</td>
						<td style={{
							fontWeight: day == 4 ? 'bold' : '',
							color: classTime == 3 && day == 4 ? '#ee1183' : ''
						}}>문학</td>
						<td style={{
							fontWeight: day == 5 ? 'bold' : '',
							color: classTime == 3 && day == 5 ? '#ee1183' : ''
						}}>운동</td>
					</tr>
					<tr>
						<td>4교시</td>
						<td style={{
							fontWeight: day == 1 ? 'bold' : '',
							color: classTime == 4 && day == 1 ? '#ee1183' : ''
						}}>화학</td>
						<td style={{
							fontWeight: day == 2 ? 'bold' : '',
							color: classTime == 4 && day == 2 ? '#ee1183' : ''
						}}>중국</td>
						<td style={{
							fontWeight: day == 3 ? 'bold' : '',
							color: classTime == 4 && day == 3 ? '#ee1183' : ''
						}}>화학</td>
						<td style={{
							fontWeight: day == 4 ? 'bold' : '',
							color: classTime == 4 && day == 4 ? '#ee1183' : ''
						}}>영1</td>
						<td style={{
							fontWeight: day == 5 ? 'bold' : '',
							color: classTime == 4 && day == 5 ? '#ee1183' : ''
						}}>중국</td>
					</tr>
					<tr>
						<td>5교시</td>
						<td style={{
							fontWeight: day == 1 ? 'bold' : '',
							color: classTime == 5 && day == 1 ? '#ee1183' : ''
						}}>문학</td>
						<td style={{
							fontWeight: day == 2 ? 'bold' : '',
							color: classTime == 5 && day == 2 ? '#ee1183' : ''
						}}>자료</td>
						<td style={{
							fontWeight: day == 3 ? 'bold' : '',
							color: classTime == 5 && day == 3 ? '#ee1183' : ''
						}}>응화</td>
						<td style={{
							fontWeight: day == 4 ? 'bold' : '',
							color: classTime == 5 && day == 4 ? '#ee1183' : ''
						}}>응화</td>
						<td style={{
							fontWeight: day == 5 ? 'bold' : '',
							color: classTime == 5 && day == 5 ? '#ee1183' : ''
						}}>영1</td>
					</tr>
					<tr>
						<td>6교시</td>
						<td style={{
							fontWeight: day == 1 ? 'bold' : '',
							color: classTime == 6 && day == 1 ? '#ee1183' : ''
						}}>자료</td>
						<td style={{
							fontWeight: day == 2 ? 'bold' : '',
							color: classTime == 6 && day == 2 ? '#ee1183' : ''
						}}>운동</td>
						<td style={{
							fontWeight: day == 3 ? 'bold' : '',
							color: classTime == 6 && day == 3 ? '#ee1183' : ''
						}}>CA</td>
						<td style={{
							fontWeight: day == 4 ? 'bold' : '',
							color: classTime == 6 && day == 4 ? '#ee1183' : ''
						}}>수1</td>
						<td style={{
							fontWeight: day == 5 ? 'bold' : '',
							color: classTime == 6 && day == 5 ? '#ee1183' : ''
						}}>문학</td>
					</tr>
					<tr>
						<td>7교시</td>
						<td style={{
							fontWeight: day == 1 ? 'bold' : '',
							color: classTime == 7 && day == 1 ? '#ee1183' : ''
						}}>자율</td>
						<td style={{
							fontWeight: day == 2 ? 'bold' : '',
							color: classTime == 7 && day == 2 ? '#ee1183' : ''
						}}>수2</td>
						<td></td>
						<td style={{
							fontWeight: day == 4 ? 'bold' : '',
							color: classTime == 7 && day == 4 ? '#ee1183' : ''
						}}>국사</td>
						<td style={{
							fontWeight: day == 5 ? 'bold' : '',
							color: classTime == 7 && day == 5 ? '#ee1183' : ''
						}}>진로</td>
					</tr>
				</Table>
			</Wrap>
		</>
	);
}

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
	height: calc(100vh - 80px);
`

const WhatShould = styled.div`
	font-size: 2rem;
	font-weight: bold;
	@media (max-width: 420px) {
		font-size: 1.5rem;
	}
`

const Table = styled.table`
	font-size: 1.8rem;
	background: #fff;
	border: 1px solid #ebedef;
	padding: 1rem;
	border-radius: 20px;
	& td {
		padding: 1vw;
	}
	@media (max-width: 768px) {
		font-size: 1.3rem;
		border-spacing: 0.2rem;
	}
	@media (max-width: 420px) {
		font-size: 1rem;
		border-spacing: 0.4rem;
	}
`
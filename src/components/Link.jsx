import styled from 'styled-components'
import { Link } from 'react-router-dom'

const linkArr = [
	{
		src: 'https://band.us/band/89444987',
		title: '밴드',
		color: 'rgb(30, 142, 62)'
	},
	{
		src: 'https://classroom.google.com/',
		title: '클래스룸',
		color: '#f5ba14'
	},
	{
		src: 'https://dimigo.goorm.io/',
		title: '디미고 구름',
		color: '#1d6ce0'
	},
	{
		src: 'https://www.hiclass.net/main/home',
		title: '하이클래스',
		color: '#4778de'
	},
	{
		src: 'https://dimigo.net/',
		title: '디미고인',
		color: '#ee1183'
	}
]

function LinkCom(props) {
	return (
		<LinkCon to={props.data.src}>
			<LinkTxt><span style={{color: props.data.color}}>{props.data.title}</span> 바로가기</LinkTxt>
		</LinkCon>
	)
}

export default function LinkPage() {
	return (
		<>
			<Wrap>
				<Links>
					{linkArr.map(v => <LinkCom data={v}/>)}
				</Links>
			</Wrap>
		</>
	);
}

const Wrap = styled.div`
	display: flex;
	justify-content: center;
`

const Links = styled.div`
	padding: 5rem 0;
	width: 20%;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
`

const LinkCon = styled(Link)`
	background: #f6f6f6;
	padding: 2rem;
	border-radius: 20px;
	width: 20vw;
	font-size: 1.2rem;
	font-weight: 700;
	text-align: center;
	color: #000;
	text-decoration: none;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
	transition: all 0.3s ease;
	@media (max-width: 1000px) {
		width: 40vw;
	}
	@media (max-width: 500px) {
		width: 60vw;
	}
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px;
	}
`

const LinkTxt = styled.div`
	@media (max-width: 500px) {
		font-size: 1rem;
	}
`
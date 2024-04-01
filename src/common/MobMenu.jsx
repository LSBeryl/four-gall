import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function MobMenu(props) {
  const [active, setActive] = useState(0)
	const location = useLocation()

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				setActive(0);
				break;
			case '/photo':
				setActive(1);
				break;
			case '/calender':
				setActive(2);
				break;
			case '/link':
				setActive(3);
				break;
			case '/music':
				setActive(4);
				break;
			default:
				setActive(0);
		}
	}, [location.pathname]);
	return (
		<MobMenuList style={{
				display: props.open == 1 ? 'flex' : 'none'
			}}>
			<div style={{width: '100%', height: '100%', background: '#000', opacity: '0.85', position: 'absolute', right: '0', top: '0', zIndex: '2'}}></div>
			<MenuLink to="/photo" style={{color: active == 1 ? '#E3E3E3' : '#AAA', zIndex: '2'}}>사진</MenuLink>
			<MenuLink to="/calendar" style={{color: active == 2 ? '#E3E3E3' : '#AAA', zIndex: '2'}}>시간표</MenuLink>
			<MenuLink to="/link" style={{color: active == 3 ? '#E3E3E3' : '#AAA', zIndex: '2'}}>각종 링크</MenuLink>
			<MenuLink to="/music" style={{color: active == 4 ? '#E3E3E3' : '#AAA', zIndex: '2'}}>음악 신청</MenuLink>
		</MobMenuList>
	)
}
const MenuList = styled.ul`
	display: flex;
	flex-direction: row;
	list-style: none;
	margin: 0;
	gap: 2rem;
	padding: 0;
`
const MobMenuList = styled(MenuList)`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	right: 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5rem 2rem;
	box-sizing: border-box;
	font-size: 1.5rem;
	font-weight: bold;
`
const MenuLink = styled(Link)`
	text-decoration: none;
	color: #999;
	transition: all 0.3s ease;
	&:hover {
		color: #000;
	}
`
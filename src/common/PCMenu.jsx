import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PCMenu() {
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
			default:
				setActive(0);
		}
	}, [location.pathname]);
	return (
		<MenuList>
			<MenuLink to="/photo" style={{color: active == 1 ? '#000' : ''}}>사진</MenuLink>
			<MenuLink to="/calender" style={{color: active == 2 ? '#000' : ''}}>시간표</MenuLink>
			<MenuLink to="/link" style={{color: active == 3 ? '#000' : ''}}>각종 링크</MenuLink>
		</MenuList>
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

const MenuLink = styled(Link)`
	text-decoration: none;
	color: #999;
	transition: all 0.3s ease;
	&:hover {
		color: #000;
	}
`
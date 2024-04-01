import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DimigoSrc from '/img/dimigo.png'
import { Menu, X } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import MobMenu from './MobMenu.jsx'
import PCMenu from './PCMenu.jsx'

export default function Header() {
	const [open, setOpen] = useState(0)
	const location = useLocation()
6
	useEffect(() => {
		setOpen(0)
	}, [location.pathname]);

	const width600 = useMediaQuery({ query: '(max-width: 600px)' })

  return (
		<>
			<List>
				<LogoWrap style={{width: width600 ? '100%' : ''}}>
					<Logo to="/"><Dimigo src={DimigoSrc} />KDMHS 2-4</Logo>
					<Menu style={{display: width600 ? (open == 1 ? 'none' : 'inline') : 'none'}} onClick={() => {setOpen(1)}} />
					<X color="#fff" style={{display: width600 ? (open == 1 ? 'inline' : 'none') : 'none', zIndex: '3'}} onClick={() => {setOpen(0)}}/>
				</LogoWrap>
				{width600 ? <MobMenu open={open} /> : <PCMenu />}
			</List>
		</>
	);
}

const List = styled.ul`
	display: flex;
	flex-direction: row;
	list-style: none;
	margin: 0;
	justify-content: space-between;
	align-items: center;
	padding: 1.3rem 2rem;
	box-sizing: border-box;
	flex-wrap: wrap;
	position: sticky;
	top: 0;
	backdrop-filter: blur(10px);
	background: #ffffff5a;
	border-bottom: 1px solid #dfdfdf6e;
`

const Logo = styled(Link)`
	text-decoration: none;
	color: #000;
	font-size: 2rem;
	font-weight: 700;
	display: flex;
	gap: 0.5rem;
	align-items: center;
`

const Dimigo = styled.img`
	height: 2rem;
`

const LogoWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
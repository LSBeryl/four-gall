import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PCMenu() {
	const [active, setActive] = useState(0)
	const location = useLocation()

	const [featureClick, setFeatureClick] = useState(false)

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				setActive(0);
				break;
			case '/photo':
				setActive(1);
				break;
			case '/calendar':
				setActive(2);
				break;
			case '/feature':
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
		<MenuList>
			<MenuLink to="/photo" style={{color: active == 1 ? '#000' : ''}}>사진</MenuLink>
			<MenuLink to="/calendar" style={{color: active == 2 ? '#000' : ''}}>시간표</MenuLink>
			<FeatureMenu to="/feature" style={{color: active == 3 ? '#000' : ''}}>
				유용한 기능
				{/* <ul style={{display: featureClick ? '' : 'none'}}>
					<li data-type="seat">자리 배치</li>
					<li data-type="dice">번호 뽑기</li>
					<li data-type="vote">투표</li>
					<li data-type="gang">학급회 조직도</li>
					<li data-type="book">학급회 예산 기록표</li>
					<li data-type="links">각종 링크</li>
					<li data-type="note">수행평가 기록</li>
				</ul>
				/feature로 이동하지 않고, 각 기능에 맞게 따로 path 설정하기
				ex. 투표 > https://dimi24.vercel.app/vote 이런 식으로
				'유용한 기능' 옆에 밑 화살표 넣고 그거 클릭하면 setFeatureClick으로 featureClick 바꾸기
				featureClick true면 ul 보이고 아니면 안보이게
				각 li 클릭하면 path 변경
				*/}
			</FeatureMenu>
			<MenuLink to="/music" style={{color: active == 4 ? '#000' : ''}}>음악 신청</MenuLink>
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

const FeatureMenu = styled(MenuLink)`
	
`
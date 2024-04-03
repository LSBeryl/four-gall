import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function Footer() {

  return (
		<Wrap>
      <div>오류 및 문의 사항 <Yeah to="https://open.kakao.com/o/smWkgmRe">2421 이서현</Yeah></div>
      {/* <Privacy to="https://dimi24-privacy.netlify.app">개인정보처리방침</Privacy> */}
		</Wrap>
	);
}

const Wrap = styled.div`
  color: #aaa;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;
  font-size: 0.8rem;
`

const Yeah = styled(Link)`
  color: #707070;
  font-weight: 500;
  margin-left: 0.3rem;
`

const Privacy = styled(Link)`
  text-decoration: none;
  color: #aaa;
`
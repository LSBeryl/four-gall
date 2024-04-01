import styled from 'styled-components'

export default function Footer() {

  return (
		<Wrap>
      <div>개발자 연락처 <Yeah>lsberyl@dimigo.hs.kr</Yeah></div>
		</Wrap>
	);
}

const Wrap = styled.div`
  color: #aaa;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.8rem;
`

const Yeah = styled.span`
  color: #707070;
  font-weight: 500;
  margin-left: 0.3rem;
`
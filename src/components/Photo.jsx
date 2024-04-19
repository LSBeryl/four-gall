import styled from 'styled-components'
import { data } from './wall.json'
import { useState, useEffect } from 'react'

function PhotoElement(props) {
  return (
    <ElemCon>
      <ElemImgCon onClick={props.onClick}>
        <RealImg src={'/img/' + props.src} alt="" />
      </ElemImgCon>
      <ElemDesc>
        {props.desc}
      </ElemDesc>
      <ElemDate>
        {props.date}
      </ElemDate>
    </ElemCon>
  )
}

export default function Photo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const openModal = (src) => {
    setSelectedPhoto(src);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }
	
  useEffect(() => {
    document.title = window.location.href.includes('localhost') ? '사진 :: 4반 갤러리 테스트' : '사진 :: 4반 갤러리'
  }, [])

  return (
    <>
      <Wrap>
        <PhotoWrap>
          {data.map(v => (
            <PhotoElement key={v.src} src={v.src} desc={v.desc} date={v.date} onClick={() => openModal(v.src)} />
          ))}
        </PhotoWrap>
      </Wrap>
      {modalOpen && (
        <ModalBackdrop onClick={closeModal}>
          <ModalContent>
            <img src={'/img/' + selectedPhoto} alt="" />
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
`

const PhotoWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4rem;
  width: 70vw;
`

const ElemCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
	background: #fff;
	border: 1px solid #ebedef;
  border-radius: 10px;
  padding-bottom: 2rem;
`

const ElemDesc = styled.div`
  color: #ee1183;
  font-size: 1.8rem;
  font-weight: 700;
`

const ElemImgCon = styled.div`
  cursor: pointer;
`

const RealImg = styled.img`
  height: 360px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`

const ElemDate = styled.div``

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const ModalContent = styled.div`
  max-width: 50vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  img {
    width: 70%;
    height: auto;
  }
	@media (max-width: 500px) {
		max-width: 95vw;
	}
`

const Censor = styled.div`
  width: 230px;
  height: 360px;
  border-radius: 10px;
  background: #424242;
  color: #d6d6d6;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 1rem;
`
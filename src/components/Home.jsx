import styled from 'styled-components'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { getDocs, collection, getDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { GoogleLogin } from '@react-oauth/google'

function formatTime(t) {
	const wallTime = new Date(t)
	const formatWallTime = `${wallTime.getFullYear()}-${wallTime.getMonth() + 1 < 10 ? '0' + (wallTime.getMonth() + 1) : wallTime.getMonth() + 1}-${wallTime.getDate() < 10 ? '0' + wallTime.getDate() : wallTime.getDate()} ${wallTime.getHours() < 10 ? '0' + wallTime.getHours() : wallTime.getHours()}:${wallTime.getMinutes() < 10 ? '0' + wallTime.getMinutes() : wallTime.getMinutes()}:${wallTime.getSeconds() < 10 ? '0' + wallTime.getSeconds() : wallTime.getSeconds()}`
	return formatWallTime
}

export default function Home() {
	const [messageNum, setMessageNum] = useState(0)
	const [curMsgIdx, setCurMsgIdx] = useState(0)
	const [wallMessages, setWallMessages] = useState([{msg: 'Loading', id: 'Loading'}])
	const [wallIds, setWallIds] = useState([])

	const [msg, setMsg] = useState('NULL')
	const [id, setId] = useState('NULL')
	const [wallPw, setWallPw] = useState('')

	const nameInp = useRef()
	const pwInp = useRef()
	const msgInp = useRef()

	const [update, setUpdate] = useState([])

	useEffect(() => {
		async function fetchWallIds() {
			const wallCollection = collection(db, 'wall');
			const querySnapshot = await getDocs(wallCollection);
			const docIds = querySnapshot.docs.map(doc => doc.id);
			setWallIds(docIds)
			const promises = docIds.map(async (id) => {
				const wall = doc(db, 'wall', id);
				const wallSnapshot = await getDoc(wall);
				return wallSnapshot.data();
			});

			const results = await Promise.all(promises);
			return results
		}

		async function fetchData() {
			const data = await fetchWallIds();
			setWallMessages(data);
			setMessageNum(data.length - 1)
		}

		fetchData();
	}, [update])

	useEffect(() => {
		const interval = setInterval(() => {
			if(curMsgIdx < messageNum) {
				setCurMsgIdx(curMsgIdx + 1)
			} else if(curMsgIdx == messageNum) {
				setCurMsgIdx(0)
			}
		}, 2000)
		return () => clearInterval(interval);
	}, [curMsgIdx, messageNum])

  useEffect(() => {
    document.title = window.location.href.includes('localhost') ? '메인 :: 4반 갤러리 테스트' : '메인 :: 4반 갤러리'
  }, [])

	return (
		<>
			<Wrap>
				<MessageWrap>
					<div style={{width: '676px', background: '#fff', border: '1px solid #ebedef', borderRadius: '10px', paddingBlock: '2rem', paddingInline: '0.3rem', boxSizing: 'border-box', lineHeight: '3rem'}}>
						<div style={{ fontSize: '1.4rem', fontWeight: '600'}}>담벼락</div>
						<WallMessage>
							"
							<span>{wallMessages.map((v, i) => {
								if(i == curMsgIdx) return v.msg
							})}</span>
							"
						</WallMessage>
						<WallMessageId><span style={{color: '#ee1183', fontWeight: '700'}}>{wallMessages[curMsgIdx].id}</span>의 글</WallMessageId>
					</div>
				</MessageWrap>
				<WallCon>
					<div>
						<div style={{marginBottom: '2rem', textAlign: 'center'}}>
							<span>담벼락에 글 남기기</span>
						</div>
						<WallInputCon>
							<div>
								<WallInpCon>
									<NamePwCon>
										<WallName type="text" placeholder='이름'
										onInput={(e) => {setId(e.target.value)}}
										ref={nameInp} />
										<WallPw type="text" placeholder='비밀번호'
										onInput={(e) => {setWallPw(e.target.value)}}
										ref={pwInp} />
									</NamePwCon>
									<WallMsgCon>
										<WallMsg type="text" placeholder='남길 메시지'
										onInput={(e) => {setMsg(e.target.value)}}
										ref={msgInp} />
									</WallMsgCon>
								</WallInpCon>
								<WallBtn
								onClick={async () => {
									if(id == 'NULL' || msg == 'NULL' || id == '' || msg == '' || wallPw == 'NULL' || wallPw == '') {
										alert('내용을 입력해주세요!')
									} else {
										await addDoc(collection(db, "wall"), {
											id: id,
											msg: msg,
											creationTime: new Date(),
											pw: wallPw
										});
										nameInp.current.value = ''
										pwInp.current.value = ''
										msgInp.current.value = ''
										setUpdate([...update])
									}
								}}>글쓰기</WallBtn>
							</div>
						</WallInputCon>
					</div>
				</WallCon>
				<ShowCon>
					<ShowData>
							{wallMessages.sort((a, b) => {
									const timeA = a.creationTime ? a.creationTime.seconds : null;
									const timeB = b.creationTime ? b.creationTime.seconds : null;
									return timeB - timeA;
								}).map(v => (
									<ShowDataCom>
											<div>
												<span style={{fontWeight: 'bold'}}>{v.id}</span>
												<WallTime>{v.creationTime && formatTime(v.creationTime.seconds * 1000)}</WallTime><br/>
												<span style={{fontSize: '0.9rem'}}>{v.msg}</span>
											</div>
											<div>
												<Trash2 onClick={() => {
													wallIds.forEach(async (id) => {
														const wall = doc(db, 'wall', id);
														const wallSnapshot = await getDoc(wall);
														const walls = wallSnapshot.data()
														if(v.msg == walls.msg && v.id == v.id) {
															const pw = prompt('비밀번호를 입력하세요.')
															if(v.pw) {
																if(pw == v.pw || pw == '7132') {
																	await deleteDoc(doc(db, "wall", id))
																	alert('삭제되었습니다.')
																	setUpdate([...update])
																}
															} else {
																if(pw == '7132') {
																	await deleteDoc(doc(db, "wall", id))
																	alert('삭제되었습니다.')
																	setUpdate([...update])
																}
															}
														}
													})
												}} style={{cursor: 'pointer'}} color="#6f6f6f" width="1.1rem" />
											</div>
									</ShowDataCom>
								))
							}
					</ShowData>
				</ShowCon>
			</Wrap>
		</>
	);
}

const Wrap = styled.div`
	padding: 2rem;
`

const MessageWrap = styled(Wrap)`
	display: flex;
	justify-content: center;
	font-weight: 500;
	font-size: 2rem;
	text-align: center;
	line-height: 2.5rem;
	padding: 0;
`

const WallCon = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2rem 0;
	gap: 2rem;
	font-size: 1.7rem;
	font-weight: 500;
	& > div {
		background: #fff;
		border: 1px solid #ebedef;
		border-radius: 10px;
		padding: 5rem 10rem;
	}
	@media (max-width: 800px) {
		font-size: 1.5rem;
		& > div {
			padding: 2rem;
		}
	}
`

const WallInputCon = styled.div` // input 태그, 버튼 등을 포함한 엘리먼트들의 container
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	& > div {
		display: flex;
		@media (max-width: 600px) {
			flex-direction: column;
		}
	}
`

const WallBtn = styled.button`
	border: 0;
	padding: 0.5rem 1rem;
	border-radius: 30px;
	font-weight: 500;
	padding: 0.5rem 1rem;
	border: 1px solid #848484;
	height: 2.2rem;
	background: #fff;
	color: #000;
	&:hover {
		background: #000;
		color: #fff;
	}
	transition: all 0.2s ease;
	cursor: pointer;
`

const ShowCon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const ShowBtn = styled.button`
	margin-bottom: 2rem;
	border: 0;
  background: transparent;
	font-size: 1.2rem;
	cursor: pointer;
	display: flex;
`

const ShowData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const ShowDataCom = styled.div`
	background: #fff;
	border: 1px solid #ebedef;
	padding: 1rem;
	border-radius: 10px;
	line-height: 1.5;
	width: clamp(250px, 30vw, 500px);
	display: flex;
	justify-content: space-between;
`

const WallTime = styled.span`
	font-size: 0.7rem;
	margin-left: 0.4rem;
`

const WallMessage = styled.div`
	line-height: 2rem;
  box-sizing: border-box;
  padding-inline: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    font-size: 1.3rem;
		width: 80vw;
  }
`

const WallMessageId = styled.div`
	font-size: 1.3rem;
	font-weight: 300;
	@media (max-width: 768px) {
		font-size: 1.1rem;
	}
`

const Logout = styled.div`
	font-size: 0.9rem;
	color: #595959;
	font-weight: 300;
	margin-bottom: -1rem;
	margin-top: 0.3rem;
	cursor: pointer;
`

const WallInpCon = styled.div` // input 태그들의 container
	display: flex;
	flex-direction: column;
	width: 20rem;
	& input {
		height: 2rem;
		margin: 0.2rem;
		padding-inline: 0.7rem;
	}
	@media (max-width: 600px) {
		width: 8rem;
		& input {
			width: calc(100% + 2.3rem);
		}
	}
`

const NamePwCon = styled.div`
	width: 100%;
`

const WallMsgCon = styled.div`
	width: 100%;
`

const WallName = styled.input`
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	transition: all 0.2s ease;
	outline: none;
	width: 30%;
/* & input {
	padding: 0.3rem;
	padding: 1rem;
	font-size: 1rem;
}	*/
	&:focus {
		border: 1px solid #ddd;
	}
`

const WallPw = styled.input`
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	transition: all 0.2s ease;
	outline: none;
	width: 50%;
	&:focus {
		border: 1px solid #ddd;
	}
`

const WallMsg = styled.input`
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	transition: all 0.2s ease;
	outline: none;
	width: calc(100% - 1.8rem - 2px);
	&:focus {
		border: 1px solid #ddd;
	}
`
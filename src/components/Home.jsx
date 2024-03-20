import styled from 'styled-components'
import { ChevronDown, ChevronUp} from 'lucide-react'
import { useState, useEffect } from 'react'
import { getDocs, collection, getDoc, doc, Firestore, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function formatTime(t) {
	const wallTime = new Date(t)
	const formatWallTime = `${wallTime.getFullYear()}-${wallTime.getMonth() + 1}-${wallTime.getDate()} ${wallTime.getHours() < 10 ? '0' + wallTime.getHours() : wallTime.getHours()}:${wallTime.getMinutes() < 10 ? '0' + wallTime.getMinutes() : wallTime.getMinutes()}:${wallTime.getSeconds() < 10 ? '0' + wallTime.getSeconds() : wallTime.getSeconds()}`
	return formatWallTime
}

export default function Home() {
	const [messageNum, setMessageNum] = useState(0)
	const [curMsgIdx, setCurMsgIdx] = useState(0)
	const [wallMessages, setWallMessages] = useState([{msg: 'Loading', id: 'Loading'}])
	const [showAllWall, setShowAllWall] = useState(false)

	const [msg, setMsg] = useState('NULL')
	const [id, setId] = useState('NULL')

	useEffect(() => {
		async function fetchWallIds() {
			const wallCollection = collection(db, 'wall');
			const querySnapshot = await getDocs(wallCollection);
			const docIds = querySnapshot.docs.map(doc => doc.id);
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
	}, [])

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

	return (
		<>
			<Wrap>
				<MessageWrap>
					<div style={{ fontSize: '1.4rem', fontWeight: '600'}}>담벼락</div>
					<div>
						"
						<span>{wallMessages.map((v, i) => {
							if(i == curMsgIdx) return v.msg
						})}</span>
						"
					</div>
					<div style={{fontSize: '1.3rem', fontWeight: '300'}}>{wallMessages[curMsgIdx].id}</div>
				</MessageWrap>
				<WallCon>
					<div>
						<div style={{marginBottom: '2rem', textAlign: 'center'}}>
							<span>담벼락에 글 남기기</span>
						</div>
						<WallInputCon>
							<div style={{
								display: 'flex',
								justifyContent: 'space-between'
							}}>
								<input type="text" placeholder='이름' onInput={(e) => {console.log(setId(e.target.value))}} />
								<WallBtn onClick={async () => {
									if(id == 'NULL' || msg == 'NULL' || id == '' || msg == '') {
										alert('내용을 입력해주세요!')
									} else {
										await addDoc(collection(db, "wall"), {
											id: id,
											msg: msg,
											creationTime: new Date()
										});
										location.reload(true)
										alert('성공적으로 등록되었습니다.')
									}
								}}>글쓰기</WallBtn>
							</div>
							<div>
								<input type="text" placeholder='남길 메시지' onInput={(e) => {console.log(setMsg(e.target.value))}} />
							</div>
						</WallInputCon>
					</div>
				</WallCon>
				<ShowCon>
					<ShowBtn onClick={() => {setShowAllWall(!showAllWall)}}>전체 담벼락 {showAllWall ? <ChevronUp /> : <ChevronDown />}</ShowBtn>
					{showAllWall && 
						<ShowData>
							{
								wallMessages.sort((a, b) => {
									const timeA = a.creationTime ? a.creationTime.seconds : null;
									const timeB = b.creationTime ? b.creationTime.seconds : null;
									return timeB - timeA;
								}).map(v => (
									<ShowDataCom>{v.id} : <span style={{fontSize: '1.2rem'}}>{v.msg} <WallTime>{v.creationTime && formatTime(v.creationTime.seconds * 1000)}</WallTime></span></ShowDataCom>
								))
							}
						</ShowData>
					}
				</ShowCon>
			</Wrap>
		</>
	);
}

const Wrap = styled.div`
	padding: 2rem;
`

const MessageWrap = styled(Wrap)`
	background: #fbfbfb;
	border: 1px solid #ebedef;
	border-radius: 20px;
	font-weight: 500;
	font-size: 2rem;
	text-align: center;
	line-height: 2.5rem;
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
		background: #fbfbfb;
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
	@media (max-width: 500px) {
		font-size: 1.2rem;
		& > div {
			padding: 2rem 1rem;
		}
	}
`

const WallInputCon = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	& input {
		border: 1px solid transparent;
		padding: 0.3rem;
		border-radius: 10px;
		padding: 1rem;
		transition: all 0.2s ease;
		font-size: 1.1rem;
		outline: none;
	}
	& div:nth-child(1) input {
		width: 30%;
		padding: 0.5rem 1rem;
	}
	& div:nth-child(2) input {
		width: 20rem;
		padding: 2rem 1rem;
	}
	& input:focus {
		border: 1px solid #ddd;
	}
	@media (max-width: 500px) {
		& div:nth-child(1) {
			width: 15rem;
		}
		& div:nth-child(2) input {
			width: 15rem;
			padding: 1rem 0.5rem;
		}
	}
`

const WallBtn = styled.button`
	border: 0;
	padding: 0.5rem 1rem;
	border-radius: 10px;
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
	background: #fff;
	font-size: 1.2rem;
	cursor: pointer;
	display: flex;
`

const ShowData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: relative;
`

const ShowDataCom = styled.div`
	background: #fbfbfb;
	border: 1px solid #ebedef;
	padding: 1rem;
	border-radius: 20px;
`

const WallTime = styled.div`
	font-size: 0.7rem;
`
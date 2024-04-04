import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { getDocs, collection, getDoc, doc, addDoc, updateDoc, deleteDoc, setDoc,arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase.jsx'
import { Trash2, Eye, Plus, X } from 'lucide-react'
import { v4 } from "uuid";


export default function Vote() {
	const [voteArr, setVoteArr] = useState([])
  const [voteIds, setVoteIds] = useState([])
  const [isCreate, setIsCreate] = useState(0) // 1: 열림, 0: 닫힘

  // 새 투표 만들 때 필요한 변수들
  const [title, setTitle] = useState('')
  const [article, setArticle] = useState('')
  const [pw, setPw] = useState('')
  const [choices, setChoices] = useState([])
  const [isRadio, setIsRadio] = useState(false)

	useEffect(() => {
		async function fetchVoteDataIds() {
			const voteDataCollection = collection(db, 'Vote');
			const querySnapshot = await getDocs(voteDataCollection);
			const docIds = querySnapshot.docs.map(doc => doc.id);
      setVoteIds(docIds)
			const promises = docIds.map(async (id) => {
				const voteData = doc(db, 'Vote', id);
				const voteDataSnapshot = await getDoc(voteData);
				return voteDataSnapshot.data();
			});

			const results = await Promise.all(promises);
			return results
		}

		async function fetchData() {
			const data = await fetchVoteDataIds();
      setVoteArr(data)
		}

		fetchData();
	}, [])

  function VoteBoxFunc(props) {
    const [txtVote, setTxtVote] = useState('')

    return (
      <VoteBox>
        <Manage>
          <Trash2 width="1.1rem" color="#6f6f6f" style={{cursor: 'pointer'}} onClick={async () => {
            voteIds.forEach(async (id) => {
              const vote = doc(db, 'Vote', id);
              const voteSnapshot = await getDoc(vote);
              const votes = voteSnapshot.data()
              if(props.title == votes.title) {
                const pw = prompt('삭제를 위해 개표 비밀번호를 입력하세요.')
                if(pw == props.pw || pw == '7132') {
                  await deleteDoc(doc(db, "Vote", id))
                  alert('삭제되었습니다.')
                  location.reload(true)
                } else {
                  alert('실패')
                }
              }
            })
          }}/>
          <Eye width="1.1rem" color="#6f6f6f" style={{cursor: 'pointer'}} onClick={() => {
            let pw = prompt('개표 결과를 보려면 비밀번호를 입력하세요.')
            if(pw == props.pw || pw == '7132') {
              let alertTxt = ''
              let totalVoteNum = 0
              const valueArr = []
              props.vote.forEach(v => {
                valueArr.push(Object.values(v)[0])
              })
              const consq = {}
              valueArr.forEach(v => {
                if(consq[v]) {
                  consq[v]++
                } else {
                  consq[v] = 1
                }
              })
              for(const key in consq) {
                alertTxt = alertTxt + `${key} : ${consq[key]}표\n`
                totalVoteNum += consq[key]
              }
              alertTxt = alertTxt + `총 ${totalVoteNum}표`
              alert(alertTxt)
            }
          }}/>
        </Manage>
        <Title>
          {props.title}
        </Title>
        <Article>
          {props.article}
        </Article>
        {props.isRadio ?
        <Objects>
          {props.choices.map((v, i) => (
            <li onClick={() => {setTxtVote('hi')}}>
              <RadioInput type="radio" id={i} name="vote"/>
              <label htmlFor={i}>{v}</label>
            </li>
          ))}
        </Objects>
        :
        <TxtInputContainer>
          <TxtInput type="text" placeholder='입력하기' onChange={e => {setTxtVote(e.target.value)}} />
        </TxtInputContainer>
        }
        <VoteButton>
          <button onClick={() => {
            voteIds.forEach(async (id) => {
              const vote = doc(db, 'Vote', id);
              const voteSnapshot = await getDoc(vote);
              const voteData = voteSnapshot.data()
              if(voteData.title == props.title) {
                  await updateDoc(vote, {
                    vote: arrayUnion({[v4()]:txtVote})
                  }).then(location.reload(true))
              }
            })
          }}>투표하기</button>
        </VoteButton>
      </VoteBox>
    )
  }

	return (
		<Wrap>
      <PlusBox onClick={async () => {
          setIsCreate(true)
        }} >
        <Plus />
      </PlusBox>
      <CreateVote style={{display: isCreate == 1 ? 'flex' : 'none'}}>
        <CreationBox>
          <Close>
            <X onClick={() => {setIsCreate(0)}}/>
          </Close>
          <input type="text" placeholder='투표 제목' onChange={e => {setTitle(e.target.value)}}/>
          <input type="text" placeholder='투표 설명 글' onChange={e => {setArticle(e.target.value)}}/>
          <input type="text" placeholder='개표 비밀번호' onChange={e => {setPw(e.target.value)}}/>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
            <input type="radio" name="create" id="short"
            onClick={() => {setIsRadio(false)}} defaultChecked/><label htmlFor="short"
            onClick={() => {setIsRadio(false)}}>단답형</label>
            {/* <input type="radio" name="create" id="select"
            onClick={() => {setIsRadio(true)}}/><label htmlFor="select"
            onClick={() => {setIsRadio(true)}}>객관식</label> */}
          </div>
          <input type="text" placeholder='투표 항목 (ex. 이서현, 이서현, 이서현)'
          style={{display: isRadio ? '' : 'none'}} onChange={e => {setChoices(e.target.value.split(', '))}}/>
          <CreateSubmitContainer>
            <CreateSubmit onClick={async () => {
              if(title && article && pw && choices) {
                await addDoc(collection(db, "Vote"), {
                  title: title,
                  article: article,
                  pw: pw,
                  choices: choices,
                  isRadio: isRadio,
                  creationTime: new Date(),
                  vote: []
                }).then(() => {
                  location.reload(true)
                })
              } else {
                alert('정보를 모두 입력해주세요.')
              }
            }}>
              만들기
            </CreateSubmit>
          </CreateSubmitContainer>
        </CreationBox>
      </CreateVote>
      {voteArr.sort((a, b) => {
        const timeA = a.creationTime ? a.creationTime.seconds : null;
        const timeB = b.creationTime ? b.creationTime.seconds : null;
        return timeB - timeA;
      }).map(v => (
        <VoteBoxFunc title={v.title} article={v.article} choices={v.choices} pw={v.pw} isRadio={v.isRadio} vote={v.vote}/>
      ))}
		</Wrap>
	);
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 3rem;
`

const VoteBox = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 20px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 1.5rem;
  margin-block: 1rem;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Article = styled.div`
  margin-top: 0.5rem;
`

const Objects = styled.ul`
  list-style: none;
  padding-left: 1rem;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0;
`

const RadioInput = styled.input`
  margin-right: 0.5rem;
  &:checked {
    appearance: none;
    border: 3px solid #ee1183;
    width: 0.9rem;
    height: 0.87rem;
    border-radius: 100%;
    box-sizing: border-box;
  }
  &:checked + label {
    color: #ee1183;
    font-weight: bold;
  }
`

const TxtInputContainer = styled.div`
  height: 65%;
  display: flex;
  align-items: center;
`

const TxtInput = styled.input`
  border: 0;
  border: 1px solid #d2d2d2;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  &:focus{
    border: 1px solid #7e7e7e;
    outline: none;
  }
`

const VoteButton = styled.div`
  margin-left: 0.8rem;
  margin-bottom: 0.8rem;
  & > button {
    border: 0;
    cursor: pointer;
    background: #fff;
    border: 1px solid #5e5e5e;
    border-radius: 20px;
    padding: 0.3rem 1rem;
    transition: all 0.2s ease;
    background: #fff;
    color: #000;
    &:hover {
      background: #000;
      color: #fff;
    }
  }
`

const Manage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  float: right;
`

const PlusBox = styled.button`
	border: 0;
  padding: 1rem 1rem 0.8rem 1rem;
	border-radius: 10px;
  background: #fff;
  border: 1px solid #eaeaea;
  width: 20rem;
	cursor: pointer;
  margin-bottom: 1rem;
`

const CreateVote = styled.div`
  position: absolute;
  z-index: 10;
  background: #0000006c;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`

const CreationBox = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 1.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & input {
    border: 0;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
    &:focus{
      border: 1px solid #7e7e7e;
      outline: none;
    }
  }
`

const CreateSubmitContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CreateSubmit = styled.button`
  width: 5rem;
  border: 0;
  cursor: pointer;
  background: #fff;
  border: 1px solid #5e5e5e;
  border-radius: 20px;
  padding: 0.3rem 1rem;
  transition: all 0.2s ease;
  background: #fff;
  color: #000;
  &:hover {
    background: #000;
    color: #fff;
  }
`

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  & > * {
    width: 1rem;
    cursor: pointer;
  }
`
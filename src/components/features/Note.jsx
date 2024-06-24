import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

// 상단에 수행 추가 박스
// 수행 추가 박스 내용
// 1. 수행 제목
// 2. 수행 과목 (ul, flex 넣어서, radio 버튼, 과목 옆 임티)
// 3. 상세 내용 메모
// 4. 하루 수행 / 기간 수행 버튼
// 4-1. (전자라면) 날짜 input 한 개 생성 / (후자라면) 날짜 input 한 개 ~ 한 개 해서 기간 정하도록
//------------------------------------------------------------------------------------------
// 박스 밑에는 추가한 내용들 보이도록
// 제목 옆 과목 표시
// 밑에 날짜 표시
// 날짜 밑에 상세 내용 표시

export default function Note() {
  const subjects = [
    "문학",
    "수I",
    "수II",
    "미적분",
    "영I",
    "화학",
    "물리학",
    "한국사",
    "중국어",
    "성직",
    "자료구조",
    "응화",
  ];
  const [scheduleType, setScheduleType] = useState(0); // 0 : 일일, 1 : 기간
  const [subjectInp, setSubjectInp] = useState("");
  const [scheduleOne, setSubjectOne] = useState("");
  const [scheduleTwo, setSubjectTwo] = useState("");

  const [testsData, setTestsData] = useState([]);

  const [update, setUpdate] = useState([]);

  useEffect(() => {
    async function fetchTests() {
      const testsCollection = collection(db, "tests");
      const querySnapshot = await getDocs(testsCollection);
      const docIds = querySnapshot.docs.map((doc) => doc.id);
      const promises = docIds.map(async (id) => {
        const tests = doc(db, "tests", id);
        const testsSnapshot = await getDoc(tests);
        return testsSnapshot.data();
      });

      const results = await Promise.all(promises);
      return results;
    }

    async function fetchData() {
      const data = await fetchTests();
      // setWallMessages(data);
      // setMessageNum(data.length - 1)
      setTestsData(data);
      console.log(data);
    }

    fetchData();
  }, [update]);

  function formatTime(t) {
    const wallTime = new Date(t);
    const formatWallTime = `${wallTime.getFullYear()}-${
      wallTime.getMonth() + 1 < 10
        ? "0" + (wallTime.getMonth() + 1)
        : wallTime.getMonth() + 1
    }-${
      wallTime.getDate() < 10 ? "0" + wallTime.getDate() : wallTime.getDate()
    } ${
      wallTime.getHours() < 10 ? "0" + wallTime.getHours() : wallTime.getHours()
    }:${
      wallTime.getMinutes() < 10
        ? "0" + wallTime.getMinutes()
        : wallTime.getMinutes()
    }:${
      wallTime.getSeconds() < 10
        ? "0" + wallTime.getSeconds()
        : wallTime.getSeconds()
    }`;
    return formatWallTime;
  }

  return (
    <Wrap>
      <CreateBox>
        <TitleCon>
          제목 <Bars>|</Bars>
          <TitleInp id="title"></TitleInp>
        </TitleCon>
        <SubjectCon>
          과목 <Bars>|</Bars>
          <SubjectInpCon>
            {subjects.map((v, i) => (
              <div key={i}>
                <SubjectInput
                  type="radio"
                  id={v}
                  name="subject"
                  onClick={() => {
                    setSubjectInp(v);
                  }}
                />
                <Label
                  htmlFor={v}
                  onClick={() => {
                    setSubjectInp(v);
                  }}
                >
                  {v}
                </Label>
              </div>
            ))}
          </SubjectInpCon>
        </SubjectCon>
        <DetailCon>
          수행평가 내용 <Bars>|</Bars>
          <DetailInp id="detail"></DetailInp>
        </DetailCon>
        <ScheduleCon>
          <ScheduleBtnCon>
            수행평가 날짜/기간 <Bars>|</Bars>
            <input
              type="radio"
              name="schedule"
              id="one"
              defaultChecked
              onClick={() => {
                setScheduleType(0);
              }}
            />
            <label
              htmlFor="one"
              onClick={() => {
                setScheduleType(0);
              }}
            >
              일일 수행
            </label>
            <input
              type="radio"
              name="schedule"
              id="long"
              onClick={() => {
                setScheduleType(1);
              }}
            />
            <label
              htmlFor="long"
              onClick={() => {
                setScheduleType(1);
              }}
            >
              기간 수행
            </label>
          </ScheduleBtnCon>
          <ScheduleInpCon>
            {scheduleType == 0 ? (
              <>
                <input
                  type="date"
                  onInput={(e) => {
                    setSubjectOne(e.target.value);
                  }}
                />
              </>
            ) : (
              <>
                <input
                  type="date"
                  onInput={(e) => {
                    setSubjectOne(e.target.value);
                  }}
                />{" "}
                ~{" "}
                <input
                  type="date"
                  onInput={(e) => {
                    setSubjectTwo(e.target.value);
                  }}
                />
              </>
            )}
          </ScheduleInpCon>
        </ScheduleCon>
        <Submit>
          <button
            onClick={async () => {
              const userPw = prompt("비밀번호를 입력하세요.");
              const secret = doc(db, "secret", "testSubmit");
              const secretSnapshot = await getDoc(secret);
              const secrett = secretSnapshot.data();
              console.log(secrett);
              if (secrett.pw == userPw) {
                await addDoc(collection(db, "tests"), {
                  title: document.getElementById("title").value,
                  subject: subjectInp,
                  desc: document.getElementById("detail").value,
                  scheduleType: scheduleType,
                  scheduleOne: scheduleOne,
                  scheduleTwo: scheduleTwo,
                });
                setUpdate([...update]);
              } else {
                alert("등록에 실패하였습니다.");
              }
            }}
          >
            등록
          </button>
        </Submit>
      </CreateBox>
      {testsData.map((v) => (
        <TestBox>
          <Title>
            {v.title} <Bars>|</Bars> {v.subject}
          </Title>
          {v.scheduleType == 0 ? (
            <Schedule>{v.scheduleOne}</Schedule>
          ) : (
            <Schedule>
              {v.scheduleOne} ~ {v.scheduleTwo}
            </Schedule>
          )}
          {v.desc}
        </TestBox>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div``;

const CreateBox = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 20px;
  padding: 2rem;
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 70vw;
  }
`;

const TitleCon = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Bars = styled.span`
  color: #eaeaea;
  user-select: none;
`;

const TitleInp = styled.input`
  outline: none;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  transition: all 0.2s ease;
  width: clamp(50px, 50vw, 338px);
  padding: 0.3rem 0.5rem;
`;

const SubjectCon = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SubjectInpCon = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SubjectInput = styled.input``;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
`;

const DetailCon = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
`;

const DetailInp = styled.textarea`
  resize: none;
  outline: none;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  width: calc(100% - 10rem);
  height: 5rem;
  box-sizing: border-box;
  padding: 0.3rem;
`;

const ScheduleCon = styled.div``;

const ScheduleBtnCon = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  & label {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const ScheduleInpCon = styled.div`
  margin-top: 0.5rem;
`;

const Submit = styled.div`
  display: flex;
  justify-content: flex-end;
  & button {
    font-size: 1rem;
    border: 0;
    padding: 0.4rem 1.5rem;
    border-radius: 5px;
    font-weight: 500;
    border: 1px solid #848484;
    background: #fff;
    color: #000;
    &:hover {
      background: #000;
      color: #fff;
      border: 1px solid #000;
    }
    transition: all 0.2s ease;
    cursor: pointer;
  }
`;

////////////////////////////////////////////////////

const TestBox = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Schedule = styled.div`
  display: flex;
  gap: 0.2rem;
  font-weight: 500;
  margin-block: -0.5rem;
  &::before {
    content: "수행 일자 : ";
  }
`;

import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useMediaQuery } from "react-responsive";
import { Pencil } from "lucide-react";

export default function Exam() {
  const [firMidData, setFirMidData] = useState([]);
  const [firFinData, setFirFinData] = useState([]);
  const [secMidData, setSecMidData] = useState([]);
  const [secFinData, setSecFinData] = useState([]);

  const [curExam, setCurExam] = useState([]);

  const [menuNum, setMenuNum] = useState(1); // 고사 끝날 때마다 바꿀 값

  const [update, setUpdate] = useState([]);

  const width500 = useMediaQuery({ query: "(max-width: 500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const isNoAd = useMediaQuery({ query: "(max-width: 1400px)" });

  useEffect(() => {
    async function fetchExam() {
      const examCollection = collection(db, "exam");
      const querySnapshot = await getDocs(examCollection);
      const docIds = querySnapshot.docs.map((doc) => doc.id);
      const promises = docIds.map(async (id) => {
        const exam = doc(db, "exam", id);
        const examSnapshot = await getDoc(exam);
        if (id == "firMid") setFirMidData(examSnapshot.data());
        else if (id == "firFin") setFirFinData(examSnapshot.data());
        else if (id == "secMid") setSecMidData(examSnapshot.data());
        else if (id == "secFin") setSecFinData(examSnapshot.data());
      });
    }

    fetchExam();
  }, [update]);

  useEffect(() => {
    if (menuNum == 0) setCurExam(firMidData);
    else if (menuNum == 1) setCurExam(firFinData);
    else if (menuNum == 2) setCurExam(secMidData);
    else if (menuNum == 3) setCurExam(secFinData);
  }, [menuNum, firMidData, firFinData, secMidData, secFinData]);

  function TimeTable({ data }) {
    return (
      <>
        <ExamTable size={width500 ? "0.9rem" : null}>
          <tbody>
            <tr>
              <ExamTableTd></ExamTableTd>
              {Array(3)
                .fill()
                .map((_, idx) => (
                  <ExamTableTd>{idx + 1}교시</ExamTableTd>
                ))}
            </tr>
            {data.subjects.map((subs, subsIdx) => (
              <tr key={subsIdx}>
                <ExamTableTd>{subsIdx + 1}일차</ExamTableTd>
                {subs.split(", ").map((sub, subIdx) => (
                  <ExamTableTd key={subIdx} bold="bold">
                    {sub ? sub : "자습"}
                  </ExamTableTd>
                ))}
              </tr>
            ))}
          </tbody>
        </ExamTable>
      </>
    );
  }

  return (
    <Wrap>
      <Header
        width={isMobile ? "80vw" : isNoAd ? "70vw" : "50vw"}
        onClick={(e) => setMenuNum(Number(e.target.dataset.num))}
        size={width500 ? "0.8rem" : null}
      >
        <ExamName weight={menuNum == 0 ? "500" : "200"} data-num="0">
          1학기 중간
        </ExamName>
        <ExamName weight={menuNum == 1 ? "500" : "200"} data-num="1">
          1학기 기말
        </ExamName>
        <ExamName weight={menuNum == 2 ? "500" : "200"} data-num="2">
          2학기 중간
        </ExamName>
        <ExamName weight={menuNum == 3 ? "500" : "200"} data-num="3">
          2학기 기말
        </ExamName>
      </Header>
      <Main>
        <Title size={width500 ? "0.9rem" : null}>
          시간표 ({curExam.period})
        </Title>
        <TimeTableCon>
          {curExam.subjects ? (
            <TimeTable data={curExam} />
          ) : (
            <div>로딩중이거나 자료가 없습니다.</div>
          )}
        </TimeTableCon>
        <Title size={width500 ? "0.9rem" : null}>
          범위 및 자료
          <AddScopeBtn
            onClick={async () => {
              const id =
                menuNum == 0
                  ? "firMid"
                  : menuNum == 1
                  ? "firFin"
                  : menuNum == 2
                  ? "secMid"
                  : "secFin";
              const updateData = { scope: { ...curExam.scope } };
              const sub = prompt("설정할 과목 이름을 입력해주세요.");
              const text = prompt("해당 과목 설명을 입력주세요.");
              updateData.scope[sub] = text;
              await updateDoc(doc(db, "exam", id), updateData);
              setUpdate([...update]);
            }}
          >
            +
          </AddScopeBtn>
        </Title>
        <Scopes>
          {curExam.scope ? (
            Object.keys(curExam.scope).map((sub, subIdx) => (
              <div>
                <div>{sub}</div>
                <ScopeLine />
                <div>{curExam.scope[sub]}</div>
              </div>
            ))
          ) : (
            <div>로딩중이거나 자료가 없습니다.</div>
          )}
        </Scopes>
      </Main>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #a5a5a5;
  flex-wrap: wrap;
  width: ${(props) => props.width};
  gap: ${(props) => (props.size ? "1rem" : "2rem")};
  padding: 1rem 0.3rem;
  & > div {
    font-size: ${(props) => props.size};
  }
`;

const ExamName = styled.div`
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${(props) => props.weight};
  flex-shrink: 0;
  flex-basis: auto;
  &:hover {
    font-weight: 500;
  }
`;

const Main = styled.div`
  padding: 2rem;
`;

const TimeTableCon = styled.div`
  display: flex;
  justify-content: center;
`;

const ExamTable = styled.table`
  border: 1px solid #eaeaea;
  padding: 1rem;
  border-radius: 10px;
  & td {
    font-size: ${(props) => props.size};
    padding: ${(props) => (props.size ? "0.5rem" : "1rem")};
  }
`;

const ExamTableTd = styled.td`
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: ${(props) => (props.bold ? "400" : "200")};
  white-space: nowrap;
`;

const Title = styled.div`
  font-size: ${(props) => (props.size ? props.size : "1.25rem")};
  font-weight: 500;
  margin-block: ${(props) => (props.size ? "1.2rem" : "3rem")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;
const Scopes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid #eaeaea;
    padding: 1rem 1.2rem;
    border-radius: 10px;
    & > div:nth-child(1) {
      /* 과목 이름 */
      width: 3rem;
      font-size: 1.1rem;
      font-weight: 500;
      flex-shrink: 0;
    }
    & > span {
      flex-shrink: 0;
    }
    & > div:nth-child(2) {
      line-height: 1.2rem;
    }
  }
`;

const ScopeLine = styled.div`
  width: 2px;
  height: 1rem;
  background: #a5a5a5;
`;

const AddScopeBtn = styled.div`
  width: 2rem;
  height: 2rem;
  box-sizing: border-box;
  padding: 0.3rem;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

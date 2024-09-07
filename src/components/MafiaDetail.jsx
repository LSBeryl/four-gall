import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ExternalLink } from "lucide-react";

export default function MafiaDetail() {
  const [livePeople, setLivePeople] = useState([]);
  const [deadPeople, setDeadPeople] = useState([]);

  const [update, setUpdate] = useState([]);

  const [pwCount, setPwCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false);

  const password = import.meta.env.VITE_MAFIA_PW;
  const we = [
    "강민상",
    "고준기",
    "구본찬",
    "김도윤",
    "김병규",
    "김승원",
    "김진호",
    "남송연",
    "노재원",
    "문석호",
    "박동주",
    "박연진",
    "박종윤",
    "손기령",
    "송민서",
    "신현솔",
    "윤예진",
    "이기원",
    "이기찬",
    "이서현",
    "이재영",
    "이준행",
    "이하은",
    "이현명",
    "이희탁",
    "조성민",
    "조우창",
    "조정환",
    "최희윤",
    "황석준",
    "전윤정",
  ];

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.background = "#000";
    return () => {
      body.style.background = "#fefefe";
    };
  }, []);

  useEffect(() => {
    const peopleDocRef = doc(db, "Mafia", "people");
    async function getLiveAndDead() {
      const peopleDocSnap = await getDoc(peopleDocRef);
      const people = peopleDocSnap.data();

      setLivePeople(people.live);
      setDeadPeople(people.dead);
    }

    getLiveAndDead();
  }, [update]);

  useEffect(() => {
    const keyDownEvent = (e) => {
      if (!isAdmin && !isKeyDown) {
        setIsKeyDown(true);
        console.log(e.key == password.charAt(pwCount));
        console.log(pwCount);
        if (e.key == password.charAt(pwCount)) {
          if (pwCount + 1 == password.length) {
            setIsAdmin(true);
          }
          setPwCount((prev) => prev + 1);
        } else setPwCount(0);
        if (e.key == "-") setPwCount(0);
      }
    };

    const keyUpEvent = async (e) => {
      if (!isAdmin && isKeyDown) {
        setIsKeyDown(false);
      }
    };

    window.addEventListener("keydown", keyDownEvent);
    window.addEventListener("keyup", keyUpEvent);
    return () => {
      window.removeEventListener("keydown", keyDownEvent);
      window.removeEventListener("keyup", keyUpEvent);
    };
  }, [isKeyDown, pwCount]);

  async function allLive() {
    await Promise.all(
      we.map(
        async (name) =>
          await updateDoc(doc(db, "Mafia", "people"), {
            live: arrayUnion(name),
          })
      )
    );
    await Promise.all(
      we.map(
        async (name) =>
          await updateDoc(doc(db, "Mafia", "people"), {
            dead: arrayRemove(name),
          })
      )
    );
    setUpdate((prev) => [...prev]);
  }

  async function allDead() {
    await Promise.all(
      we.map(
        async (name) =>
          await updateDoc(doc(db, "Mafia", "people"), {
            live: arrayRemove(name),
          })
      )
    );
    await Promise.all(
      we.map(
        async (name) =>
          await updateDoc(doc(db, "Mafia", "people"), {
            dead: arrayUnion(name),
          })
      )
    );
    setUpdate((prev) => [...prev]);
  }

  return (
    <Wrapper>
      <Title>
        <div>MAFIA</div>
        <div>2-4</div>
      </Title>
      {isAdmin && (
        <AdminContainer>
          <Admin
            onClick={() => {
              async function updatePeople() {
                const peopleDocRef = doc(db, "Mafia", "people");
                const who = prompt("누가 살았습니까?");
                const peopleDocSnap = await getDoc(peopleDocRef);
                const people = peopleDocSnap.data();
                if (people.dead.indexOf(who) != -1) {
                  await updateDoc(peopleDocRef, {
                    live: arrayUnion(who),
                  });
                  await updateDoc(peopleDocRef, {
                    dead: arrayRemove(who),
                  });
                  setUpdate((prev) => [...prev]);
                } else {
                  alert("존재하지 않는 사람입니다.");
                }
              }
              updatePeople();
            }}
          >
            1명 살리기
          </Admin>
          <Admin
            onClick={() => {
              async function updatePeople() {
                const peopleDocRef = doc(db, "Mafia", "people");
                const who = prompt("누가 죽었습니까?");
                const peopleDocSnap = await getDoc(peopleDocRef);
                const people = peopleDocSnap.data();
                if (people.live.indexOf(who) != -1) {
                  await updateDoc(peopleDocRef, {
                    live: arrayRemove(who),
                  });
                  await updateDoc(peopleDocRef, {
                    dead: arrayUnion(who),
                  });
                  setUpdate((prev) => [...prev]);
                } else {
                  alert("존재하지 않는 사람입니다.");
                }
              }
              updatePeople();
            }}
          >
            1명 죽이기
          </Admin>
          <Admin onClick={allLive}>모두 살리기</Admin>
          <Admin onClick={allDead}>모두 죽이기</Admin>
        </AdminContainer>
      )}
      <SectionContainer>
        <Section>
          <Subtitle>현재 현황</Subtitle>
          <LiveDeathTable>
            <div>
              <div>생존자 ({livePeople.length}명)</div>
              <div>
                {livePeople.map((person, idx) => (
                  <div key={idx}>{person}</div>
                ))}
              </div>
            </div>
            <div>
              <div>사망자 ({deadPeople.length}명)</div>
              <div>
                {deadPeople.map((person, idx) => (
                  <div key={idx}>{person}</div>
                ))}
              </div>
            </div>
            <div>
              <div>실종자 (1명)</div>
              <div>
                <div>김민서</div>
              </div>
            </div>
          </LiveDeathTable>
        </Section>
        <Section>
          <Subtitle>경기 규칙</Subtitle>
          <RulePDF href="/mafia_rule.pdf" target="_blank">
            규칙 pdf <ExternalLink size={"1rem"} />
          </RulePDF>
          <Rule>
            <RuleTitle>1. 기본 규칙</RuleTitle>
            <RuleTextContainer>
              <RuleText>
                참가 인원 : 31명 <span>(김민서 제외, 전윤정 선생님 포함)</span>
              </RuleText>
              <RuleText>
                현실 시간 하루에 게임 시간 이틀이 흐름{" "}
                <span>(매일 조례, 종례마다 하루가 지남)</span>
              </RuleText>
            </RuleTextContainer>
            <RuleTitle>2. 직업 인원 분배</RuleTitle>

            <div
              style={{ display: "flex", justifyContent: "center", gap: "3rem" }}
            >
              <div style={{ width: "50%" }}>
                <RuleTitle>마피아팀 6명</RuleTitle>
                <RuleTextContainer>
                  <RuleText>
                    마피아 4명{" "}
                    <span>
                      (4명이 합의를 보고 살해할 2명 선택, 이 때 직접 살해한
                      사람은 넷 중 랜덤 으로 기록됨 - 단 번갈아가며)
                    </span>
                  </RuleText>
                  <RuleText>
                    해커 1명{" "}
                    <span>
                      (2일(매일 조례)마다 한번 시민팀 한명을 지목해서 직업을
                      알아낼 수 있음)
                    </span>
                  </RuleText>
                  <RuleText>
                    스파이 1명{" "}
                    <span>
                      (2일(매일 종례)마다 시민팀 직업군 하나를 선택해서 남은
                      인원수 확인 가능)
                    </span>
                  </RuleText>
                </RuleTextContainer>
              </div>
              <div style={{ width: "50%" }}>
                <RuleTitle>시민팀 25명</RuleTitle>
                <RuleTextContainer>
                  <RuleText>
                    경찰 2명{" "}
                    <span>
                      (2명이 합의를 보고 조사할 1명 선택, 조사대상자가
                      마피아인지 아닌지 확인 가능, 해커와 스파이는 마피아가
                      아니라고 알려짐)
                    </span>
                  </RuleText>
                  <RuleText>
                    의사 2명 <span>(살릴 사람 각각 1명씩 선택 가능)</span>
                  </RuleText>
                  <RuleText>
                    영매 1명{" "}
                    <span>
                      (평생 단 한 번 죽은 사람 하나를 선택해서 누구에게 죽었나,
                      죽은 사람의 직 업은 무엇인가 확인 가능)
                    </span>
                  </RuleText>
                  <RuleText>
                    분석가 2명{" "}
                    <span>
                      (각각 평생 단 한 번 직업군 하나를 선택해서 남은 인원수
                      확인 가능)
                    </span>
                  </RuleText>
                  <RuleText>
                    시민 18명{" "}
                    <span>
                      (시민 전용 특수카드 사용 가능, 공개채용 지원 가능)
                    </span>
                  </RuleText>
                </RuleTextContainer>
              </div>
            </div>
            <RuleTitle>3. 특수 룰</RuleTitle>
            <RuleTitle>A. 재판</RuleTitle>
            <RuleTextContainer>
              <RuleText>
                화요일 종례와 목요일 종례(변동가능)에는 '재판'이 존재함
              </RuleText>
              <RuleText>
                처형투표로 지목된 X가 사람 Y를 지목하고 Y또한 사람 Z를 지목하여
              </RuleText>
              <RuleText>
                X Y Z중 하나라도 마피아라면 '유죄', 이 중 마피아가 없다면
                '무죄'판결이 내려짐
              </RuleText>
              <RuleText>판결은 모두에게 공표됨, 이후 X는 처형됨.</RuleText>
            </RuleTextContainer>
            <RuleTitle>B. 죽은 자의 원한</RuleTitle>
            <RuleTextContainer>
              <RuleText>
                죽은 사람들은 시민과 마찬가지로 매 밤마다 투표를 함,
              </RuleText>
              <RuleText>
                죽은 사람들의 투표로 가장 많은 표를 받아 선택된 사람은
              </RuleText>
              <RuleText>그날 밤 능력을 발동할 수 없음.</RuleText>
            </RuleTextContainer>
            <RuleTitle>C. 시민을 위한 특수 카드</RuleTitle>
            <RuleTextContainer>
              <RuleText>
                일정 주기마다 반에 특수 카드를 숨겨놓음 (혹은 퍼즐을 풀면 카드를
                지급함)
              </RuleText>
              <RuleText>
                이 특수 카드의 위치는 마피아에게만 공개되며 시민팀이 찾지 못하게
                방해할 수 있으나,
              </RuleText>
              <RuleText>
                {" "}
                위치를 직접 옮길 수는 없음. 시민은 카드를 얻으면 진행자에게
                보고해서 사용할 수 있음.
              </RuleText>
              <RuleText></RuleText>
              <RuleText>카드 예시 :</RuleText>
              <RuleText></RuleText>
              <RuleText>마피아가 아닌 마피아팀을 한 명 알아낼 수 있음</RuleText>
              <RuleText>
                다음 ‘재판’에서 ‘무죄’판결이 나오면 아무도 처형되지 않음
              </RuleText>
              <RuleText>
                다음 밤 마피아는 2명이 아닌 1명만 죽일 수 있음
              </RuleText>
              <RuleText>다음 밤 경찰은 2명을 조사할 수 있음</RuleText>
              <RuleText>
                {" "}
                (게임이 심하게 불리할 경우) 다음에 죽는 시민은 마피아와 동반으로
                죽음
              </RuleText>
            </RuleTextContainer>
            <RuleTitle>D. 공개채용</RuleTitle>
            <RuleTextContainer>
              <RuleText>
                진행자 입장에서 보기에 경찰이 더 필요하다, 의사가 더 필요하다,
              </RuleText>
              <RuleText>
                판단될 때 공개 채용을 통해 인원을 확충할 수 있음.
              </RuleText>
              <RuleText>
                하지만 밸런스를 위해 공개 채용된 시민의 직업군은 모 두에게
                밝혀짐.
              </RuleText>
            </RuleTextContainer>
            <RuleTitle>4. 승리 조건</RuleTitle>
            <RuleTitle>시민팀 승리 조건 : </RuleTitle>
            <RuleTextContainer>
              <RuleText>
                게임이 끝나는 날까지 마피아 4명을 모두 처형해야함 (스파이,
                해커는 살아있어도 됨)
              </RuleText>
            </RuleTextContainer>
            <RuleTitle>마피아팀 승리 조건 : </RuleTitle>
            <RuleTextContainer>
              <RuleText>
                게임이 끝나는 날까지 마피아 4명 중 한명이라도 살아있을 시
                마피아팀 승리
              </RuleText>
            </RuleTextContainer>
          </Rule>
        </Section>
      </SectionContainer>
    </Wrapper>
  );
}

const Rule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  & span {
    color: #ff0000c2;
    font-size: 0.9rem;
    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;

const RuleTitle = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-block: 1rem;
`;

const RuleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const RuleText = styled.div`
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
  gap: 4rem;
  &,
  & * {
    font-family: "SF_HambakSnow";
    color: #f00;
  }
`;

const Title = styled.div`
  font-size: 5rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
  @media (max-width: 540px) {
    gap: 0;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
  align-items: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled.div`
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const LiveDeathTable = styled.div`
  width: 60vw;
  border: 3px solid #f00;
  border-inline: 3px solid #b70000;
  /* border-radius: 0.3rem; */
  display: flex;
  gap: 0;
  box-sizing: border-box;
  padding: 2rem;
  & > div {
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    & > div:nth-child(1) {
      font-size: 1.5rem;
      @media (max-width: 768px) {
        font-size: 1.3rem;
      }
    }
    & > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      padding: 1rem;
      @media (max-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 1024px) {
    width: 80vw;
  }
  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Admin = styled.div`
  color: #ff5959;
  border-radius: 0.5rem;
  border: 1px solid #ff5959;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #ff5959;
    color: #ffffff8e;
  }
`;

const AdminContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const RulePDF = styled.a`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

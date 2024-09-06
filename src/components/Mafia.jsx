import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase";

export default function Mafia() {
  const [liveNum, setLiveNum] = useState(-1);
  const [deadNum, setDeadNum] = useState(-1);

  useEffect(() => {
    const peopleDocRef = doc(db, "Mafia", "people");
    async function getLiveAndDead() {
      const peopleDocSnap = await getDoc(peopleDocRef);
      const people = peopleDocSnap.data();
      console.log(people);

      setLiveNum(people.live.length);
      setDeadNum(people.dead.length);
    }

    getLiveAndDead();
  }, []);

  return (
    <Wrapper>
      <Box>
        <Title>MAFIA 2-4</Title>
        <LiveDeath>
          <Live>생존자 {liveNum}명</Live>
          <Death>사망자 {deadNum}명</Death>
        </LiveDeath>
        <Detail to="/mafia">현황 자세히 보기 &gt;</Detail>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  width: 50%;
  background: #000;
  color: #f00;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  &,
  & * {
    font-family: "SF_HambakSnow";
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: 1.4rem;
`;

const LiveDeath = styled.div`
  display: flex;
  gap: 2rem;
  & > div {
    font-size: 1.2rem;
  }
`;

const Live = styled.div``;

const Death = styled.div``;

const Detail = styled(Link)`
  font-size: 0.8rem;
  color: #f00;
  text-decoration: none;
`;

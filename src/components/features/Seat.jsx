import styled, { keyframes } from "styled-components";
import { useState } from "react";

const ourNames = [
  "강민상",
  "고준기",
  "구본찬",
  "김도윤",
  "김민서",
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
];

function wait(s) {
  return new Promise((res) => setTimeout(res, s * 1000));
}

export default function Seat() {
  const [seat, setSeat] = useState([]);
  const [isFinish, setIsFinish] = useState(false);

  function change() {
    const randSeat = [];
    const randNumArr = [];
    for (let i = 0; i < 31; i++) {
      let randNum = Math.floor(Math.random() * 31 + 1) - 1;
      while (true) {
        if (randNumArr.indexOf(randNum) == -1) break;
        randNum = Math.floor(Math.random() * 31 + 1) - 1;
      }
      randNumArr.push(randNum);
    }
    randNumArr.forEach((v) => {
      randSeat.push(ourNames[v]);
    });
    setSeat([...randSeat]);
  }

  return (
    <Wrap>
      <div>
        <Table>
          <Tr>
            <Td>{seat[0]}</Td>
            <Td>{seat[1]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[2]}</Td>
            <Td>{seat[3]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[4]}</Td>
            <Td>{seat[5]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[6]}</Td>
            <Td>{seat[7]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[8]}</Td>
            <Td>{seat[9]}</Td>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Td>{seat[10]}</Td>
            <Td>{seat[11]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[12]}</Td>
            <Td>{seat[13]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[14]}</Td>
            <Td>{seat[15]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[16]}</Td>
            <Td>{seat[17]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[18]}</Td>
            <Td>{seat[19]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[20]}</Td>
            <Td style={{ background: "#eaeaea" }}></Td>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Td>{seat[21]}</Td>
            <Td>{seat[22]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[23]}</Td>
            <Td>{seat[24]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[25]}</Td>
            <Td>{seat[26]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[27]}</Td>
            <Td>{seat[28]}</Td>
          </Tr>
          <Tr>
            <Td>{seat[29]}</Td>
            <Td>{seat[30]}</Td>
          </Tr>
        </Table>
      </div>
      <div style={{ display: isFinish ? "" : "none" }}>자리 배치 완료!</div>
      <div>
        <button
          onClick={async () => {
            setIsFinish(false);
            let i = 0.05;
            for (let j = 0; j < 50; j++) {
              change();
              await wait(0.05);
            }
            while (i <= 0.5) {
              change();
              i += 0.02;
              await wait(i);
            }
            await wait(1);
            change();
            setIsFinish(true);
          }}
        >
          자리 배치
        </button>
      </div>
      <Warn>자리 배치 기능은 큰 화면에서만 제공됩니다.</Warn>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  & > div:nth-child(1) {
    display: flex;
  }
  & button {
    border: 1px solid #eaeaea;
    background: #fafafa;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const Table = styled.table`
  margin-inline: 1vw;
  @media (max-width: 700px) {
    display: none;
  }
`;

const Tr = styled.tr``;

const Td = styled.td`
  text-align: center;
  border: 1px solid #eaeaea;
  padding: 1vw 2vw;
  font-size: 1.2rem;
  border-radius: 10px;
`;

const Warn = styled.div`
  @media (max-width: 700px) {
    display: block;
  }
  display: none;
`;

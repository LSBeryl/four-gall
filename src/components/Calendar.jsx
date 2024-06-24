import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Calendar() {
  const [what, setWhat] = useState("");
  const [day, setDay] = useState(-1);
  const [classTime, setClassTime] = useState(1);
  const [date, setDate] = useState(new Date());

  const [comciData, setComciData] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [noloadtime, setnoloadtime] = useState(false);

  useEffect(() => {
    const axiosFetch = async () => {
      try {
        const response = await axios.get(
          "https://port-0-fourgall-back-2aat2cluqx5by1.sel5.cloudtype.app/t"
        ); // axios.get으로 데이터 받아옴
        setComciData(response.data); // 받아온 데이터를 state에 저장
      } catch (error) {
        console.error("Error fetching timetable data:", error); // 에러 메시지
      }
    };
    axiosFetch();
  }, []);

  useEffect(() => {
    setSchedule(comciData);
  }, [comciData]);

  useEffect(() => {
    const id = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const d = date.getDay();
    const h = date.getHours();
    const m = date.getMinutes();
    if (d >= 1 && d <= 5) {
      // 평일
      if (h == 6) {
        if (m >= 30) setWhat("등교 준비");
      } else if (h == 7) {
        if (m < 30) setWhat("등교 준비");
        if (m >= 30) setWhat("아침 식사");
      } else if (h == 8) {
        if (m < 15) setWhat("아침 식사");
        else if (m >= 15 && m <= 40) setWhat("아침 프로그램");
        else if (m > 40 && m < 50) setWhat("개인 정비");
        else if (m >= 50) setWhat("조회");
      } else if (h == 9) {
        if (m >= 0 && m < 50) setWhat(`1교시`);
        else setWhat("쉬는");
      } else if (h == 10) {
        if (m >= 0 && m < 50) setWhat(`2교시`);
        else setWhat("쉬는");
      } else if (h == 11) {
        if (m >= 0 && m < 50) setWhat(`3교시`);
        else setWhat("쉬는");
      } else if (h == 12) {
        if (m >= 0 && m < 50) setWhat(`4교시`);
        else if (m > 50) setWhat("점심");
      } else if (h == 13) {
        if (m >= 0 && m < 50) setWhat("점심");
        else if (m >= 50) setWhat(`5교시`);
      } else if (h == 14) {
        if (m < 40) setWhat(`5교시`);
        else if (m >= 40 && m < 50) setWhat("쉬는");
        else if (m >= 50) setWhat(`6교시`);
      } else if (h == 15) {
        if (m < 40) setWhat(`6교시`);
        else if (m >= 40 && m < 50) setWhat("쉬는");
        else if (m >= 50) setWhat(`7교시`);
      } else if (h == 16) {
        if (m < 40) setWhat(`7교시`);
        else if (m > 40 && m <= 55) setWhat("청소");
        else if (m > 55) setWhat("종례");
      } else if (h == 17) {
        if (m >= 0 && m < 10) setWhat("방과후 준비");
        else if (m >= 10) setWhat("방과후");
      } else if (h == 18) {
        if (m <= 35) setWhat("방과후");
        else if (m > 35) setWhat("저녁");
      } else if (h == 19) {
        if (m < 50) setWhat("저녁");
        if (m >= 50) setWhat("야자 1타임");
      } else if (h == 20) {
        setWhat("야자 1타임");
      } else if (h == 21) {
        if (m <= 10) setWhat("야자 1타임");
        else if (m > 10 && m < 30) setWhat("야자 1타임 쉬는");
        else if (m >= 30) setWhat("야자 2타임");
      } else if (h == 22) {
        setWhat("야자 2타임");
      } else if (h == 23) {
        setWhat("기숙사 입실");
      }
    } else {
      // 주말
      setWhat("잔류");
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    const d = date.getDay();
    const h = date.getHours();
    const m = date.getMinutes();

    setDay(d);

    if (d >= 1 && d <= 5) {
      if (h == 9 && m >= 0 && m <= 50) setClassTime(1);
      else if (h == 10 && m >= 0 && m <= 50) setClassTime(2);
      else if (h == 11 && m >= 0 && m <= 50) setClassTime(3);
      else if (h == 12 && m >= 0 && m <= 50) setClassTime(4);
      else if ((h == 13 && m >= 50) || (h == 14 && m <= 40)) setClassTime(5);
      else if ((h == 14 && m >= 50) || (h == 15 && m <= 40)) setClassTime(6);
      else if ((h == 15 && m >= 50) || (h == 16 && m <= 40)) setClassTime(7);
      else setClassTime(-1);
    }
  }, []);

  useEffect(() => {
    document.title = window.location.href.includes("localhost")
      ? "시간표 :: 4반 갤러리 테스트"
      : "시간표 :: 4반 갤러리";
    setTimeout(() => {
      setnoloadtime(true);
    }, 2000);
  }, []);

  return (
    <>
      <Wrap>
        <WhatShould>
          지금은 <span style={{ color: "#ee1183" }}>{what}</span> 시간입니다.
        </WhatShould>
        {noloadtime && !schedule[0] ? (
          <NoLoad>
            시간표가 로딩되지 않나요?{" "}
            <Dev to="https://open.kakao.com/o/smWkgmRe">개발자</Dev>에게
            문의하세요.
          </NoLoad>
        ) : (
          <></>
        )}
        <Table>
          <tbody>
            <tr>
              <td></td>
              <td style={{ fontWeight: day == 1 ? "bold" : "" }}>월</td>
              <td style={{ fontWeight: day == 2 ? "bold" : "" }}>화</td>
              <td style={{ fontWeight: day == 3 ? "bold" : "" }}>수</td>
              <td style={{ fontWeight: day == 4 ? "bold" : "" }}>목</td>
              <td style={{ fontWeight: day == 5 ? "bold" : "" }}>금</td>
            </tr>
            {schedule[0]
              ? [1, 2, 3, 4, 5, 6, 7].map(
                  (
                    time //1, 2, 3, 4, 5, 6, 7 > n교시
                  ) => (
                    <tr key={time}>
                      <td>{time}교시</td>
                      {[0, 1, 2, 3, 4].map(
                        (
                          curDay // 0, 1, 2, 3, 4 > 월~금
                        ) => (
                          <td
                            key={curDay}
                            style={{
                              fontWeight: day == curDay + 1 ? "bold" : "",
                              color:
                                classTime == time && day == curDay + 1
                                  ? "#ee1183"
                                  : "",
                            }}
                          >
                            {schedule[curDay][time - 1].subject}
                          </td>
                        )
                      )}
                    </tr>
                  )
                )
              : [1, 2, 3, 4, 5, 6, 7].map(
                  (
                    time //1, 2, 3, 4, 5, 6, 7 > n교시
                  ) => (
                    <tr key={time}>
                      <td>{time}교시</td>
                      {[0, 1, 2, 3, 4].map(
                        (
                          curDay // 0, 1, 2, 3, 4 > 월~금
                        ) => (
                          <td key={curDay}>
                            <Loading />
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
          </tbody>
        </Table>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  height: calc(100vh - 80px);
`;

const WhatShould = styled.div`
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const Table = styled.table`
  font-size: 1.8rem;
  background: #fff;
  border: 1px solid #ebedef;
  padding: 1rem;
  border-radius: 20px;
  & td {
    padding: 1vw;
  }
  @media (max-width: 768px) {
    font-size: 1.3rem;
    border-spacing: 0.2rem;
  }
  @media (max-width: 420px) {
    font-size: 1rem;
    border-spacing: 0.4rem;
  }
`;

const Loading = styled.div`
  @keyframes l1 {
    20% {
      background-position: 0% 0%, 50% 50%, 100% 50%;
    }
    40% {
      background-position: 0% 100%, 50% 0%, 100% 50%;
    }
    60% {
      background-position: 0% 50%, 50% 100%, 100% 0%;
    }
    80% {
      background-position: 0% 50%, 50% 50%, 100% 100%;
    }
  }
  width: 2rem;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
  background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l1 1s infinite linear;
`;

const NoLoad = styled.div`
  margin-block: -1.3rem;
  color: #9a9a9a;
  font-size: 0.85rem;
`;

const Dev = styled(Link)`
  color: #707070;
  font-weight: 500;
`;

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import Dice from "./features/Dice.jsx";
import Links from "./features/Links.jsx";
import Book from "./features/Book.jsx";
import Seat from "./features/Seat.jsx";
import Gang from "./features/Gang.jsx";
import Vote from "./features/Vote.jsx";
import Note from "./features/Note.jsx";
import Exam from "./features/Exam.jsx";

function FeatureComponents({ num }) {
  switch (num) {
    case 1:
      return <Seat />;
    case 2:
      return <Dice />;
    case 3:
      return <Vote />;
    case 4:
      return <Gang />;
    case 5:
      return <Book />;
    case 6:
      return <Links />;
    case 7:
      return <Note />;
    case 8:
      return <Exam />;
  }
}

export default function Feature() {
  const [where, setWhere] = useState(0); // 0번 : 아무 곳에도 이동 X, 1~6번 : 각각 자리, 번호, 투표, 조직, 예산, 링크, 노트

  useEffect(() => {
    document.title = window.location.href.includes("localhost")
      ? "유용한 기능 :: 4반 갤러리 테스트"
      : "유용한 기능 :: 4반 갤러리";
  }, []);

  return (
    <>
      <Wrap style={{ padding: where == 0 ? "" : "5rem" }}>
        <Back
          style={{ display: where == 0 ? "none" : "block" }}
          onClick={() => {
            setWhere(0);
          }}
        >
          <ArrowLeft width="1rem" /> 돌아가기
        </Back>
        <Features style={{ display: where == 0 ? "" : "none" }}>
          <FeatureCon
            onClick={() => {
              setWhere(1);
            }}
          >
            <FeatureTxt>자리 배치 🪑</FeatureTxt>
          </FeatureCon>
          <FeatureCon
            onClick={() => {
              setWhere(2);
            }}
          >
            <FeatureTxt>번호 뽑기 🎲</FeatureTxt>
          </FeatureCon>
          <FeatureCon
            onClick={() => {
              setWhere(3);
            }}
          >
            <FeatureTxt>투표 🗳️</FeatureTxt>
          </FeatureCon>
          <FeatureCon
            onClick={() => {
              setWhere(4);
            }}
          >
            <FeatureTxt>학급회 조직도 📋</FeatureTxt>
          </FeatureCon>
          <FeatureCon
            onClick={() => {
              setWhere(5);
            }}
          >
            <FeatureTxt>학급회 예산 기록표 💸</FeatureTxt>
          </FeatureCon>
          <FeatureCon
            onClick={() => {
              setWhere(6);
            }}
          >
            <FeatureTxt>각종 링크 🔗</FeatureTxt>
          </FeatureCon>
          <FeatureCon
            onClick={() => {
              setWhere(7);
            }}
          >
            <FeatureTxt>수행평가 기록 ✍️</FeatureTxt>
          </FeatureCon>
          <FeatureCon
            onClick={() => {
              setWhere(8);
            }}
          >
            <FeatureTxt>지필고사 안내 ✏️</FeatureTxt>
          </FeatureCon>
        </Features>
        <FeatureComponents num={where != 0 ? where : null} />
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Features = styled.div`
  padding: 5rem 0;
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
`;

const FeatureCon = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  width: 20vw;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  color: #000;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  @media (max-width: 1000px) {
    width: 40vw;
  }
  @media (max-width: 500px) {
    width: 60vw;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px;
  }
`;

const FeatureTxt = styled.div`
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Back = styled.span`
  cursor: pointer;
  font-size: 0.8rem;
  position: absolute;
  top: 7rem;
  z-index: 0;
  & > svg {
    height: 0.9rem;
    margin-top: 0.1rem;
    margin-bottom: -0.1rem;
  }
`;

import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [left, setLeft] = useState("0");
  const [top, setTop] = useState("0");

  const [isPlay, setPlay] = useState(false);

  function lightMove(e) {
    setLeft(`${e.screenX}px`);
    setTop(`${e.screenY}px`);
  }

  return (
    <Wrap>
      <div>
        오류 및 문의 사항{" "}
        <Yeah to="https://open.kakao.com/o/smWkgmRe">2421 이서현</Yeah>
      </div>
      <div>
        Want something Cool?{" "}
        <Event
          onClick={() => {
            setPlay(true);
          }}
        >
          Click this
        </Event>
      </div>
      <LightBg
        onMouseMove={lightMove}
        style={{ display: isPlay ? "" : "none" }}
      ></LightBg>
      <Light
        style={{
          boxShadow: `inset calc(-100vw + ${left}) calc(-100vw + ${top} - 120px) 50vw 95vw #000`,
          display: isPlay ? "" : "none",
        }}
      ></Light>
      {/* <Privacy to="https://dimi24-privacy.netlify.app">개인정보처리방침</Privacy> */}
    </Wrap>
  );
}

const Wrap = styled.div`
  color: #aaa;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
  margin-block: 1rem;
  font-size: 0.8rem;
`;

const Yeah = styled(Link)`
  color: #707070;
  font-weight: 500;
  margin-left: 0.3rem;
`;

const Event = styled.div`
  color: #707070;
  font-weight: 500;
  display: inline-block;
  text-decoration: underline;
  cursor: pointer;
`;

const Privacy = styled(Link)`
  text-decoration: none;
  color: #aaa;
`;

const LightBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 12;
`;

const Light = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 200vw;
  height: 200vw;
  box-shadow: inset -150vw -150vw 50vw 95vw #000;
  z-index: 11;
`;

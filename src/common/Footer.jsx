import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [left, setLeft] = useState("0");
  const [top, setTop] = useState("0");
  const [blink, setBlink] = useState(false);

  const [ghost, setGhost] = useState(false);

  const [isPlay, setPlay] = useState(false);

  function wait(s) {
    return new Promise((res) => {
      setTimeout(res, s * 1000);
    });
  }

  function lightMove(e) {
    setLeft(`${e.clientX}px`);
    setTop(`${e.clientY + 140}px`);
  }

  async function blinkFunc() {
    setBlink(true);
    await wait(0.1);
    setBlink(false);
    await wait(0.1);
    setBlink(true);
  }

  useEffect(() => {
    async function eventFunc() {
      if (isPlay) {
        setGhost(false);
        setBlink(true);
        let ghostCount = 0;
        while (1) {
          if (ghostCount >= 15) break;
          const randNum = Math.floor(Math.random() * 3 + 1);
          for (let i = 0; i < randNum; i++) await blinkFunc();
          await wait(randNum);
          ghostCount += randNum;
        }
        setBlink(false);
        await wait(2);
        setGhost(true);
        const scream = new Audio("/audio/scream.mp4");
        scream.play();
        await wait(2);
        location.reload(true);
      }
    }

    if (isPlay) eventFunc();
  }, [isPlay]);

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
        ghost={ghost ? "true" : ""}
        onMouseMove={lightMove}
        // onClick={() => {
        //   isPlay
        //     ? (() => {
        //         setPlay(false);
        //         setLeft("-50vw");
        //         setTop("-50vw");
        //       })()
        //     : null;
        // }}
        style={{ display: isPlay ? "" : "none" }}
      ></LightBg>
      <Light
        style={{
          boxShadow: `inset calc(-100vw + ${left}) calc(-100vw + ${top} - 120px) 50vw ${
            blink ? "95vw" : "100vw"
          } #000`,
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
  background: ${(props) => (props.ghost ? 'url("img/jy.jpg")' : "")};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 50%;
  cursor: none;
`;

const Light = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 200vw;
  height: 200vw;
  background: #ffd0006b;
  box-shadow: inset -150vw -150vw 50vw 95vw #000;
  z-index: 11;
`;

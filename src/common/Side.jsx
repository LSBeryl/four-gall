import styled from "styled-components";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { data } from "./ads.json";
import { useLocation } from "react-router-dom";

export default function Side() {
  const width1400 = useMediaQuery({ query: "(max-width: 1400px)" });
  const maxAdNum = data.length - 1;
  const [adNum, setAdNum] = useState(0);
  const [isMafia, setIsMafia] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (adNum < maxAdNum) setAdNum(adNum + 1);
      else if (adNum == maxAdNum) setAdNum(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [adNum]);

  useEffect(() => {
    if (location.pathname.includes("mafia")) {
      setIsMafia(true);
    }
    return () => {
      setIsMafia(false);
    };
  }, [location]);

  return (
    <Wrap style={{ display: width1400 || isMafia ? "none" : "" }}>
      <Ad style={{ float: "left" }}>
        <img src={"/img/ad/" + data[adNum].src} />
      </Ad>
      <Ad style={{ float: "right" }}>
        <img src={"/img/ad/" + data[adNum].src} />
      </Ad>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: sticky;
  top: 10rem;
  padding-inline: 2rem;
`;

const Ad = styled.div`
  height: 500px;
  border: 1px solid #eaeaea;
  display: inline-flex;
  align-items: center;
  background: #fff;
`;

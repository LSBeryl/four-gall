import styled from "styled-components";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import axios from "axios";

export default function Auth() {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [meal, setMeal] = useState({});
  const mealName = ["breakfast", "lunch", "dinner"];

  useEffect(() => {
    if (window.location.href.includes("localhost")) {
      document.title = "4반 갤러리 테스트";
    }
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });
  /**
   *  yyyy-mm-dd 형식으로 날짜 리턴
   */
  function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateArr = [year, month, day];
    if (String(dateArr[1]).length == 1) dateArr[1] = "0" + dateArr[1];
    if (String(dateArr[2]).length == 1) dateArr[2] = "0" + dateArr[2];
    return dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];
  }

  /**
   * 아침, 점심, 저녁 각각 0, 1, 2 리턴
   */
  function getTime() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 8) {
      return 0;
    } else if (hour >= 8 && hour < 14) {
      return 1;
    } else {
      return 2;
    }
  }

  useEffect(() => {
    const axiosFetch = async () => {
      try {
        const response = await axios.get(
          `https://api.xn--299a1v27nvthhjj.com/meal/${getDate()}`
        );
        setMeal(response.data);
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    };
    axiosFetch();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, "dltjgus8098@naver.com", password);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrap>
      <Contain>
        <CodeContain>
          <Title>
            <img src="/img/dimigo.png" alt="/img/dimigo.png" />
            KDMHS 2-4
          </Title>
          <FormDiv onSubmit={submit}>
            <input
              type="password"
              placeholder="입장 코드 입력"
              onInput={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value={isLoading ? "입장 중..." : "입장"} />
          </FormDiv>
        </CodeContain>
        <VerticalLine />
        <RowLine />
        <MealContain>
          {!isMobile ? (
            ["아침", "점심", "저녁"].map((type, i) => (
              <MealBox key={i}>
                <MealType>{type}</MealType>
                <MealMenuCon>
                  {meal[mealName[i]]
                    ? meal[mealName[i]]
                        .split("/")
                        .map((menu, menuIdx) => (
                          <MealMenu key={menuIdx}>- {menu}</MealMenu>
                        ))
                    : "데이터가 없습니다"}
                </MealMenuCon>
              </MealBox>
            ))
          ) : getTime() == 0 ? (
            <MealBox>
              <MealType>아침</MealType>
              <MealMenuCon>
                {meal["breakfast"]
                  ? meal["breakfast"]
                      .split("/")
                      .map((menu, menuIdx) => (
                        <MealMenu key={menuIdx}>- {menu}</MealMenu>
                      ))
                  : "데이터가 없습니다"}
              </MealMenuCon>
            </MealBox>
          ) : getTime == 1 ? (
            <MealBox>
              <MealType>점심</MealType>
              <MealMenuCon>
                {meal["lunch"]
                  ? meal["lunch"]
                      .split("/")
                      .map((menu, menuIdx) => (
                        <MealMenu key={menuIdx}>- {menu}</MealMenu>
                      ))
                  : "데이터가 없습니다"}
              </MealMenuCon>
            </MealBox>
          ) : (
            <MealBox>
              <MealType>저녁</MealType>
              <MealMenuCon>
                {meal["dinner"]
                  ? meal["dinner"]
                      .split("/")
                      .map((menu, menuIdx) => (
                        <MealMenu key={menuIdx}>- {menu}</MealMenu>
                      ))
                  : "데이터가 없습니다"}
              </MealMenuCon>
            </MealBox>
          )}
        </MealContain>
      </Contain>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
`;

const Contain = styled.div`
  width: 90vw;
  height: 70vh;
  border-radius: 30px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1600px) {
    flex-direction: column;
    gap: 2rem;
    height: 90vh;
  }
`;

const VerticalLine = styled.span`
  width: 1px;
  background: #eaeaea;
  margin-inline: 1rem;
  @media (max-width: 1600px) {
    display: none;
  }
`;

const RowLine = styled.span`
  width: 100%;
  height: 1px;
  background: #eaeaea;
  @media (min-width: 1600px) {
    display: none;
  }
`;

const CodeContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: 1600px) {
    gap: 3rem;
  }
`;

const MealContain = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const MealBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 70%;
  gap: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  width: 30%;
  padding: 2rem;
  @media (max-width: 1600px) {
    width: 30%;
    height: 90%;
    align-items: center;
  }
  @media (max-width: 1000px) {
    width: 100%;
    align-items: center;
  }
`;

const MealType = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 600;
`;

const MealMenuCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MealMenu = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  & > img {
    height: 8vh;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
    & > img {
      height: 5vh;
    }
  }
`;

const FormDiv = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  & > input {
    border: 0;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
    &:focus {
      border: 1px solid #7e7e7e;
      outline: none;
    }
  }
  & > button {
    border: 1px solid #d2d2d2;
    background: #fff;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background: #000;
      color: #fff;
      border: 1px solid #000;
    }
  }
`;

const Login = styled(Link)`
  text-decoration: none;
  color: #000;
  border-radius: 20px;
  border: 1px solid #00000069;
  padding: 0.5rem 1.5rem;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  &:hover {
    color: #fff;
    background: #000;
    border: 1px solid #000;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

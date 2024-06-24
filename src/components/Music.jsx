import styled from "styled-components";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getDocs, collection, getDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function getYtId(src) {
  let replaceUrl = src;
  let finUrl = "";
  replaceUrl = replaceUrl.replace("https://youtu.be/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/embed/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/watch?v=", "");
  finUrl = replaceUrl.split("&")[0];
  if (replaceUrl.includes("?si=")) finUrl = finUrl.split("?si=")[0];
  return finUrl;
}

function getImgUrl(src) {
  return `https://img.youtube.com/vi/${getYtId(src)}/mqdefault.jpg`;
}

async function getYtTitle(src) {
  const noEmbed = "https://noembed.com/embed?url=";
  const urlForm = "https://www.youtube.com/watch?v=";
  return fetch(noEmbed + urlForm + getYtId(src))
    .then((res) => res.json())
    .then((data) => {
      return data.title;
    });
}

export default function Music() {
  const [musicData, setMusicData] = useState([
    { src: "Loading", name: "Loading" },
  ]);
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    async function fetchMusicDataIds() {
      const musicDataCollection = collection(db, "MusicData");
      const querySnapshot = await getDocs(musicDataCollection);
      const docIds = querySnapshot.docs.map((doc) => doc.id);
      const promises = docIds.map(async (id) => {
        const musicData = doc(db, "MusicData", id);
        const musicDataSnapshot = await getDoc(musicData);
        return musicDataSnapshot.data();
      });

      const results = await Promise.all(promises);
      return results;
    }

    async function fetchData() {
      const data = await fetchMusicDataIds();
      const newData = await Promise.all(
        data.map(async (v) => {
          return {
            ...v,
            title: await getYtTitle(v.src),
          };
        })
      );
      setMusicData(newData);
    }

    fetchData();
  }, [update]);

  useEffect(() => {
    document.title = window.location.href.includes("localhost")
      ? "음악 신청 :: 4반 갤러리 테스트"
      : "음악 신청 :: 4반 갤러리";
  }, []);

  return (
    <Wrap>
      <Button
        onClick={async () => {
          const name = prompt("신청자의 이름을 입력해주세요.");
          if (name != null) {
            const src = prompt("신청곡의 유튜브 링크를 입력해주세요.");
            if (
              (src != null &&
                src.split("https://www.youtube.com/watch?v=")[0] == "") ||
              src.split("https://youtu.be/")[0] == ""
            ) {
              await addDoc(collection(db, "MusicData"), {
                name: name,
                src: src,
                creationTime: new Date(),
              });
              setUpdate([...update]);
              alert("성공적으로 등록되었습니다.");
            } else alert("등록에 실패했습니다.");
          } else alert("등록에 실패했습니다.");
        }}
      >
        <Plus width="1.1rem" />
      </Button>
      {musicData
        .sort((a, b) => {
          const timeA = a.creationTime ? a.creationTime.seconds : null;
          const timeB = b.creationTime ? b.creationTime.seconds : null;
          return timeB - timeA;
        })
        .map((v, i) => (
          <MusicBox>
            <Link to={v.src}>
              <Thumb src={getImgUrl(v.src)} />
            </Link>
            <Title>{v.title}</Title>
            <div>
              <Name>{v.name}</Name>의 신청곡
            </div>
            {i == musicData.length - 1 ? (
              <EventImg src="/img/event/suk.png" />
            ) : (
              ""
            )}
          </MusicBox>
        ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 3rem;
`;

const MusicBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block: 1rem;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0 2rem;
  margin-block: 0.5rem;
`;

const Name = styled.span`
  color: #ee1183;
  font-weight: 500;
`;

const Button = styled.button`
  border: 0;
  padding: 1rem 1rem 0.8rem 1rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #eaeaea;
  width: 20rem;
  cursor: pointer;
  bottom: 2rem;
`;

const Thumb = styled.img`
  width: clamp(300px, 50vw, 350px);
`;
const EventImg = styled.img`
  position: relative;
  height: 2rem;
  margin-bottom: -2rem;
  bottom: 12.5rem;
  right: 8.5rem;
`;

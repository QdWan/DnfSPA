import React, { useState, useRef } from "react";
import axios from "axios";

const SearchCharResult = ({ match }) => {
  /* 제일 위에 "____ 서버에 대한 _____ 검색 결과입니다."
    서버는 콤보 박스로. 바꾸면 페이지 다시 그리게

    목록에는 캐릭터 이미지와 서버, 이름만 나오게
    */
  const { server, name } = match.params;
  const [charServer, setCharServer] = useState(server);
  const [charName, setCharName] = useState(name);
  const [list, setList] = useState([]);
  const gotData = useRef(false);
  const servers = {
    anton: "안톤",
    bakal: "바칼",
    cain: "카인",
    casillas: "카시야스",
    diregie: "디레지에",
    hilder: "힐더",
    prey: "프레이",
    siroco: "시로코",
    all: "모든"
  };

  if (gotData.current === false) {
    axios
      .get(
        `https://api.neople.co.kr/df/servers/${charServer}/characters?characterName=${charName}&wordType=full&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        console.log(response.data.rows);
        setList(response.data.rows);
      });

    gotData.current = true;
  }

  return (
    <div>
      <div className="combobox">
        {servers[charServer]} 서버에 대한 {charName} 검색 결과입니다.
      </div>
      <div className="results"></div>
    </div>
  );
};

export default SearchCharResult;

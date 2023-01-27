import React from "react";
import "./game.css";
export const Game = () => {
  const [size, setSize] = React.useState(3);
  const [userFindId, setUserFindId] = React.useState([]);
  const [gameOver, setgameOver] = React.useState(false);
  const [gameWin, setGameWin] = React.useState(false);
  const [warningBorderStyle, setwarningborderstyle] = React.useState("none");
  const [WinnerData, setWinnerData] = React.useState([1, 4, 2, 7, 9]);
  const [IsColor, setIsColor] = React.useState(false);
  const [score, setscore] = React.useState(0);
  const styleTable = {
    gridTemplateColumns: `repeat(${size}, ${300 / size}px)`,
    gridTemplateRows: `repeat(${size}, ${300 / size}px)`,
  };
  const [ButtonSet, setBtns] = React.useState([
    { name: "Asan", value: 3, backgroundColor: "white" },
    { name: "Orta", value: 4, backgroundColor: "white" },
    { name: "Çətin", value: 5, backgroundColor: "white" },
    { name: "Hard", value: 6, backgroundColor: "white" },
  ]);
  const setSizes = (id) => {
    const neww = ButtonSet.map((val) => {
      return val.value === id
        ? { ...val, backgroundColor: "green" }
        : { ...val, backgroundColor: "white" };
    });
    setBtns(neww);
    // console.log(id);
    setSize(id);
    setGameWin(false);
    setgameOver(false);
    setUserFindId([]);
    setscore(0);
  };
  const btns = ButtonSet.map((val, ind) => {
    return (
      <button
        style={{ backgroundColor: val.backgroundColor }}
        className="level_btn"
        key={ind}
        onClick={() => setSizes(val.value)}
      >
        {val.name}
      </button>
    );
  });
  const ClearArr = (arr) => {
    let ar = [];
    for (let i of arr) {
      if (!ar.includes(i)) {
        ar.push(i);
      }
    }
    return ar;
  };
  const GenerateUnicList = (n) => {
    const gen = [];
    for (let i = 1; i < size * size + 1; i++) {
      gen.push(i);
    }
    let myArr = [];
    for (let i = 0; i < n; i++) {
      myArr.push(Math.floor(Math.random() * (size * size)) + 1);
    }
    let Rest = [];
    for (let i of gen) {
      if (!ClearArr(myArr).includes(i)) {
        Rest.push(i);
      }
    }
    let res = ClearArr(myArr);
    for (let i = 0; i < n - ClearArr(myArr).length; i++) {
      res.push(Rest[i]);
    }
    return res;
  };
  const NewWinnerData = () => {
    setWinnerData(GenerateUnicList(size + 2));
    setUserFindId([]);
    setIsColor(true);
    setTimeout(() => {
      setIsColor(false);
    }, 500);
    setgameOver(false);
  };
  const ArrayEquals = (arr1, arr2) => {
    arr1.sort();
    arr2.sort();
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };
  const FillColor = (id) => {
    if (WinnerData.includes(id)) {
      return "green";
    } else {
      return "yellow";
    }
  };
  let GameData = [];
  for (let i = 0; i < size * size; i++) {
    GameData[i] = {
      id: i + 1,
      color: IsColor ? FillColor(i + 1) : "yellow",
    };
  }
  const GetId = (id) => {
    if (WinnerData.includes(id)) {
      if (!userFindId.includes(id)) {
        setUserFindId([...userFindId, id]);
      }
    } else {
      for (let i of GameData) {
        if (i.id === id) {
          i.color = "black";
        //   console.log(GameData);
        }
      }
      setgameOver(true);
      setwarningborderstyle("4px solid red");
      setscore(0);
      setTimeout(() => {
        setgameOver(false);
        setwarningborderstyle("none");
      }, 1000);
    //   console.log("You are losed");
    }
    // console.log(id);
  };
  React.useEffect(() => {
    if (ArrayEquals(WinnerData, userFindId)) {
    //   console.log("ok");
      setUserFindId([]);
      setGameWin(true);
      setscore(score + 1);
      setIsColor(true);
      setTimeout(() => {
        setIsColor(false);
        setGameWin(false);
      }, 1000);
    } else {
    //   console.log("none");
    }
  }, [userFindId]);
  const Box = [...GameData].map((val, ind) => {
    return (
      <div
        key={ind}
        onClick={() => GetId(val.id)}
        style={{ backgroundColor: val.color }}
        className="box"
      ></div>
    );
  });
  return (
    <div className="cont">
      <div className="buttonset">{btns}</div>
      <div className="game">
        <div
          style={{ ...styleTable, border: warningBorderStyle }}
          className="table"
        >
          {Box}
        </div>
        <div className="res">
          <h1 className="score">Xal:{score}</h1>
          {gameOver && <h1>Game Over</h1>}
          {gameWin && <h1>Win</h1>}
        </div>
        <div onClick={NewWinnerData} className="properties">
          Yenidən
        </div>
      </div>
    </div>
  );
};


import React from 'react'
import './game.css';
export const Game = () => {
    const [size,setSize] = React.useState(3);
    const ButtonSet = [{name:"Asan",value:3},{name:"Orta",value:4},{name:"Çətin",value:5}];
    const setSizes = (val) => {
        console.log(val)
        setSize(val)
    }
    const btns = ButtonSet.map((val,ind)=>{
        return <button key={ind} onClick={()=>setSizes(val.value)} >{val.name}</button>
    })
    const styleTable = {
        gridTemplateColumns: `repeat(${size}, 75px)`,
        gridTemplateRows: `repeat(${size}, 75px)`
    }
    const ClearArr = (arr) => {
        let ar = [];
        for(let i of arr){
            if(!ar.includes(i)){
                ar.push(i)
            }
        }
        return ar
    }
    const GenerateUnicList = (n) => {
        const gen = [];
        for(let i=1;i<size*size+1;i++){
            gen.push(i)
        }
        let myArr = [];
        for(let i=0;i<n;i++){
            myArr.push(Math.floor(Math.random() * (size*size)) + 1)
        }
        let Rest = [];
        for(let i of gen){
            if(!ClearArr(myArr).includes(i)){
                Rest.push(i)
            }
        }
        let res = ClearArr(myArr)
        for(let i=0;i<n-ClearArr(myArr).length;i++){
            res.push(Rest[i])
            
        }
        return res
    }
    const [WinnerData,setWinnerData] = React.useState([1,4,2,7,9]);
    const [IsColor,setIsColor] = React.useState(false);
    const NewWinnerData = () => {
        setWinnerData(GenerateUnicList(5))
        setUserFindId([])
        setIsColor(true);
        setTimeout(()=>{
            setIsColor(false);
        },500)
        setgameOver(false)
    }
    const ArrayEquals = (arr1,arr2) => {
        arr1.sort();
        arr2.sort();
        if(arr1.length !== arr2.length){
            return false
        }
        for(let i=0;i<arr1.length;i++){
            if(arr1[i] !==arr2[i]){
                return false
            }
        }
        return true
    }
    const FillColor = (id) => {
            if(WinnerData.includes(id)){
                return "green"
            }
            else{
                return "red"
            }
    
        }
    let GameData = []
    for(let i=0;i<size*size;i++){
        GameData[i] = {
            id:i+1,
            color:IsColor ? FillColor(i+1) : "red"
        }
    }
    const [userFindId,setUserFindId] = React.useState([])
    const [gameOver,setgameOver] = React.useState(false);
    const [gameWin,setGameWin] = React.useState(false);
    const GetId = (id) => {
        if(WinnerData.includes(id)){
            if(!userFindId.includes(id)){
                setUserFindId([...userFindId,id])
            }
        }
        else{
            for(let i of GameData){
                if(i.id === id){
                    i.color = "black"
                    console.log(GameData)
                }
            }
            setgameOver(true);
            setTimeout(()=>{
                setgameOver(false)
            },1000)
            console.log("You are losed")
        }
        console.log(id)
    }
    React.useEffect(()=>{
        if(ArrayEquals(WinnerData,userFindId)){
            console.log("ok")
            setUserFindId([])
            setGameWin(true);
            setTimeout(()=>{
                setGameWin(false)
            },1000)
            setIsColor(true);
            setTimeout(()=>{
                setIsColor(false);
            },1000)
        }
        else{
            
            console.log("none")
        }

    },[userFindId])

    const Box = [...GameData].map((val,ind)=>{
        return <div key={ind} onClick={()=>GetId(val.id)} style={{backgroundColor:val.color}} className='box'></div>
    })
  return (
    <div className='game'>
        <div>
            {btns}
        </div>
        {gameOver && <h1>Game Over</h1>}
        {gameWin && <h1>Win</h1>}
        <div style={styleTable} className="table">

            {Box}
            
        </div>
        <div className="properties">
            <button className='btn btn-start' >Başla</button>

            <button className='btn btn-retry' onClick={NewWinnerData}>Yenidən</button>

        </div>
    </div>
  )
}

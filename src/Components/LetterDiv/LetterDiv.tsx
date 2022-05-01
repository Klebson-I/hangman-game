import React, {useEffect, useState} from "react";
import "./LetterDiv.css"
import {LetterStat} from "../../utils/types";

interface Props {
    letter:string;
    changeLetters:(letter:string)=>void;
    stat:LetterStat[];
    started:boolean;
}

const checkColor = (stat: LetterStat[]):string => {
    if(stat[0]!==undefined){
        if(stat[0]===null) return "";
        return stat[0].stat?"green":"red";
    }
    return "";
}

export const LetterDiv = ({letter,changeLetters,stat,started}:Props) => {
    const [isClick,setIsClick] = useState<boolean>(false);
    const [reset,setReset] = useState(false);

    const handleClick = () => {
        changeLetters(letter);
        setIsClick(true);
    }

    useEffect(()=>{
        setIsClick(false);
    },[started])

    return <button className={"LetterDiv"}
                   onClick={()=>handleClick()}
                   disabled={isClick}
                   style={{
                       backgroundColor : checkColor(stat)
                   }}
    >
        {letter}
    </button>
}
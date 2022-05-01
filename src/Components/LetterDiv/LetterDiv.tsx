import React, {useState} from "react";
import "./LetterDiv.css"
import {LetterStat} from "../../utils/types";

interface Props {
    letter:string;
    changeLetters:(letter:string)=>void;
    stat:LetterStat[];
}

const checkColor = (stat: LetterStat[]):string => {
    if(stat[0]!==undefined){
        if(stat[0]===null) return "";
        return stat[0].stat?"green":"red";
    }
    return "";
}

export const LetterDiv = ({letter,changeLetters,stat}:Props) => {
    const [isClick,setIsClick] = useState<boolean>(false);

    const handleClick = () => {
        changeLetters(letter);
        setIsClick(true);
    }

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
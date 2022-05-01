import React from "react";
import {LetterDiv} from "../LetterDiv/LetterDiv";
import "./Keyboard.css";
import {LetterStat} from "../../utils/types";

interface Props {
    alphabet:string;
    changeLetters:(letter:string)=>void;
    chosenLetters:string[];
    letterStat:LetterStat[];
    started:boolean;
}

export const Keyboard = ({alphabet,changeLetters,letterStat,started}:Props) => {

    return <div className="keyboardDiv">
        {
            alphabet.split("").map((letter,index) => {
                return <LetterDiv
                    letter={letter}
                    key={index}
                    changeLetters={changeLetters}
                    stat={
                        letterStat.filter(elem=>elem.letter===letter)
                    }
                    started={started}
                />
            })
        }
    </div>
}
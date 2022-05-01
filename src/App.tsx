import React, {useEffect, useState} from "react";
import { Keyboard } from "./Components/Keyboard/Keyboard";
import {LetterStat} from "./utils/types";
import {drawPassword, revealLetter, setStartStringPassword} from "./utils/utils";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const App = () => {
    const [chosenLetter,changeChosenLetter] = useState<string[]>([]);
    const [fail,setFail] = useState<number>(0);
    const [password,setPassword] = useState<string>("");
    const [originalPassword,setOriginalPassword] = useState<string>("");
    const [letterStat,setLetterStat] = useState<LetterStat[]>([]);
    const [started,setStarted] = useState<boolean>(false);
    const [gameStatus,setGameStatus] = useState<boolean|null>(null);

    const changeLetters = (letter:string) => {
        if(fail<10){
            changeChosenLetter(prev=>([
                ...prev,
                letter
            ]))
        }else{
            setGameStatus(false);
        }
        setStarted(true);
    }

    useEffect(()=>{
        //losowanie hasła
        const PASSWORD = drawPassword();
        setOriginalPassword(PASSWORD);
        setPassword(setStartStringPassword(PASSWORD));
    },[]);

    useEffect(()=>{
        if(started){
            const reveal = revealLetter(password,chosenLetter[chosenLetter.length-1],originalPassword);

            setLetterStat((prev)=>{
                return [
                    ...prev,
                    {
                        letter : chosenLetter[chosenLetter.length-1],
                        stat : reveal.isHit
                    }
                ]
            })

            if(!reveal.isHit){
                setFail(prev=>prev+1);
            }

            setPassword(reveal.pass);
        }
    },[chosenLetter]);


    return <>
        <h1>HANGMAN GAME</h1>
        <h1 className="password">
            {
                password.split("").join(" ")
            }
        </h1>
        <Keyboard
            alphabet={ALPHABET}
            changeLetters={changeLetters}
            chosenLetters={chosenLetter}
            letterStat={letterStat}
        />
        {
            gameStatus!=null?<div>
                {gameStatus ? <p>You win</p> : <p>You lose</p>}
            </div>:null
        }
    </>
}
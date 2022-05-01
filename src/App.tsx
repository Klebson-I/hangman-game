import React, {useEffect, useState} from "react";
import { Keyboard } from "./Components/Keyboard/Keyboard";
import {LetterStat} from "./utils/types";
import {drawPassword, revealLetter, setStartStringPassword} from "./utils/utils";
import './App.css';
import img0 from './images/s0.jpg';
import img1 from './images/s1.jpg';
import img2 from './images/s2.jpg';
import img3 from './images/s3.jpg';
import img4 from './images/s4.jpg';
import img5 from './images/s5.jpg';
import img6 from './images/s6.jpg';
import img7 from './images/s7.jpg';
import img8 from './images/s8.jpg';
import img9 from './images/s9.jpg';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const IMGARR = [img0,img1,img2,img3,img4,img5,img6,img7,img8,img9,]

export const App = () => {
    const [chosenLetter,changeChosenLetter] = useState<string[]>([]);
    const [fail,setFail] = useState<number>(0);
    const [password,setPassword] = useState<string>("");
    const [originalPassword,setOriginalPassword] = useState<string>("");
    const [letterStat,setLetterStat] = useState<LetterStat[]>([]);
    const [started,setStarted] = useState<boolean>(false);
    const [gameStatus,setGameStatus] = useState<boolean|null>(null);
    const [actualImage,setActualImage] = useState<string>(IMGARR[0]);

    const gameLost = () => {

    }

    const gameWon = () => {

    }

    const checkIfWon = () => {
        console.log(password.replaceAll("-"," "));
        console.log(originalPassword);
        console.log(started);
        console.log(originalPassword.length)
        console.log(password.replaceAll("-"," ").length)
        if ((password.replaceAll("-"," ")===originalPassword)&&started) {
            console.log("won");
            gameWon();
            setGameStatus(true);
        }
    }

    const changeLetters = (letter:string) => {
        if(fail<9){
            changeChosenLetter(prev=>([
                ...prev,
                letter
            ]))
        }else{
            setGameStatus(false);
            gameLost();
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
            if (!reveal.isHit) {
                setFail(prev=>prev+1);
            }
            setPassword(reveal.pass);
        }
    },[chosenLetter]);

    useEffect(()=>{
        checkIfWon();
    },[password])


    useEffect(()=>{
        setActualImage(IMGARR[fail]);
    },[fail])


    return <>
        <div className="resultsDiv">
            <div className="resultsDiv__results">
                <h1>HANGMAN GAME</h1>
                <h1 className="password">
                    {
                        password.split("").join(" ")
                    }
                </h1>
            </div>

            <img src={actualImage} alt="gameBoard"/>
        </div>

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
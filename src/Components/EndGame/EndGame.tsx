import React from "react";

interface Props {
    finalText:string;
    startNewGame:()=>void;
}

export const EndGame = ({finalText,startNewGame}:Props) => {

    return <div className="endGameDiv">
        {
            <p>{finalText}</p>
        }
        <button onClick={()=>startNewGame()}>Start new game</button>
    </div>
}
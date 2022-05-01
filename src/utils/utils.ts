export const setStartStringPassword = (pass:string):string => {
    return pass.split("").map(item => {
        if(item!==" "){
            return "_";
        }
        return "-";
    }).join("");
}

export const revealLetter = (pass:string,letter:string,original:string):{
    pass:string,
    isHit:boolean
} => {
    let isHit = false;
    for (let i = 0;i<original.length;i++) {
        if(original[i]===letter) {
            const passArr=pass.split("");
            passArr[i]=letter;
            pass = passArr.join("");
            isHit = true;
        }
    }
    return {
        pass,
        isHit
    };
}

const passList = [
    "SOMEWHERE OVER THE RAINBOW",
    "BUY ME A CAR",
    "TAKE A LOOK AT MY GIRLFRIEND",
    "BAT OUT OF HELL",
    "RIDERS ON A STORM",
    "ABOUT ART OF LOVE",
    "TENDER CARRYING OF CHILD",
    "YOUNG POETS DIE QUIET",
    "PLANE WINGS OF DESTINY"
]

export const drawPassword = ():string => {
    const index = Math.floor(Math.random()*(passList.length));
    return passList[index];
}
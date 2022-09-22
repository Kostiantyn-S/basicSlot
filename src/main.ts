import {Game} from "./app/Game";

let myGame: Game;
//@ts-ignore
if(window.onLoadedApp) {
    myGame = new Game(document.body);
} else {
    let enterFrame = setInterval((event) => {
        //@ts-ignore
        if(window.onLoadedApp) {
            clearInterval(enterFrame);
            myGame = new Game(document.body);
            document.getElementById("preloader").style.display = "none";
        }
    })
}

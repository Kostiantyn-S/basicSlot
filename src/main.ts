import {Game} from "./app/Game";

let myGame: Game = new Game();
//@ts-ignore
if(window.onLoadedApp) {
    myGame.setGame(document.body);
} else {
    let enterFrame = setInterval((event) => {
        //@ts-ignore
        if(window.onLoadedApp) {
            clearInterval(enterFrame);
            myGame.setGame(document.body);
            document.getElementById("preloader").style.display = "none";
        }
    })
}

console.log("this is javascript");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs")
    let response = await a.text()
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    console.log(songs);

    for (let index = 0; index < songs.length; index++) {
        const element = songs[index];
        // console.log(index, songs[index]);

    }
    return songs

}
var audio;
async function main() {
    let music = await getSongs()
    console.log(music);
    
    
    
    let songUl= document.querySelector(".songlist").getElementsByTagName("ul")[0]   
    for (const song of music) {
        let title=song.replaceAll("%20"," ") 
        songUl.innerHTML=songUl.innerHTML+ `<li> ${title.replaceAll(".mp3","") } </li> `
        
    }
    let songlist=[]    
    audio = new Audio(music[0])
    // audio.addEventListener("loadeddata", () => {
    //   console.log(audio.duration,audio.currentTime);
    // })   
    let count = 0
    let count2 = 0;
    let playyyy = document.getElementById("begin")
    playyyy.addEventListener("click", () => {
        if (count % 2 == 0) {
            audio.play();
            playyyy.src = "pause.svg"
        }
        else {
            audio.pause()
            playyyy.src = "play2.svg"
        }
        count++
    })
    let upNext = document.getElementById("upnext")
    upNext.addEventListener("click", () => {
        audio.pause()
        count2++
        audio = new Audio(music[count2])
        audio.play()
    })
    let previous = document.getElementById("prev")
    previous.addEventListener("click", () => {
        audio.pause()
        count2--;
        audio = new Audio(music[count2])
        audio.play()
    })
}
main()




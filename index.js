let currenttext = "";
let currentauthor = "";
window.speechSynthesis.onvoiceschanged = () => {
  let utterance = new SpeechSynthesisUtterance(
    `Quote by ${currentauthor}, ${currenttext}`
  );
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[1];
};
async function getapi() {
  try {
    const response = await fetch("https://api.quotable.io/quotes?page=1");
    const getresolve = await response.json();
    const results = getresolve.results;
    const q = document.querySelector("q");
    const em = document.querySelector("em");
    const btn = document.querySelector("button");
    const i = document.querySelector("i");
    currenttext = `${results[0].content}`;
    currentauthor = `${results[0].author}`;
    btn.addEventListener("click", () => {
      const getnumber = getRandom();
      const { author, content } = results[getnumber];
      q.innerText = `${content}`;
      em.innerText = `~${author}`;
      currenttext = `${content}`;
      currentauthor = `${author}`;
    });
    i.addEventListener("click", () => {
      i.setAttribute("class", "fa-solid fa-volume-high fa-fade");
      let utterance = new SpeechSynthesisUtterance(
        `Quote by ${currentauthor}, ${currenttext}`
      );
      speechSynthesis.speak(utterance);
      utterance.addEventListener("end", () => {
        i.setAttribute("class", "fa-solid fa-play");
      });
    });
  } catch (error) {
    console.log(error);
  }
}
getapi();
let previousIndex = 0;
function getRandom() {
  let i = 0;
  while (i == 0) {
    const min = 0;
    const max = 19;
    const random = Math.floor(Math.random() * (max - min)) + min;
    if (previousIndex == random) continue;
    else {
      i = 1;
      previousIndex = random;
      return random;
    }
  }
}

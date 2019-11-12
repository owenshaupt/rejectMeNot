function letterCount(str) {
  let wordsArray = str.split(" ");
  let wordsStr = wordsArray.join("");
  console.log(wordsStr.length);
}

for (let i = 0; i < emailTexts.length; i++) {
  letterCount(emailTexts[i]);
}

function wordCount(str) {
  let wordsArray = str.split(" ");
  let wordCount = wordsArray.length;
  console.log(wordCount);
}

for (let i = 0; i < emailTexts.length; i++) {
  wordCount(emailTexts[i]);
}

function removeAllButLettersSpaces(str) {
  str.replace(/[^\w\s]/g, "");
  console.log(str);
}

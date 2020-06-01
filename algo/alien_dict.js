const alien = ['wrt', 'wrf', 'er', 'ett', 'rftt'];
//const alien = ["z","x"];

// from "wrt"and"wrf" ,we can get 't'<'f'
// from "wrt"and"er" ,we can get 'w'<'e'
// from "er"and"ett" ,we can get 'r'<'t'
// from "ett"and"rftt" ,we can get 'e'<'r'

const map = {};

function setDep(letter, dep) {
  if (map[letter]) {
    const alreadyHas = map[letter].find((d) => d === dep);
    if (!alreadyHas) {
      map[letter].push(dep);
    }
  } else {
    map[letter] = [dep];
  }
}

for (let i = 0; i < alien.length - 1; i++) {
  const firstAlienWord = alien[i];
  const nextAlienWord = alien[i + 1];
  for (let fwl = 0; fwl < firstAlienWord.length; fwl++) {
    const firstWordLetter = firstAlienWord[fwl];
    const secondWordLetter = nextAlienWord[fwl];
    if (!secondWordLetter) {
      continue;
    }
    if (firstWordLetter === secondWordLetter) {
      continue;
    }
    setDep(firstWordLetter, secondWordLetter);
  }
}

let result = '';

// topologically sort map to get answer
console.log(map);

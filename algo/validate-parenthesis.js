/**
  * Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
  *  An input string is valid if:
  *  - Open brackets are closed by the same type of brackets.
  *  - Open brackets are closed in the correct order.
  *  - Note that an empty string is also considered valid.
  *
 **/

function validateParanthesis(string) {
  const stack = [];

  function isOpen(char) {
    return char == '[' || char == '{' || char == '[';
  }

  function counterPart(closing, opening) {
    if ((opening === '[') & (closing === ']')) {
      return true;
    }
    if ((opening === '{') & (closing === '}')) {
      return true;
    }
    if ((opening === '(') & (closing === ')')) {
      return true;
    }
    return false;
  }

  for (let i = 0; i < string.length; i++) {
    if (isOpen(string[i])) {
      stack.push(string[i]);
    } else {
      if (counterPart(string[i], stack[stack.length - 1])) {
        stack.pop();
      }
    }
  }

  return stack.length === 0;
}

console.log(validateParanthesis('((()))'));
console.log(validateParanthesis('[()]{}'));
console.log(validateParanthesis('({[)]'));
console.log(validateParanthesis(''));

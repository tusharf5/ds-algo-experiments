function TrieNode(value) {
  this.children = [];
  this.isWordEnd = false;
  this.value = value;
}

function Trie() {
  this.HEAD = new TrieNode();
}

Trie.prototype.addWord = function(word) {
  let node = this.HEAD;
  word.split('').forEach((letter, index) => {
    const isLast = index === word.length - 1;
    const isThereAChild = node.children.find(n => n.value === letter);
    if (!isThereAChild) {
      const newNode = new TrieNode(letter);
      if (isLast) newNode.isWordEnd = true;
      node.children.push(newNode);
      node = newNode;
    } else {
      node = isThereAChild;
    }
  });
};

const trie = new Trie();

trie.addWord('Answer');
trie.addWord('Alien');
trie.addWord('Binary');
trie.addWord('Binding');
trie.addWord('Bro');
trie.addWord('What');
trie.addWord('Ansari');

function traverse(tries) {
  if (tries.children.length > 1) {
    tries.value &&
      console.log(
        tries.value.toUpperCase(),
        '## Multiple Paths To Take',
        tries.children.map(c => c.value.toUpperCase()).join(' ')
      );
  } else {
    tries.value &&
      console.log(
        tries.value.toUpperCase(),
        tries.isWordEnd ? '## A Word Ends Here' : ''
      );
  }
  tries.children.forEach(c => {
    traverse(c);
    console.log('------');
  });
}

traverse(trie.HEAD);

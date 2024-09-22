/** 
 * Initialize function with default text and cursor.
 * The function waits for 1000 and then the text alters
 * according to the node strings below
*/
async function init() {
  const node = document.querySelector("#type-text");

  await sleep(1000);
  node.innerText = "";
  await node.type("");

  while (true) {
    await node.type("Welcome,to_Tic-Tac-Toe_Game");
    await sleep(2000);
    await node.delete("Welcome,to_Tic-Tac-Toe_Game");
    await node.type("it_is_recommended_you_play");
    await sleep(2000);
    await node.delete("it_is_recommended_you_play");
    await node.type("in_laptop_or_computer!");
    await sleep(2000);
    await node.delete("in_laptop_or_computer!");
  }
}

/** 
 * Source code is originally taken from codepen website. 
 * Credits to Luciano Felix.
 * Here you can visit the original code of the effect
 * https://codepen.io/FelixLuciano/pen/PoqdMKP
 * I customized the code so that it fits to my website
 * Below you may find the main code with time intervals, type text, etc.
 * Enjoy!
*/

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

class TypeAsync extends HTMLSpanElement {
  get typeInterval() {
    const randomMs = 100 * Math.random();
    return randomMs < 50 ? 10 : randomMs;
  }

  async type(text) {
    for (let character of text) {
      this.innerText += character;
      await sleep(this.typeInterval);
    }
  }

  async delete(text) {
    for (let character of text) {
      this.innerText = this.innerText.slice(0, this.innerText.length - 1);
      await sleep(this.typeInterval);
    }
  }
}

customElements.define("type-async", TypeAsync, { extends: "span" });

init();

import { JSDOM } from "jsdom";
const fs = require("fs");
const html = fs.readFileSync("./index.html");
const dom = new JSDOM(html);

global.dom = dom;
global.document = dom.window.document;
global.window = dom.window;
global.adElementClicked = 0;

let div1 = document.createElement("div");
div1.setAttribute("id", "ad");

div1.addEventListener("click", () => {
  global.adElementClicked++;
});

global.adElement = div1;

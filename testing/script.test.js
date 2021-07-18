import { JSDOM } from "jsdom";
const { expect } = require("@jest/globals");

const script = require("./../script");

beforeEach(() => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "position",
    {
      value: "relative",
      configurable: true,
    }
  );

  Object.defineProperty(global.dom.window.HTMLDivElement.prototype, "height", {
    value: "250px",
    configurable: true,
  });
  Object.defineProperty(global.dom.window.HTMLDivElement.prototype, "width", {
    value: "250px",
    configurable: true,
  });
});

test("Returns the element visibility as 0%", () => {
  Object.defineProperty(
    global.dom.window.HTMLHtmlElement.prototype,
    "clientWidth",
    {
      value: 500,
      configurable: true,
    }
  );
  Object.defineProperty(
    global.dom.window.HTMLHtmlElement.prototype,
    "clientHeight",
    {
      value: 500,
      configurable: true,
    }
  );

  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: 5000,
        right: 5200,
        bottom: 5200,
        left: 5000,
      })),
      configurable: true,
    }
  );
  expect(script.default()).toBe("0%");
});

test("Returns the element visibility as 100%", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 50,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 0,
    configurable: true,
  });

  expect(script.default()).toBe("100%");
});

test("Returns the element visibility as 25%", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: -150,
        right: 80,
        bottom: 80,
        left: -150,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 0,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 50,
    configurable: true,
  });

  expect(script.default()).toBe("25%");
});

test("Returns the element visibility as 75%", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: -50,
        right: 80,
        bottom: 80,
        left: -50,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 0,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 50,
    configurable: true,
  });

  expect(script.default()).toBe("75%");
});

test("Returns the element visibility as 50%", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: -100,
        right: 80,
        bottom: 80,
        left: -100,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 0,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 50,
    configurable: true,
  });

  expect(script.default()).toBe("50%");
});

test("Returns the element visibility as 25%", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: -150,
        right: 80,
        bottom: 80,
        left: -150,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 50,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 50,
    configurable: true,
  });

  expect(script.default()).toBe("25%");
});

test("Returns the element visibility as 0%", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: -200,
        right: 80,
        bottom: 80,
        left: -50,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 100,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 50,
    configurable: true,
  });

  expect(script.default()).toBe("0%");
});

test("Returns the element visibility as 100%", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: 150,
        right: 80,
        bottom: 80,
        left: 150,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 0,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 0,
    configurable: true,
  });

  expect(script.default()).toBe("100%");
});

test("Returns the element click count as 0", () => {
  Object.defineProperty(
    global.dom.window.HTMLDivElement.prototype,
    "getBoundingClientRect",
    {
      value: jest.fn(() => ({
        height: 200,
        width: 200,
        top: 150,
        right: 80,
        bottom: 80,
        left: 150,
      })),
    }
  );

  Object.defineProperty(global.window, "scrollX", {
    value: 0,
    configurable: true,
  });
  Object.defineProperty(global.window, "scrollY", {
    value: 0,
    configurable: true,
  });

  expect(global.adElementClicked).toBe(0);
});

test("Returns the element click count as 1", () => {
  global.adElement.click();
  expect(global.adElementClicked).toBe(1);
});

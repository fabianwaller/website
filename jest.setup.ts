// jest.setup.js
import React from "react";

let idCounter = 0;
jest.spyOn(React, "useId").mockImplementation(() => {
  return `test-id-${idCounter++}`;
});

beforeEach(() => {
  idCounter = 0;
});

global.IntersectionObserver = class {
  constructor() {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};

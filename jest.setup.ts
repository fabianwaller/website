// jest.setup.js
import React from "react";

let idCounter = 0;
jest.spyOn(React, "useId").mockImplementation(() => {
  return `test-id-${idCounter++}`;
});

beforeEach(() => {
  idCounter = 0;
});

global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];

  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {}

  observe() {
    return;
  }
  unobserve() {
    return;
  }
  disconnect() {
    return;
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

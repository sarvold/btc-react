import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// import jsdom from 'jsdom';
// const { JSDOM } = jsdom;
// const dom = new JSDOM('<!doctype html><html><body></body></html>');
// global.window = dom.window;
// global.document = dom.window.document;

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

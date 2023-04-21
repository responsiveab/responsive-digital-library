import React from 'react';
import App from './App';
import {render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Index from './pages/Index';

/* This is a test that is testing the Index page. */
describe("Index", () => {
 
  it("Sample Test", () => {
    expect(true).toBe(true);
  });

 test("EF1: Renders a list of books", async () => {
   
    // Mock the axios.get method to return a list of books
    const mockAxios = new MockAdapter(axios);
    const mockData = {
      data: [
        {
          _id: '1',
          title: 'Book 1',
          body: 'Body of Book 1',
          author: 'Author 1',
          shelf: 'Shelf 1',
          category: 'Category 1',
          language: 'Language 1',
          publisher: 'Publisher 1',
          published: '2022-04-01',
          imgstr: 'Image string 1',
          tags: ['Tag 1', 'Tag 2'],
        },
        {
          _id: '2',
          title: 'Book 2',
          body: 'Body of Book 2',
          author: 'Author 2',
          shelf: 'Shelf 2',
          category: 'Category 2',
          language: 'Language 2',
          publisher: 'Publisher 2',
          published: '2022-04-02',
          imgstr: 'Image string 2',
          tags: ['Tag 3', 'Tag 4'],
        },
        {
          _id: '3',
          title: 'Book 3',
          body: 'Body of Book 3',
          author: 'Author 3',
          shelf: 'Shelf 3',
          category: 'Category 3',
          language: 'Language 3',
          publisher: 'Publisher 3',
          published: '2022-04-02',
          imgstr: 'Image string 3',
          tags: ['Tag 3', 'Tag 4'],
        }, 
      ],
    };
    mockAxios.onGet('http://localhost:8080/api/books/').reply(200, mockData);

    render(<BrowserRouter><Index /></BrowserRouter>);

    // Wait for the books to load
    await screen.findByText('Book 1');

    // Check that the books are displayed
    expect(screen.getByText('Book 1')).toBeInTheDocument();
 });

});
import React from 'react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import BookGrid from '../src/components/BookGrid';
import { BOOKS } from '../src/data/books';

describe('BookGrid', () => {
  it('renders every book and reports presses', async () => {
    const onPressBook = jest.fn();
    const books = BOOKS.slice(0, 3);
    const { getByLabelText } = await render(<BookGrid books={books} onPressBook={onPressBook} />);

    for (const book of books) {
      expect(getByLabelText(book.title)).toBeTruthy();
    }
    await fireEvent.press(getByLabelText(books[1].title));
    expect(onPressBook).toHaveBeenCalledWith(books[1]);
  });

  it('shows author in list layout and an empty message', async () => {
    const list = await render(<BookGrid books={[BOOKS[0]]} layout="list" />);
    expect(list.getAllByText(BOOKS[0].author).length).toBeGreaterThan(0);
    await list.unmount();

    const empty = await render(<BookGrid books={[]} />);
    expect(empty.getByText('Không có sách phù hợp')).toBeTruthy();
  });
});

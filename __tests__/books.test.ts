import { describe, expect, it } from '@jest/globals';
import { ALL_CATEGORIES, BOOKS, formatVND, getCategories, removeDiacritics, searchBooks } from '../src/data/books';
import { MAX_PER_BOOK, cartCount, cartReducer, cartTotal } from '../src/store/cart';

describe('books helpers', () => {
  it('formats VND with dot separators', () => {
    expect(formatVND(86000)).toBe('86.000 đ');
    expect(formatVND(1250000)).toBe('1.250.000 đ');
    expect(formatVND(0)).toBe('0 đ');
  });

  it('removes Vietnamese diacritics', () => {
    expect(removeDiacritics('Đắc Nhân Tâm')).toBe('dac nhan tam');
  });

  it('searches by title or author without diacritics', () => {
    expect(searchBooks(BOOKS, 'dac nhan').map((b) => b.id)).toEqual(['1']);
    expect(searchBooks(BOOKS, 'nguyen nhat anh').map((b) => b.id)).toEqual(['4', '5']);
    expect(searchBooks(BOOKS, '', 'Thiếu nhi').every((b) => b.category === 'Thiếu nhi')).toBe(true);
    expect(searchBooks(BOOKS, 'không có cuốn này')).toEqual([]);
  });

  it('lists unique categories starting with "all"', () => {
    const categories = getCategories(BOOKS);
    expect(categories[0]).toBe(ALL_CATEGORIES);
    expect(new Set(categories).size).toBe(categories.length);
  });

  it('has unique ids', () => {
    expect(new Set(BOOKS.map((b) => b.id)).size).toBe(BOOKS.length);
  });
});

describe('cartReducer', () => {
  it('adds, merges and caps quantities', () => {
    let state = cartReducer([], { type: 'add', bookId: '1' });
    state = cartReducer(state, { type: 'add', bookId: '1', quantity: 2 });
    expect(state).toEqual([{ bookId: '1', quantity: 3 }]);
    state = cartReducer(state, { type: 'add', bookId: '1', quantity: 100 });
    expect(state[0].quantity).toBe(MAX_PER_BOOK);
  });

  it('updates, removes and clears', () => {
    let state = cartReducer([], { type: 'add', bookId: '1' });
    state = cartReducer(state, { type: 'add', bookId: '2' });
    state = cartReducer(state, { type: 'setQuantity', bookId: '2', quantity: 4 });
    expect(cartCount(state)).toBe(5);
    expect(cartTotal(state, BOOKS)).toBe(86000 + 79000 * 4);

    state = cartReducer(state, { type: 'setQuantity', bookId: '1', quantity: 0 });
    expect(state.map((l) => l.bookId)).toEqual(['2']);
    state = cartReducer(state, { type: 'remove', bookId: '2' });
    expect(state).toEqual([]);
    expect(cartReducer([{ bookId: '1', quantity: 1 }], { type: 'clear' })).toEqual([]);
  });

  it('hydrates only valid lines', () => {
    expect(
      cartReducer([], {
        type: 'hydrate',
        lines: [
          { bookId: '1', quantity: 2 },
          { bookId: '2', quantity: 0 },
        ],
      })
    ).toEqual([{ bookId: '1', quantity: 2 }]);
  });
});

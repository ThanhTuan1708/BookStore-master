import type { Book } from '../data/books';

export interface CartLine {
  bookId: string;
  quantity: number;
}

export type CartAction =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; bookId: string; quantity?: number }
  | { type: 'setQuantity'; bookId: string; quantity: number }
  | { type: 'remove'; bookId: string }
  | { type: 'clear' };

export const MAX_PER_BOOK = 20;

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines.filter((line) => typeof line.bookId === 'string' && line.quantity > 0);
    case 'add': {
      const add = action.quantity ?? 1;
      if (add <= 0) {
        return state;
      }
      const existing = state.find((line) => line.bookId === action.bookId);
      if (existing) {
        return state.map((line) =>
          line.bookId === action.bookId
            ? { ...line, quantity: Math.min(MAX_PER_BOOK, line.quantity + add) }
            : line
        );
      }
      return [...state, { bookId: action.bookId, quantity: Math.min(MAX_PER_BOOK, add) }];
    }
    case 'setQuantity':
      if (action.quantity <= 0) {
        return state.filter((line) => line.bookId !== action.bookId);
      }
      return state.map((line) =>
        line.bookId === action.bookId
          ? { ...line, quantity: Math.min(MAX_PER_BOOK, action.quantity) }
          : line
      );
    case 'remove':
      return state.filter((line) => line.bookId !== action.bookId);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartTotal(lines: CartLine[], books: Book[]): number {
  return lines.reduce((sum, line) => {
    const book = books.find((b) => b.id === line.bookId);
    return book ? sum + book.price * line.quantity : sum;
  }, 0);
}

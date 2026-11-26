export interface Book {
  id: string;
  title: string;
  author: string;
  /** Giá bán (VNĐ) */
  price: number;
  category: string;
  description: string;
  rating: number;
  pages: number;
  /** Màu bìa sách minh hoạ */
  color: string;
}

export const ALL_CATEGORIES = 'Tất cả';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 86000,
    category: 'Kỹ năng sống',
    description:
      'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử, giúp bạn tạo thiện cảm và gây ảnh hưởng tích cực tới người khác.',
    rating: 4.8,
    pages: 320,
    color: '#b45309',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim (Tái Bản 2020)',
    author: 'Paulo Coelho',
    price: 79000,
    category: 'Văn học',
    description:
      'Hành trình của chàng chăn cừu Santiago đi tìm kho báu và khám phá ý nghĩa của việc theo đuổi ước mơ.',
    rating: 4.7,
    pages: 228,
    color: '#0e7490',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: 90000,
    category: 'Kỹ năng sống',
    description: 'Những trải nghiệm và lời khuyên về học tập, du lịch, làm việc dành cho người trẻ.',
    rating: 4.5,
    pages: 285,
    color: '#be123c',
  },
  {
    id: '4',
    title: 'Mắt Biếc',
    author: 'Nguyễn Nhật Ánh',
    price: 110000,
    category: 'Văn học',
    description: 'Câu chuyện tình đơn phương trong trẻo mà day dứt của Ngạn dành cho Hà Lan.',
    rating: 4.8,
    pages: 300,
    color: '#4d7c0f',
  },
  {
    id: '5',
    title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
    author: 'Nguyễn Nhật Ánh',
    price: 125000,
    category: 'Văn học',
    description: 'Tuổi thơ nghèo khó mà trong trẻo của hai anh em Thiều và Tường ở một làng quê Việt Nam.',
    rating: 4.7,
    pages: 378,
    color: '#ca8a04',
  },
  {
    id: '6',
    title: 'Sapiens: Lược Sử Loài Người',
    author: 'Yuval Noah Harari',
    price: 199000,
    category: 'Khoa học',
    description: 'Hành trình phát triển của loài người từ thời kỳ đồ đá tới kỷ nguyên công nghệ.',
    rating: 4.6,
    pages: 560,
    color: '#57534e',
  },
  {
    id: '7',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 350000,
    category: 'Công nghệ',
    description: 'Các nguyên tắc và thực hành để viết mã nguồn dễ đọc, dễ bảo trì.',
    rating: 4.6,
    pages: 464,
    color: '#1d4ed8',
  },
  {
    id: '8',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 159000,
    category: 'Kỹ năng sống',
    description: 'Thay đổi tí hon, hiệu quả bất ngờ: cách xây dựng thói quen tốt và loại bỏ thói quen xấu.',
    rating: 4.8,
    pages: 320,
    color: '#7c3aed',
  },
  {
    id: '9',
    title: 'Lược Sử Thời Gian',
    author: 'Stephen Hawking',
    price: 115000,
    category: 'Khoa học',
    description: 'Giải thích dễ hiểu về vũ trụ, lỗ đen, Big Bang và bản chất của thời gian.',
    rating: 4.5,
    pages: 270,
    color: '#0f172a',
  },
  {
    id: '10',
    title: 'Dế Mèn Phiêu Lưu Ký',
    author: 'Tô Hoài',
    price: 55000,
    category: 'Thiếu nhi',
    description: 'Cuộc phiêu lưu đầy bài học của chú Dế Mèn qua thế giới loài vật.',
    rating: 4.7,
    pages: 144,
    color: '#15803d',
  },
  {
    id: '11',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    price: 420000,
    category: 'Công nghệ',
    description: 'Những lời khuyên thực tế giúp lập trình viên làm việc hiệu quả và chuyên nghiệp hơn.',
    rating: 4.7,
    pages: 352,
    color: '#9f1239',
  },
  {
    id: '12',
    title: 'Hoàng Tử Bé',
    author: 'Antoine de Saint-Exupéry',
    price: 68000,
    category: 'Thiếu nhi',
    description: 'Câu chuyện triết lý nhẹ nhàng về tình bạn, tình yêu và cách nhìn thế giới của trẻ thơ.',
    rating: 4.8,
    pages: 112,
    color: '#0369a1',
  },
];

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((book) => book.id === id);
}

export function getCategories(books: Book[]): string[] {
  return [ALL_CATEGORIES, ...Array.from(new Set(books.map((book) => book.category)))];
}

/** Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu. */
export function removeDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export function searchBooks(books: Book[], query: string, category = ALL_CATEGORIES): Book[] {
  const q = removeDiacritics(query.trim());
  return books.filter(
    (book) =>
      (category === ALL_CATEGORIES || book.category === category) &&
      (!q ||
        removeDiacritics(book.title).includes(q) ||
        removeDiacritics(book.author).includes(q))
  );
}

export function formatVND(value: number): string {
  return `${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
}

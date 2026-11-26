# BookStore

Ứng dụng nhà sách viết bằng **Expo SDK 57 + React Native + Expo Router**.

## Tính năng

- **Trang chủ**: header BookStore (nút tìm kiếm và giỏ hàng có badge), lọc theo thể loại,
  chuyển đổi dạng lưới (`BookGridCard`) / danh sách (`BookCard`).
- **Tìm kiếm**: theo tên sách hoặc tác giả, không phân biệt dấu ("nguyen nhat anh" vẫn tìm được).
- **Chi tiết sách**: bìa, tác giả, thể loại, điểm, số trang, giá, giới thiệu; chọn số lượng,
  "Thêm vào giỏ" / "Mua ngay".
- **Giỏ hàng**: tăng/giảm, xoá, tổng tiền định dạng VNĐ, đặt hàng; lưu bằng AsyncStorage.
- 12 đầu sách mẫu; bìa sách được vẽ bằng code (không phụ thuộc ảnh ngẫu nhiên trên mạng).

## Cấu trúc

```
src/
  app/
    _layout.tsx        # CartProvider + Stack
    (tabs)/index.tsx   # Trang chủ
    (tabs)/search.tsx  # Tìm kiếm
    (tabs)/cart.tsx    # Giỏ hàng
    book/[id].tsx      # Chi tiết sách
  components/          # Header, BookCard, BookGridCard, BookGrid, BookCover
  data/books.ts        # Dữ liệu + tìm kiếm không dấu + formatVND
  store/               # cart reducer (có test) + CartProvider
__tests__/
```

## Chạy dự án

```bash
npm install
npx expo start
npm test
npm run lint
npm run typecheck
```

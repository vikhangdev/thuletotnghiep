# Thiệp Chúc Mừng Tốt Nghiệp 🎓

Landing page HTML/CSS/JS thuần, không dùng thư viện ngoài, sẵn sàng deploy lên GitHub Pages.

## Cấu trúc file
```
index.html   -> nội dung trang
style.css    -> giao diện, màu sắc, animation
script.js    -> hiệu ứng mở thiệp, confetti, scroll-reveal, nhạc nền
assets/      -> nơi để file nhạc / ảnh thật của bạn
```

## Cần chỉnh trước khi đăng

Mở `index.html`, tìm các comment sau và sửa nội dung ngay bên dưới:

1. **`<!-- ĐỔI TÊN -->`** — xuất hiện 3 lần (màn hình con dấu, hero, thư tay). Thay `Nguyễn Thị Tên Em` bằng tên thật, và `Tên Bạn` ở phần ký tên cuối thư.
2. **`<!-- ĐỔI NỘI DUNG -->`** — đoạn lời chúc trong phần thư tay (`<p class="letter-body">`), sửa lại đúng giọng văn và câu chuyện của hai bạn.
3. **`<!-- ĐỔI ẢNH -->`** — phần gallery hiện đang dùng khung trống (placeholder) có icon ảnh. Để thay bằng ảnh thật:
   - Copy ảnh vào thư mục `assets/` (ví dụ `assets/anh-1.jpg`)
   - Trong mỗi `<div class="polaroid-photo placeholder-photo">`, đổi thành:
     ```html
     <div class="polaroid-photo">
       <img src="assets/anh-1.jpg" alt="Mô tả ảnh">
     </div>
     ```
   - Sửa lại chữ trong `<figcaption>` cho từng ảnh.
4. **`<!-- ĐỔI NHẠC -->`** — đặt file nhạc của bạn vào `assets/music.mp3` (đúng tên file này), hoặc đổi đường dẫn trong thẻ `<source src="assets/music.mp3">`. Nếu không có file nhạc, nút nhạc vẫn hiển thị nhưng sẽ không phát được gì — không lỗi trang.
   - Lưu ý: chỉ dùng nhạc bạn có quyền sử dụng (nhạc tự sáng tác, nhạc free-license, hoặc nhạc đã mua) để tránh vướng bản quyền khi đăng công khai.

## Đổi màu / font (tuỳ chọn)

Toàn bộ màu và font khai báo ở đầu file `style.css`, trong khối `:root`. Đổi giá trị hex ở đó là toàn trang đổi theo.

## Deploy lên GitHub Pages

1. Tạo repo mới trên GitHub (ví dụ `chuc-mung-tot-nghiep`).
2. Đẩy 3 file `index.html`, `style.css`, `script.js` (và thư mục `assets/` nếu có ảnh/nhạc) lên repo đó.
3. Vào **Settings → Pages**, ở mục "Branch" chọn `main` (hoặc nhánh bạn đang dùng), folder `/ (root)`, bấm **Save**.
4. Sau 1–2 phút, trang sẽ có ở: `https://<tên-github-của-bạn>.github.io/<tên-repo>/`

Vậy là xong — mở link lên kiểm tra lại một lượt trước khi gửi nhé.

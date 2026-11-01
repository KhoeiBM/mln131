# CÔNG NHÂN SỐ – Chọn Năng Lực, Giải Bài Toán

Website điều hành trò chơi học thuật **CÔNG NHÂN SỐ** dành cho buổi thuyết trình trên lớp: 8 đội loại trực tiếp qua 3 vòng (Nhận diện năng lực → My Major, My Future → The Final Debate), hội đồng giám khảo 9 người với 7 phiếu quyết định mỗi trận.

Kịch bản & lịch sử yêu cầu chi tiết nằm ở [`YEU-CAU-WEBSITE.md`](YEU-CAU-WEBSITE.md).

## Cách chạy

Web là HTML/CSS/JS thuần, **không cần internet và không cần cài đặt gì**:

- **Cách 1 (đơn giản nhất):** mở trực tiếp file `index.html` bằng trình duyệt (Chrome/Edge).
- **Cách 2 (qua máy chủ cục bộ):** trong thư mục dự án, chạy `python3 -m http.server 8000` rồi mở `http://localhost:8000`.

## Quy trình sử dụng cho BTC/MC

1. **Trước giờ thi:** mở trang **✏️ Soạn nội dung** và điền:
   - Tên + ngành học của 8 đội (ngành học tự đi theo đội khi vào bán kết).
   - 4 trường hợp thực tế của Vòng 1: tiêu đề, nội dung, nguồn xác nhận, link ảnh nếu có.
   - Chủ đề chung kết (đã điền sẵn chủ đề chính thức, sửa được).
   - Nội dung **tự động lưu** trên trình duyệt của máy đang soạn (localStorage).
   - Nếu soạn ở nhà rồi mang lên lớp: bấm **Xuất dữ liệu (JSON)**, copy file sang máy trình chiếu và chọn **Nhập dữ liệu (JSON)**.
2. **Khi thi đấu:** vào **🏆 Sơ đồ đấu** → **Vào trận** → bấm **Toàn màn hình**.
3. **Điều hành trận:** đi từng bước — công bố đề → bấm giờ thảo luận → nhập 2 thẻ mỗi đội sau hiệu lệnh giơ thẻ → bấm giờ trình bày → ghi 7 phiếu giám khảo → **Chốt đội thắng**. Đội thắng tự lên nhánh vòng sau.
4. **Kết thúc:** sau chung kết, web công bố Quán quân trên cả màn hình trận và sơ đồ đấu.

## Điều khiển & phím tắt

| Thao tác | Cách làm |
|---|---|
| Chạy/dừng đồng hồ | Nút **Bắt đầu/Tạm dừng** hoặc phím `Space` |
| Đặt lại đồng hồ | Nút **Đặt lại** hoặc phím `R` |
| Cộng/trừ giờ | Nút `+10 giây` / `−10 giây` |
| Bước trước/tiếp | Nút dưới màn hình trận hoặc `←` / `→` |
| Toàn màn hình | Nút trên thanh trên cùng hoặc phím `F` |

Đồng hồ tự kêu bíp ở 3 giây cuối và khi hết giờ (cần bật loa máy trình chiếu).

## Thời gian bấm giờ mặc định theo kịch bản

| Vòng | Thảo luận | Trình bày |
|---|---|---|
| Vòng 1 | 1 phút | 1 phút/đội |
| Vòng 2 | 2 phút | 1 phút 30 giây/đội |
| Chung kết L1 | Chuẩn bị 2 phút | 1 phút/đội |
| Chung kết L2–L3 | Chuẩn bị 1 phút 30 giây | 1 phút/đội |
| Chung kết L4 (tổng kết) | Chuẩn bị 1 phút 30 giây | 1 phút 30 giây/đội |

## Lưu ý dữ liệu

- Dữ liệu lưu trong `localStorage` của **từng trình duyệt trên từng máy** — vì vậy hãy xuất file JSON để dự phòng/chuyển máy.
- Nút **Đặt lại kết quả thi đấu** chỉ xóa kết quả/phiếu/thẻ, giữ nguyên nội dung đề. Nút **Xóa trống lại toàn bộ nội dung** đưa mọi ô đề về trạng thái trống ban đầu.
- Nếu sửa kết quả một trận sau khi các vòng sau đã đấu, web tự xóa các trận phía sau liên quan để sơ đồ không bị sai nhánh.

## Cấu trúc file

```
index.html            Giao diện 4 màn hình (Tổng quan, Sơ đồ, Trận đấu, Soạn nội dung)
css/styles.css        Giao diện dashboard nền navy + sidebar trái (tham khảo bản "Kỹ năng thích ứng"), tông teal/mint–vàng, chữ lớn cho máy chiếu
js/app.js             Logic: sơ đồ tự lên nhánh, đồng hồ, chọn thẻ, ghi 7 phiếu, bốc thăm phe, lưu/xuất/nhập dữ liệu
YEU-CAU-WEBSITE.md    Tài liệu kịch bản & yêu cầu đã hệ thống hóa
```

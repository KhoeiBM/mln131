# CÔNG NHÂN SỐ – Chọn Năng Lực, Giải Bài Toán

Website điều hành trò chơi học thuật **CÔNG NHÂN SỐ** dành cho buổi thuyết trình trên lớp: 8 đội loại trực tiếp qua 3 vòng (Nhận diện năng lực → My Major, My Future → The Final Debate), hội đồng giám khảo 9 người với 7 phiếu quyết định mỗi trận. Giao diện **theme trắng** với sidebar trái và màu chữ tương phản cao cho máy chiếu.

Kịch bản & lịch sử yêu cầu chi tiết nằm ở [`YEU-CAU-WEBSITE.md`](YEU-CAU-WEBSITE.md).

## Cách chạy

Web là HTML/CSS/JS thuần, **không cần internet và không cần cài đặt gì**:

- **Cách 1 (đơn giản nhất):** mở trực tiếp file `index.html` bằng trình duyệt (Chrome/Edge).
- **Cách 2 (qua máy chủ cục bộ):** trong thư mục dự án, chạy `python3 -m http.server 8000` (Windows: `python -m http.server 8000`) rồi mở `http://localhost:8000`.

## Quy trình sử dụng cho BTC/MC

Đề bài đã được đưa sẵn vào web, **không có mục nhập câu hỏi**:

- 4 đề Vòng 1 gắn cố định vào 4 trận vòng bảng.
- Vòng 2: mỗi đội chọn ngành bằng **dropdown 6 ngành** khi vào trận bán kết.
- Chủ đề Vòng 3 (chính thức): *“Trong thời đại số hiện nay, AI đang có xu hướng thay thế người lao động thay vì chỉ hỗ trợ họ làm việc”*.

1. **Trước giờ thi:** mở **🏆 Sơ đồ đấu**, đổi tên 8 đội ở danh sách phía trên, rồi bấm **🎲 Bốc thăm chia cặp Vòng 1**.
2. **Khi thi đấu:** bấm **Vào trận** → **Toàn màn hình**, đi từng bước: công bố đề → bấm giờ thảo luận → nhập 2 thẻ mỗi đội đã giơ → bấm giờ trình bày → ghi 7 phiếu giám khảo → **Chốt đội thắng**.
3. **Sau Vòng 1:** quay lại Sơ đồ đấu, bấm **🎲 Bốc thăm chia cặp Vòng 2** để ghép ngẫu nhiên 4 đội thắng thành 2 trận bán kết. Trong trận bán kết, từng đội chọn ngành học ở bước đầu tiên.
4. **Kết thúc:** ngay khi chốt kết quả chung kết, web tự hiện thêm tab **🏆 Nhà vô địch** ở thanh bên trái và tự chuyển tới đó — hiển thị cúp, tên đội vô địch bên dưới cúp và GIF ăn mừng. Trên sơ đồ, đội thắng vẫn được highlight viền nối vào vòng trong.

## Điều khiển & phím tắt

| Thao tác | Cách làm |
|---|---|
| Chạy/dừng đồng hồ | Nút **Bắt đầu/Tạm dừng** hoặc phím `Space` |
| Đặt lại đồng hồ | Nút **Đặt lại** hoặc phím `R` |
| Cộng/trừ giờ | Nút `+10 giây` / `−10 giây` |
| Bước trước/tiếp | Nút dưới màn hình trận hoặc `←` / `→` |
| Toàn màn hình | Nút ở cuối thanh bên trái hoặc phím `F` |

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

- Tên đội, kết quả bốc thăm và tiến trình thi đấu lưu trong `localStorage` (khóa `cns_*_v2`) của **từng trình duyệt trên từng máy**. Hãy chạy thử và thi thật trên cùng một máy/trình duyệt khi có thể.
- Bốc thăm lại Vòng 1 sẽ đặt lại toàn bộ kết quả; bốc thăm lại Vòng 2 sẽ đặt lại bán kết + chung kết. Nút **Đặt lại kết quả thi đấu** xóa kết quả/phiếu/thẻ và lượt bốc thăm, nhưng giữ nguyên tên đội.
- Nếu sửa kết quả một trận Vòng 1 sau khi đã bốc thăm/đấu Vòng 2, web tự xóa lượt bốc thăm Vòng 2 và các trận phía sau để tránh sai nhánh.

## Cấu trúc file

```
index.html            Giao diện chính (Tổng quan, Sơ đồ đấu, Trận đấu) + tab Nhà vô địch hiện sau chung kết
assets/               Hình/GIF ăn mừng của tab Nhà vô địch
css/styles.css        Theme trắng + sidebar trái, bracket đối xứng căn giữa các vòng
js/app.js             Đề bài gắn sẵn, bốc thăm chia cặp, đồng hồ, chọn thẻ/ngành, ghi 7 phiếu, bốc thăm phe
YEU-CAU-WEBSITE.md    Tài liệu kịch bản & yêu cầu đã hệ thống hóa
```

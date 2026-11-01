# CÔNG NHÂN SỐ — BẢN GHI NHẬN & HỆ THỐNG HÓA YÊU CẦU (V3)

> Cập nhật: 01/11/2026, sau khi chốt 4 câu hỏi Q1–Q4.
>
> **Trạng thái: ✅ ĐÃ TRIỂN KHAI WEB V1** (01/11/2026 — theo yêu cầu "bắt đầu"). Cấu trúc: `index.html`, `css/styles.css`, `js/app.js`. Xem thêm mục 12 về các mặc định đã áp dụng cho những điểm chưa chốt.
>
> **Nguyên tắc nội dung khi viết web:** để trống/placeholder tất cả phần câu hỏi, trường hợp thực tế và ngành học để BTC bổ sung sau qua trang "Soạn nội dung". Web không tự tạo nội dung đề thi. (Riêng chủ đề chung kết đã chốt chính thức nên được điền sẵn, vẫn sửa/xóa được.)

---

## 1. Các quyết định vừa được chốt

| Mã | Nội dung | Quyết định |
|---|---|---|
| Q1 | Thời gian Vòng 1 | **1 phút thảo luận; mỗi đội 1 phút trình bày** |
| Q2 | Cách xác định ngành ở Vòng 2 | **Mỗi đội trình bày ngành học thật của chính đội mình** tại FPT Hà Nội |
| Q3 | Cấu trúc chung kết tranh biện | Giữ 3 lượt như mô tả và **thêm Lượt 4 để tổng kết**; Lượt 4 có 1 phút 30 giây chuẩn bị và mỗi đội 1 phút 30 giây trình bày |
| Q4 | Cách quyết định đội thắng | **Chỉ bình chọn**: 7 giám khảo có quyền vote trong trận, mỗi người 1 phiếu ngang nhau, bao gồm cả thầy; không chấm điểm |

---

## 2. Những thay đổi chính so với kịch bản ban đầu

| Hạng mục | Kịch bản ban đầu | Kịch bản hiện tại |
|---|---|---|
| Ban giám khảo | 8 thành viên từ 8 đội; mỗi trận 6 người vote | **9 người: 8 thành viên đội + thầy**; mỗi trận **7 người vote** |
| Hòa | Hòa 3–3 thì thi hiệp phụ | **Không còn hiệp phụ**, vì 7 phiếu là số lẻ |
| Vòng 1 | 4 tình huống hư cấu theo ngành; 30 giây thảo luận, 20 giây/đội | 4 **trường hợp thực tế có nguồn xác nhận** tại Việt Nam; **1 phút thảo luận, 1 phút/đội** |
| Vòng 2 | Tình huống kèm biến cố bất ngờ, được đổi tối đa 1 thẻ | **MY MAJOR, MY FUTURE**: mỗi đội phân tích ngành học của chính mình; 2 phút thảo luận, 1 phút 30 giây/đội |
| Vòng 3 | Hội đồng tư vấn nhà máy thông minh, chọn thẻ và xử lý biến cố | **THE FINAL DEBATE**: tranh biện 4 lượt quanh một chủ đề AI |
| Bộ đề | Có sẵn 7 trận và khung đáp án tham khảo | Tất cả câu hỏi/trường hợp/ngành học **để trống trên web** để bổ sung sau |

Các cơ chế sau của kịch bản cũ được hiểu là **đã loại bỏ**:

- Hiệp phụ xử lý hòa.
- Thẻ biến cố bất ngờ ở bán kết.
- Biến cố cắt ngân sách ở chung kết cũ.
- Cơ chế đổi tối đa một thẻ sau biến cố.
- Phiếu chấm điểm 6 điểm của giám khảo.

---

## 3. Thể lệ chung

### 3.1. Quy mô và hình thức

- Có **8 đội**.
- Thi đấu loại trực tiếp qua 3 vòng:
  - Vòng 1: 4 cặp đấu, chọn 4 đội thắng.
  - Vòng 2: 2 cặp bán kết, chọn 2 đội thắng.
  - Vòng 3: 1 trận chung kết tranh biện, chọn đội quán quân.

### 3.2. Bộ 6 thẻ năng lực A–F

Hiện tiếp tục ghi nhận bộ thẻ như kịch bản ban đầu, chờ xác nhận cuối cùng:

| Thẻ | Năng lực |
|---|---|
| A | Chuyên môn, tay nghề |
| B | Năng lực số và ứng dụng công nghệ |
| C | Tư duy phản biện và giải quyết vấn đề |
| D | Tự học và thích ứng |
| E | Giao tiếp, hợp tác và ngoại ngữ |
| F | Tác phong, trách nhiệm và ý thức quyền lợi |

### 3.3. Hội đồng giám khảo và bình chọn

- Mỗi đội cử **1 thành viên** tham gia hội đồng giám khảo.
- Thêm **thầy** vào hội đồng.
- Tổng số giám khảo: **9 người**.
- Trong mỗi trận, 2 giám khảo thuộc 2 đội đang thi **không tham gia bình chọn**.
- **7 giám khảo còn lại** bình chọn đội thắng.
- Mỗi giám khảo có **1 phiếu ngang nhau**; phiếu của thầy cũng tính 1 phiếu.
- Đội nhận nhiều phiếu hơn sẽ thắng. Các tỉ số có thể xảy ra: 7–0, 6–1, 5–2 hoặc 4–3.
- Giám khảo không được tham gia thảo luận hoặc hỗ trợ đội của mình trong trận đấu.
- Không chấm điểm và không có hiệp phụ.

---

## 4. Vòng 1 — NHẬN DIỆN NĂNG LỰC

### Tên hoạt động: PHÂN TÍCH THỰC TẾ – CHỌN NĂNG LỰC

### 4.1. Cách tổ chức

- 8 đội được chia thành **4 cặp đấu**.
- Mỗi cặp nhận một trường hợp thực tế do BTC công bố.
- Trường hợp phải có nguồn xác nhận và liên quan đến một hoặc nhiều chủ đề:
  - Chuyển đổi số;
  - Trí tuệ nhân tạo;
  - Tự động hóa;
  - Những thay đổi trong đời sống người lao động tại Việt Nam.

### 4.2. Quy trình một trận

1. BTC công bố trường hợp thực tế.
2. Hai đội thảo luận trong **1 phút**.
3. Mỗi đội lựa chọn **đúng 2 năng lực** cần ưu tiên nhất trong bộ 6 thẻ A–F.
4. Các đội lần lượt trình bày trong **1 phút mỗi đội**, nêu lựa chọn và giải thích lý do.
5. 7 giám khảo bình chọn đội thắng.

### 4.3. Kết quả

- 4 đội thắng ở 4 cặp đấu vào bán kết.

### 4.4. Nội dung để trống trên web

Mỗi trường hợp cần các ô nội dung riêng:

- Tiêu đề trường hợp;
- Nội dung trường hợp thực tế;
- Nguồn xác nhận;
- Hình ảnh hoặc tài liệu minh họa nếu có.

Vòng 1 cần tổng cộng **4 bộ nội dung để trống**, tương ứng 4 cặp đấu.

---

## 5. Vòng 2 — MY MAJOR, MY FUTURE

### Tên hoạt động: NGÀNH HỌC CỦA TÔI – VIỆC LÀM CỦA TƯƠNG LAI

### 5.1. Cách tổ chức

- 4 đội thắng Vòng 1 được chia thành **2 cặp bán kết**.
- Bối cảnh ngành học thuộc hệ thống đào tạo của FPT Hà Nội.
- Theo quyết định Q2, **mỗi đội phân tích ngành học thật của chính đội mình**.
- Vì vậy, web sẽ có một ô ngành học gắn với từng đội vào bán kết; tổng cộng 4 ô, có thể trùng nhau nếu các đội học cùng ngành.

### 5.2. Quy trình một trận bán kết

1. Công bố cặp đấu và ngành học của từng đội.
2. Các đội thảo luận trong **2 phút**.
3. Mỗi đội trình bày trong **1 phút 30 giây**.
4. Sau khi cả hai đội trình bày, 7 giám khảo bình chọn đội có phần phân tích thuyết phục hơn.

### 5.3. Hai nội dung mỗi đội phải trình bày

1. Trong thời đại số, công việc hoặc yêu cầu lao động trong ngành học của đội đang thay đổi như thế nào?
2. Những năng lực nào quan trọng và cần ưu tiên nhất để thích ứng với ngành đó? Vì sao?

### 5.4. Kết quả

- Hai trận bán kết được bình chọn riêng.
- 2 đội thắng vào chung kết.

### 5.5. Nội dung để trống trên web

- Ngành học của đội bán kết 1;
- Ngành học của đội bán kết 2;
- Ngành học của đội bán kết 3;
- Ngành học của đội bán kết 4.

Tên đội thắng từ Vòng 1 sẽ được đưa vào các vị trí bán kết khi có kết quả thi đấu.

---

## 6. Vòng 3 — THE FINAL DEBATE

### 6.1. Chủ đề chính thức

> **“Trong 10 năm tới, AI sẽ chủ yếu thay thế người lao động thay vì hỗ trợ họ làm việc.”**

### 6.2. Phân phe

- Hai đội cử đại diện bốc thăm lập trường.
- Một đội thuộc **phe Đồng tình**: bảo vệ nhận định trên.
- Đội còn lại thuộc **phe Phản đối**: không đồng tình với nhận định trên.

Trên web, cần hiển thị đồng thời tên thật của đội và phe mà đội bốc thăm được, tránh nhầm lẫn giữa tên đội trong sơ đồ thi đấu với “Đội A/Đội B” của phe tranh biện.

### 6.3. Cấu trúc 4 lượt tranh biện

| Lượt | Mục đích | Thời gian chuẩn bị chung cho 2 đội | Thời gian phát biểu của mỗi đội |
|---|---|---:|---:|
| Lượt 1 | Trình bày luận điểm | **2 phút** | **1 phút** |
| Lượt 2 | Phản biện lần 1 | **1 phút 30 giây** | **1 phút** |
| Lượt 3 | Phản biện lần 2 | **1 phút 30 giây** | **1 phút** |
| Lượt 4 | Tổng kết | **1 phút 30 giây** | **1 phút 30 giây** |

### 6.4. Kết thúc

- Sau 4 lượt, 7 giám khảo bình chọn.
- Đội nhận nhiều phiếu hơn trở thành quán quân.

---

## 7. Ước tính thời lượng theo kịch bản hiện tại

Phần tính toán dưới đây chưa bao gồm đầy đủ thời gian MC đọc trường hợp, giới thiệu, chuyển vòng và công bố kết quả.

### 7.1. Vòng 1

Mỗi trận có ít nhất:

- 1 phút thảo luận;
- 2 đội × 1 phút trình bày = 2 phút.

Tổng thời gian cố định: **3 phút/trận**, chưa tính công bố trường hợp và bình chọn.

Ước tính thực tế: khoảng **3 phút 30 giây–4 phút/trận**.

Tổng 4 trận: khoảng **14–16 phút**.

### 7.2. Vòng 2

Mỗi trận có:

- 2 phút thảo luận;
- 2 đội × 1 phút 30 giây trình bày = 3 phút.

Tổng thời gian cố định: **5 phút/trận**, chưa tính công bố ngành và bình chọn.

Ước tính thực tế: khoảng **5 phút 30 giây–6 phút/trận**.

Tổng 2 trận: khoảng **11–12 phút**.

### 7.3. Vòng 3

- Tổng thời gian chuẩn bị: 2 phút + 1 phút 30 giây × 3 = **6 phút 30 giây**.
- Tổng thời gian phát biểu:
  - Lượt 1: 2 phút;
  - Lượt 2: 2 phút;
  - Lượt 3: 2 phút;
  - Lượt 4: 3 phút.
  - Tổng: **9 phút**.

Tổng thời gian cố định: **15 phút 30 giây**, chưa tính bốc thăm, giới thiệu và bình chọn.

Ước tính thực tế: khoảng **16 phút 30 giây–17 phút 30 giây**.

### 7.4. Tổng toàn bộ trò chơi

Ước tính khoảng **42–46 phút**, chưa tính toàn bộ lời dẫn của MC và các khoảng chuyển đổi.

> Đây là điểm cần tiếp tục cân nhắc nếu tổng thời lượng thuyết trình bị giới hạn.

---

## 8. Các ô nội dung sẽ để trống khi viết web

### 8.1. Thông tin đội

- Tên Đội 1;
- Tên Đội 2;
- Tên Đội 3;
- Tên Đội 4;
- Tên Đội 5;
- Tên Đội 6;
- Tên Đội 7;
- Tên Đội 8.

### 8.2. Vòng 1

- Trường hợp thực tế của Trận 1 + nguồn xác nhận;
- Trường hợp thực tế của Trận 2 + nguồn xác nhận;
- Trường hợp thực tế của Trận 3 + nguồn xác nhận;
- Trường hợp thực tế của Trận 4 + nguồn xác nhận.

### 8.3. Vòng 2

- Ngành học của đội bán kết thứ nhất;
- Ngành học của đội bán kết thứ hai;
- Ngành học của đội bán kết thứ ba;
- Ngành học của đội bán kết thứ tư.

### 8.4. Vòng 3

- Chủ đề tranh biện đã có nội dung chính thức, nhưng cấu trúc web vẫn nên để dạng dữ liệu có thể thay đổi nếu BTC sửa kịch bản.
- Tên hai đội chung kết và phe bốc thăm sẽ được xác định trong lúc thi đấu.

### 8.5. Kết quả thi đấu

- 4 đội thắng Vòng 1;
- 2 đội thắng Vòng 2;
- Đội quán quân Vòng 3.

Các vị trí này để trống ban đầu và chỉ cập nhật theo kết quả bình chọn.

---

## 9. Yêu cầu chức năng web suy ra từ kịch bản

Phần này chỉ là yêu cầu dự kiến; **chưa triển khai**.

1. **Màn hình giới thiệu** tên trò chơi, thể lệ, 6 thẻ A–F và hội đồng giám khảo 9 người.
2. **Sơ đồ loại trực tiếp** từ 8 đội → 4 đội → 2 đội → quán quân.
3. **Màn hình riêng cho từng trận Vòng 1**, gồm ô trường hợp thực tế, ô nguồn, đồng hồ thảo luận 1 phút và hai đồng hồ trình bày 1 phút.
4. **Màn hình riêng cho từng trận Vòng 2**, gồm ngành của từng đội, hai câu hỏi khung, đồng hồ thảo luận 2 phút và hai đồng hồ trình bày 1 phút 30 giây.
5. **Màn hình chung kết tranh biện**, gồm:
   - Chủ đề;
   - Khu vực bốc thăm/gán phe Đồng tình và Phản đối;
   - Bảng tiến trình 4 lượt;
   - Đồng hồ chuẩn bị và phát biểu theo từng lượt.
6. **Bộ đếm phiếu 7 giám khảo** dùng chung cho các trận, hiển thị tỉ số và xác định đội thắng.
7. **Cập nhật đội thắng vào vòng tiếp theo** trên sơ đồ.
8. **Màn hình công bố quán quân**.
9. Nội dung câu hỏi, trường hợp và ngành học phải được tổ chức dạng dữ liệu/ô trống để bổ sung sau mà không cần sửa cấu trúc web.

---

## 10. Các điểm còn cần xác nhận trước khi viết web

### Nhóm liên quan trực tiếp đến kịch bản

- **R1 — Vòng 1:** Có thời gian đọc trường hợp tách riêng trước 1 phút thảo luận không? Hai đội có đồng loạt công bố/khóa 2 thẻ trước khi trình bày như kịch bản cũ hay công bố trong phần trình bày của mình?
- **R2 — Vòng 2:** Hai đội thảo luận đồng thời trong cùng 2 phút hay lần lượt? Nội dung “đề xuất các năng lực” vẫn yêu cầu chọn **đúng 2 thẻ A–F** hay không giới hạn số năng lực?
- **R3 — Ngành học của đội:** Nếu thành viên trong một đội học nhiều ngành khác nhau, đội chọn một ngành đại diện theo cách nào?
- **R4 — Thứ tự tranh biện:** Trong từng lượt, phe Đồng tình luôn phát biểu trước hay hai phe luân phiên đổi thứ tự? Lượt tổng kết có cần đội phát biểu sau được luân chuyển để bảo đảm công bằng không?
- **R5 — Vai trò bộ thẻ:** Bộ 6 thẻ A–F có giữ nguyên tên và nội dung không? Chung kết tranh biện có hoàn toàn không sử dụng thẻ không?
- **R6 — Tổng thời lượng:** Thời lượng ước tính 42–46 phút có phù hợp với buổi thuyết trình không, hay cần rút ngắn vòng/lượt nào?

### Nhóm liên quan đến cách vận hành web — chốt sau

- **R7:** Web chỉ chạy trên một màn hình do MC điều khiển hay đội/giám khảo tương tác trực tiếp trên web?
- **R8:** Chủ đề chung kết điền sẵn trên web hay cũng để ô trống như các nội dung khác?
- **R9:** Các cặp đấu vòng bảng được ấn định trước hay bốc thăm trực tiếp khi chương trình bắt đầu?
- **R10:** Phong cách giao diện và thiết bị trình chiếu chính sẽ chốt ở giai đoạn bắt đầu làm web.

---

## 11. Nguyên tắc làm việc tiếp theo

1. Mọi sửa đổi kịch bản sẽ được cập nhật vào tài liệu này trước.
2. Đã bắt đầu viết web ngày 01/11/2026 theo yêu cầu của người dùng.
3. Khi viết web, mọi câu hỏi/trường hợp/ngành học sẽ là ô trống có cấu trúc rõ ràng để bổ sung sau.
4. Các quyết định đã chốt ở mục 1 là cơ sở hiện tại; nếu thay đổi, cần ghi lại thành phiên bản mới của tài liệu.

## 12. Các mặc định đã áp dụng khi triển khai web V1 (cho những điểm chưa chốt ở mục 10)

Để không phải chờ thêm một vòng hỏi–đáp nữa, web V1 áp dụng các mặc định **dễ thay đổi** sau đây. Nếu BTC muốn khác đi, chỉ cần báo lại để sửa:

| Điểm | Mặc định trên web V1 |
|---|---|
| R1 – Đọc đề & khóa thẻ vòng 1 | Bước "Công bố trường hợp" không bấm giờ — MC chủ động chuyển bước khi đọc xong. Các đội giơ thẻ giấy theo hiệu lệnh "3, 2, 1", sau đó MC nhập 2 thẻ của mỗi đội lên web để hiển thị lúc trình bày. |
| R2 – Thảo luận & số thẻ ở Vòng 2 | Hai đội thảo luận **đồng thời** chung 1 đồng hồ 2 phút. Vòng 1 web bắt buộc đúng 2 thẻ; ở Vòng 2 web chỉ "đánh dấu" linh hoạt số thẻ đội đề xuất (không ép số lượng) vì kịch bản ghi chung là "đề xuất các năng lực". |
| R3 – Ngành của đội | Ngành học được nhập **gắn theo từng đội trong 8 đội**; đội nào thắng vào bán kết thì ngành của chính đội đó hiện lên. Đội nhiều ngành thì ghi ngành đại diện trong ô này. |
| R4 – Thứ tự tranh biện | Mỗi lượt: phe **Đồng tình phát biểu trước**, phe Phản đối phát biểu sau. Có nút đổi phe nếu bốc thăm giấy cho kết quả khác với bốc thăm trên web. |
| R5 – Bộ thẻ | Giữ nguyên 6 thẻ A–F như bản cũ. Chung kết tranh biện không dùng thẻ. |
| R6 – Tổng thời lượng 42–46 phút | Web không cắt bớt gì; giữ nguyên toàn bộ thời gian đã chốt. BTC tự cân đối với thời lượng buổi thuyết trình. |
| R7 – Cách vận hành | **1 màn hình do MC điều khiển**: MC bấm giờ, nhập thẻ đã chọn và ghi 7 phiếu lên màn hình chiếu; đội/giám khảo vẫn dùng thẻ giấy như thể lệ. |
| R8 – Chủ đề chung kết | Điền sẵn chủ đề chính thức, sửa/xóa được trong trang Soạn nội dung. |
| R9 – Cặp đấu vòng bảng | Ấn định sẵn: Đội 1–2, 3–4, 5–6, 7–8 (đổi tên đội trong Soạn nội dung tương đương với việc xếp đội vào cặp). |
| R10 – Giao diện | Ban đầu: gameshow nền tối xanh/cyan. Từ 01/11/2026 đã **thiết kế lại theo file giao diện tham khảo do người dùng gửi** ("Công nhân số • Kỹ năng thích ứng"): sidebar trái cố định, nền navy `#08111f` có lưới mờ 44px, tông teal/mint `#4dd9d2/#8bf1d5` + vàng `#ffcd75`, panel bo góc 19px, hero editorial căn trái kèm hàng số liệu 08–03–07, nút chính gradient mint, đồng hồ chữ số lớn + thanh tiến trình (thay vòng tròn). Chỉ lấy diện mạo — không lấy luật khác biệt của bản tham khảo (6 phiếu, hòa 3–3, quay ngành ngẫu nhiên, chấm điểm tranh biện). Đội bên trái vẫn = XANH, đội bên phải = ĐỎ. Trên màn hình hẹp, sidebar tự chuyển thành thanh ngang phía trên. |

## 13. Đợt chỉnh sửa theo ảnh chụp demo (01/11/2026)

Sau khi xem bản demo, người dùng yêu cầu và web đã cập nhật:

1. **Bỏ mục "Soạn nội dung"**: web chỉ còn 3 màn hình (Tổng quan, Sơ đồ đấu, Trận đấu). Đề bài được đưa thẳng vào code:
   - Vòng 1: 4 tình huống điều chỉnh (dệt may MES/QR; AI kiểm tra chất lượng; nhà máy số IoT; tài xế công nghệ) — chưa kèm nguồn xác nhận nên web không hiển thị dòng nguồn.
   - Vòng 3: chủ đề mới *"Trong thời đại số hiện nay, AI đang có xu hướng thay thế người lao động thay vì chỉ hỗ trợ họ làm việc"*.
2. **Sơ đồ đấu**: thêm danh sách 8 đội ở phía trên để đổi tên trực tiếp; nút **bốc thăm ngẫu nhiên chia cặp Vòng 1**; sau Vòng 1 thêm nút **bốc thăm ngẫu nhiên chia cặp Vòng 2** từ 4 đội thắng (thay cho ghép cặp cố định). Các cột vòng trong **lệch xuống căn giữa** hai trận cấp nguồn cho đối xứng; đội thắng được **highlight viền vàng**, ô của đội đó ở vòng trong highlight viền teal kèm đường nối.
3. **Vòng 2**: khi vào trận, mỗi đội chọn ngành học bằng **dropdown 6 ngành** (Công nghệ thông tin; Công nghệ truyền thông; Khối Ngành Ngôn ngữ; Luật; Quản trị kinh doanh; Khoa học máy tính) thay cho việc nhập ngành trước.
4. **Bỏ các đoạn text** theo ảnh chụp: hướng dẫn giơ thẻ/nhập thẻ ở bước Thảo luận vòng 1; dòng "đã được tự động đưa lên vòng tiếp theo" ở màn hình Kết quả; dòng "Yêu cầu cho hai đội…" ở màn hình Công bố trường hợp; đoạn hướng dẫn dưới Sơ đồ đấu và phần đuôi footer.
5. **Theme trắng**: chuyển toàn bộ giao diện sang nền sáng (trắng/xám xanh nhạt), chữ navy đậm, nhấn teal đậm; màu chữ cái thẻ A–F được làm đậm hơn cho dễ đọc trên nền trắng.
6. Dữ liệu trình duyệt chuyển sang khóa `cns_*_v2` do mô hình cặp đấu thay đổi; tên đội đã nhập ở bản cũ (v1) được kế thừa tự động.

## 14. Tab Nhà vô địch (01/11/2026)

- Tab **Nhà vô địch** ở thanh bên trái chỉ xuất hiện sau khi chốt kết quả trận chung kết; ngay khi chốt, web tự động chuyển đến tab này.
- Nội dung tab: hình cúp lớn, tên đội vô địch ngay phía dưới cúp, tỉ số/phe của trận chung kết và GIF ăn mừng do người dùng gửi ở dưới tên đội (`assets/champion-meme.png`; file nhận được là PNG tĩnh nên web thêm hiệu ứng nhảy múa bằng CSS).
- Nếu kết quả chung kết bị sửa/đặt lại, tab tự ẩn và web quay về Sơ đồ đấu nếu đang ở tab này.

## 15. Đợt chỉnh sửa theo hai loạt ảnh chụp (02/11/2026)

1. **Tổng quan:** bỏ các chi tiết “(kể cả thầy)”, “(7–0, 6–1, 5–2, 4–3)”, bullet giải thích 7 phiếu lẻ/không hòa, dòng quy ước thẻ XANH/ĐỎ bên trái–phải và toàn bộ mục “MC vận hành như thế nào?”. Bộ 6 thẻ A–F chuyển thành lưới **3 thẻ × 2 hàng** trên màn hình rộng, chữ/mô tả lớn hơn. Ba vòng dùng tên/mô tả mới: Vòng 1 **PHÂN TÍCH THỰC TẾ**; Vòng 2 vẫn **MY MAJOR, MY FUTURE**; Chung kết vẫn **THE FINAL DEBATE**, với mô tả ngắn gọn hơn.
2. **Câu hỏi trong trận:** màn hình Công bố trường hợp và Thảo luận Vòng 1 hiển thị cả 3 câu hỏi (“Đội chọn hai năng lực nào?”, “Vì sao ưu tiên…?”, “Vận dụng bằng những hành động cụ thể nào?”). Màn hình Trình bày Vòng 1 bỏ câu đầu, chỉ giữ hai câu còn lại. Mọi màn thảo luận/trình bày của Vòng 2 hiển thị 2 câu hỏi về ngành đã chọn.
3. **Màn trình bày:** bỏ hoàn toàn cảnh báo “MC chưa nhập thẻ của đội…”; nếu chưa nhập thẻ thì vùng thẻ để trống. Bước Bình chọn ở cả ba loại trận có đồng hồ mặc định **0:30** để 7 giám khảo suy nghĩ trước khi MC ghi phiếu.
4. **Chuẩn bị chung kết:** trước mỗi lượt, web hiển thị hai thẻ đầu việc riêng cho phe Đồng tình và phe Phản đối, gồm tên đội, thứ tự phát biểu và nhiệm vụ của lượt (mở luận điểm, phản biện hoặc tổng kết).
5. **Nhà vô địch:** thay `champion-meme.png` bằng GIF89a động thật `assets/champion-meme.gif`; cúp và khung ảnh không dùng animation CSS, chỉ nội dung GIF chuyển động. Web đã nối sẵn cơ chế tự phát `assets/we-are-the-champions-hook.mp3` khi mở tab, kèm nút phát lại/tạm dừng. Vì BTC chưa cung cấp file ghi âm “We Are the Champions” của Queen và bản ghi có bản quyền, file MP3 chưa được đóng gói trong repo; khi BTC đặt file hợp lệ đúng tên trên vào `assets/`, tính năng phát nhạc sẽ hoạt động ngay mà không cần sửa code.

## 16. Nút bốc thăm chia cặp chỉ bấm một lần (02/11/2026)

- Cả hai nút **Bốc thăm chia cặp Vòng 1** và **Bốc thăm chia cặp Vòng 2** đều có màu xanh khi chưa bốc thăm. Sau khi bấm, nút chuyển sang trạng thái chờ “🎲 Đang bốc thăm…” trong 950ms với hiệu ứng nhịp và tiếng bíp bắt đầu/kết thúc giống nút bốc thăm phe ở Chung kết.
- Bốc thăm xong, nút chuyển sang **màu trắng**, đổi nhãn thành “✓ Đã bốc thăm chia cặp…” và bị khóa. Cờ trạng thái được lưu trong `localStorage` nên tải lại trang vẫn khóa; trạng thái đã lưu từ bản cũ (đã có tiến trình/cặp Vòng 2 hoặc cặp Vòng 1 đã xáo trộn) cũng được nhận diện là đã bốc thăm.
- Nút chỉ mở khóa khi đặt lại kết quả/xóa dữ liệu đã lưu. Riêng nút Vòng 2 tự mở khóa nếu việc sửa kết quả Vòng 1 làm lượt bốc thăm Vòng 2 cũ bị hủy.

## 17. Bổ sung MP3 thật và nút xóa dữ liệu trình duyệt (02/11/2026)

- BTC đã tải file nhạc lên GitHub với tên `assets/we-are-the-champions-copia.mp3`; file được đổi tên thành `assets/we-are-the-champions-hook.mp3` để khớp đường dẫn web đang tìm. Đây là nguyên nhân trước đó tab Nhà vô địch không phát nhạc dù MP3 đã nằm trong `assets/`.
- Trình phát nhạc ở tab Nhà vô địch có thanh điều khiển dự phòng, dòng trạng thái báo đường dẫn/mã lỗi và nút **↻ Tải lại & phát nhạc** để xử lý trường hợp file được thêm sau khi trang đã mở hoặc trình duyệt còn giữ kết quả lỗi cũ.
- Tên đội và tiến trình được lưu trong `localStorage`, không nằm trong thư mục dự án; vì vậy xóa file rồi tải lại vẫn thấy dữ liệu cũ trên cùng trình duyệt. Trang Sơ đồ đấu có nút **🧹 Xóa dữ liệu đã lưu** để xóa cả tên đội lẫn tiến trình, tách biệt với nút đặt lại kết quả vốn giữ tên đội.

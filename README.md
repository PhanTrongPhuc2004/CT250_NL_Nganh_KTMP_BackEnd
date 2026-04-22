# Football Club Management System - Backend

Đây là hệ thống Backend cho ứng dụng Quản lý Câu lạc bộ Bóng đá, được xây dựng trên nền tảng Node.js và Express, sử dụng MongoDB làm cơ sở dữ liệu chính. Hệ thống cung cấp các API mạnh mẽ để quản lý cầu thủ, hợp đồng, bán vé trận đấu và các dịch vụ đi kèm.

## Tính năng chính

*   **Quản lý Câu lạc bộ & Cầu thủ:** Theo dõi thông tin chi tiết, tiểu sử và chỉ số thi đấu.
*   **Quản lý Hợp đồng:** Hệ thống theo dõi hợp đồng cầu thủ giữa các câu lạc bộ, quản lý lương, thưởng và thời hạn.
*   **Hệ thống Bán vé Thông minh:**
    *   Đặt vé trực tuyến theo khu vực, hàng ghế.
    *   Tự động gán số ghế trống.
    *   Tích hợp mã QR Code cho từng vé để kiểm soát vào sân.
    *   Thống kê doanh thu và vé bán chạy.
*   **Quản lý Tin tức:** Cung cấp thông tin cập nhật về đội bóng và giải đấu.
*   **Quản lý Quà lưu niệm:** Cửa hàng trực tuyến cho các vật phẩm lưu niệm của CLB.
*   **Xác thực & Phân quyền:**
    *   Đăng nhập với JWT (JSON Web Token) và Google OAuth2.0.
    *   Phân quyền người dùng (Admin, Người hâm mộ, v.v.).
*   **Giao tiếp thời gian thực:** Tích hợp Socket.io cho các tính năng cần cập nhật liên tục.

## Công nghệ sử dụng

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB với Mongoose ODM
*   **Security:** Helmet, CORS, BcryptJS
*   **Authentication:** Passport.js, JWT, Cookie-parser
*   **Tiện ích:** 
    *   `qrcode`: Sinh mã QR cho vé.
    *   `joi`: Kiểm tra dữ liệu đầu vào (Validation).
    *   `morgan`: Ghi log request.
    *   `nodemon`: Tự động khởi động lại server khi phát triển.

## Yêu cầu hệ thống

*   Node.js (phiên bản 16.x trở lên)
*   MongoDB (Local hoặc MongoDB Atlas)

## Cài đặt

1.  **Clone mã nguồn:**
    ```bash
    git clone <url-repository>
    cd CT250_NL_Nganh_KTMP_BackEnd
    ```

2.  **Cài đặt các gói phụ thuộc:**
    ```bash
    npm install
    ```

3.  **Cấu hình môi trường:**
    Tạo tệp `.env` tại thư mục gốc và cấu hình các biến sau:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    GOOGLE_CLIENT_ID=your_google_id
    GOOGLE_CLIENT_SECRET=your_google_secret
    ```

4.  **Chạy ứng dụng:**
    *   Chế độ phát triển:
        ```bash
        npm start
        ```
    *   Định dạng mã nguồn:
        ```bash
        npm run format
        ```

## Cấu trúc thư mục chính

```text
├── bin/                # File thực thi khởi tạo server
├── public/             # Tài liệu tĩnh (ảnh, dữ liệu test)
├── src/
│   ├── config/         # Cấu hình DB, Passport...
│   ├── controller/     # Điều hướng logic xử lý request
│   ├── middlewares/    # Các middleware xác thực, phân quyền
│   ├── models/         # Định nghĩa cấu trúc dữ liệu (Mongoose Schema)
│   ├── routes/         # Định nghĩa các endpoint API
│   ├── services/       # Logic xử lý nghiệp vụ (Business Logic)
│   └── utils/          # Các hàm tiện ích dùng chung
├── app.js              # Điểm khởi đầu của ứng dụng
└── package.json        # Danh sách thư viện và scripts
```
---
*Dự án thuộc học phần CT250 - Niên luận Ngành Kỹ thuật Phần mềm.*
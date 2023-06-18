# Mô tả
Ứng dụng hiển thị các kết quả của cuộc đua f1 dựa trên dữ liệu lấy từ kết quả của cuộc đua f1 từ trang web [formula1](https://www.formula1.com/).
# Chức năng
- Trả kết quả races, drivers, teams, dhl fastest lap award theo năm.
- Trả kết quả chi tiết của races, drivers, teams theo năm.
# Triển khai
- Khi clone respository về sẽ có 3 thư mục ${\color{red}\text{crawl}}$, ${\color{red}\text{client}}$, ${\color{red}\text{server}}$.
  
- Ở thư mục ${\color{red}\text{server}}$ khởi chạy lệnh ${\color{red}\text{npm install}}$ để tiến hành tải package. Tiếp theo dùng lệnh ${\color{red}\text{npm start}}$ để chạy ${\color{red}\text{server}}$.
  
- ${\color{green}\text{Mongodb compass connect url}}$: mongodb+srv://leduongdatly:duong1421@cluster.mbo7650.mongodb.net/
  
- ${\color{red}\text{Lưu ý}}$: Dữ liệu được lưu ở databse nên khi không chạy ${\color{red}\text{server}}$ thì ${\color{red}\text{client}}$ khi chạy cũng không có dữ liệu để hiển thị.
  
- Ở thư mục ${\color{red}\text{client}}$ khởi chạy lệnh ${\color{red}\text{npm install}}$ để tiến hành tải package. Tiếp theo dùng lệnh ${\color{red}\text{npm run dev}}$ để chạy app. Vào http://localhost:3000 sau khi dùng lệnh ${\color{red}\text{npm run dev}}$.

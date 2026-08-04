# Setup Supabase cho Our June Admin

## 1. Tạo project

1. Mở https://supabase.com/dashboard và chọn **New project**.
2. Đặt tên project, tạo database password và chọn region gần người xem.
3. Chờ project khởi tạo hoàn tất.

## 2. Tạo database và kho hình

1. Trong Supabase, mở **SQL Editor** > **New query**.
2. Sao chép toàn bộ nội dung file `supabase/schema.sql` vào editor và nhấn **Run**.
3. Script sẽ tạo bảng nội dung, danh sách admin, bucket `site-media`, quyền truy cập và dữ liệu ban đầu.

## 3. Tạo tài khoản admin

1. Mở **Authentication** > **Users** > **Add user** > **Create new user**.
2. Nhập email và mật khẩu dùng để đăng nhập `/admin`.
3. Quay lại **SQL Editor** và chạy câu lệnh dưới đây sau khi thay email:

```sql
insert into public.admin_users(user_id)
select id from auth.users where email = 'email-cua-ban@example.com'
on conflict do nothing;
```

## 4. Lấy thông tin kết nối

Mở **Project Settings** > **API Keys**. Sao chép:

- Project URL
- Publishable key (hoặc `anon public` key nếu dashboard cũ)

Tạo file `.env.local` ở thư mục gốc dự án:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY
```

Không cần đưa `service_role` key vào website này.

## 5. Cấu hình Vercel

1. Vào project trên Vercel > **Settings** > **Environment Variables**.
2. Thêm hai biến giống file `.env.local` cho Production, Preview và Development.
3. Redeploy project.

## 6. Sử dụng admin

1. Mở `https://ten-domain.com/admin/login` hoặc `http://localhost:3000/admin/login`.
2. Đăng nhập bằng tài khoản đã tạo ở bước 3.
3. Chọn trang bên trái, sửa nội dung hoặc tải hình mới.
4. Nhấn **Lưu thay đổi**. Các trang động sẽ hiển thị dữ liệu mới ngay.

## Lưu ý hình ảnh

- Admin chấp nhận JPG, PNG, WebP và AVIF.
- Mỗi hình được giới hạn 10 MB trong bucket của website.
- Nên dùng WebP khoảng 300 KB–1 MB để tải nhanh và tiết kiệm dung lượng.
- Chỉ URL hình được lưu trong database; file thật nằm trong Supabase Storage.

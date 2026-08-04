"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase, isSupabaseConfigured } from "../../../lib/supabase";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBrowserSupabase()?.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin");
    });
  }, [router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return setMessage("Chưa kết nối Supabase. Hãy thêm biến môi trường trước.");
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setMessage("Email hoặc mật khẩu chưa đúng.");
    router.replace("/admin");
  }

  return <main className="admin-shell admin-login-shell">
    <form className="admin-login-card" onSubmit={submit}>
      <a href="/" className="admin-brand">OUR JUNE</a>
      <div><span className="admin-kicker">CONTENT STUDIO</span><h1>Đăng nhập quản trị</h1><p>Chỉnh nội dung và hình ảnh của website.</p></div>
      {!isSupabaseConfigured() && <div className="admin-notice">Supabase chưa được cấu hình trên môi trường này.</div>}
      <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label>
      <label>Mật khẩu<input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></label>
      {message && <p className="admin-error">{message}</p>}
      <button className="admin-primary" disabled={loading}>{loading ? "Đang đăng nhập…" : "Đăng nhập"}</button>
      <a className="admin-back" href="/">← Trở về website</a>
    </form>
  </main>;
}

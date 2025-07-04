// app/page.tsx
import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-purple-700 drop-shadow-sm">
          Storyverse
        </h1>
        <p className="text-lg text-gray-700">
          ยินดีต้อนรับสู่ Storyverse! ✨<br />
          แพลตฟอร์มที่ให้คุณสร้าง แบ่งปัน
          และร่วมมือกันเขียนเรื่องราวได้อย่างง่ายดาย
        </p>
        <ul className="text-left text-gray-600 text-md space-y-2 bg-white/70 p-6 rounded-2xl shadow-md">
          <li>🚀 เริ่มเขียนเรื่องราวของคุณผ่านปุ่ม “Create New Story”</li>
          <li>👥 เชิญเพื่อนมาร่วมแก้ไขและเขียนไปด้วยกันแบบเรียลไทม์</li>
          <li>📚 จัดการโปรเจกต์ของคุณผ่านหน้า “Workspace”</li>
          <li>📝 สามารถจัดหมวดหมู่เรื่อง แนว และจำนวนคำได้อย่างละเอียด</li>
        </ul>
        <Link
          href="/projects"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          🚀 เริ่มใช้งาน
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          ขอให้สนุกกับการสร้างโลกของคุณใน Storyverse 🌍
        </p>
      </div>
    </main>
  );
}

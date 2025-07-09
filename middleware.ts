import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // สามารถเพิ่ม logic อื่นได้ที่นี่ ถ้าจำเป็น
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const publicPaths = ["/", "/auth/login", "/auth/register"];
        const path = req.nextUrl.pathname;

        // ✅ อนุญาตให้เข้าถึงหน้า public ได้แม้ไม่มี token
        if (publicPaths.includes(path)) {
          return true;
        }

        // ✅ หน้าอื่นๆ ต้องมี token
        return !!token;
      },
    },
  }
);

// ✅ เลือกเส้นทางที่ middleware จะทำงาน
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

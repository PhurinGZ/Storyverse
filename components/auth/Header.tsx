// components/Header.tsx
import { Sparkles, BookOpen } from "lucide-react"

export default function Header() {
  return (
    <div className="text-center text-white mb-10">
      <div className="flex justify-center items-center gap-2 text-3xl font-bold">
        <Sparkles className="text-yellow-400 animate-pulse" size={32} />
        สมัครสมาชิกกับ StoryVerse
        <BookOpen className="text-pink-300" size={32} />
      </div>
      <p className="mt-2 text-lg text-gray-200">
        เข้าสู่โลกแห่งจินตนาการ ร่วมเป็นนักเล่าเรื่องในจักรวาลของเรา
      </p>
    </div>
  )
}

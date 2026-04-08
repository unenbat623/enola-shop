import { Phone } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-[#111827] text-white h-9 flex items-center px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[13px]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            🚚 <span className="hidden sm:inline">УБ хотоор үнэгүй хүргэлт</span>
            <span className="sm:hidden text-[11px]">Үнэгүй хүргэлт</span>
          </span>
          <span className="hidden md:flex items-center gap-1 border-l border-gray-700 pl-4">
            <Phone className="w-3 h-3" /> 7700-0000
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="hover:text-primary transition-colors cursor-pointer">Нэвтрэх</button>
          <span className="text-gray-700">|</span>
          <button className="hover:text-primary transition-colors cursor-pointer">Бүртгүүлэх</button>
        </div>
      </div>
    </div>
  )
}

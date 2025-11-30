
import Link from 'next/link'
import { Music, Bell, User } from 'lucide-react'

export default function Navbar({ user }: { user: any }) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">VerVibe</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/artists" className="text-gray-700 hover:text-primary-600">
              ศิลปิน
            </Link>
            <Link href="/browse" className="text-gray-700 hover:text-primary-600">
              สำรวจ
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <a href="/notifications" className="relative p-2 text-gray-600 hover:text-primary-600">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </a>
                <div className="relative group">
                  <Link href="/dashboard" className="flex items-center space-x-2">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="avatar"
                        className="h-8 w-8 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-600" />
                    )}
                  </Link>
                  {/* Dropdown on hover */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
                    <div className="px-4 py-3 text-sm text-gray-700 border-b">เข้าสู่ระบบด้วย<br /><span className="font-medium break-all">{user.email}</span></div>
                    <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">แดชบอร์ด</Link>
                    <Link href="/auth/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">ออกจากระบบ</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-primary-600">
                  เข้าสู่ระบบ
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  เริ่มต้นใช้งาน
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

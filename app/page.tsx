import Link from 'next/link'
import { Music, Users, DollarSign, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-primary-600">VerVibe</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/artists" className="text-gray-700 hover:text-primary-600">
                ศิลปิน
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-primary-600">
                วิธีใช้งาน
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-primary-600">
                ราคา
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-primary-600">
                เข้าสู่ระบบ
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                เริ่มต้นใช้งาน
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            แพลตฟอร์มศิลปินไทย
            <br />
            <span className="text-primary-600">หารายได้จากแฟนตรงๆ</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            ใช้ YouTube/TikTok หาแฟน ใช้ VerVibe หารายได้
            <br />
            เก็บเงินได้ถึง 95% • ไม่มี Algorithm บังคับ • Community ที่ใส่ใจ
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
              เริ่มต้นฟรี
            </Link>
            <Link href="/artists" className="btn-secondary text-lg px-8 py-3">
              ดูศิลปิน
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">ทำไมต้อง VerVibe?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">เก็บเงินได้ 95%+</h3>
              <p className="text-gray-600">
                คอมมิชชั่นแค่ 5% เทียบกับ Spotify ที่ให้แค่ 3%
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community แท้จริง</h3>
              <p className="text-gray-600">
                เชื่อมต่อกับแฟนตัวจริงที่พร้อมสนับสนุนคุณ
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">ใช้ง่าย ภาษาไทย</h3>
              <p className="text-gray-600">
                ชำระผ่าน PromptPay สะดวกรวดเร็ว
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">วิธีใช้งาน</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-4xl font-bold text-primary-600 mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">สร้างโปรไฟล์</h3>
              <p className="text-gray-600">ตั้งค่า tier และราคาตามที่ต้องการ</p>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-primary-600 mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">สร้าง Content</h3>
              <p className="text-gray-600">แชร์เพลง ภาพ วิดีโอ เฉพาะสมาชิก</p>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-primary-600 mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">รับเงิน</h3>
              <p className="text-gray-600">โอนเข้าบัญชีทุกสิ้นเดือน</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">พร้อมเริ่มต้นหรือยัง?</h2>
          <p className="text-xl mb-8 opacity-90">
            เข้าร่วมศิลปินไทยหลายร้อยคนที่กำลังสร้างรายได้จากแฟนคลับ
          </p>
          <Link href="/auth/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-bold text-lg px-8 py-3 rounded-lg inline-block transition-colors">
            เริ่มต้นฟรี →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold text-white">VerVibe</span>
              </div>
              <p className="text-sm">
                แพลตฟอร์มศิลปินไทย<br />หารายได้จากแฟนตรงๆ
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">เกี่ยวกับ</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about">เกี่ยวกับเรา</Link></li>
                <li><Link href="/how-it-works">วิธีใช้งาน</Link></li>
                <li><Link href="/pricing">ราคา</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">สนับสนุน</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help">ศูนย์ช่วยเหลือ</Link></li>
                <li><Link href="/contact">ติดต่อเรา</Link></li>
                <li><Link href="/terms">ข้อกำหนด</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">ติดตาม</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://facebook.com/vervibe">Facebook</a></li>
                <li><a href="https://instagram.com/vervibe">Instagram</a></li>
                <li><a href="https://twitter.com/vervibe">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            © 2024 VerVibe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

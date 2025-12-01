
import Link from 'next/link'
import { Music, Users, DollarSign, Star, User, Plus } from 'lucide-react'

// Mock feed data (replace with real API later)
const feed = [
  {
    id: 'post1',
    artist: {
      displayName: 'Artist One',
      avatar: 'https://via.placeholder.com/100',
      slug: 'artist-one',
    },
    title: 'ปล่อยเพลงใหม่ "Summer Vibe"',
    content: 'ฟังเพลงใหม่ล่าสุดของฉันได้แล้ววันนี้!',
    image: 'https://via.placeholder.com/600x300',
    createdAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 'post2',
    artist: {
      displayName: 'Artist Two',
      avatar: 'https://via.placeholder.com/100',
      slug: 'artist-two',
    },
    title: 'เบื้องหลัง MV เพลงใหม่',
    content: 'แชร์ภาพเบื้องหลังการถ่ายทำ MV เพลงใหม่!',
    image: 'https://via.placeholder.com/600x300',
    createdAt: '2025-11-30T15:30:00Z',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">อัปเดตใหม่จากศิลปินและ Creator</h1>
        <div className="space-y-8">
          {feed.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center mb-4">
                <img src={post.artist.avatar} alt="avatar" className="h-12 w-12 rounded-full object-cover border mr-3" />
                <div>
                  <Link href={`/artist/${post.artist.slug}`} className="font-bold text-lg hover:text-primary-600">{post.artist.displayName}</Link>
                  <div className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="mb-4 text-gray-700">{post.content}</p>
              {post.image && <img src={post.image} alt="post" className="rounded-lg mb-4 w-full object-cover" />}
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-500 hover:text-primary-600"><Plus className="h-5 w-5 mr-1" />สนับสนุน</button>
                <button className="flex items-center text-gray-500 hover:text-primary-600"><Star className="h-5 w-5 mr-1" />ถูกใจ</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

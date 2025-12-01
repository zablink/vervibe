"use client"
import Link from 'next/link'
import { Music, Users, DollarSign, Star, User, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

// Mock feed data (replace with real API later)
const feed = Array.from({ length: 15 }).map((_, i) => {
  const artists = [
    { displayName: 'Artist One', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', slug: 'artist-one' },
    { displayName: 'Artist Two', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', slug: 'artist-two' },
    { displayName: 'Artist Three', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', slug: 'artist-three' },
    { displayName: 'Artist Four', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', slug: 'artist-four' },
    { displayName: 'Artist Five', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', slug: 'artist-five' },
  ]
  const artist = artists[i % artists.length]
  return {
    id: `post${i + 1}`,
    artist,
    title: `โพสต์ตัวอย่าง #${i + 1}`,
    content: `เนื้อหาตัวอย่างสำหรับโพสต์ที่ ${i + 1} ของ ${artist.displayName}`,
    image: `https://picsum.photos/seed/${i + 1}/600/300` ,
    createdAt: new Date(Date.now() - i * 3600 * 1000 * 6).toISOString(),
  }
})

export default function Home() {
  const [primaryColor, setPrimaryColor] = useState('#d946ef')
  useEffect(() => {
    fetch('/api/site-setting?key=primaryColor')
      .then(res => res.json())
      .then(data => {
        if (data.value) setPrimaryColor(data.value)
      })
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">อัปเดตใหม่จากศิลปินและ Creator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feed.map((post, i) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:border"
              style={{
                borderColor: i % 3 === 0 ? primaryColor : undefined,
                boxShadow: i % 5 === 0 ? `0 4px 24px 0 ${primaryColor}33` : undefined,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = primaryColor
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px 0 ${primaryColor}33`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = i % 3 === 0 ? primaryColor : ''
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = i % 5 === 0 ? `0 4px 24px 0 ${primaryColor}33` : ''
              }}
            >
              <div className="flex items-center mb-4">
                <img src={post.artist.avatar} alt="avatar" className="h-12 w-12 rounded-full object-cover border mr-3" />
                <div>
                  <Link href={`/artist/${post.artist.slug}`} className="font-bold text-lg" style={{ color: primaryColor }}>{post.artist.displayName}</Link>
                  <div className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: i % 3 === 0 ? primaryColor : undefined }}>{post.title}</h2>
              <p className="mb-4 text-gray-700">{post.content}</p>
              {post.image && <img src={post.image} alt="post" className="rounded-lg mb-4 w-full object-cover" />}
              <div className="flex space-x-4 mt-auto">
                <button className="flex items-center text-gray-500" style={{ color: primaryColor }}><Plus className="h-5 w-5 mr-1" />สนับสนุน</button>
                <button className="flex items-center text-gray-500" style={{ color: primaryColor }}><Star className="h-5 w-5 mr-1" />ถูกใจ</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

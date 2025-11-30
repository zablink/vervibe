'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { 
  Star, 
  Users, 
  Calendar,
  Lock,
  Check,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ExternalLink
} from 'lucide-react'
import { formatPrice } from '@/utils/tiers'

export default function ArtistProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  // Mock data - would fetch from API
  const artist = {
    id: '1',
    slug: params.slug,
    displayName: 'Artist Name',
    bio: 'Indie Pop Singer-Songwriter จากกรุงเทพฯ\n\nสร้างสรรค์ผลงานเพลงที่มาจากประสบการณ์ชีวิตจริง ผสมผสานความรู้สึกและท่วงทำนองที่ไพเราะ เพื่อสื่อสารความหมายลึกซึ้งของชีวิต',
    genre: ['Pop', 'Indie'],
    headerImage: 'https://via.placeholder.com/1200x400',
    avatar: 'https://via.placeholder.com/200',
    memberCount: 175,
    isFoundingArtist: true,
    isVerified: true,
    socialLinks: {
      facebook: 'https://facebook.com/artist',
      instagram: 'https://instagram.com/artist',
      twitter: 'https://twitter.com/artist',
      youtube: 'https://youtube.com/artist',
    },
    tiers: [
      {
        id: '1',
        name: 'Fan Club',
        priceCents: 4900,
        description: 'เข้าร่วมชุมชนแฟนคลับพิเศษ',
        benefits: [
          'กลุ่มแฟนคลับส่วนตัว',
          'อัปเดตก่อนใคร',
          'Behind-the-scenes content',
        ],
        memberCount: 85,
      },
      {
        id: '2',
        name: 'Superfan',
        priceCents: 9900,
        description: 'รับ content พิเศษและสิทธิพิเศษ',
        benefits: [
          'ทุกอย่างใน Fan Club',
          'เพลง/content พิเศษทุกเดือน',
          'Early access เพลงใหม่',
          'Q&A session',
        ],
        memberCount: 62,
      },
      {
        id: '3',
        name: 'Inner Circle',
        priceCents: 19900,
        description: 'เข้าถึง content ระดับพรีเมียม',
        benefits: [
          'ทุกอย่างใน Superfan',
          'ไฟล์คุณภาพสูง (FLAC/WAV)',
          'Request เพลงได้',
          'Vote เลือกเพลงถัดไป',
          'Early bird tickets',
        ],
        memberCount: 28,
      },
    ],
  }

  const posts = [
    {
      id: '1',
      title: 'เพลงใหม่ "Summer Vibe" 🎵',
      content: 'เพลงใหม่ล่าสุดที่ผมใช้เวลาทำมา 3 เดือน...',
      publishedAt: '2024-06-15',
      isPublic: true,
      tierAccess: [],
    },
    {
      id: '2',
      title: 'Behind the scenes: Recording session',
      content: 'มาดูกันว่าเบื้องหลังการอัดเพลงเป็นยังไง...',
      publishedAt: '2024-06-10',
      isPublic: false,
      tierAccess: ['1', '2', '3'],
    },
    {
      id: '3',
      title: 'Acoustic Session - Request Songs',
      content: 'Live session พิเศษสำหรับสมาชิก...',
      publishedAt: '2024-06-05',
      isPublic: false,
      tierAccess: ['2', '3'],
    },
  ]

  const handleSubscribe = (tierId: string) => {
    router.push(`/subscribe/${artist.slug}?tier=${tierId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      {/* Header Image */}
      <div className="relative h-80 bg-gradient-to-br from-primary-400 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20" />
        {artist.isFoundingArtist && (
          <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full flex items-center shadow-lg">
            <Star className="h-5 w-5 mr-2" />
            Founding Artist
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Info */}
        <div className="relative -mt-32 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-40 w-40 rounded-full bg-white p-2 shadow-xl">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                  {artist.displayName.charAt(0)}
                </div>
              </div>
              {artist.isVerified && (
                <div className="absolute bottom-2 right-2 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Check className="h-6 w-6 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {artist.displayName}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {artist.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{artist.memberCount} สมาชิก</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-3 mt-4 md:mt-0">
                  {artist.socialLinks.facebook && (
                    <a
                      href={artist.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </a>
                  )}
                  {artist.socialLinks.instagram && (
                    <a
                      href={artist.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-pink-100 rounded-full transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-pink-600" />
                    </a>
                  )}
                  {artist.socialLinks.twitter && (
                    <a
                      href={artist.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-blue-400" />
                    </a>
                  )}
                  {artist.socialLinks.youtube && (
                    <a
                      href={artist.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Youtube className="h-5 w-5 text-red-600" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">เกี่ยวกับ</h2>
              <p className="text-gray-700 whitespace-pre-line">{artist.bio}</p>
            </div>

            {/* Posts */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">โพสต์ล่าสุด</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-4 border-2 rounded-lg ${
                      post.isPublic
                        ? 'border-gray-200 hover:border-primary-300'
                        : 'border-primary-200 bg-primary-50'
                    } transition-colors`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{post.title}</h3>
                      {!post.isPublic && (
                        <Lock className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {post.isPublic ? post.content : 'เฉพาะสมาชิกเท่านั้น'}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString('th-TH')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Membership Tiers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Membership Tiers</h2>
            {artist.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`card cursor-pointer transition-all ${
                  selectedTier === tier.id
                    ? 'ring-2 ring-primary-600 shadow-lg'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">
                      {formatPrice(tier.priceCents)}
                    </p>
                    <p className="text-xs text-gray-500">ต่อเดือน</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">สิทธิประโยชน์:</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 mb-4">
                  <span className="text-sm text-gray-600">สมาชิกปัจจุบัน</span>
                  <span className="font-medium text-gray-900">{tier.memberCount} คน</span>
                </div>

                <button
                  onClick={() => handleSubscribe(tier.id)}
                  className="w-full btn-primary"
                >
                  เลือก Tier นี้
                </button>
              </div>
            ))}

            {/* CTA */}
            <div className="card bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200">
              <h3 className="font-bold text-gray-900 mb-2">ไม่แน่ใจว่าจะเลือก Tier ไหน?</h3>
              <p className="text-sm text-gray-600 mb-4">
                เริ่มต้นด้วย tier ต่ำสุดและอัพเกรดได้ทุกเมื่อ
              </p>
              <button
                onClick={() => handleSubscribe(artist.tiers[0].id)}
                className="w-full btn-primary"
              >
                เริ่มต้นด้วย {artist.tiers[0].name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

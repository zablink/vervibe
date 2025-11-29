'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { Image, Music, Video, FileText, Send, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    postType: 'TEXT',
    tierAccess: ['all'],
    isPublic: false,
    scheduledFor: '',
  })

  const tiers = [
    { id: '1', name: 'Fan Club', priceCents: 4900 },
    { id: '2', name: 'Superfan', priceCents: 9900 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('โพสต์สำเร็จ!')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={{ fullName: 'Artist' }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">สร้างโพสต์ใหม่</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <label className="block text-sm font-medium mb-3">ประเภทโพสต์</label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { type: 'TEXT', icon: FileText, label: 'ข้อความ' },
                { type: 'IMAGE', icon: Image, label: 'รูปภาพ' },
                { type: 'AUDIO', icon: Music, label: 'เสียง' },
                { type: 'VIDEO', icon: Video, label: 'วิดีโอ' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setPostData({ ...postData, postType: item.type })}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 ${
                      postData.postType === item.type
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="card">
            <label className="block text-sm font-medium mb-2">หัวข้อ</label>
            <input
              type="text"
              required
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="ตั้งหัวข้อ..."
            />
          </div>

          <div className="card">
            <label className="block text-sm font-medium mb-2">เนื้อหา</label>
            <textarea
              rows={8}
              value={postData.content}
              onChange={(e) => setPostData({ ...postData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="เขียนเนื้อหา..."
            />
          </div>

          <div className="card">
            <label className="block text-sm font-medium mb-3">ใครดูได้?</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg">
                <input
                  type="checkbox"
                  checked={postData.isPublic}
                  onChange={(e) => setPostData({ ...postData, isPublic: e.target.checked })}
                  className="h-4 w-4"
                />
                <span className="ml-3 text-sm">โพสต์สาธารณะ</span>
              </label>

              {!postData.isPublic && tiers.map((tier) => (
                <label key={tier.id} className="flex items-center p-3 border rounded-lg">
                  <input type="checkbox" className="h-4 w-4" />
                  <span className="ml-3 text-sm">{tier.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => router.back()} className="btn-secondary">
              ยกเลิก
            </button>
            <button type="submit" className="btn-primary flex items-center">
              <Send className="h-4 w-4 mr-2" />
              เผยแพร่
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

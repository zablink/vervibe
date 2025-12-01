'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Music, 
  DollarSign, 
  Settings, 
  BarChart3,
  Shield,
  Image,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      
        // Check if user is admin (implement proper role check)
        setUser(user)
        setLoading(false)

      // TODO: Implement site setting save logic to DB
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const stats = {
    totalArtists: 42,
    totalFans: 8350,
    totalRevenue: 686500,
    activeSubscriptions: 7892,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white">
                กลับหน้าหลัก
              </Link>
              <span className="text-gray-400">{user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">ศิลปินทั้งหมด</p>
                <p className="text-3xl font-bold mt-1">{stats.totalArtists}</p>
              </div>
              <Music className="h-10 w-10 opacity-80" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">แฟนทั้งหมด</p>
                <p className="text-3xl font-bold mt-1">{stats.totalFans.toLocaleString()}</p>
              </div>
              <Users className="h-10 w-10 opacity-80" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">รายได้รวม</p>
                <p className="text-3xl font-bold mt-1">฿{(stats.totalRevenue).toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 opacity-80" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Subscriptions</p>
                <p className="text-3xl font-bold mt-1">{stats.activeSubscriptions.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-10 w-10 opacity-80" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'ภาพรวม', icon: BarChart3 },
                { id: 'artists', label: 'จัดการศิลปิน', icon: Music },
                { id: 'users', label: 'จัดการผู้ใช้', icon: Users },
                { id: 'settings', label: 'ตั้งค่าเว็บไซต์', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'artists' && <ArtistsTab />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Move OverviewTab above AdminDashboard to avoid hoisting/syntax issues
function OverviewTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">ภาพรวมระบบ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">ศิลปินใหม่ (30 วัน)</p>
            <p className="text-2xl font-bold mt-1">+8</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">แฟนใหม่ (30 วัน)</p>
            <p className="text-2xl font-bold mt-1">+342</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">กิจกรรมล่าสุด</h3>
        <div className="space-y-2">
          {[
            { action: 'ศิลปินใหม่ลงทะเบียน', user: 'John Doe', time: '5 นาทีที่แล้ว' },
            { action: 'สมัครสมาชิก Tier VIP', user: 'Jane Smith', time: '15 นาทีที่แล้ว' },
            { action: 'อัพโหลดโพสต์ใหม่', user: 'Artist A', time: '1 ชั่วโมงที่แล้ว' },
          ].map((activity, i) => (
            <div key={i} className="p-3 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-medium">{activity.user}</span> {activity.action}
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ArtistsTab for the artist table
function ArtistsTab() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สมาชิก</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รายได้</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">การกระทำ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Sample data */}
          <tr>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Music className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Artist Name</p>
                  <p className="text-sm text-gray-500">@artistslug</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">175</td>
            <td className="px-6 py-4">฿16,325</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
            <td className="px-6 py-4">
              <button className="text-primary-600 hover:text-primary-700 text-sm">
                จัดการ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
    </div>
  )
}

function UsersTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">รายชื่อผู้ใช้</h3>
        <input
          type="text"
          placeholder="ค้นหาผู้ใช้..."
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้ใช้</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">บทบาท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สมัคร</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">การกระทำ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample data would go here */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SettingsTab() {

  const [settings, setSettings] = useState({
    siteName: '',
    siteTitle: '',
    favicon: '',
    logo: '',
    primaryColor: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Load settings from DB on mount
  useEffect(() => {
    async function loadSettings() {
      setLoading(true)
      const keys = ['siteName', 'siteTitle', 'favicon', 'logo', 'primaryColor', 'description']
      const results = await Promise.all(
        keys.map(async (key) => {
          const res = await fetch(`/api/site-setting?key=${key}`)
          const data = await res.json()
          return [key, data.value || '']
        })
      )
      setSettings(Object.fromEntries(results))
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    const keys = Object.keys(settings)
    try {
      await Promise.all(
        keys.map(async (key) => {
          await fetch('/api/site-setting', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value: settings[key as keyof typeof settings] }),
          })
        })
      )
      setMessage('บันทึกการตั้งค่าเรียบร้อย')
    } catch (e) {
      setMessage('เกิดข้อผิดพลาดในการบันทึก')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl">
      <h3 className="text-lg font-bold mb-6">ตั้งค่าเว็บไซต์</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อเว็บไซต์
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title Tag
          </label>
          <input
            type="text"
            value={settings.siteTitle}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            คำอธิบาย (Meta Description)
          </label>
          <textarea
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>โลโก้ (URL)</span>
            </div>
          </label>
          <input
            type="text"
            value={settings.logo}
            onChange={e => setSettings({ ...settings, logo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="https://..."
          />
          <p className="text-sm text-gray-500 mt-1">แนะนำ: PNG/SVG, 200x50px (ใส่ URL รูปภาพ)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Favicon (URL)</span>
            </div>
          </label>
          <input
            type="text"
            value={settings.favicon}
            onChange={e => setSettings({ ...settings, favicon: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="https://..."
          />
          <p className="text-sm text-gray-500 mt-1">แนะนำ: ICO/PNG, 32x32px (ใส่ URL รูปภาพ)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สีหลัก (Primary Color)
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              className="h-10 w-20 rounded border border-gray-300"
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="#d946ef"
            />
          </div>
        </div>

        <div className="pt-4">
          <button onClick={handleSave} className="btn-primary" disabled={loading}>
            {loading ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
          </button>
          {message && <div className="mt-3 text-green-600 font-medium">{message}</div>}
        </div>
      </div>
    </div>
  )
}

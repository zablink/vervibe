"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { BarChart3, Users, DollarSign, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()


  useEffect(() => {
    let unsub: any = null
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      alert('[dashboard] getUser: ' + JSON.stringify(user))
      if (user) {
        setUser(user)
        setProfile({
          role: "ARTIST",
          displayName: (user as any).fullName || (user as any).email || "Artist",
        })
        setLoading(false)
      } else {
        // subscribe to auth state change
        unsub = supabase.auth.onAuthStateChange((event, session) => {
          alert('[dashboard] onAuthStateChange: ' + event + ' ' + JSON.stringify(session))
          if (session?.user) {
            setUser(session.user)
            setProfile({
              role: "ARTIST",
              displayName: (session.user as any).fullName || (session.user as any).email || "Artist",
            })
            setLoading(false)
          } else {
            router.replace("/auth/login")
          }
        })
      }
    }
    checkUser()
    return () => {
      if (unsub && unsub.data && unsub.data.subscription) {
        unsub.data.subscription.unsubscribe()
      }
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (profile?.role === "ARTIST") {
    return <ArtistDashboard user={user} profile={profile} />
  }

  return <FanDashboard user={user} profile={profile} />
}

function ArtistDashboard({ user, profile }: any) {
  const stats = {
    totalRevenue: 16325,
    members: 175,
    newMembers: 12,
    growthRate: 8.5,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">ยินดีต้อนรับกลับ, {profile.displayName}!</p>
          </div>
          <Link href="/dashboard/posts/new" className="btn-primary flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            โพสต์ใหม่
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รายได้เดือนนี้</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ฿{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">สมาชิกทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.members}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">สมาชิกใหม่</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.newMembers}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">อัตราการเติบโต</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">+{stats.growthRate}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">การกระทำด่วน</h2>
            <div className="space-y-3">
              <Link href="/dashboard/posts/new" className="block p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                <div className="flex items-center">
                  <Plus className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <p className="font-medium">สร้างโพสต์ใหม่</p>
                    <p className="text-sm text-gray-600">แชร์ content กับสมาชิก</p>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/tiers" className="block p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <p className="font-medium">จัดการ Tiers</p>
                    <p className="text-sm text-gray-600">ตั้งค่าระดับสมาชิก</p>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/analytics" className="block p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <p className="font-medium">ดู Analytics</p>
                    <p className="text-sm text-gray-600">วิเคราะห์ข้อมูลเชิงลึก</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-4">โพสต์ล่าสุด</h2>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="font-medium">เพลงใหม่ "Summer Vibe"</p>
                <p className="text-sm text-gray-600 mt-1">152 views • 24 likes</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="font-medium">Behind the scenes: Recording session</p>
                <p className="text-sm text-gray-600 mt-1">98 views • 18 likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FanDashboard({ user, profile }: any) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {profile.displayName}!</h1>
        <p>ฟีเจอร์สำหรับแฟนคลับจะมาเร็วๆ นี้</p>
      </div>
    </div>
  )
}

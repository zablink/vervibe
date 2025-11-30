"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ตัวอย่าง: ดึง notifications จาก Supabase table (ต้องมี table notifications จริง)
    async function fetchNotifications() {
      const { data, error } = await supabase
        .from('Notification')
        .select('*')
        .order('createdAt', { ascending: false })
      setNotifications(data || [])
      setLoading(false)
    }
    fetchNotifications()
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">การแจ้งเตือน</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-gray-500 text-center">ไม่มีการแจ้งเตือน</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li key={n.id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <div className="font-medium text-gray-900">{n.title || 'แจ้งเตือน'}</div>
              <div className="text-gray-700 text-sm mt-1">{n.body || n.message}</div>
              <div className="text-xs text-gray-400 mt-2">{new Date(n.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

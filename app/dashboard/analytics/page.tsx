'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, 
  Eye, Heart, MessageCircle, Calendar 
} from 'lucide-react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30days')

  const revenueData = [
    { month: 'ม.ค.', revenue: 8500, members: 120 },
    { month: 'ก.พ.', revenue: 11200, members: 145 },
    { month: 'มี.ค.', revenue: 13800, members: 158 },
    { month: 'เม.ย.', revenue: 14500, members: 165 },
    { month: 'พ.ค.', revenue: 15800, members: 172 },
    { month: 'มิ.ย.', revenue: 16325, members: 175 },
  ]

  const tierDistribution = [
    { name: 'Fan Club', value: 85, color: '#60a5fa' },
    { name: 'Superfan', value: 60, color: '#a78bfa' },
    { name: 'Inner Circle', value: 25, color: '#f472b6' },
    { name: 'VIP', value: 5, color: '#fb923c' },
  ]

  const engagementData = [
    { day: 'จ', views: 450, likes: 85, comments: 23 },
    { day: 'อ', views: 520, likes: 92, comments: 31 },
    { day: 'พ', views: 680, likes: 125, comments: 45 },
    { day: 'พฤ', views: 590, likes: 108, comments: 38 },
    { day: 'ศ', views: 720, likes: 142, comments: 52 },
    { day: 'ส', views: 890, likes: 178, comments: 68 },
    { day: 'อา', views: 820, likes: 165, comments: 61 },
  ]

  const topPosts = [
    { title: 'เพลงใหม่ "Summer Vibe"', views: 892, likes: 156, comments: 45 },
    { title: 'Behind the Scenes', views: 654, likes: 128, comments: 32 },
    { title: 'Exclusive Track', views: 521, likes: 98, comments: 28 },
    { title: 'Q&A Session', views: 487, likes: 89, comments: 67 },
  ]

  const stats = {
    totalRevenue: 16325,
    revenueGrowth: 8.5,
    totalMembers: 175,
    memberGrowth: 6.2,
    avgRevenuePerMember: 93.3,
    retentionRate: 95.8,
    churnRate: 4.2,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={{ fullName: 'Artist' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">วิเคราะห์ข้อมูลเชิงลึก</p>
          </div>
          
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="7days">7 วันที่แล้ว</option>
            <option value="30days">30 วันที่แล้ว</option>
            <option value="90days">90 วันที่แล้ว</option>
            <option value="1year">1 ปีที่แล้ว</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="รายได้เดือนนี้"
            value={`฿${stats.totalRevenue.toLocaleString()}`}
            change={stats.revenueGrowth}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="สมาชิกทั้งหมด"
            value={stats.totalMembers}
            change={stats.memberGrowth}
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="รายได้เฉลี่ย/คน"
            value={`฿${stats.avgRevenuePerMember.toFixed(0)}`}
            change={2.3}
            icon={TrendingUp}
            color="purple"
          />
          <MetricCard
            title="Retention Rate"
            value={`${stats.retentionRate}%`}
            change={1.2}
            icon={Heart}
            color="pink"
          />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">รายได้ & สมาชิก</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#d946ef" 
                  strokeWidth={2}
                  name="รายได้"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="members" 
                  stroke="#60a5fa" 
                  strokeWidth={2}
                  name="สมาชิก"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-4">การกระจาย Tiers</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tierDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {tierDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-lg font-bold mb-4">Engagement (7 วัน)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#60a5fa" name="Views" />
              <Bar dataKey="likes" fill="#f472b6" name="Likes" />
              <Bar dataKey="comments" fill="#a78bfa" name="Comments" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card mb-8">
          <h2 className="text-lg font-bold mb-4">โพสต์ยอดนิยม</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">โพสต์</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Likes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Comments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Engagement</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {topPosts.map((post, i) => {
                  const rate = ((post.likes + post.comments) / post.views * 100).toFixed(1)
                  return (
                    <tr key={i}>
                      <td className="px-6 py-4 text-sm font-medium">{post.title}</td>
                      <td className="px-6 py-4 text-sm">{post.views}</td>
                      <td className="px-6 py-4 text-sm">{post.likes}</td>
                      <td className="px-6 py-4 text-sm">{post.comments}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-bold mb-2 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-600" />
              Best Time to Post
            </h3>
            <p className="text-2xl font-bold">วันศุกร์</p>
            <p className="text-sm text-gray-600">18:00 - 21:00</p>
          </div>

          <div className="card">
            <h3 className="font-bold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Retention
            </h3>
            <p className="text-2xl font-bold">{stats.retentionRate}%</p>
            <p className="text-sm text-gray-600">Churn: {stats.churnRate}%</p>
          </div>

          <div className="card">
            <h3 className="font-bold mb-2 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Forecast
            </h3>
            <p className="text-2xl font-bold">฿19,200</p>
            <p className="text-sm text-gray-600">เดือนหน้า (+17.6%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, change, icon: Icon, color }: any) {
  const isPositive = change >= 0
  const colors = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold">{value}</p>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  )
}

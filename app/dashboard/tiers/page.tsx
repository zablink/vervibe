'use client'

import { useState } from 'react'

import { Plus, Trash2 } from 'lucide-react'
import { TIER_PRESETS, formatPrice } from '@/utils/tiers'

export default function TiersPage() {
  const [tiers, setTiers] = useState([
    { id: '1', ...TIER_PRESETS[0], position: 0, isActive: true },
    { id: '2', ...TIER_PRESETS[1], position: 1, isActive: true },
  ])

  const addTier = () => {
    const availablePresets = TIER_PRESETS.filter(
      preset => !tiers.some(t => t.priceCents === preset.priceCents)
    )
    
    if (availablePresets.length === 0) {
      alert('คุณได้เพิ่ม tier ครบทั้ง 4 ระดับแล้ว')
      return
    }

    const newTier = {
      id: Date.now().toString(),
      ...availablePresets[0],
      position: tiers.length,
      isActive: true,
    }
    setTiers([...tiers, newTier])
  }

  const deleteTier = (id: string) => {
    if (confirm('ต้องการลบ tier นี้?')) {
      setTiers(tiers.filter(t => t.id !== id))
    }
  }

  const toggleActive = (id: string) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t))
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">จัดการ Tiers</h1>
            <p className="text-gray-600 mt-1">ตั้งค่าระดับสมาชิกและราคา</p>
          </div>
          <button 
            onClick={addTier}
            disabled={tiers.length >= 4}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <Plus className="h-5 w-5 mr-2" />
            เพิ่ม Tier
          </button>
        </div>

        <div className="space-y-4">
          {tiers.map((tier) => (
            <div key={tier.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(tier.priceCents)}
                    </span>
                    <span className="text-sm text-gray-500">/เดือน</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tier.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tier.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">สิทธิประโยชน์:</p>
                    <ul className="space-y-1">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <span className="text-primary-600 mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleActive(tier.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      tier.isActive
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    }`}
                  >
                    {tier.isActive ? 'ปิด' : 'เปิด'}
                  </button>
                  <button
                    onClick={() => deleteTier(tier.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 card bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">💡 คำแนะนำ</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• เริ่มต้นด้วย 2-3 tiers ก่อน อย่าทำเยอะเกินไป</li>
            <li>• ราคาแต่ละ tier ควรต่างกันชัดเจน</li>
            <li>• Tier ที่สูงกว่าควรได้สิทธิประโยชน์เพิ่มจาก tier ก่อนหน้า</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

import { CreditCard, Smartphone, Building, ArrowLeft, Check, Lock } from 'lucide-react'
import { formatPrice } from '@/utils/tiers'

export default function SubscribePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const tierId = searchParams.get('tier')

  const [step, setStep] = useState(1) // 1: Login, 2: Payment Method, 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'card' | 'banking'>('promptpay')
  const [processing, setProcessing] = useState(false)
  const [qrCode, setQrCode] = useState('')

  // Mock data
  const artist = {
    displayName: 'Artist Name',
    slug: params.slug,
  }

  const tier = {
    id: tierId,
    name: 'Superfan',
    priceCents: 9900,
    benefits: [
      'ทุกอย่างใน Fan Club',
      'เพลง/content พิเศษทุกเดือน',
      'Early access เพลงใหม่',
      'Q&A session',
    ],
  }

  const handlePayment = async () => {
    setProcessing(true)

    // Simulate payment processing
    if (paymentMethod === 'promptpay') {
      // Generate QR code
      setTimeout(() => {
        setQrCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')
        setProcessing(false)
      }, 1000)
    } else {
      // Process card/banking payment
      setTimeout(() => {
        alert('ชำระเงินสำเร็จ!')
        router.push('/dashboard')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          กลับ
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h1>
          <p className="text-gray-600">
            {artist.displayName} - {tier.name}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Summary */}
          <div className="md:col-span-1">
            <div className="card sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">สรุปการสั่งซื้อ</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tier</span>
                  <span className="font-medium">{tier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ราคา</span>
                  <span className="font-medium">{formatPrice(tier.priceCents)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ระยะเวลา</span>
                  <span className="font-medium">1 เดือน</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">ยอดรวม</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(tier.priceCents)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">ต่อเดือน</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Lock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">การชำระเงินปลอดภัย</p>
                    <p className="text-xs text-blue-700 mt-1">
                      ข้อมูลของคุณได้รับการเข้ารหัสและปลอดภัย
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-gray-500">
                  คุณสามารถยกเลิกได้ทุกเมื่อ สมาชิกจะคงอยู่จนสิ้นสุดรอบบิล
                </p>
              </div>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div className="md:col-span-2">
            {/* Payment Method Selection */}
            <div className="card mb-6">
              <h3 className="text-lg font-bold mb-4">เลือกวิธีชำระเงิน</h3>
              
              <div className="space-y-3">
                {/* PromptPay */}
                <button
                  onClick={() => setPaymentMethod('promptpay')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-colors ${
                    paymentMethod === 'promptpay'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Smartphone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">PromptPay QR</p>
                      <p className="text-sm text-gray-600">สแกนจ่ายผ่านแอปธนาคาร</p>
                    </div>
                  </div>
                  {paymentMethod === 'promptpay' && (
                    <Check className="h-6 w-6 text-primary-600" />
                  )}
                </button>

                {/* Credit/Debit Card */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">บัตรเครดิต/เดบิต</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <Check className="h-6 w-6 text-primary-600" />
                  )}
                </button>

                {/* Internet Banking */}
                <button
                  onClick={() => setPaymentMethod('banking')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-colors ${
                    paymentMethod === 'banking'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Building className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Internet Banking</p>
                      <p className="text-sm text-gray-600">SCB, KBank, Bangkok Bank</p>
                    </div>
                  </div>
                  {paymentMethod === 'banking' && (
                    <Check className="h-6 w-6 text-primary-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Payment Details */}
            <div className="card">
              {paymentMethod === 'promptpay' && !qrCode && (
                <div>
                  <h3 className="text-lg font-bold mb-4">ชำระเงินผ่าน PromptPay</h3>
                  <p className="text-gray-600 mb-6">
                    กดปุ่มด้านล่างเพื่อสร้าง QR Code สำหรับชำระเงิน
                  </p>
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {processing ? 'กำลังสร้าง QR Code...' : 'สร้าง QR Code'}
                  </button>
                </div>
              )}

              {paymentMethod === 'promptpay' && qrCode && (
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-4">สแกน QR Code</h3>
                  <div className="bg-white p-8 rounded-lg inline-block shadow-lg mb-6">
                    <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                      <p className="text-gray-600">QR Code จะแสดงที่นี่</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    เปิดแอปธนาคารและสแกน QR Code เพื่อชำระเงิน
                  </p>
                  <p className="text-sm text-gray-500">
                    ยอดเงิน: <span className="font-bold">{formatPrice(tier.priceCents)}</span>
                  </p>
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⏱️ QR Code จะหมดอายุใน 15 นาที
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                  <h3 className="text-lg font-bold mb-4">รายละเอียดบัตร</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        หมายเลขบัตร
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          วันหมดอายุ
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ชื่อบนบัตร
                      </label>
                      <input
                        type="text"
                        placeholder="JOHN DOE"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary w-full mt-6 disabled:opacity-50"
                  >
                    {processing ? 'กำลังดำเนินการ...' : `ชำระเงิน ${formatPrice(tier.priceCents)}`}
                  </button>
                </form>
              )}

              {paymentMethod === 'banking' && (
                <div>
                  <h3 className="text-lg font-bold mb-4">เลือกธนาคาร</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['SCB', 'KBank', 'Bangkok Bank', 'Kasikorn'].map((bank) => (
                      <button
                        key={bank}
                        className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                      >
                        <p className="font-medium text-gray-900">{bank}</p>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {processing ? 'กำลังดำเนินการ...' : 'ดำเนินการต่อ'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

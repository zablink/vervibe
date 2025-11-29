export const TIER_PRESETS = [
  {
    name: 'Fan Club',
    priceCents: 4900, // ฿49
    benefits: [
      'กลุ่มแฟนคลับส่วนตัว',
      'อัปเดตก่อนใคร',
      'Behind-the-scenes content',
    ],
  },
  {
    name: 'Superfan',
    priceCents: 9900, // ฿99
    benefits: [
      'ทุกอย่างใน Fan Club',
      'เพลง/content พิเศษทุกเดือน',
      'Early access เพลงใหม่',
      'Q&A session',
    ],
  },
  {
    name: 'Inner Circle',
    priceCents: 19900, // ฿199
    benefits: [
      'ทุกอย่างใน Superfan',
      'ไฟล์คุณภาพสูง (FLAC/WAV)',
      'Request เพลงได้',
      'Vote เลือกเพลงถัดไป',
      'Early bird tickets',
    ],
  },
  {
    name: 'VIP',
    priceCents: 49900, // ฿499
    benefits: [
      'ทุกอย่างใน Inner Circle',
      'Video call 1-on-1',
      'ชื่อในเครดิตเพลง',
      'Signed merchandise',
    ],
  },
]

export const formatPrice = (priceCents: number) => {
  return `฿${(priceCents / 100).toLocaleString('th-TH')}`
}

export const calculateArtistPayout = (grossAmount: number, commissionRate: number = 0.05) => {
  const commission = grossAmount * commissionRate
  const paymentFee = calculatePaymentFee(grossAmount)
  const artistPayout = grossAmount - commission - paymentFee

  return {
    gross: grossAmount,
    commission,
    paymentFee,
    artistPayout,
  }
}

export const calculatePaymentFee = (amount: number) => {
  // PromptPay fees
  if (amount < 2000) {
    return 11
  }
  return Math.min(amount * 0.011, 200)
}

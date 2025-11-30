import { NextResponse } from 'next/server'

// Facebook Data Deletion Callback Endpoint
// Facebook จะส่ง signed_request มาที่ endpoint นี้เมื่อผู้ใช้ร้องขอลบข้อมูล

export async function POST(request: Request) {
  // TODO: ตรวจสอบ signed_request และลบข้อมูลผู้ใช้ที่เกี่ยวข้อง (ตาม business logic)
  // ตัวอย่างนี้จะตอบกลับ URL สำหรับแสดงสถานะการลบข้อมูล
  return NextResponse.json({
    url: 'https://vervibe.art/data-deletion-status'
  })
}

export async function GET() {
  // สำหรับทดสอบ endpoint หรือ health check
  return NextResponse.json({
    message: 'Facebook Data Deletion Endpoint'
  })
}

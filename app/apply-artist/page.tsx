import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ApplyArtistPage() {
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: call API to create ArtistProfile
    // For now, just redirect back to dashboard
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">สมัครเป็นศิลปิน</h1>
        <div className="mb-4">
          <label className="block mb-1 font-medium">ชื่อที่แสดง *</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">แนะนำตัว (Bio)</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full py-3 mt-2 font-semibold"
          disabled={loading}
        >
          {loading ? "กำลังบันทึก..." : "ยืนยันสมัครเป็นศิลปิน"}
        </button>
      </form>
    </div>
  )
}

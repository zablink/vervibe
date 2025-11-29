'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Search, Filter, Star, Users } from 'lucide-react'

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const genres = [
    'all',
    'Pop',
    'Rock',
    'Indie',
    'Jazz',
    'R&B',
    'Electronic',
    'Acoustic',
  ]

  const artists = [
    {
      id: '1',
      slug: 'artist-one',
      displayName: 'Artist One',
      bio: 'Indie Pop Singer-Songwriter',
      genre: ['Pop', 'Indie'],
      headerImage: 'https://via.placeholder.com/400x200',
      avatar: 'https://via.placeholder.com/100',
      memberCount: 175,
      isFoundingArtist: true,
      isVerified: true,
      minPrice: 49,
    },
    {
      id: '2',
      slug: 'artist-two',
      displayName: 'Artist Two',
      bio: 'Rock & Alternative Musician',
      genre: ['Rock'],
      headerImage: 'https://via.placeholder.com/400x200',
      avatar: 'https://via.placeholder.com/100',
      memberCount: 142,
      isFoundingArtist: true,
      isVerified: true,
      minPrice: 49,
    },
    {
      id: '3',
      slug: 'artist-three',
      displayName: 'Artist Three',
      bio: 'Jazz & Soul Artist',
      genre: ['Jazz', 'R&B'],
      headerImage: 'https://via.placeholder.com/400x200',
      avatar: 'https://via.placeholder.com/100',
      memberCount: 98,
      isFoundingArtist: false,
      isVerified: true,
      minPrice: 99,
    },
    {
      id: '4',
      slug: 'artist-four',
      displayName: 'Artist Four',
      bio: 'Electronic Music Producer',
      genre: ['Electronic'],
      headerImage: 'https://via.placeholder.com/400x200',
      avatar: 'https://via.placeholder.com/100',
      memberCount: 86,
      isFoundingArtist: false,
      isVerified: false,
      minPrice: 49,
    },
  ]

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.bio.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || artist.genre.includes(selectedGenre)
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={null} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ค้นหาศิลปิน</h1>
          <p className="text-xl text-gray-600">สนับสนุนศิลปินที่คุณชื่นชอบ</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาศิลปิน..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                <option value="all">ทุกประเภท</option>
                {genres.filter(g => g !== 'all').map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600">
            พบ {filteredArtists.length} ศิลปิน
            {searchQuery && ` สำหรับ "${searchQuery}"`}
            {selectedGenre !== 'all' && ` ในหมวด ${selectedGenre}`}
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.slug}`}
              className="card group hover:shadow-xl transition-all duration-300 overflow-hidden p-0"
            >
              {/* Header Image */}
              <div className="relative h-40 bg-gradient-to-br from-primary-400 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                {artist.isFoundingArtist && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Founding Artist
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="relative px-6 -mt-12">
                <div className="relative inline-block">
                  <div className="h-24 w-24 rounded-full bg-white p-1">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {artist.displayName.charAt(0)}
                    </div>
                  </div>
                  {artist.isVerified && (
                    <div className="absolute bottom-0 right-0 h-7 w-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {artist.displayName}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{artist.bio}</p>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{artist.memberCount} สมาชิก</span>
                  </div>
                  <div className="text-primary-600 font-bold">
                    เริ่มต้น ฿{artist.minPrice}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">ไม่พบศิลปินที่ค้นหา</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGenre('all')
              }}
              className="mt-4 text-primary-600 hover:text-primary-700"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

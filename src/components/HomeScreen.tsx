import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Bell, User, MapPin, Star, Home, Calendar, Tag, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const venues = [
  {
    id: 1,
    name: 'Futsal Arena Sudirman',
    image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBpbmRvb3IlMjBjb3VydHxlbnwxfHx8fDE3NjExOTM3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 245,
    price: 150000,
    distance: '1.2 km',
    type: 'Indoor',
    surface: 'Vinyl'
  },
  {
    id: 2,
    name: 'Champion Futsal Center',
    image: 'https://images.unsplash.com/photo-1705593813682-033ee2991df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMG91dGRvb3J8ZW58MXx8fHwxNzYxMjU4NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviews: 189,
    price: 120000,
    distance: '2.5 km',
    type: 'Outdoor',
    surface: 'Rumput Sintetis'
  },
  {
    id: 3,
    name: 'Sports Hub Jakarta',
    image: 'https://images.unsplash.com/photo-1758300173998-e3c779fd4401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzcG9ydHMlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NjEyNTg1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviews: 312,
    price: 180000,
    distance: '0.8 km',
    type: 'Indoor',
    surface: 'Vinyl'
  },
  {
    id: 4,
    name: 'Victory Futsal Park',
    image: 'https://images.unsplash.com/photo-1587384474964-3a06ce1ce699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzb2NjZXJ8ZW58MXx8fHwxNzYxMjU4NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviews: 203,
    price: 140000,
    distance: '3.1 km',
    type: 'Indoor',
    surface: 'Vinyl'
  }
];

const filters = ['Indoor', 'Outdoor', 'Vinyl', 'Rumput Sintetis'];

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [activeNav, setActiveNav] = useState('home');

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'bookings') onNavigate('my-bookings');
    if (nav === 'promo') onNavigate('home'); // Would navigate to promo screen
    if (nav === 'profile') onNavigate('profile');
    if (nav === 'dashboard') onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00C853] to-[#1976D2] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" strokeWidth="2" />
                <path strokeWidth="2" strokeLinecap="round" d="M12 4v3M12 17v3M4 12h3M17 12h3" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#757575]">Lokasi Anda</p>
              <p className="text-sm text-[#212121]">Jakarta Selatan</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => handleNavClick('dashboard')}
            >
              <Calendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6D00] rounded-full"></span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
          <Input
            placeholder="Cari venue futsal terdekat..."
            className="pl-10 h-11 bg-[#F5F5F5] border-0"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 overflow-x-auto">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              className={
                selectedFilter === filter
                  ? 'bg-[#00C853] hover:bg-[#00C853]/90 whitespace-nowrap'
                  : 'bg-white whitespace-nowrap'
              }
              onClick={() => setSelectedFilter(selectedFilter === filter ? '' : filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-r from-[#FF6D00] to-[#FF8F00] p-4 border-0 shadow-lg">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-xs mb-1">Promo Spesial!</p>
              <h3 className="mb-1">Diskon 30% Booking Pertama</h3>
              <p className="text-xs opacity-90">Gunakan kode: FIRST30</p>
            </div>
            <Tag className="h-8 w-8" />
          </div>
        </Card>
      </div>

      {/* Venue List */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#212121]">Venue Terdekat</h2>
          <button className="text-sm text-[#1976D2]">Lihat Semua</button>
        </div>

        <div className="space-y-4">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate('detail-venue', { venue })}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-[#00C853] text-white border-0">
                    {venue.type}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-[#212121] mb-2">{venue.name}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-[#212121]">{venue.rating}</span>
                      <span className="text-xs text-[#757575]">({venue.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#757575]">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{venue.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#757575]">Mulai dari</p>
                      <p className="text-[#00C853]">Rp {venue.price.toLocaleString('id-ID')}/jam</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {venue.surface}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-20">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'home' ? 'text-[#00C853]' : 'text-[#757575]'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => handleNavClick('bookings')}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'bookings' ? 'text-[#00C853]' : 'text-[#757575]'
            }`}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs">Booking Saya</span>
          </button>
          <button
            onClick={() => handleNavClick('promo')}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'promo' ? 'text-[#00C853]' : 'text-[#757575]'
            }`}
          >
            <Tag className="h-6 w-6" />
            <span className="text-xs">Promo</span>
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'profile' ? 'text-[#00C853]' : 'text-[#757575]'
            }`}
          >
            <UserCircle className="h-6 w-6" />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}

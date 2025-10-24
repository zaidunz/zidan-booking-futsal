import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Star, MapPin, Car, Coffee, Wifi, Wind, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DetailVenueProps {
  venue: any;
  onNavigate: (screen: string, data?: any) => void;
}

const facilities = [
  { icon: Car, label: 'Parkir Luas' },
  { icon: Coffee, label: 'Kantin' },
  { icon: Wind, label: 'AC' },
  { icon: Wifi, label: 'WiFi Gratis' }
];

const priceSchedule = [
  { time: 'Pagi (06:00 - 12:00)', price: 120000 },
  { time: 'Siang (12:00 - 18:00)', price: 150000 },
  { time: 'Malam (18:00 - 00:00)', price: 180000 }
];

const reviews = [
  {
    id: 1,
    name: 'Ahmad Rizki',
    rating: 5,
    date: '2 hari lalu',
    comment: 'Lapangan bagus, bersih, dan AC-nya dingin. Recommended!'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    rating: 4,
    date: '1 minggu lalu',
    comment: 'Tempatnya strategis, parkirnya luas. Cuma kadang booking susah karena selalu penuh.'
  },
  {
    id: 3,
    name: 'Citra Dewi',
    rating: 5,
    date: '2 minggu lalu',
    comment: 'Pelayanan ramah, fasilitas lengkap. Puas banget main di sini!'
  }
];

export default function DetailVenue({ venue, onNavigate }: DetailVenueProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    venue?.image || 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBpbmRvb3IlMjBjb3VydHxlbnwxfHx8fDE3NjExOTM3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1587384474964-3a06ce1ce699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzb2NjZXJ8ZW58MXx8fHwxNzYxMjU4NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1758300173998-e3c779fd4401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzcG9ydHMlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NjEyNTg1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Image Gallery */}
      <div className="relative h-80">
        <ImageWithFallback
          src={images[currentImageIndex]}
          alt={venue?.name || 'Venue'}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/50 text-white hover:bg-black/60"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-6 py-6">
        {/* Venue Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-[#212121] mb-2">{venue?.name || 'Futsal Arena'}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-[#212121]">{venue?.rating || 4.8}</span>
                  <span className="text-sm text-[#757575]">({venue?.reviews || 245} review)</span>
                </div>
              </div>
            </div>
            <Badge className="bg-[#00C853] text-white border-0">
              {venue?.type || 'Indoor'}
            </Badge>
          </div>
          
          <div className="flex items-start gap-2 text-[#757575]">
            <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Jl. Sudirman No. 123, Jakarta Selatan ({venue?.distance || '1.2 km'})
            </p>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-6">
          <h2 className="text-[#212121] mb-4">Fasilitas</h2>
          <div className="grid grid-cols-4 gap-4">
            {facilities.map((facility, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#00C853]/10 flex items-center justify-center">
                  <facility.icon className="h-6 w-6 text-[#00C853]" />
                </div>
                <p className="text-xs text-center text-[#757575]">{facility.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Schedule */}
        <div className="mb-6">
          <h2 className="text-[#212121] mb-4">Harga & Jadwal</h2>
          <div className="space-y-3">
            {priceSchedule.map((schedule, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#757575]" />
                    <div>
                      <p className="text-sm text-[#212121]">{schedule.time}</p>
                    </div>
                  </div>
                  <p className="text-[#00C853]">
                    Rp {schedule.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#212121]">Review & Rating</h2>
            <button className="text-sm text-[#1976D2]">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {reviews.slice(0, 2).map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[#00C853]">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-[#212121]">{review.name}</p>
                      <p className="text-xs text-[#757575]">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#757575]">{review.comment}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="mb-6">
          <h2 className="text-[#212121] mb-4">Lokasi</h2>
          <Card className="overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-[#757575]" />
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <Button
          onClick={() => onNavigate('pilih-jadwal', { venue })}
          className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12"
        >
          Booking Sekarang
        </Button>
      </div>
    </div>
  );
}

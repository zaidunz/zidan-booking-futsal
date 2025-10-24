import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Calendar, Clock, MapPin, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface MyBookingsProps {
  onNavigate: (screen: string, data?: any) => void;
}

const upcomingBookings = [
  {
    id: 1,
    bookingNumber: 'FSK12345678',
    venue: {
      name: 'Futsal Arena Sudirman',
      image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBpbmRvb3IlMjBjb3VydHxlbnwxfHx8fDE3NjExOTM3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    date: '2025-10-26',
    time: '18:00',
    duration: 2,
    lapangan: 'Lapangan 1',
    status: 'confirmed',
    total: 360000
  },
  {
    id: 2,
    bookingNumber: 'FSK87654321',
    venue: {
      name: 'Champion Futsal Center',
      image: 'https://images.unsplash.com/photo-1705593813682-033ee2991df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMG91dGRvb3J8ZW58MXx8fHwxNzYxMjU4NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    date: '2025-10-28',
    time: '15:00',
    duration: 1,
    lapangan: 'Lapangan 2',
    status: 'confirmed',
    total: 120000
  }
];

const historyBookings = [
  {
    id: 3,
    bookingNumber: 'FSK11223344',
    venue: {
      name: 'Sports Hub Jakarta',
      image: 'https://images.unsplash.com/photo-1758300173998-e3c779fd4401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzcG9ydHMlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NjEyNTg1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    date: '2025-10-20',
    time: '19:00',
    duration: 2,
    lapangan: 'Lapangan 3',
    status: 'completed',
    total: 360000
  }
];

const cancelledBookings = [
  {
    id: 4,
    bookingNumber: 'FSK55667788',
    venue: {
      name: 'Victory Futsal Park',
      image: 'https://images.unsplash.com/photo-1587384474964-3a06ce1ce699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzb2NjZXJ8ZW58MXx8fHwxNzYxMjU4NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    date: '2025-10-22',
    time: '16:00',
    duration: 1,
    lapangan: 'Lapangan 1',
    status: 'cancelled',
    total: 140000
  }
];

export default function MyBookings({ onNavigate }: MyBookingsProps) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={booking.venue.image}
            alt={booking.venue.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-[#212121] mb-1 truncate">{booking.venue.name}</h3>
              <p className="text-xs text-[#757575]">{booking.bookingNumber}</p>
            </div>
            {getStatusBadge(booking.status)}
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#757575]">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {new Date(booking.date).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#757575]">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{booking.time} ({booking.duration} jam)</span>
            </div>
            <div className="flex items-center gap-2 text-[#757575]">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{booking.lapangan}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#757575]">Total</p>
          <p className="text-sm text-[#00C853]">Rp {booking.total.toLocaleString('id-ID')}</p>
        </div>
        
        <div className="flex gap-2">
          {booking.status === 'confirmed' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('e-ticket', { booking })}
              >
                Lihat E-Ticket
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Batalkan
              </Button>
            </>
          )}
          {booking.status === 'completed' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('home')}
            >
              Booking Lagi
            </Button>
          )}
          {booking.status === 'cancelled' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('home')}
            >
              Booking Lagi
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-[#212121]">Booking Saya</h2>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              History ({historyBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <BookingCard booking={booking} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-[#757575] mx-auto mb-4" />
                <p className="text-[#757575]">Belum ada booking yang akan datang</p>
                <Button
                  onClick={() => onNavigate('home')}
                  className="mt-4 bg-[#00C853] hover:bg-[#00C853]/90"
                >
                  Booking Sekarang
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {historyBookings.length > 0 ? (
              historyBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <BookingCard booking={booking} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-[#757575] mx-auto mb-4" />
                <p className="text-[#757575]">Belum ada riwayat booking</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <BookingCard booking={booking} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-[#757575] mx-auto mb-4" />
                <p className="text-[#757575]">Tidak ada booking yang dibatalkan</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

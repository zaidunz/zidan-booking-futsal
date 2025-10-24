import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Calendar, Clock, Trophy, Star, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

const monthlyData = [
  { month: 'Jun', hours: 4 },
  { month: 'Jul', hours: 8 },
  { month: 'Aug', hours: 6 },
  { month: 'Sep', hours: 10 },
  { month: 'Okt', hours: 12 }
];

const upcomingBookings = [
  {
    id: 1,
    venue: 'Futsal Arena Sudirman',
    date: '2025-10-26',
    time: '18:00',
    hoursLeft: 48
  },
  {
    id: 2,
    venue: 'Champion Futsal Center',
    date: '2025-10-28',
    time: '15:00',
    hoursLeft: 96
  }
];

const favoriteVenues = [
  {
    name: 'Futsal Arena Sudirman',
    image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBpbmRvb3IlMjBjb3VydHxlbnwxfHx8fDE3NjExOTM3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bookings: 5,
    rating: 4.8
  },
  {
    name: 'Sports Hub Jakarta',
    image: 'https://images.unsplash.com/photo-1758300173998-e3c779fd4401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzcG9ydHMlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NjEyNTg1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bookings: 3,
    rating: 4.9
  }
];

const recentActivities = [
  { id: 1, action: 'Booking berhasil', venue: 'Futsal Arena Sudirman', time: '2 jam lalu' },
  { id: 2, action: 'Review diberikan', venue: 'Sports Hub Jakarta', time: '1 hari lalu' },
  { id: 3, action: 'Booking selesai', venue: 'Champion Futsal Center', time: '3 hari lalu' }
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00C853] to-[#1976D2] px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-white">Dashboard</h2>
          <div className="w-10"></div>
        </div>

        <div className="text-white">
          <p className="text-sm opacity-90 mb-2">Selamat datang kembali!</p>
          <h1 className="mb-4">Ahmad Rizki</h1>
          <p className="text-sm opacity-75">Member sejak Oktober 2024</p>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#00C853]/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#00C853]" />
              </div>
            </div>
            <p className="text-2xl text-[#212121] mb-1">8</p>
            <p className="text-xs text-[#757575]">Booking Bulan Ini</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#1976D2]/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#1976D2]" />
              </div>
            </div>
            <p className="text-2xl text-[#212121] mb-1">32</p>
            <p className="text-xs text-[#757575]">Total Jam Main</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#FF6D00]/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-[#FF6D00]" />
              </div>
            </div>
            <p className="text-2xl text-[#212121] mb-1">2,450</p>
            <p className="text-xs text-[#757575]">Poin Rewards</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl text-[#212121] mb-1">4</p>
            <p className="text-xs text-[#757575]">Venue Favorit</p>
          </Card>
        </motion.div>

        {/* Upcoming Bookings */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#212121]">Upcoming Bookings</h3>
            <button
              onClick={() => onNavigate('my-bookings')}
              className="text-sm text-[#1976D2]"
            >
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm text-[#212121] mb-1">{booking.venue}</h4>
                    <div className="flex items-center gap-4 text-xs text-[#757575]">
                      <span>
                        {new Date(booking.date).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                    {booking.hoursLeft}h lagi
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#757575]" />
                  <Progress value={(72 - booking.hoursLeft) / 72 * 100} className="flex-1 h-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Monthly Hours Chart */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-4">Statistik Jam Main</h3>
          <Card className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="hours" fill="#00C853" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-2 mt-4">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-600">+20% dari bulan lalu</p>
            </div>
          </Card>
        </div>

        {/* Rewards Progress */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-4">Rewards & Loyalty</h3>
          <Card className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Poin</p>
                <p className="text-2xl">2,450 Poin</p>
              </div>
              <Award className="h-12 w-12 opacity-75" />
            </div>
            <Progress value={61} className="h-2 bg-white/20 mb-2" />
            <p className="text-xs opacity-90">550 poin lagi untuk naik ke Gold Member</p>
          </Card>
        </div>

        {/* Favorite Venues */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-4">Venue Favorit</h3>
          <div className="grid grid-cols-2 gap-4">
            {favoriteVenues.map((venue, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-24 relative">
                  <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm text-[#212121] mb-2 line-clamp-1">{venue.name}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#757575]">{venue.bookings}x booking</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[#757575]">{venue.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-4">Aktivitas Terbaru</h3>
          <Card className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00C853] mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[#212121]">{activity.action}</p>
                  <p className="text-xs text-[#757575]">{activity.venue}</p>
                </div>
                <span className="text-xs text-[#757575]">{activity.time}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

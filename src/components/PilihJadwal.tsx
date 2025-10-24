import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface PilihJadwalProps {
  venue: any;
  onNavigate: (screen: string, data?: any) => void;
}

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const timeSlots = [
  { time: '06:00', price: 120000, available: true },
  { time: '07:00', price: 120000, available: true },
  { time: '08:00', price: 120000, available: false },
  { time: '09:00', price: 120000, available: true },
  { time: '10:00', price: 120000, available: true },
  { time: '11:00', price: 120000, available: false },
  { time: '12:00', price: 150000, available: true },
  { time: '13:00', price: 150000, available: true },
  { time: '14:00', price: 150000, available: true },
  { time: '15:00', price: 150000, available: false },
  { time: '16:00', price: 150000, available: true },
  { time: '17:00', price: 150000, available: true },
  { time: '18:00', price: 180000, available: true },
  { time: '19:00', price: 180000, available: true },
  { time: '20:00', price: 180000, available: false },
  { time: '21:00', price: 180000, available: true },
  { time: '22:00', price: 180000, available: true },
  { time: '23:00', price: 180000, available: true }
];

export default function PilihJadwal({ venue, onNavigate }: PilihJadwalProps) {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);
  const dates = generateDates();

  const getDayName = (date: Date) => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return months[date.getMonth()];
  };

  const handleContinue = () => {
    if (selectedTime) {
      const selectedSlot = timeSlots.find(slot => slot.time === selectedTime);
      onNavigate('pilih-lapangan', {
        booking: {
          venue,
          date: dates[selectedDate],
          time: selectedTime,
          duration,
          price: selectedSlot?.price || 0
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('detail-venue', { venue })}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-[#212121]">Pilih Jadwal</h2>
            <p className="text-sm text-[#757575]">{venue?.name}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Date Selector */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-4">Pilih Tanggal</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(index)}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all flex-shrink-0 ${
                  selectedDate === index
                    ? 'border-[#00C853] bg-[#00C853]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xs text-[#757575]">{getDayName(date)}</span>
                <span className={`text-lg ${selectedDate === index ? 'text-[#00C853]' : 'text-[#212121]'}`}>
                  {date.getDate()}
                </span>
                <span className="text-xs text-[#757575]">{getMonthName(date)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selector */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-4">Durasi</h3>
          <div className="flex gap-3">
            {[1, 2, 3].map((dur) => (
              <Button
                key={dur}
                variant={duration === dur ? 'default' : 'outline'}
                className={
                  duration === dur
                    ? 'bg-[#00C853] hover:bg-[#00C853]/90 flex-1'
                    : 'flex-1'
                }
                onClick={() => setDuration(dur)}
              >
                {dur} Jam
              </Button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-[#212121] mb-4">Pilih Waktu</h3>
          
          {/* Morning */}
          <div className="mb-6">
            <p className="text-sm text-[#757575] mb-3">Pagi (06:00 - 12:00)</p>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.slice(0, 6).map((slot) => (
                <motion.button
                  key={slot.time}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    !slot.available
                      ? 'bg-gray-100 border-gray-200 text-[#757575] cursor-not-allowed'
                      : selectedTime === slot.time
                      ? 'border-[#00C853] bg-[#00C853]/5 text-[#00C853]'
                      : 'border-gray-200 hover:border-gray-300 text-[#212121]'
                  }`}
                >
                  <p className="text-sm">{slot.time}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div className="mb-6">
            <p className="text-sm text-[#757575] mb-3">Siang (12:00 - 18:00)</p>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.slice(6, 12).map((slot) => (
                <motion.button
                  key={slot.time}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    !slot.available
                      ? 'bg-gray-100 border-gray-200 text-[#757575] cursor-not-allowed'
                      : selectedTime === slot.time
                      ? 'border-[#00C853] bg-[#00C853]/5 text-[#00C853]'
                      : 'border-gray-200 hover:border-gray-300 text-[#212121]'
                  }`}
                >
                  <p className="text-sm">{slot.time}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div className="mb-6">
            <p className="text-sm text-[#757575] mb-3">Malam (18:00 - 00:00)</p>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.slice(12).map((slot) => (
                <motion.button
                  key={slot.time}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    !slot.available
                      ? 'bg-gray-100 border-gray-200 text-[#757575] cursor-not-allowed'
                      : selectedTime === slot.time
                      ? 'border-[#00C853] bg-[#00C853]/5 text-[#00C853]'
                      : 'border-gray-200 hover:border-gray-300 text-[#212121]'
                  }`}
                >
                  <p className="text-sm">{slot.time}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-[#00C853] bg-[#00C853]/5"></div>
              <span className="text-xs text-[#757575]">Dipilih</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-gray-200"></div>
              <span className="text-xs text-[#757575]">Tersedia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200"></div>
              <span className="text-xs text-[#757575]">Tidak Tersedia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-[#757575]">Total Harga</p>
            <p className="text-lg text-[#00C853]">
              Rp {selectedTime ? ((timeSlots.find(s => s.time === selectedTime)?.price || 0) * duration).toLocaleString('id-ID') : '-'}
            </p>
          </div>
          <Button
            onClick={handleContinue}
            disabled={!selectedTime}
            className="bg-[#00C853] hover:bg-[#00C853]/90 px-8"
          >
            Lanjutkan
          </Button>
        </div>
      </div>
    </div>
  );
}

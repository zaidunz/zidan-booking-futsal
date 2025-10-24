import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface PilihLapanganProps {
  bookingData: any;
  onNavigate: (screen: string, data?: any) => void;
}

const lapangan = [
  { id: 1, name: 'Lapangan 1', size: '20x40m', surface: 'Vinyl', status: 'available', indoor: true },
  { id: 2, name: 'Lapangan 2', size: '20x40m', surface: 'Vinyl', status: 'available', indoor: true },
  { id: 3, name: 'Lapangan 3', size: '20x40m', surface: 'Vinyl', status: 'booked', indoor: true },
  { id: 4, name: 'Lapangan 4', size: '20x40m', surface: 'Vinyl', status: 'available', indoor: true },
  { id: 5, name: 'Lapangan 5', size: '25x45m', surface: 'Vinyl', status: 'booked', indoor: true },
  { id: 6, name: 'Lapangan 6', size: '25x45m', surface: 'Vinyl', status: 'available', indoor: true }
];

export default function PilihLapangan({ bookingData, onNavigate }: PilihLapanganProps) {
  const [selectedLapangan, setSelectedLapangan] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedLapangan) {
      const lapanganData = lapangan.find(l => l.id === selectedLapangan);
      onNavigate('review-booking', {
        booking: {
          ...bookingData,
          lapangan: lapanganData
        }
      });
    }
  };

  const getStatusColor = (status: string, isSelected: boolean) => {
    if (isSelected) return 'bg-[#1976D2] border-[#1976D2]';
    if (status === 'booked') return 'bg-red-500 border-red-500 cursor-not-allowed';
    return 'bg-[#00C853] border-[#00C853] hover:bg-[#00C853]/90';
  };

  const getStatusText = (status: string, isSelected: boolean) => {
    if (isSelected) return 'Dipilih';
    if (status === 'booked') return 'Dipesan';
    return 'Tersedia';
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('pilih-jadwal', { venue: bookingData?.venue })}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-[#212121]">Pilih Lapangan</h2>
            <p className="text-sm text-[#757575]">{bookingData?.venue?.name}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Booking Info */}
        <div className="bg-[#F5F5F5] rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#757575] mb-1">Tanggal</p>
              <p className="text-sm text-[#212121]">
                {bookingData?.date ? new Date(bookingData.date).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                }) : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#757575] mb-1">Waktu</p>
              <p className="text-sm text-[#212121]">
                {bookingData?.time} ({bookingData?.duration || 1} jam)
              </p>
            </div>
          </div>
        </div>

        {/* Court Selection Visual */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-4">Layout Lapangan</h3>
          <div className="bg-[#F5F5F5] rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4">
              {lapangan.map((court) => {
                const isSelected = selectedLapangan === court.id;
                const isAvailable = court.status === 'available';
                
                return (
                  <motion.button
                    key={court.id}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    onClick={() => isAvailable && setSelectedLapangan(court.id)}
                    disabled={!isAvailable}
                    className={`relative aspect-[4/3] rounded-lg border-4 transition-all ${
                      getStatusColor(court.status, isSelected)
                    } ${!isAvailable ? 'opacity-50' : ''}`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                      <p className="text-sm mb-1">{court.name}</p>
                      <p className="text-xs opacity-90">{court.size}</p>
                      <Badge
                        className={`mt-2 text-xs ${
                          isSelected
                            ? 'bg-white text-[#1976D2]'
                            : court.status === 'booked'
                            ? 'bg-white text-red-500'
                            : 'bg-white text-[#00C853]'
                        }`}
                      >
                        {getStatusText(court.status, isSelected)}
                      </Badge>
                    </div>
                    
                    {/* Court Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 75">
                      <rect x="10" y="10" width="80" height="55" fill="none" stroke="white" strokeWidth="1" />
                      <line x1="50" y1="10" x2="50" y2="65" stroke="white" strokeWidth="1" />
                      <circle cx="50" cy="37.5" r="8" fill="none" stroke="white" strokeWidth="1" />
                    </svg>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Court Details */}
        {selectedLapangan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-[#212121] mb-4">Detail Lapangan</h3>
            <div className="border border-gray-200 rounded-xl p-4 space-y-3">
              {(() => {
                const selected = lapangan.find(l => l.id === selectedLapangan);
                return (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#757575]">Nama Lapangan</p>
                      <p className="text-sm text-[#212121]">{selected?.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#757575]">Ukuran</p>
                      <p className="text-sm text-[#212121]">{selected?.size}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#757575]">Jenis Lantai</p>
                      <p className="text-sm text-[#212121]">{selected?.surface}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#757575]">Tipe</p>
                      <Badge className="bg-[#00C853] text-white border-0">
                        {selected?.indoor ? 'Indoor' : 'Outdoor'}
                      </Badge>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="space-y-2">
          <h3 className="text-[#212121] mb-3">Keterangan</h3>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#00C853]"></div>
            <span className="text-sm text-[#757575]">Tersedia</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-500"></div>
            <span className="text-sm text-[#757575]">Sudah Dipesan</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#1976D2]"></div>
            <span className="text-sm text-[#757575]">Pilihan Anda</span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <Button
          onClick={handleContinue}
          disabled={!selectedLapangan}
          className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}

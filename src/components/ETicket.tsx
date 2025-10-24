import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Share2, Calendar as CalendarIcon, CheckCircle, MapPin, Clock, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

interface ETicketProps {
  bookingData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export default function ETicket({ bookingData, onNavigate }: ETicketProps) {
  const bookingNumber = bookingData?.bookingNumber || 'FSK12345678';

  const handleDownload = () => {
    // Mock download functionality
    alert('E-Ticket berhasil didownload!');
  };

  const handleShare = () => {
    // Mock share functionality
    alert('E-Ticket berhasil dibagikan!');
  };

  const handleAddToCalendar = () => {
    // Mock add to calendar functionality
    alert('Event berhasil ditambahkan ke kalender!');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-[#00C853] to-[#1976D2] px-6 py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-[#00C853]" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-white mb-2">Pembayaran Berhasil!</h1>
          <p className="text-white/90 text-sm">
            Booking Anda telah dikonfirmasi
          </p>
        </motion.div>
      </div>

      <div className="px-6 -mt-8">
        {/* E-Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            {/* QR Code Section */}
            <div className="p-6 bg-white flex flex-col items-center border-b-2 border-dashed border-gray-200">
              <div className="bg-gradient-to-br from-[#00C853] to-[#1976D2] p-8 rounded-xl mb-4 relative">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
                  {[...Array(64)].map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <QrCode className="h-24 w-24 text-white relative z-10" />
              </div>
              <p className="text-sm text-[#757575] mb-1">Nomor Booking</p>
              <p className="text-lg text-[#212121] tracking-wider">{bookingNumber}</p>
              <Badge className="mt-3 bg-green-100 text-green-700 border-green-200">
                ✓ Confirmed
              </Badge>
            </div>

            {/* Booking Details */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-[#212121] mb-3">Detail Booking</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#00C853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" strokeWidth="2" />
                        <path strokeWidth="2" strokeLinecap="round" d="M12 4v3M12 17v3M4 12h3M17 12h3" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#757575]">Venue</p>
                      <p className="text-sm text-[#212121]">{bookingData?.venue?.name || 'Futsal Arena Sudirman'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 text-[#00C853]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#757575]">Tanggal</p>
                      <p className="text-sm text-[#212121]">
                        {bookingData?.date ? new Date(bookingData.date).toLocaleDateString('id-ID', { 
                          weekday: 'long',
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        }) : 'Sabtu, 25 Oktober 2025'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#00C853]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#757575]">Waktu</p>
                      <p className="text-sm text-[#212121]">
                        {bookingData?.time || '18:00'} - {(() => {
                          const [hour, minute] = (bookingData?.time || '18:00').split(':');
                          const endHour = parseInt(hour) + (bookingData?.duration || 1);
                          return `${endHour.toString().padStart(2, '0')}:${minute}`;
                        })()} ({bookingData?.duration || 1} jam)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#00C853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#757575]">Lapangan</p>
                      <p className="text-sm text-[#212121]">{bookingData?.lapangan?.name || 'Lapangan 1'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#00C853]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#757575]">Alamat</p>
                      <p className="text-sm text-[#212121]">Jl. Sudirman No. 123, Jakarta Selatan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#757575]">Total Pembayaran</p>
                  <p className="text-lg text-[#00C853]">
                    Rp {(bookingData?.total || 180000).toLocaleString('id-ID')}
                  </p>
                </div>
                <p className="text-xs text-[#757575]">
                  Dibayar via {bookingData?.paymentMethod ? 
                    paymentMethodNames[bookingData.paymentMethod as keyof typeof paymentMethodNames] || 'GoPay' 
                    : 'GoPay'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 my-6">
          <Button
            variant="outline"
            className="flex flex-col gap-2 h-20"
            onClick={handleDownload}
          >
            <Download className="h-5 w-5" />
            <span className="text-xs">Download</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col gap-2 h-20"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
            <span className="text-xs">Share</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col gap-2 h-20"
            onClick={handleAddToCalendar}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="text-xs">Kalender</span>
          </Button>
        </div>

        {/* Info */}
        <Card className="p-4 bg-blue-50 border-blue-200 mb-6">
          <h4 className="text-sm text-blue-900 mb-2">Kebijakan Pembatalan</h4>
          <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
            <li>Pembatalan gratis maksimal 2 jam sebelum waktu booking</li>
            <li>Pembatalan di luar waktu tersebut tidak dapat direfund</li>
            <li>Tunjukkan QR code ini saat check-in di venue</li>
          </ul>
        </Card>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 space-y-3">
        <Button
          onClick={() => onNavigate('my-bookings')}
          className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12"
        >
          Lihat Booking Saya
        </Button>
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="w-full h-12"
        >
          Kembali ke Home
        </Button>
      </div>
    </div>
  );
}

const paymentMethodNames = {
  gopay: 'GoPay',
  ovo: 'OVO',
  dana: 'DANA',
  shopeepay: 'ShopeePay',
  bca: 'BCA Virtual Account',
  mandiri: 'Mandiri Virtual Account',
  bni: 'BNI Virtual Account',
  qris: 'QRIS',
  cc: 'Kartu Kredit/Debit'
};

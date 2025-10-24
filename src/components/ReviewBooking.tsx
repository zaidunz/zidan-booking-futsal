import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Tag, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewBookingProps {
  bookingData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export default function ReviewBooking({ bookingData, onNavigate }: ReviewBookingProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const basePrice = (bookingData?.price || 0) * (bookingData?.duration || 1);
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const total = basePrice - discount;

  const handleApplyPromo = () => {
    // Mock promo validation
    if (promoCode.toUpperCase() === 'FIRST30') {
      setAppliedPromo({ code: promoCode, discount: basePrice * 0.3 });
    } else if (promoCode.toUpperCase() === 'DISKON50K') {
      setAppliedPromo({ code: promoCode, discount: 50000 });
    } else {
      setAppliedPromo(null);
    }
  };

  const handleContinue = () => {
    onNavigate('pembayaran', {
      booking: {
        ...bookingData,
        promoCode: appliedPromo?.code,
        discount,
        total
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('pilih-lapangan', { booking: bookingData })}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-[#212121]">Review Booking</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Venue Info */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#00C853] to-[#1976D2] flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" strokeWidth="2" />
                <path strokeWidth="2" strokeLinecap="round" d="M12 4v3M12 17v3M4 12h3M17 12h3" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-[#212121] mb-1">{bookingData?.venue?.name}</h3>
              <div className="flex items-center gap-1 text-[#757575]">
                <MapPin className="h-4 w-4" />
                <p className="text-sm">Jakarta Selatan</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Booking Details */}
        <Card className="p-4">
          <h3 className="text-[#212121] mb-4">Detail Booking</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#00C853]" />
              <div className="flex-1">
                <p className="text-xs text-[#757575]">Tanggal</p>
                <p className="text-sm text-[#212121]">
                  {bookingData?.date ? new Date(bookingData.date).toLocaleDateString('id-ID', { 
                    weekday: 'long',
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  }) : '-'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#00C853]" />
              <div className="flex-1">
                <p className="text-xs text-[#757575]">Waktu & Durasi</p>
                <p className="text-sm text-[#212121]">
                  {bookingData?.time} - {(() => {
                    const [hour, minute] = (bookingData?.time || '00:00').split(':');
                    const endHour = parseInt(hour) + (bookingData?.duration || 1);
                    return `${endHour.toString().padStart(2, '0')}:${minute}`;
                  })()} ({bookingData?.duration} jam)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-[#00C853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                <path d="M9 2v4M15 2v4M4 10h16" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-[#757575]">Lapangan</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[#212121]">{bookingData?.lapangan?.name}</p>
                  <Badge className="bg-[#00C853] text-white border-0 text-xs">
                    {bookingData?.lapangan?.surface}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Promo Code */}
        <Card className="p-4">
          <h3 className="text-[#212121] mb-4">Kode Promo</h3>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
              <Input
                placeholder="Masukkan kode promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button
              onClick={handleApplyPromo}
              variant="outline"
              className="px-6"
            >
              Terapkan
            </Button>
          </div>
          {appliedPromo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-sm text-green-700">
                Promo "{appliedPromo.code}" berhasil diterapkan! Anda hemat Rp {discount.toLocaleString('id-ID')}
              </p>
            </motion.div>
          )}
          
          {/* Available Promos */}
          <div className="mt-4 space-y-2">
            <p className="text-xs text-[#757575]">Promo Tersedia:</p>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setPromoCode('FIRST30')}
                className="px-3 py-2 bg-[#FF6D00]/10 border border-[#FF6D00] rounded-lg text-xs text-[#FF6D00] whitespace-nowrap"
              >
                FIRST30 - Diskon 30%
              </button>
              <button
                onClick={() => setPromoCode('DISKON50K')}
                className="px-3 py-2 bg-[#FF6D00]/10 border border-[#FF6D00] rounded-lg text-xs text-[#FF6D00] whitespace-nowrap"
              >
                DISKON50K - Potongan 50rb
              </button>
            </div>
          </div>
        </Card>

        {/* Price Summary */}
        <Card className="p-4">
          <h3 className="text-[#212121] mb-4">Ringkasan Pembayaran</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#757575]">Harga ({bookingData?.duration} jam)</p>
              <p className="text-sm text-[#212121]">Rp {basePrice.toLocaleString('id-ID')}</p>
            </div>
            
            {appliedPromo && (
              <div className="flex items-center justify-between text-green-600">
                <p className="text-sm">Diskon Promo</p>
                <p className="text-sm">- Rp {discount.toLocaleString('id-ID')}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
              <p className="text-[#212121]">Total Pembayaran</p>
              <p className="text-xl text-[#00C853]">Rp {total.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </Card>

        {/* Terms */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong>Kebijakan Pembatalan:</strong> Pembatalan dapat dilakukan maksimal 2 jam sebelum waktu booking. 
            Pembatalan di luar waktu tersebut tidak dapat direfund.
          </p>
        </Card>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-[#757575]">Total Pembayaran</p>
            <p className="text-xl text-[#00C853]">Rp {total.toLocaleString('id-ID')}</p>
          </div>
          <Button
            onClick={handleContinue}
            className="bg-[#00C853] hover:bg-[#00C853]/90 px-8"
          >
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>
    </div>
  );
}

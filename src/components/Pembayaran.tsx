import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Wallet, CreditCard, Smartphone, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

interface PembayaranProps {
  bookingData: any;
  onNavigate: (screen: string, data?: any) => void;
}

const paymentMethods = [
  {
    category: 'E-Wallet',
    icon: Wallet,
    methods: [
      { id: 'gopay', name: 'GoPay', logo: '💚' },
      { id: 'ovo', name: 'OVO', logo: '💜' },
      { id: 'dana', name: 'DANA', logo: '💙' },
      { id: 'shopeepay', name: 'ShopeePay', logo: '🧡' }
    ]
  },
  {
    category: 'Transfer Bank',
    icon: CreditCard,
    methods: [
      { id: 'bca', name: 'BCA Virtual Account', logo: '🏦' },
      { id: 'mandiri', name: 'Mandiri Virtual Account', logo: '🏦' },
      { id: 'bni', name: 'BNI Virtual Account', logo: '🏦' }
    ]
  },
  {
    category: 'Lainnya',
    icon: QrCode,
    methods: [
      { id: 'qris', name: 'QRIS', logo: '📱' },
      { id: 'cc', name: 'Kartu Kredit/Debit', logo: '💳' }
    ]
  }
];

export default function Pembayaran({ bookingData, onNavigate }: PembayaranProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    if (selectedMethod) {
      // Simulate payment processing
      setTimeout(() => {
        onNavigate('e-ticket', {
          booking: {
            ...bookingData,
            paymentMethod: selectedMethod,
            bookingNumber: 'FSK' + Date.now().toString().slice(-8)
          }
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('review-booking', { booking: bookingData })}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-[#212121]">Pembayaran</h2>
          </div>
          
          {/* Timer */}
          <Badge
            className={`${
              timeLeft < 60 ? 'bg-red-500' : 'bg-[#FF6D00]'
            } text-white border-0 text-sm`}
          >
            ⏱️ {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Amount */}
        <Card className="p-6 bg-gradient-to-r from-[#00C853] to-[#1976D2] border-0 text-white">
          <p className="text-sm opacity-90 mb-2">Total Pembayaran</p>
          <h1 className="mb-4">Rp {(bookingData?.total || 0).toLocaleString('id-ID')}</h1>
          <p className="text-xs opacity-75">
            Selesaikan pembayaran sebelum waktu habis
          </p>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-4">
          {paymentMethods.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-3">
                <category.icon className="h-5 w-5 text-[#757575]" />
                <h3 className="text-[#212121]">{category.category}</h3>
              </div>
              
              <Card className="divide-y divide-gray-200">
                {category.methods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                      selectedMethod === method.id
                        ? 'bg-[#00C853]/5'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.logo}</span>
                      <span className="text-sm text-[#212121]">{method.name}</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id
                          ? 'border-[#00C853] bg-[#00C853]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedMethod === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </Card>
            </div>
          ))}
        </div>

        {/* Security Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-900 mb-1">Pembayaran Aman</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Transaksi Anda dilindungi dengan enkripsi end-to-end dan sistem keamanan terpercaya.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <Button
          onClick={handlePayment}
          disabled={!selectedMethod}
          className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12"
        >
          Bayar Sekarang
        </Button>
      </div>
    </div>
  );
}

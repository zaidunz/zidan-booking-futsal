import { Button } from './ui/button';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#00C853] to-[#1976D2] px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6">
            <svg
              className="w-20 h-20 text-[#00C853]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeWidth="2"
                strokeLinecap="round"
                d="M12 2v4M12 18v4M2 12h4M18 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83"
              />
            </svg>
          </div>
          <h1 className="text-white mb-3">FutsalKu</h1>
          <p className="text-white/90 max-w-xs mx-auto">
            Booking Lapangan Futsal Jadi Lebih Mudah
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4 w-full max-w-sm mx-auto mt-16">
          <Button
            onClick={() => onNavigate('login')}
            className="w-full bg-white text-[#00C853] hover:bg-white/90 h-12"
          >
            Masuk
          </Button>
          <Button
            onClick={() => onNavigate('register')}
            variant="outline"
            className="w-full border-2 border-white text-white hover:bg-white/10 h-12"
          >
            Daftar
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-8 text-white/70 text-center">
        <p className="text-sm">© 2025 FutsalKu. All rights reserved.</p>
      </div>
    </div>
  );
}

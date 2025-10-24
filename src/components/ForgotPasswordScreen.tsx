import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState(1); // 1: input email, 2: confirmation, 3: reset password, 4: success
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => step === 1 ? onNavigate('login') : setStep(step - 1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h1 className="text-[#212121] mb-2">Lupa Password?</h1>
              <p className="text-[#757575]">
                Masukkan email atau nomor HP yang terdaftar untuk reset password
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email atau Nomor HP</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Masukkan email atau nomor HP"
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12"
              >
                Kirim Link Reset
              </Button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#00C853]" />
            </div>

            <h1 className="text-[#212121] mb-2">Cek Email/SMS Anda</h1>
            <p className="text-[#757575] mb-8">
              Kami telah mengirimkan link reset password ke email/SMS Anda. Silakan cek dan ikuti instruksinya.
            </p>

            <Button
              onClick={() => setStep(3)}
              className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12 mb-4"
            >
              Lanjutkan
            </Button>

            <Button
              onClick={() => setStep(1)}
              variant="ghost"
              className="w-full"
            >
              Kirim Ulang Link
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h1 className="text-[#212121] mb-2">Reset Password</h1>
              <p className="text-[#757575]">
                Masukkan password baru Anda
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password baru"
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757575]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Masukkan ulang password baru"
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757575]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12"
              >
                Reset Password
              </Button>
            </form>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#00C853]" />
            </div>

            <h1 className="text-[#212121] mb-2">Berhasil!</h1>
            <p className="text-[#757575] mb-8">
              Password Anda telah berhasil direset. Silakan masuk dengan password baru Anda.
            </p>

            <Button
              onClick={() => onNavigate('login')}
              className="w-full bg-[#00C853] hover:bg-[#00C853]/90 h-12"
            >
              Masuk Sekarang
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

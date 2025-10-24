import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Gift, 
  Bell, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight,
  Edit,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  onNavigate: (screen: string, data?: any) => void;
  onLogout: () => void;
}

export default function Profile({ onNavigate, onLogout }: ProfileProps) {
  const user = {
    name: 'Ahmad Rizki',
    email: 'ahmad.rizki@email.com',
    phone: '+62 812-3456-7890',
    memberSince: 'Oktober 2024',
    points: 2450,
    tier: 'Silver'
  };

  const menuItems = [
    {
      title: 'Akun',
      items: [
        { icon: User, label: 'Edit Profil', action: 'edit-profile' },
        { icon: CreditCard, label: 'Metode Pembayaran', action: 'payment-methods' },
        { icon: Gift, label: 'Poin & Rewards', action: 'rewards', badge: '2,450 poin' }
      ]
    },
    {
      title: 'Pengaturan',
      items: [
        { icon: Bell, label: 'Notifikasi', action: 'notifications', toggle: true },
        { icon: FileText, label: 'Syarat & Ketentuan', action: 'terms' },
        { icon: HelpCircle, label: 'FAQ & Bantuan', action: 'help' }
      ]
    }
  ];

  const handleMenuClick = (action: string) => {
    if (action === 'rewards') {
      // Navigate to rewards screen
      alert('Fitur Rewards akan segera hadir!');
    } else if (action === 'edit-profile') {
      alert('Fitur Edit Profil akan segera hadir!');
    } else {
      alert(`Navigasi ke ${action}`);
    }
  };

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
          <h2 className="text-white">Profil</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl text-[#00C853]">
              {user.name.charAt(0)}
            </span>
          </div>
          <h2 className="text-white mb-2">{user.name}</h2>
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
            {user.tier} Member
          </Badge>
        </motion.div>
      </div>

      <div className="px-6 -mt-4">
        {/* User Info Card */}
        <Card className="p-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-5 w-5 text-[#757575]" />
              <span className="text-[#212121]">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-5 w-5 text-[#757575]" />
              <span className="text-[#212121]">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-5 w-5 text-[#757575]" />
              <span className="text-[#212121]">Member sejak {user.memberSince}</span>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center">
            <p className="text-xl text-[#00C853] mb-1">8</p>
            <p className="text-xs text-[#757575]">Bookings</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-xl text-[#1976D2] mb-1">32</p>
            <p className="text-xs text-[#757575]">Jam Main</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-xl text-[#FF6D00] mb-1">4</p>
            <p className="text-xs text-[#757575]">Reviews</p>
          </Card>
        </div>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-[#212121] mb-3">{section.title}</h3>
            <Card className="divide-y divide-gray-200">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleMenuClick(item.action)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C853]/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-[#00C853]" />
                    </div>
                    <span className="text-sm text-[#212121]">{item.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge variant="outline" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.toggle ? (
                      <Switch defaultChecked />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-[#757575]" />
                    )}
                  </div>
                </button>
              ))}
            </Card>
          </div>
        ))}

        {/* Transaction History */}
        <div className="mb-6">
          <h3 className="text-[#212121] mb-3">Transaksi</h3>
          <Card>
            <button
              onClick={() => onNavigate('my-bookings')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1976D2]/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-[#1976D2]" />
                </div>
                <span className="text-sm text-[#212121]">Riwayat Transaksi</span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#757575]" />
            </button>
          </Card>
        </div>

        {/* Logout Button */}
        <Card className="mb-6">
          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm text-red-600">Keluar</span>
            </div>
            <ChevronRight className="h-5 w-5 text-red-600" />
          </button>
        </Card>

        {/* App Version */}
        <div className="text-center pb-6">
          <p className="text-xs text-[#757575]">FutsalKu v1.0.0</p>
          <p className="text-xs text-[#757575]">© 2025 FutsalKu. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

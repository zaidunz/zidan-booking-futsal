import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import HomeScreen from './components/HomeScreen';
import DetailVenue from './components/DetailVenue';
import PilihJadwal from './components/PilihJadwal';
import PilihLapangan from './components/PilihLapangan';
import ReviewBooking from './components/ReviewBooking';
import Pembayaran from './components/Pembayaran';
import ETicket from './components/ETicket';
import MyBookings from './components/MyBookings';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookingData, setBookingData] = useState({});

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('welcome');
  };

  const navigateTo = (screen: string, data?: any) => {
    setCurrentScreen(screen);
    if (data) {
      if (data.venue) setSelectedVenue(data.venue);
      if (data.booking) setBookingData({ ...bookingData, ...data.booking });
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={navigateTo} />;
      case 'login':
        return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} />;
      case 'register':
        return <RegisterScreen onNavigate={navigateTo} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onNavigate={navigateTo} />;
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'detail-venue':
        return <DetailVenue venue={selectedVenue} onNavigate={navigateTo} />;
      case 'pilih-jadwal':
        return <PilihJadwal venue={selectedVenue} onNavigate={navigateTo} />;
      case 'pilih-lapangan':
        return <PilihLapangan bookingData={bookingData} onNavigate={navigateTo} />;
      case 'review-booking':
        return <ReviewBooking bookingData={bookingData} onNavigate={navigateTo} />;
      case 'pembayaran':
        return <Pembayaran bookingData={bookingData} onNavigate={navigateTo} />;
      case 'e-ticket':
        return <ETicket bookingData={bookingData} onNavigate={navigateTo} />;
      case 'my-bookings':
        return <MyBookings onNavigate={navigateTo} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'profile':
        return <Profile onNavigate={navigateTo} onLogout={handleLogout} />;
      default:
        return <WelcomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {renderScreen()}
      <Toaster />
    </div>
  );
}

import React, { useState } from 'react';
import { useOS } from './context/OSContext';
import { useTheme } from './context/ThemeContext';
import { InitialBootLoader } from './components/common/InitialBootLoader';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { PremiumAppsPage } from './pages/PremiumAppsPage';
import { CommissionPage } from './pages/CommissionPage';
import { CommunityPage } from './pages/CommunityPage';
import { DonationPage } from './pages/DonationPage';
import { VisualIdentityPage } from './pages/VisualIdentityPage';
import { ContactPage } from './pages/ContactPage';
import { OnlineShopPage } from './pages/OnlineShopPage';
import { GalleryPage } from './pages/GalleryPage';
import { FileExplorerPage } from './pages/FileExplorerPage';
import { MusicPage } from './pages/MusicPage';
import { CameraPage } from './pages/CameraPage';
import { NewsPage } from './pages/NewsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { GamesPage } from './pages/GamesPage';

import { DesktopShelf } from './components/desktop/DesktopShelf';
import { QuickSettingsModal } from './components/desktop/QuickSettingsModal';
import { AppLauncherModal } from './components/desktop/AppLauncherModal';

import { AndroidStatusBar } from './components/mobile/AndroidStatusBar';
import { AndroidBottomDock } from './components/mobile/AndroidBottomDock';
import { AndroidNavPill } from './components/mobile/AndroidNavPill';
import { MobileAppDrawerModal } from './components/mobile/MobileAppDrawerModal';

import { ToastNotification } from './components/common/ToastNotification';
import { UniversalSearchModal } from './components/common/UniversalSearchModal';
import { NewsModal } from './components/common/NewsModal';
import { AccessibilityModal } from './components/common/AccessibilityModal';

export const App = () => {
  const [isBooting, setIsBooting] = useState(true);
  const { activeApp, isMobile, pageTransition, appLauncherOpen, setAppLauncherOpen, accessibilityModalOpen, setAccessibilityModalOpen } = useOS();
  const { isDark } = useTheme();

  const renderActivePage = () => {
    switch (activeApp) {
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'apps':
        return <PremiumAppsPage />;
      case 'commission':
        return <CommissionPage />;
      case 'community':
        return <CommunityPage />;
      case 'donation':
        return <DonationPage />;
      case 'visual-identity':
        return <VisualIdentityPage />;
      case 'contact':
        return <ContactPage />;
      case 'shop':
        return <OnlineShopPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'files':
        return <FileExplorerPage />;
      case 'music':
        return <MusicPage />;
      case 'camera':
        return <CameraPage />;
      case 'news':
        return <NewsPage />;
      case 'accessibility':
        return <AccessibilityPage />;
      case 'games':
        return <GamesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      {isBooting && (
        <InitialBootLoader onComplete={() => setIsBooting(false)} />
      )}
      <div className={isMobile ? 'mobile-android-wrapper' : 'desktop-os-wrapper'}>
      {/* Mobile Top Status Bar */}
      {isMobile && <AndroidStatusBar />}

      {/* Main Active Page Content / Workspace with Transition */}
      <div
        key={activeApp}
        className={
          isMobile
            ? 'page-fade-in'
            : (pageTransition || (activeApp === 'home' ? 'page-zoom-out' : 'page-zoom-in'))
        }
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        {renderActivePage()}
      </div>

      {/* Desktop Specific OS Chrome & Navigation */}
      {!isMobile && (
        <>
          <DesktopShelf />
          <QuickSettingsModal />
          <AppLauncherModal />
        </>
      )}

      {/* Mobile Specific Floating Dock & Gesture Bar */}
      {isMobile && (
        <>
          <AndroidBottomDock />
          <AndroidNavPill />
          <MobileAppDrawerModal
            isOpen={appLauncherOpen}
            onClose={() => setAppLauncherOpen(false)}
          />
        </>
      )}

      {/* Universal Search & Spotlight Modal */}
      <UniversalSearchModal />

      {/* Global News Article Viewer Modal */}
      <NewsModal />

      {/* Global Quick Accessibility Modal */}
      <AccessibilityModal
        isOpen={accessibilityModalOpen}
        onClose={() => setAccessibilityModalOpen(false)}
      />

      {/* Global System Toasts */}
      <ToastNotification />
    </div>
    </>
  );
};

export default App;


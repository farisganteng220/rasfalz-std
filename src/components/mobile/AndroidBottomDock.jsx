import React from 'react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import { Home, Briefcase, ShoppingBag, Music, LayoutGrid } from 'lucide-react';

export const AndroidBottomDock = () => {
  const { activeApp, openApp, appLauncherOpen, setAppLauncherOpen } = useOS();
  const { playSoundEffect } = useAudio();

  const dockNavItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'portfolio', label: 'Portofolio', icon: Briefcase },
    { id: 'apps', label: 'Toko & Jasa', icon: ShoppingBag },
    { id: 'music', label: 'Musik', icon: Music },
    { id: 'drawer', label: 'Semua App', icon: LayoutGrid, isDrawerTrigger: true },
  ];

  const handleNavClick = (item) => {
    playSoundEffect('click');
    if (item.isDrawerTrigger) {
      setAppLauncherOpen(!appLauncherOpen);
    } else {
      setAppLauncherOpen(false);
      openApp(item.id);
    }
  };

  return (
    <div className="android-bottom-dock-container">
      <nav className="android-bottom-dock" aria-label="Mobile Bottom Navigation">
        {dockNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isDrawerTrigger
            ? appLauncherOpen
            : activeApp === item.id && !appLauncherOpen;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`dock-item-mobile btn-press ${isActive ? 'active' : ''}`}
              aria-label={item.label}
              title={item.label}
            >
              <div className="dock-icon-capsule">
                <Icon size={19} strokeWidth={isActive ? 2.5 : 2.2} />
              </div>
              <span className="dock-item-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AndroidBottomDock;

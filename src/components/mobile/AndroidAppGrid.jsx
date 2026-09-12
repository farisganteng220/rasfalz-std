import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_REGISTRY } from '../desktop/AppLauncherModal';
import { AppSquircleIcon } from '../common/AppSquircleIcon';

export const AndroidAppGrid = () => {
  const { openApp } = useOS();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { key: 'All', label: 'Semua App' },
    { key: 'Works', label: 'Karya' },
    { key: 'Store', label: 'Toko & Jasa' },
    { key: 'Media', label: 'Media & Game' },
  ];

  // Specific badges for prominent apps
  const appBadges = {
    'portfolio': 'HOT',
    'apps': '30% OFF',
    'games': 'NEW',
    'news': 'LIVE',
  };

  const filteredApps = APP_REGISTRY.filter(app => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Works') return app.category === 'Works' || app.category === 'Creator';
    if (activeCategory === 'Store') return app.category === 'Store' || app.category === 'Services' || app.category === 'Support';
    if (activeCategory === 'Media') return app.category === 'Media' || app.category === 'Social';
    return true;
  });

  return (
    <div className="android-app-grid-section">
      {/* Category Pills */}
      <div className="android-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`android-cat-pill btn-press ${activeCategory === cat.key ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* App Grid */}
      <div className="android-app-grid">
        {filteredApps.map((app) => {
          const Icon = app.icon;
          const badge = appBadges[app.id];

          return (
            <div
              key={app.id}
              className="android-app-item btn-press"
              onClick={() => openApp(app.id)}
            >
              <AppSquircleIcon
                icon={Icon}
                color={app.color}
                size={58}
                iconSize={26}
                borderRadius={18}
                badge={badge}
              />
              <span className="android-app-label">{app.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AndroidAppGrid;

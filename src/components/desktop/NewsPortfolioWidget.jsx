import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { useOS } from '../../context/OSContext';
import { DecorativeBackground } from '../common/DecorativeBackground';
import {
  Flame,
  Newspaper,
  Briefcase,
  ArrowRight,
  Sparkles,
  Calendar,
  Tag,
  ChevronRight,
  ExternalLink,
  Layers,
  Star,
  Eye,
  SlidersHorizontal,
  Clock,
  Filter,
  Film,
  PenTool,
  Image as ImageIcon,
} from 'lucide-react';
import {
  calculateEstimatedReadTime,
} from '../../utils/readingTime';

export const NewsPortfolioWidget = () => {
  const { openApp, openNews } = useOS();
  const [activeTab, setActiveTab] = useState('news'); // 'news' | 'portfolio'
  const [newsCatalogFilter, setNewsCatalogFilter] = useState('all');
  const [portfolioCatalogFilter, setPortfolioCatalogFilter] = useState('all');

  const newsItems = siteConfig.newsItems || [];
  const portfolioItems = siteConfig.portfolioItems || [];

  const latestNewsItem = newsItems.find(item => item.isLatest) || newsItems[0];

  // Helper for matching news category accurately
  const matchesNewsCategory = (item, catId) => {
    if (!catId || catId === 'all') return true;
    const target = catId.toLowerCase();
    const itemCat = (item.category || '').toLowerCase();
    const itemBadge = (item.badge || '').toLowerCase();

    if (target === 'latest' || target === 'terbaru') {
      return item.isLatest || item.id === latestNewsItem?.id;
    }
    if (target === 'update' || target === 'pembaruan') {
      return itemCat === 'update' || itemCat === 'pembaruan' || itemBadge.includes('update') || itemBadge.includes('feature');
    }
    if (target === 'news' || target === 'berita') {
      return itemCat === 'news' || itemCat === 'berita' || itemBadge.includes('welcome');
    }
    if (target === 'promo' || target === 'promosi') {
      return itemCat === 'promo' || itemCat === 'promosi' || itemBadge.includes('promo') || itemBadge.includes('harga');
    }
    if (target === 'koleksi' || target === 'portofolio') {
      return itemCat === 'koleksi' || itemCat === 'portofolio' || itemBadge.includes('portofolio');
    }
    return itemCat === target || itemBadge.includes(target);
  };

  // Catalog Sub-Tabs for News
  const newsCatalogs = [
    { id: 'all', label: 'Semua', count: newsItems.length },
    { id: 'latest', label: '🔥 isLatest', count: newsItems.filter(i => i.isLatest).length },
    { id: 'update', label: 'Update', count: newsItems.filter(i => matchesNewsCategory(i, 'update')).length },
    { id: 'news', label: 'News', count: newsItems.filter(i => matchesNewsCategory(i, 'news')).length },
    { id: 'promo', label: 'Promo', count: newsItems.filter(i => matchesNewsCategory(i, 'promo')).length },
    { id: 'koleksi', label: 'Koleksi', count: newsItems.filter(i => matchesNewsCategory(i, 'koleksi')).length },
  ];

  // Catalog Sub-Tabs for Portfolio
  const portfolioCatalogs = [
    { id: 'all', label: 'Semua Karya', count: portfolioItems.length },
    { id: 'Motion Graphic', label: 'Motion Graphic', count: portfolioItems.filter(i => i.category === 'Motion Graphic').length },
    { id: 'Video Editing', label: 'Video Editing', count: portfolioItems.filter(i => i.category === 'Video Editing').length },
    { id: 'Graphic Design', label: 'Graphic Design', count: portfolioItems.filter(i => i.category === 'Graphic Design').length },
  ];

  const filteredNews = newsCatalogFilter === 'all'
    ? newsItems
    : newsItems.filter(item => matchesNewsCategory(item, newsCatalogFilter));

  const filteredPortfolio = portfolioCatalogFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category.toLowerCase().includes(portfolioCatalogFilter.toLowerCase()));

  return (
    <div
      className="os-widget hover-lift"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px 20px',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-surface-elevated)',
        border: '2px solid var(--border-medium)',
        boxShadow: 'var(--shadow-window)',
        minHeight: '440px',
      }}
    >
      <DecorativeBackground
        variant="micro"
        scheme={activeTab === 'news' ? 'orange' : 'blue'}
        cols={10}
        rows={6}
        opacity={0.3}
      />

      {/* Widget Header with Styled Main Tab Switcher */}
      <div
        className="os-widget-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '2px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Main Segmented Control Pill */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-input)',
              padding: '3px',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid var(--border-medium)',
            }}
          >
            <button
              onClick={() => setActiveTab('news')}
              className="btn-press"
              style={{
                height: '30px',
                padding: '0 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                borderRadius: 'var(--radius-pill)',
                border: activeTab === 'news' ? '2px solid var(--btn-orange-border)' : '2px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: activeTab === 'news' ? 'var(--btn-orange-bg)' : 'transparent',
                color: activeTab === 'news' ? '#FFFFFF' : 'var(--text-muted)',
                boxShadow: activeTab === 'news' ? 'var(--btn-orange-shadow)' : 'none',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Newspaper size={14} />
              <span>Berita & Promo ({newsItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className="btn-press"
              style={{
                height: '30px',
                padding: '0 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                borderRadius: 'var(--radius-pill)',
                border: activeTab === 'portfolio' ? '2px solid var(--btn-blue-border)' : '2px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: activeTab === 'portfolio' ? 'var(--btn-blue-bg)' : 'transparent',
                color: activeTab === 'portfolio' ? '#FFFFFF' : 'var(--text-muted)',
                boxShadow: activeTab === 'portfolio' ? 'var(--btn-blue-shadow)' : 'none',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Briefcase size={14} />
              <span>Portofolio ({portfolioItems.length})</span>
            </button>
          </div>
        </div>

        {/* Header Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => (activeTab === 'news' ? openApp('news') : openApp('portfolio'))}
            className="btn-glass btn-sm hover-lift"
            style={{
              fontSize: '0.74rem',
              padding: '5px 12px',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{activeTab === 'news' ? 'Aplikasi Berita ↗' : 'Semua Portofolio ↗'}</span>
          </button>
        </div>
      </div>

      {/* Catalog Sub-Tabs Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '12px',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, marginRight: '4px', flexShrink: 0 }}>
          <Filter size={12} className={activeTab === 'news' ? 'text-orange' : 'text-blue'} />
          <span>Katalog:</span>
        </div>

        {activeTab === 'news' ? (
          newsCatalogs.map(cat => {
            const isCatActive = newsCatalogFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setNewsCatalogFilter(cat.id)}
                className="btn-press"
                style={{
                  height: '28px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isCatActive ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
                  background: isCatActive ? 'var(--color-orange)' : 'var(--bg-surface)',
                  color: isCatActive ? '#FFFFFF' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{cat.label}</span>
                <span style={{ opacity: 0.75, fontSize: '0.72rem' }}>({cat.count})</span>
              </button>
            );
          })
        ) : (
          portfolioCatalogs.map(cat => {
            const isCatActive = portfolioCatalogFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setPortfolioCatalogFilter(cat.id)}
                className="btn-press"
                style={{
                  height: '28px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isCatActive ? '2px solid var(--color-blue)' : '2px solid var(--border-medium)',
                  background: isCatActive ? 'var(--color-blue)' : 'var(--bg-surface)',
                  color: isCatActive ? '#FFFFFF' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{cat.label}</span>
                <span style={{ opacity: 0.75, fontSize: '0.72rem' }}>({cat.count})</span>
              </button>
            );
          })
        )}
      </div>

      {/* Main Dense 3-Card Grid (Fills 100% of available height with precision) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'news' ? (
          <>
            {/* Latest News Headline Strip */}
            {latestNewsItem && (
              <div
                onClick={() => openNews(latestNewsItem)}
                className="btn-press hover-lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 12px',
                  marginBottom: '10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'linear-gradient(90deg, rgba(255, 156, 15, 0.16) 0%, var(--bg-surface) 100%)',
                  border: '1.5px solid var(--color-orange)',
                  cursor: 'pointer',
                  gap: '8px',
                }}
                title="Klik untuk membuka artikel berita terbaru"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', minWidth: 0 }}>
                  <span
                    className="badge badge-orange animate-pulse"
                    style={{
                      fontSize: '0.64rem',
                      padding: '2px 7px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0,
                      fontWeight: 800,
                    }}
                  >
                    <Flame size={11} />
                    <span>isLatest</span>
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {latestNewsItem.title}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-orange)',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    flexShrink: 0,
                  }}
                >
                  <span>Baca Warta</span>
                  <ChevronRight size={12} />
                </span>
              </div>
            )}

            {/* News Feed Grid (Compact, Precision-Fitted) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '12px',
                height: '100%',
              }}
            >
              {filteredNews.slice(0, 3).map((item) => {
                const isLatest = item.id === latestNewsItem?.id || item.isLatest;
                return (
                  <div
                    key={item.id}
                    onClick={() => openNews(item)}
                    className="glass-card btn-press hover-lift"
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: 'var(--bg-surface)',
                      border: isLatest ? '2px solid var(--color-orange)' : '2px solid var(--border-medium)',
                      boxShadow: isLatest ? 'var(--shadow-sm)' : 'none',
                      transition: 'all var(--transition-fast)',
                      height: '100%',
                      boxSizing: 'border-box',
                      position: 'relative',
                    }}
                  >
                    <div>
                      {/* Thumbnail with overlay badge */}
                      <div
                        style={{
                          height: '125px',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          marginBottom: '8px',
                          position: 'relative',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '6px',
                            left: '6px',
                          }}
                        >
                          <span
                            className={`badge ${item.badgeType === 'blue' ? 'badge-blue' : 'badge-orange'}`}
                            style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                          >
                            {item.badge}
                          </span>
                        </div>

                        {isLatest && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '6px',
                              right: '6px',
                            }}
                          >
                            <span
                              className="badge badge-orange"
                              style={{
                                fontSize: '0.64rem',
                                padding: '2px 6px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                              }}
                            >
                              <Flame size={10} />
                              <span>isLatest</span>
                            </span>
                          </div>
                        )}
                      </div>

                  {/* Metadata Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--color-orange)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Calendar size={12} />
                      {item.date}
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Clock size={11} />
                      {calculateEstimatedReadTime(item)}
                    </span>
                  </div>

                  {/* News Headline */}
                  <h4
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 800,
                      margin: '0 0 6px 0',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {item.title}
                  </h4>

                  {/* News Summary */}
                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)',
                      margin: '0 0 8px 0',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.summary}
                  </p>
                </div>

                {/* Bottom Read Action */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '2px solid var(--border-subtle)',
                    paddingTop: '8px',
                    marginTop: '4px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--color-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Baca Selengkapnya
                    <ArrowRight size={13} />
                  </span>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {item.author}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </>
        ) : (
          /* Portfolio Showcase Grid (Precision-Fitted) */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '12px',
              height: '100%',
            }}
          >
            {filteredPortfolio.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => openApp('portfolio')}
                className="glass-card btn-press hover-lift"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-medium)',
                  transition: 'all var(--transition-fast)',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  {/* Thumbnail with overlay badge */}
                  <div
                    style={{
                      height: '125px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      marginBottom: '8px',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                      }}
                    >
                      <span className="badge badge-category" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                        {item.category}
                      </span>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        right: '6px',
                        background: 'var(--badge-neutral-bg)',
                        border: '1px solid var(--badge-neutral-border)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.72rem',
                        color: 'var(--badge-neutral-text)',
                        fontWeight: 700,
                      }}
                    >
                      {item.year}
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-blue)', fontWeight: 800 }}>
                      Karya Unggulan
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{item.creator || item.client || siteConfig.profile.name}</span>
                  </div>

                  {/* Project Title */}
                  <h4
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 800,
                      margin: '0 0 6px 0',
                      lineHeight: 1.4,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </h4>

                  {/* Project Description */}
                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)',
                      margin: '0 0 8px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '2px solid var(--border-subtle)',
                    paddingTop: '6px',
                    fontSize: '0.74rem',
                    color: 'var(--color-blue)',
                    fontWeight: 700,
                  }}
                >
                  <span>Buka Studi Kasus</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPortfolioWidget;

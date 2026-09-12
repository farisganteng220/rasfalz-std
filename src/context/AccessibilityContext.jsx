import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

const STORAGE_KEY = 'rasfalz_accessibility_settings';

const DEFAULT_SETTINGS = {
  fontSize: '100', // '100' | '112' | '125' | '140'
  highContrast: false,
  dyslexicFont: false,
  reducedMotion: false,
  colorFilter: 'none', // 'none' | 'grayscale' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  highlightLinks: false,
  largeCursor: false,
  wideLetterSpacing: false,
  readingGuide: false,
};

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse accessibility settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Save settings to localStorage and apply data attributes to HTML root
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save accessibility settings:', e);
    }

    const root = document.documentElement;

    // 1. Font Size Scaling
    root.setAttribute('data-font-scale', settings.fontSize);
    root.style.fontSize = `${(parseInt(settings.fontSize, 10) / 100) * 16}px`;

    // 2. High Contrast
    if (settings.highContrast) {
      root.setAttribute('data-high-contrast', 'true');
    } else {
      root.removeAttribute('data-high-contrast');
    }

    // 3. Dyslexic Font
    if (settings.dyslexicFont) {
      root.setAttribute('data-dyslexic-font', 'true');
    } else {
      root.removeAttribute('data-dyslexic-font');
    }

    // 4. Reduced Motion
    if (settings.reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }

    // 5. Color Filter
    if (settings.colorFilter !== 'none') {
      root.setAttribute('data-color-filter', settings.colorFilter);
    } else {
      root.removeAttribute('data-color-filter');
    }

    // 6. Highlight Links
    if (settings.highlightLinks) {
      root.setAttribute('data-highlight-links', 'true');
    } else {
      root.removeAttribute('data-highlight-links');
    }

    // 7. Large Cursor
    if (settings.largeCursor) {
      root.setAttribute('data-large-cursor', 'true');
    } else {
      root.removeAttribute('data-large-cursor');
    }

    // 8. Wide Spacing
    if (settings.wideLetterSpacing) {
      root.setAttribute('data-wide-spacing', 'true');
    } else {
      root.removeAttribute('data-wide-spacing');
    }
  }, [settings]);

  // Handler functions
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setFontSize = (size) => updateSetting('fontSize', size);
  const setHighContrast = (val) => updateSetting('highContrast', val);
  const setDyslexicFont = (val) => updateSetting('dyslexicFont', val);
  const setReducedMotion = (val) => updateSetting('reducedMotion', val);
  const setColorFilter = (filter) => updateSetting('colorFilter', filter);
  const setHighlightLinks = (val) => updateSetting('highlightLinks', val);
  const setLargeCursor = (val) => updateSetting('largeCursor', val);
  const setWideLetterSpacing = (val) => updateSetting('wideLetterSpacing', val);

  // Preset Configurations
  const applyPreset = (presetName) => {
    switch (presetName) {
      case 'reading':
        setSettings({
          ...DEFAULT_SETTINGS,
          fontSize: '112',
          dyslexicFont: true,
          wideLetterSpacing: true,
          highlightLinks: true,
        });
        break;
      case 'high-visibility':
        setSettings({
          ...DEFAULT_SETTINGS,
          fontSize: '125',
          highContrast: true,
          largeCursor: true,
          highlightLinks: true,
        });
        break;
      case 'calm-visuals':
        setSettings({
          ...DEFAULT_SETTINGS,
          reducedMotion: true,
          fontSize: '100',
        });
        break;
      case 'default':
      default:
        setSettings(DEFAULT_SETTINGS);
        break;
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    stopSpeaking();
  };

  // Text-To-Speech (Web Speech API Screen Reader)
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur Text-to-Speech tidak didukung di browser ini.');
      return;
    }

    window.speechSynthesis.cancel();

    if (!text || text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        toggleSetting,
        setFontSize,
        setHighContrast,
        setDyslexicFont,
        setReducedMotion,
        setColorFilter,
        setHighlightLinks,
        setLargeCursor,
        setWideLetterSpacing,
        applyPreset,
        resetSettings,
        speakText,
        stopSpeaking,
        isSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export default AccessibilityContext;

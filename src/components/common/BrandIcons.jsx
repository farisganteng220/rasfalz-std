import React from 'react';

export const InstagramIcon = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <defs>
      <radialGradient id="ig-grad" cx="20%" cy="105%" r="120%">
        <stop offset="0%" stopColor="#FFDD55" />
        <stop offset="25%" stopColor="#FF543E" />
        <stop offset="50%" stopColor="#C837AB" />
        <stop offset="100%" stopColor="#4158D0" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
    <path
      d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15.2C10.23 15.2 8.8 13.77 8.8 12C8.8 10.23 10.23 8.8 12 8.8C13.77 8.8 15.2 10.23 15.2 12C15.2 13.77 13.77 15.2 12 15.2ZM17.2 7.8C17.2 8.35 16.75 8.8 16.2 8.8C15.65 8.8 15.2 8.35 15.2 7.8C15.2 7.25 15.65 6.8 16.2 6.8C16.75 6.8 17.2 7.25 17.2 7.8Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const YoutubeIcon = ({ size = 20, color = '#FF0000', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      fill={color === 'currentColor' ? '#FF0000' : color}
    />
    <polygon points="9.6 15.5 15.8 12 9.6 8.5" fill="#FFFFFF" />
  </svg>
);

export const TikTokIcon = ({ size = 20, color = '#00F2FE', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.892-2.891 2.896 2.896 0 0 1 2.892-2.892c.31 0 .607.045.888.13V9.333a6.332 6.332 0 0 0-.888-.063A6.338 6.338 0 0 0 3 15.608 6.338 6.338 0 0 0 9.338 21.947a6.338 6.338 0 0 0 6.338-6.339V8.895a8.21 8.21 0 0 0 3.913 1.054V6.686z"
      fill="#FFFFFF"
    />
  </svg>
);

export const WhatsAppIcon = ({ size = 20, color = '#25D366', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"
      fill={color === 'currentColor' ? '#25D366' : color}
    />
    <path
      d="M17.52 14.33C17.22 14.18 15.75 13.45 15.47 13.35C15.2 13.25 15 13.2 14.81 13.5C14.61 13.8 14.07 14.45 13.9 14.64C13.73 14.84 13.57 14.86 13.27 14.71C12.98 14.57 12.02 14.25 10.89 13.24C10.01 12.45 9.42 11.48 9.25 11.19C9.08 10.89 9.23 10.74 9.38 10.59C9.51 10.46 9.68 10.25 9.82 10.08C9.97 9.91 10.02 9.78 10.12 9.58C10.22 9.39 10.17 9.21 10.1 9.07C10.02 8.92 9.48 7.59 9.25 7.05C9.03 6.52 8.81 6.59 8.64 6.58L8.12 6.58C7.92 6.58 7.63 6.65 7.38 6.92C7.14 7.19 6.45 7.83 6.45 9.14C6.45 10.45 7.4 11.71 7.54 11.89C7.67 12.07 9.42 14.78 12.11 15.94C12.75 16.22 13.25 16.38 13.64 16.51C14.28 16.71 14.87 16.68 15.33 16.61C15.85 16.53 16.92 15.96 17.15 15.33C17.37 14.69 17.37 14.15 17.31 14.04C17.25 13.93 17.1 13.86 16.8 13.71L17.52 14.33Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const TelegramIcon = ({ size = 20, color = '#229ED9', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill={color === 'currentColor' ? '#229ED9' : color} />
    <path
      d="M17.5 7.5L6.5 11.8L9.8 13.2L14.8 9.5L10.8 14.1V17.5L12.8 15.5L15.8 17.5L17.5 7.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const FacebookIcon = ({ size = 20, color = '#1877F2', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill={color === 'currentColor' ? '#1877F2' : color} />
    <path
      d="M13.5 18V12.5H15.2L15.5 10.5H13.5V9.2C13.5 8.6 13.7 8.2 14.5 8.2H15.6V6.4C15.4 6.4 14.7 6.3 13.8 6.3C11.9 6.3 10.6 7.5 10.6 9.6V10.5H8.8V12.5H10.6V18H13.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const GoogleDriveIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M8.2 3.5L2.8 12.8L6.4 19.1L11.8 9.8L8.2 3.5Z" fill="#2684FC" />
    <path d="M15.8 3.5H8.2L11.8 9.8H21.2L18.4 4.9C17.9 4 16.9 3.5 15.8 3.5Z" fill="#00AC47" />
    <path d="M21.2 9.8H11.8L6.4 19.1C7.2 19.7 8.2 20.1 9.3 20.1H18.4C19.5 20.1 20.5 19.5 21.1 18.6L21.2 9.8Z" fill="#FFBA00" />
  </svg>
);


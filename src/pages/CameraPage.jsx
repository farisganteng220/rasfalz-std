import React, { useState, useRef, useEffect } from 'react';
import { WindowFrame } from '../components/common/WindowFrame';
import { useOS } from '../context/OSContext';
import { useAudio } from '../context/AudioContext';
import confetti from 'canvas-confetti';
import {
  Camera,
  Video,
  Sparkles,
  Download,
  Sun,
  SwitchCamera,
  Zap,
  ZapOff,
  Image as ImageIcon,
  Check,
  CameraOff,
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Film,
  Trash2,
  Grid,
  X,
  ChevronUp,
  ChevronDown,
  Sliders,
  Circle,
} from 'lucide-react';

export const CameraPage = () => {
  const { isMobile, addToast } = useOS();
  const { playSoundEffect } = useAudio();

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  // Core Camera States
  const [cameraMode, setCameraMode] = useState('photo');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('user');
  const [cameraError, setCameraError] = useState(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [flashAnimation, setFlashAnimation] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('16/9');
  const [gridGuide, setGridGuide] = useState(false);

  // Video Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Filters
  const [selectedFilter, setSelectedFilter] = useState('none');

  // Mobile UI states
  const [showGallery, setShowGallery] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeMediaItem, setActiveMediaItem] = useState(null);

  // Gallery
  const [capturedMediaList, setCapturedMediaList] = useState([]);

  const filters = [
    { id: 'none', name: 'Normal', css: 'none', color: '#FF9C0F' },
    { id: 'cyberpunk', name: 'Cyberpunk', css: 'contrast(135%) saturate(200%) hue-rotate(185deg)', color: '#00F2FE' },
    { id: 'cinematic', name: 'Cinematic', css: 'sepia(30%) contrast(120%) saturate(140%) brightness(98%)', color: '#FF5E3A' },
    { id: 'retro', name: 'Retro VHS', css: 'sepia(50%) contrast(115%) brightness(92%) hue-rotate(-10deg)', color: '#F59E0B' },
    { id: 'monolith', name: 'Noir B&W', css: 'grayscale(100%) contrast(160%) brightness(88%)', color: '#E2E8F0' },
    { id: 'emerald', name: 'Emerald', css: 'hue-rotate(90deg) saturate(180%) contrast(120%)', color: '#10B981' },
  ];

  const currentFilterObj = filters.find(f => f.id === selectedFilter) || filters[0];

  const aspectRatios = [
    { id: '16/9', label: '16:9' },
    { id: '4/3', label: '4:3' },
    { id: '1/1', label: '1:1' },
    { id: '9/16', label: '9:16' },
  ];

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startCamera = async (facing = cameraFacing, withAudio = micEnabled) => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser tidak mendukung akses kamera.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1920, min: 640 }, height: { ideal: 1080, min: 480 } },
        audio: withAudio,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      setIsCameraActive(true);
      addToast('Kamera Siap', `Kamera ${facing === 'user' ? 'Depan' : 'Belakang'} aktif.`, 'success');
    } catch (err) {
      setIsCameraActive(false);
      setCameraError(err.message || 'Izin kamera ditolak atau tidak ditemukan.');
      addToast('Izin Kamera', 'Silakan izinkan akses kamera di peramban.', 'warning');
    }
  };

  const stopCamera = () => {
    if (isRecording) stopVideoRecording();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsCameraActive(false);
  };

  const toggleFacingMode = () => {
    const next = cameraFacing === 'user' ? 'environment' : 'user';
    setCameraFacing(next);
    if (isCameraActive) startCamera(next, micEnabled);
  };

  const toggleMic = () => {
    const next = !micEnabled;
    setMicEnabled(next);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(t => { t.enabled = next; });
    }
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  const getAspectRatioStyle = () => {
    if (aspectRatio === '16/9') return { aspectRatio: '16 / 9' };
    if (aspectRatio === '4/3') return { aspectRatio: '4 / 3' };
    if (aspectRatio === '1/1') return { aspectRatio: '1 / 1', maxWidth: isMobile ? '100%' : '520px', margin: '0 auto' };
    if (aspectRatio === '9/16') return { aspectRatio: '9 / 16', maxWidth: isMobile ? '320px' : '360px', margin: '0 auto' };
    return { aspectRatio: '16 / 9' };
  };

  const takeSnapshot = () => {
    setFlashAnimation(true);
    playSoundEffect('click');
    setTimeout(() => setFlashAnimation(false), 200);
    confetti({ particleCount: 40, spread: 60 });

    let canvasW = 1280, canvasH = 720;
    if (aspectRatio === '4/3') { canvasW = 960; canvasH = 720; }
    else if (aspectRatio === '1/1') { canvasW = 800; canvasH = 800; }
    else if (aspectRatio === '9/16') { canvasW = 720; canvasH = 1280; }

    const canvas = document.createElement('canvas');
    canvas.width = canvasW; canvas.height = canvasH;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (isCameraActive && videoRef.current) {
        ctx.filter = currentFilterObj.css;
        if (cameraFacing === 'user') { ctx.translate(canvasW, 0); ctx.scale(-1, 1); }
        const v = videoRef.current;
        const vR = (v.videoWidth || 16) / (v.videoHeight || 9);
        const tR = canvasW / canvasH;
        let sW = v.videoWidth || canvasW, sH = v.videoHeight || canvasH, sx = 0, sy = 0;
        if (vR > tR) { sW = (v.videoHeight || canvasH) * tR; sx = ((v.videoWidth || canvasW) - sW) / 2; }
        else { sH = (v.videoWidth || canvasW) / tR; sy = ((v.videoHeight || canvasH) - sH) / 2; }
        ctx.drawImage(v, sx, sy, sW, sH, 0, 0, canvasW, canvasH);
      } else {
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.fillStyle = '#FF9C0F';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('Rasfalz Studio', 50, canvasH / 2);
      }

      const dataUrl = canvas.toDataURL('image/png', 0.95);
      const newMedia = {
        id: `photo-${Date.now()}`,
        type: 'photo',
        url: dataUrl,
        aspect: aspectRatio,
        filterName: currentFilterObj.name,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setCapturedMediaList(prev => [newMedia, ...prev]);
      addToast('Foto Berhasil!', `Tersimpan dalam rasio ${aspectRatio}.`, 'success');
    }
  };

  const startVideoRecording = () => {
    if (!isCameraActive || !streamRef.current) {
      startCamera(cameraFacing, micEnabled);
      addToast('Nyalakan Kamera Dulu', 'Tekan rekam lagi setelah kamera aktif.', 'warning');
      return;
    }
    try {
      recordedChunksRef.current = [];
      let recorder;
      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
        recorder = new MediaRecorder(streamRef.current, { mimeType: 'video/webm;codecs=vp9,opus' });
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        recorder = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });
      } else {
        recorder = new MediaRecorder(streamRef.current);
      }

      recorder.ondataavailable = (e) => { if (e.data?.size > 0) recordedChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setCapturedMediaList(prev => [{
          id: `video-${Date.now()}`,
          type: 'video',
          url: videoUrl,
          blob,
          aspect: aspectRatio,
          filterName: currentFilterObj.name,
          duration: formatTimer(recordingSeconds),
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        }, ...prev]);
        addToast('Rekaman Selesai!', `Video (${formatTimer(recordingSeconds)}) tersimpan.`, 'success');
      };

      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);
      playSoundEffect('open');
      timerIntervalRef.current = setInterval(() => setRecordingSeconds(prev => prev + 1), 1000);
    } catch (err) {
      addToast('Gagal Merekam', err.message, 'warning');
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
      playSoundEffect('click');
    }
  };

  const deleteMedia = (id) => {
    setCapturedMediaList(prev => prev.filter(m => m.id !== id));
    if (activeMediaItem?.id === id) setActiveMediaItem(null);
  };

  // =============================================
  // MOBILE VIEW — Android Pixel Camera App
  // =============================================
  if (isMobile) {
    return (
      <WindowFrame title="Kamera Studio" icon={Camera} badgeText="Pixel Camera">
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0', userSelect: 'none' }}>

          {/* ── TOP STATUS BAR OVERLAY-STYLE ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              marginBottom: '-1px',
            }}
          >
            {/* Left: Flash + Grid */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setFlashEnabled(p => !p)}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: flashEnabled ? 'rgba(255,156,15,0.25)' : 'rgba(255,255,255,0.12)',
                  border: `2px solid ${flashEnabled ? 'var(--color-orange)' : 'rgba(255,255,255,0.2)'}`,
                  color: flashEnabled ? 'var(--color-orange)' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Flash"
              >
                {flashEnabled ? <Zap size={15} /> : <ZapOff size={15} />}
              </button>
              <button
                onClick={() => setGridGuide(p => !p)}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: gridGuide ? 'rgba(0,82,245,0.25)' : 'rgba(255,255,255,0.12)',
                  border: `2px solid ${gridGuide ? 'var(--color-blue)' : 'rgba(255,255,255,0.2)'}`,
                  color: gridGuide ? 'var(--color-blue)' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Grid Panduan"
              >
                <Grid size={15} />
              </button>
            </div>

            {/* Center: Aspect Ratio Pill */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '3px 6px', borderRadius: '99px', border: '2px solid rgba(255,255,255,0.15)' }}>
              {aspectRatios.map(ar => (
                <button
                  key={ar.id}
                  onClick={() => { setAspectRatio(ar.id); playSoundEffect('click'); }}
                  style={{
                    padding: '2px 8px', borderRadius: '99px', fontSize: '0.66rem', fontWeight: 800,
                    background: aspectRatio === ar.id ? 'var(--color-orange)' : 'transparent',
                    color: aspectRatio === ar.id ? '#fff' : 'rgba(255,255,255,0.65)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {ar.label}
                </button>
              ))}
            </div>

            {/* Right: Mic + Flip */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={toggleMic}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: micEnabled ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                  border: `2px solid ${micEnabled ? '#10B981' : '#EF4444'}`,
                  color: micEnabled ? '#10B981' : '#EF4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {micEnabled ? <Mic size={15} /> : <MicOff size={15} />}
              </button>
              <button
                onClick={toggleFacingMode}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Balik Kamera"
              >
                <SwitchCamera size={15} />
              </button>
            </div>
          </div>

          {/* ── VIEWFINDER ── */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              ...getAspectRatioStyle(),
              overflow: 'hidden',
              background: 'var(--bg-main, #2C2C2C)',
              border: isRecording ? '3px solid #EF4444' : '2px solid rgba(255,156,15,0.25)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Flash Animation */}
            {flashAnimation && (
              <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 200, animation: 'fadeIn 0.15s ease-out' }} />
            )}

            {/* Grid Overlay */}
            {gridGuide && (
              <div
                style={{
                  position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
                  backgroundSize: '33.33% 33.33%',
                }}
              />
            )}

            {/* Camera Feed */}
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: currentFilterObj.css,
                  transform: cameraFacing === 'user' ? 'scaleX(-1)' : 'none',
                }}
              />
            ) : (
              /* Standby Panel */
              <div
                style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center',
                  background: 'linear-gradient(135deg,rgba(15,15,15,0.97),rgba(25,20,15,0.97))',
                }}
              >
                <div
                  style={{
                    width: '70px', height: '70px', borderRadius: '22px',
                    background: 'linear-gradient(135deg,#FF9C0F,#FF5E3A)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Camera size={32} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 900, margin: '0 0 6px' }}>
                  Kamera Studio Siap
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', margin: '0 0 18px', lineHeight: 1.5 }}>
                  Ambil foto & rekam video sinematik dengan filter & rasio presisi.
                </p>
                {cameraError && (
                  <div style={{ background: 'rgba(239,68,68,0.18)', border: '2px solid #EF4444', borderRadius: '10px', padding: '7px 12px', fontSize: '0.74rem', color: '#EF4444', marginBottom: '14px', maxWidth: '280px' }}>
                    {cameraError}
                  </div>
                )}
                <button
                  onClick={() => startCamera(cameraFacing, micEnabled)}
                  className="btn btn-primary-orange btn-md hover-lift"
                  style={{ gap: '8px', padding: '10px 22px', fontWeight: 800 }}
                >
                  <Sparkles size={16} />
                  <span>Nyalakan Kamera</span>
                </button>
              </div>
            )}

            {/* Overlays: Filter badge & Aspect Ratio */}
            {isCameraActive && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 20, display: 'flex', gap: '6px' }}>
                {selectedFilter !== 'none' && (
                  <span style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', color: currentFilterObj.color, padding: '3px 9px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 800, border: `2px solid ${currentFilterObj.color}55` }}>
                    {currentFilterObj.name}
                  </span>
                )}
              </div>
            )}

            {/* Recording Timer Overlay */}
            {isRecording && (
              <div
                className="animate-pulse"
                style={{
                  position: 'absolute', top: '10px', right: '10px', zIndex: 20,
                  background: 'rgba(239,68,68,0.9)', backdropFilter: 'blur(8px)',
                  color: '#fff', padding: '5px 12px', borderRadius: '99px',
                  fontSize: '0.8rem', fontWeight: 900,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                REC {formatTimer(recordingSeconds)}
              </div>
            )}

            {/* Stop Camera button */}
            {isCameraActive && !isRecording && (
              <button
                onClick={stopCamera}
                style={{
                  position: 'absolute', bottom: '10px', right: '10px', zIndex: 20,
                  background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                  border: '2px solid rgba(239,68,68,0.4)', color: '#EF4444',
                  borderRadius: '99px', padding: '4px 11px', fontSize: '0.68rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                <CameraOff size={12} />
                <span>Matikan</span>
              </button>
            )}
          </div>

          {/* ── MODE SWITCHER (FOTO / VIDEO) ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 0 8px',
              gap: '0',
              background: 'var(--bg-surface)',
              borderTop: '2px solid var(--border-medium)',
            }}
          >
            {[
              { key: 'photo', icon: Camera, label: 'FOTO' },
              { key: 'video', icon: Video, label: 'VIDEO' },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => { if (isRecording) stopVideoRecording(); setCameraMode(m.key); playSoundEffect('click'); }}
                style={{
                  padding: '7px 28px',
                  background: 'none',
                  border: 'none',
                  borderBottom: cameraMode === m.key ? `2.5px solid ${m.key === 'video' ? '#EF4444' : 'var(--color-orange)'}` : '2.5px solid transparent',
                  color: cameraMode === m.key ? (m.key === 'video' ? '#EF4444' : 'var(--color-orange)') : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.18s ease',
                  letterSpacing: '0.06em',
                }}
              >
                <m.icon size={14} />
                {m.label}
              </button>
            ))}
          </div>

          {/* ── SHUTTER BAR ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              padding: '16px 24px 20px',
              background: 'var(--bg-surface)',
              gap: '16px',
            }}
          >
            {/* Left: Gallery thumbnail */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => setShowGallery(true)}
                style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  overflow: 'hidden', border: '2px solid var(--border-medium)',
                  background: capturedMediaList[0] ? 'transparent' : 'var(--bg-elevated, var(--bg-surface))',
                  cursor: 'pointer', position: 'relative',
                }}
                title="Buka Galeri"
              >
                {capturedMediaList[0] ? (
                  <>
                    {capturedMediaList[0].type === 'photo'
                      ? <img src={capturedMediaList[0].url} alt="last" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <video src={capturedMediaList[0].url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    {capturedMediaList.length > 1 && (
                      <span style={{ position: 'absolute', bottom: '2px', right: '2px', background: 'rgba(0,0,0,0.75)', color: '#fff', fontSize: '0.6rem', fontWeight: 900, padding: '1px 4px', borderRadius: '4px' }}>
                        {capturedMediaList.length}
                      </span>
                    )}
                  </>
                ) : (
                  <ImageIcon size={20} style={{ color: 'var(--text-muted)', margin: 'auto', display: 'block', marginTop: '14px' }} />
                )}
              </button>
            </div>

            {/* Center: SHUTTER BUTTON */}
            {cameraMode === 'photo' ? (
              <button
                onClick={takeSnapshot}
                className="btn-press"
                style={{
                  width: '76px', height: '76px', borderRadius: '50%',
                  background: '#fff', border: '5px solid var(--color-orange)',
                  padding: '5px', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                title="Ambil Foto"
              >
                <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'linear-gradient(135deg,#FF9C0F,#FF5E3A)' }} />
              </button>
            ) : (
              <button
                onClick={isRecording ? stopVideoRecording : startVideoRecording}
                className="btn-press"
                style={{
                  width: '76px', height: '76px', borderRadius: '50%',
                  background: '#fff', border: '5px solid #EF4444', padding: '5px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                  transition: 'box-shadow 0.3s ease',
                }}
                title={isRecording ? 'Berhenti Merekam' : 'Mulai Merekam'}
              >
                <div
                  style={{
                    width: isRecording ? '28px' : '58px',
                    height: isRecording ? '28px' : '58px',
                    borderRadius: isRecording ? '8px' : '50%',
                    background: '#EF4444',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </button>
            )}

            {/* Right: Filter toggle */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowFilters(true)}
                style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: selectedFilter !== 'none' ? `${currentFilterObj.color}22` : 'var(--bg-surface)',
                  border: `2px solid ${selectedFilter !== 'none' ? currentFilterObj.color : 'var(--border-medium)'}`,
                  color: selectedFilter !== 'none' ? currentFilterObj.color : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Filter Sinematik"
              >
                <Sliders size={20} />
              </button>
            </div>
          </div>

          {/* ── FILTER BOTTOM SHEET ── */}
          {showFilters && (
            <div
              style={{
                position: 'fixed', inset: 0, zIndex: 4000,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'flex-end',
              }}
              onClick={() => setShowFilters(false)}
            >
              <div
                className="animate-slide-up"
                style={{
                  width: '100%', padding: '20px 20px 32px',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '24px 24px 0 0',
                  border: '2px solid var(--border-medium)',
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} className="text-orange" />
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Filter Sinematik</h4>
                  </div>
                  <button onClick={() => setShowFilters(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {filters.map(f => (
                    <button
                      key={f.id}
                      onClick={() => { setSelectedFilter(f.id); playSoundEffect('click'); setShowFilters(false); }}
                      className="btn-press"
                      style={{
                        padding: '12px 8px',
                        borderRadius: '14px',
                        border: `2px solid ${selectedFilter === f.id ? f.color : 'var(--border-medium)'}`,
                        background: selectedFilter === f.id ? `${f.color}18` : 'var(--bg-surface)',
                        color: selectedFilter === f.id ? f.color : 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.18s',
                      }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${f.color}33`, border: `2px solid ${f.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {selectedFilter === f.id ? <Check size={14} style={{ color: f.color }} /> : <Circle size={12} style={{ color: f.color }} />}
                      </div>
                      <span>{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── GALLERY BOTTOM SHEET ── */}
          {showGallery && (
            <div
              style={{
                position: 'fixed', inset: 0, zIndex: 4000,
                background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'flex-end',
              }}
              onClick={() => setShowGallery(false)}
            >
              <div
                className="animate-slide-up"
                style={{
                  width: '100%',
                  maxHeight: '75vh',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '24px 24px 0 0',
                  border: '2px solid var(--border-medium)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Gallery Header */}
                <div style={{ padding: '18px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--border-medium)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Film size={16} className="text-blue" />
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>
                      Galeri Studio ({capturedMediaList.length})
                    </h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {capturedMediaList.length > 0 && (
                      <button
                        onClick={() => setCapturedMediaList([])}
                        style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Hapus Semua
                      </button>
                    )}
                    <button onClick={() => setShowGallery(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Gallery Body */}
                <div style={{ overflowY: 'auto', padding: '14px 16px 24px', flex: 1 }}>
                  {capturedMediaList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <ImageIcon size={36} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0 }}>
                        Belum ada foto atau video. Jepret atau rekam sekarang!
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {capturedMediaList.map(item => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            borderRadius: '16px',
                            background: 'var(--bg-surface)',
                            border: '2px solid var(--border-medium)',
                          }}
                        >
                          {/* Thumbnail */}
                          <div
                            onClick={() => { setActiveMediaItem(item); setShowGallery(false); }}
                            style={{
                              width: '60px', height: '60px', borderRadius: '12px',
                              overflow: 'hidden', background: '#000',
                              cursor: 'pointer', flexShrink: 0, position: 'relative',
                            }}
                          >
                            {item.type === 'photo'
                              ? <img src={item.url} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : (
                                <>
                                  <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Play size={18} fill="#fff" color="#fff" />
                                  </div>
                                </>
                              )
                            }
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                              <span
                                className={`badge ${item.type === 'video' ? 'badge-orange' : 'badge-blue'}`}
                                style={{ fontSize: '0.62rem', padding: '1px 6px' }}
                              >
                                {item.type === 'video' ? `VIDEO ${item.duration}` : `FOTO ${item.aspect}`}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.filterName}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.timestamp}</p>
                          </div>

                          {/* Actions */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                            <a
                              href={item.url}
                              download={item.type === 'video' ? `rasfalz-video-${item.id}.webm` : `rasfalz-photo-${item.id}.png`}
                              style={{
                                width: '34px', height: '34px', borderRadius: '10px',
                                background: 'var(--color-orange-subtle)', color: 'var(--color-orange)',
                                border: '2px solid var(--color-orange)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                              title="Unduh"
                            >
                              <Download size={15} />
                            </a>
                            <button
                              onClick={() => deleteMedia(item.id)}
                              style={{
                                width: '34px', height: '34px', borderRadius: '10px',
                                background: 'rgba(239,68,68,0.12)', color: '#EF4444',
                                border: '2px solid rgba(239,68,68,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                              title="Hapus"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── MEDIA PREVIEW MODAL ── */}
          {activeMediaItem && (
            <div
              style={{
                position: 'fixed', inset: 0, zIndex: 5000,
                background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '16px',
              }}
              onClick={() => setActiveMediaItem(null)}
            >
              <div
                className="animate-scale-in"
                style={{ width: '100%', maxWidth: '480px', borderRadius: '20px', overflow: 'hidden', background: 'var(--bg-surface-elevated)', border: '2px solid var(--border-medium)' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--border-medium)' }}>
                  <span className={`badge ${activeMediaItem.type === 'video' ? 'badge-orange' : 'badge-blue'}`} style={{ fontSize: '0.72rem' }}>
                    {activeMediaItem.type === 'video' ? 'Video Player' : 'Photo Viewer'}
                  </span>
                  <button onClick={() => setActiveMediaItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>

                {/* Media */}
                <div style={{ background: 'var(--bg-main, #2C2C2C)', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '60vh', overflow: 'hidden' }}>
                  {activeMediaItem.type === 'photo'
                    ? <img src={activeMediaItem.url} alt="preview" style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }} />
                    : <video src={activeMediaItem.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '60vh' }} />
                  }
                </div>

                {/* Footer */}
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', borderTop: '2px solid var(--border-medium)' }}>
                  <button
                    onClick={() => deleteMedia(activeMediaItem.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 700 }}
                  >
                    <Trash2 size={15} />
                    Hapus
                  </button>
                  <a
                    href={activeMediaItem.url}
                    download={activeMediaItem.type === 'video' ? `rasfalz-video-${activeMediaItem.id}.webm` : `rasfalz-photo-${activeMediaItem.id}.png`}
                    className="btn btn-primary-orange btn-sm"
                    style={{ gap: '6px', padding: '7px 18px', fontWeight: 800 }}
                  >
                    <Download size={14} />
                    Unduh HD
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </WindowFrame>
    );
  }

  // =============================================
  // DESKTOP / TABLET VIEW (unchanged structure)
  // =============================================
  return (
    <WindowFrame title="Studio Kamera & Video HD" icon={Camera} badgeText="Studio Lens v2.5">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          alignItems: 'flex-start',
        }}
      >
        {/* ── MAIN VIEWFINDER ── */}
        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Top Quick Status & Mode Bar */}
          <div className="glass-card" style={{ padding: '8px 16px', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '3px', borderRadius: 'var(--radius-pill)', border: '2px solid var(--border-medium)' }}>
              {[{ key: 'photo', icon: Camera, label: 'FOTO' }, { key: 'video', icon: Video, label: 'VIDEO REKAM' }].map(m => (
                <button
                  key={m.key}
                  onClick={() => { if (isRecording) stopVideoRecording(); setCameraMode(m.key); playSoundEffect('click'); }}
                  className="btn-press"
                  style={{
                    padding: '6px 16px', borderRadius: 'var(--radius-pill)', border: 'none',
                    background: cameraMode === m.key ? (m.key === 'video' ? '#EF4444' : 'var(--color-orange)') : 'transparent',
                    color: cameraMode === m.key ? '#FFFFFF' : 'var(--text-secondary)',
                    fontSize: '0.8rem', fontWeight: 800,
                    display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  <m.icon size={14} />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={toggleMic} className="btn btn-glass btn-sm btn-press" style={{ padding: '6px 10px', borderRadius: 'var(--radius-pill)', color: micEnabled ? '#10B981' : '#EF4444', borderColor: micEnabled ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)', gap: '4px', fontSize: '0.74rem' }}>
                {micEnabled ? <Mic size={14} /> : <MicOff size={14} />}
                <span>{micEnabled ? 'Mic ON' : 'Mic OFF'}</span>
              </button>
              <button onClick={() => setFlashEnabled(p => !p)} className="btn btn-glass btn-sm btn-press" style={{ padding: '6px 10px', borderRadius: 'var(--radius-pill)', color: flashEnabled ? 'var(--color-orange)' : 'var(--text-muted)', gap: '4px', fontSize: '0.74rem' }}>
                {flashEnabled ? <Zap size={14} /> : <ZapOff size={14} />}
              </button>
              <button onClick={() => setGridGuide(p => !p)} className="btn btn-glass btn-sm btn-press" style={{ padding: '6px 10px', borderRadius: 'var(--radius-pill)', color: gridGuide ? 'var(--color-orange)' : 'var(--text-muted)', gap: '4px', fontSize: '0.74rem' }}>
                <Grid size={14} />
              </button>
              <button onClick={toggleFacingMode} className="btn btn-glass btn-sm btn-press" style={{ padding: '6px 10px', borderRadius: 'var(--radius-pill)', gap: '4px', fontSize: '0.74rem' }}>
                <SwitchCamera size={14} />
              </button>
            </div>
          </div>

          {/* Viewfinder */}
          <div
            style={{
              position: 'relative', width: '100%', ...getAspectRatioStyle(),
              borderRadius: '24px', overflow: 'hidden', background: 'var(--bg-main, #2C2C2C)',
              border: isRecording ? '3px solid #EF4444' : '2px solid rgba(255,156,15,0.35)',
              boxShadow: 'var(--shadow-lg)',
              transition: 'all 0.3s ease',
            }}
          >
            {flashAnimation && <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 200, animation: 'fadeIn 0.15s ease-out' }} />}
            {gridGuide && <div style={{ position: 'absolute', inset: 0, zIndex: 10, backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '33.33% 33.33%', pointerEvents: 'none' }} />}
            {isCameraActive ? (
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: currentFilterObj.css, transform: cameraFacing === 'user' ? 'scaleX(-1)' : 'none' }} />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', background: 'linear-gradient(135deg,rgba(15,15,15,0.95),rgba(25,20,15,0.95))' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg,#FF9C0F,#FF5E3A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Camera size={30} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 900, margin: '0 0 6px' }}>Studio Kamera & Video Siap</h3>
                <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.84rem', margin: '0 0 16px', maxWidth: '380px', lineHeight: 1.5 }}>Ambil foto berkualitas tinggi atau rekam video dengan filter sinematik dan rasio presisi.</p>
                {cameraError && <div style={{ background: 'rgba(239,68,68,0.2)', border: '2px solid #EF4444', borderRadius: '12px', padding: '8px 14px', fontSize: '0.76rem', color: '#EF4444', marginBottom: '14px', maxWidth: '320px' }}>{cameraError}</div>}
                <button onClick={() => startCamera(cameraFacing, micEnabled)} className="btn btn-primary-orange btn-md hover-lift" style={{ gap: '8px', padding: '10px 24px', fontWeight: 800 }}>
                  <Sparkles size={16} />
                  <span>Nyalakan Kamera Sekarang</span>
                </button>
              </div>
            )}
            {isCameraActive && (
              <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px', zIndex: 20 }}>
                <span style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', color: 'var(--color-orange)', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 800, border: '2px solid rgba(255,156,15,0.3)' }}>{currentFilterObj.name}</span>
                <span style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', color: '#fff', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 800, border: '2px solid rgba(255,255,255,0.15)' }}>{aspectRatio}</span>
              </div>
            )}
            {isRecording && (
              <div className="animate-pulse" style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(239,68,68,0.9)', backdropFilter: 'blur(10px)', color: '#fff', padding: '6px 14px', borderRadius: 'var(--radius-pill)', fontSize: '0.82rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20 }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fff' }} />
                REC {formatTimer(recordingSeconds)}
              </div>
            )}
            {isCameraActive && !isRecording && (
              <button onClick={stopCamera} style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.2)', color: '#EF4444', borderRadius: 'var(--radius-pill)', padding: '5px 12px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CameraOff size={13} />
                <span>Matikan</span>
              </button>
            )}
          </div>

          {/* Shutter Deck */}
          <div className="glass-card" style={{ padding: '14px 24px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface-elevated)', border: '2px solid var(--border-medium)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>Rasio:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {aspectRatios.map(ar => (
                  <button key={ar.id} onClick={() => { setAspectRatio(ar.id); playSoundEffect('click'); }} style={{ padding: '4px 10px', borderRadius: '8px', border: 'none', background: aspectRatio === ar.id ? 'var(--color-orange)' : 'var(--bg-surface)', color: aspectRatio === ar.id ? '#fff' : 'var(--text-secondary)', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s ease' }}>
                    {ar.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cameraMode === 'photo' ? (
                <button onClick={takeSnapshot} className="btn-press hover-lift" style={{ width: '76px', height: '76px', borderRadius: '50%', background: '#fff', border: '5px solid var(--color-orange)', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', flexShrink: 0 }} title="Ambil Foto">
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,#FF9C0F,#FF5E3A)' }} />
                </button>
              ) : (
                <button onClick={isRecording ? stopVideoRecording : startVideoRecording} className="btn-press hover-lift" style={{ width: '76px', height: '76px', borderRadius: '50%', background: '#fff', border: '5px solid #EF4444', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', flexShrink: 0 }} title={isRecording ? 'Berhenti' : 'Mulai Rekam'}>
                  <div style={{ width: isRecording ? '28px' : '56px', height: isRecording ? '28px' : '56px', borderRadius: isRecording ? '8px' : '50%', background: '#EF4444', transition: 'all 0.25s ease' }} />
                </button>
              )}
            </div>

            <button onClick={isCameraActive ? stopCamera : () => startCamera(cameraFacing, micEnabled)} className={`btn btn-sm ${isCameraActive ? 'btn-glass' : 'btn-primary-orange'} btn-press`} style={{ padding: '8px 14px', fontSize: '0.78rem', fontWeight: 800, gap: '6px' }}>
              {isCameraActive ? <CameraOff size={14} className="text-orange" /> : <Sparkles size={14} />}
              <span>{isCameraActive ? 'Tutup' : 'Nyalakan'}</span>
            </button>
          </div>
        </div>

        {/* ── SIDE PANEL: FILTERS & GALLERY ── */}
        <div style={{ width: '340px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
          {/* Filter Palette */}
          <div className="glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={15} className="text-orange" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0 }}>Filter Sinematik</h4>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '0.66rem' }}>{filters.length} Efek</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {filters.map(f => (
                <button key={f.id} onClick={() => { setSelectedFilter(f.id); playSoundEffect('click'); }} className={`btn-press ${selectedFilter === f.id ? 'badge-orange' : 'btn-glass'}`} style={{ padding: '8px 12px', borderRadius: '12px', border: `2px solid ${selectedFilter === f.id ? 'var(--color-orange)' : 'var(--border-subtle)'}`, fontSize: '0.76rem', fontWeight: 700, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{f.name}</span>
                  {selectedFilter === f.id && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Film size={15} className="text-blue" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0 }}>Hasil Foto & Video ({capturedMediaList.length})</h4>
              </div>
              {capturedMediaList.length > 0 && <button onClick={() => setCapturedMediaList([])} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer' }}>Hapus Semua</button>}
            </div>
            {capturedMediaList.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '2px dashed var(--border-medium)' }}>
                <ImageIcon size={28} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Belum ada foto atau video. Jepret atau rekam sekarang!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                {capturedMediaList.map(item => (
                  <div key={item.id} className="glass-card hover-lift" style={{ padding: '8px 10px', borderRadius: '14px', background: 'var(--bg-surface)', border: '2px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div onClick={() => setActiveMediaItem(item)} style={{ width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden', position: 'relative', background: '#000', cursor: 'pointer', flexShrink: 0 }}>
                      {item.type === 'photo' ? <img src={item.url} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <Play size={16} fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span className={`badge ${item.type === 'video' ? 'badge-orange' : 'badge-blue'}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>{item.type === 'video' ? `VIDEO ${item.duration}` : `FOTO ${item.aspect}`}</span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                      </div>
                      <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.filterName}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <a href={item.url} download={item.type === 'video' ? `rasfalz-video-${item.id}.webm` : `rasfalz-photo-${item.id}.png`} className="btn-glass btn-sm" style={{ padding: '6px 8px', color: 'var(--color-orange)' }} title="Unduh">
                        <Download size={13} />
                      </a>
                      <button onClick={() => deleteMedia(item.id)} className="btn-glass btn-sm" style={{ padding: '6px 8px', color: '#EF4444' }} title="Hapus">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Media Preview Modal */}
        {activeMediaItem && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }} onClick={() => setActiveMediaItem(null)}>
            <div className="animate-scale-in" style={{ width: '100%', maxWidth: '780px', borderRadius: '24px', background: 'var(--bg-surface-elevated)', border: '2px solid var(--border-medium)', boxShadow: '0 24px 64px rgba(0,0,0,0.9)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
              <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--border-medium)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${activeMediaItem.type === 'video' ? 'badge-orange' : 'badge-blue'}`}>{activeMediaItem.type === 'video' ? 'Video Player' : 'Photo Viewer'}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Filter: {activeMediaItem.filterName} • Rasio: {activeMediaItem.aspect}</span>
                </div>
                <button onClick={() => setActiveMediaItem(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-main, #2C2C2C)', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '70vh' }}>
                {activeMediaItem.type === 'photo' ? <img src={activeMediaItem.url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: '12px' }} /> : <video src={activeMediaItem.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '65vh', borderRadius: '12px' }} />}
              </div>
              <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', borderTop: '2px solid var(--border-medium)' }}>
                <button onClick={() => deleteMedia(activeMediaItem.id)} className="btn btn-glass btn-sm" style={{ color: '#EF4444', gap: '6px', fontSize: '0.78rem' }}>
                  <Trash2 size={14} />
                  <span>Hapus Media</span>
                </button>
                <a href={activeMediaItem.url} download={activeMediaItem.type === 'video' ? `rasfalz-video-${activeMediaItem.id}.webm` : `rasfalz-photo-${activeMediaItem.id}.png`} className="btn btn-primary-orange btn-sm hover-lift" style={{ gap: '6px', padding: '8px 20px', fontSize: '0.84rem', fontWeight: 800 }}>
                  <Download size={15} />
                  <span>Unduh File HD</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </WindowFrame>
  );
};

export default CameraPage;

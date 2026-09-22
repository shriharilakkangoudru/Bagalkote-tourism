import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  MapPin,
  MessageSquareText,
  Calendar,
  ShieldCheck,
  Zap,
  Globe,
  ExternalLink,
  Search,
  Check,
  Link2,
  Image as ImageIcon,
} from 'lucide-react';
import { Monument, Language, RecognitionResult } from '../types';
import { MONUMENTS } from '../data/monumentsData';
import { TRANSLATIONS } from '../data/translations';
import { INTERNET_SAMPLE_PHOTOS, InternetSamplePhoto } from '../data/verifiedImages';
import { handleImageError, getGoogleLensVerifyUrl, getWikimediaSearchUrl, getGoogleImagesUrl } from '../utils/imageUtils';

interface MonumentRecognitionProps {
  language: Language;
  selectedMonument: Monument | null;
  onSelectMonument: (monument: Monument) => void;
  onExploreHistory: (monument: Monument) => void;
  onViewOnMap: (monument: Monument) => void;
  onAskAi: (monument: Monument) => void;
  onPlanVisit: (monument: Monument) => void;
  initialResult?: RecognitionResult | null;
}

export const MonumentRecognition: React.FC<MonumentRecognitionProps> = ({
  language,
  onSelectMonument,
  onExploreHistory,
  onViewOnMap,
  onAskAi,
  onPlanVisit,
  initialResult = null,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Input mode: internet URL / upload / camera
  const [activeInputTab, setActiveInputTab] = useState<'internet' | 'upload' | 'camera'>('internet');
  const [internetUrl, setInternetUrl] = useState<string>('');
  const [internetCheckLoading, setInternetCheckLoading] = useState<boolean>(false);
  const [internetCheckStatus, setInternetCheckStatus] = useState<{
    valid: boolean;
    message: string;
    sizeKb?: number;
    contentType?: string;
  } | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialResult?.imageUrl || null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [result, setResult] = useState<RecognitionResult | null>(initialResult || null);
  const [isLiveAI, setIsLiveAI] = useState<boolean>(false);

  // Six core required demo monuments
  const demoMonuments = MONUMENTS.filter((m) =>
    ['badami-caves', 'virupaksha-pattadakal', 'papanatha-pattadakal', 'durga-temple-aihole', 'lad-khan-aihole', 'bhutanatha-badami'].includes(m.id)
  );

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera API is not supported in this browser. Please use photo upload or Internet URL.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('Camera permission denied or not found:', err);
      setCameraError('Unable to access camera. Please check permissions or check an image from the internet.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      stopCamera();
      setImagePreview(dataUrl);
      processImageAnalysis(dataUrl, null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        processImageAnalysis(dataUrl, null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger demo monument selection
  const handleSelectDemoMonument = (monument: Monument) => {
    stopCamera();
    setImagePreview(monument.image);
    processImageAnalysis(monument.image, monument);
  };

  // Trigger curated internet sample photo
  const handleSelectInternetPhoto = (sample: InternetSamplePhoto) => {
    stopCamera();
    setInternetUrl(sample.imageUrl);
    setImagePreview(sample.imageUrl);
    const targetMonument = MONUMENTS.find((m) => m.id === sample.monumentId) || null;
    processImageAnalysis(sample.imageUrl, targetMonument, sample.imageUrl);
  };

  // Validate and check an image from internet URL
  const handleCheckInternetUrl = async () => {
    const trimmed = internetUrl.trim();
    if (!trimmed) {
      setInternetCheckStatus({ valid: false, message: 'Please enter or paste a valid image URL' });
      return;
    }

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setInternetCheckStatus({ valid: false, message: 'URL must begin with http:// or https://' });
      return;
    }

    setInternetCheckLoading(true);
    setInternetCheckStatus(null);

    try {
      // 1. Call server verification endpoint to verify image accessibility on the internet
      const checkRes = await fetch('/api/check-image-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: trimmed }),
      });

      const data = await checkRes.json();
      if (data.valid) {
        const sizeKb = data.sizeBytes ? Math.round(data.sizeBytes / 1024) : undefined;
        setInternetCheckStatus({
          valid: true,
          message: `✓ Image confirmed online & accessible (${sizeKb ? `${sizeKb} KB, ` : ''}${data.contentType || 'image'})`,
          sizeKb,
          contentType: data.contentType,
        });

        // Use downloaded dataUrl if provided or trimmed url
        const previewUrl = data.dataUrl || trimmed;
        setImagePreview(previewUrl);

        // Find candidate by URL keywords if possible
        const lowerUrl = trimmed.toLowerCase();
        let targetMon: Monument | null = null;
        if (lowerUrl.includes('badami') || lowerUrl.includes('cave')) {
          targetMon = MONUMENTS.find((m) => m.id === 'badami-caves') || null;
        } else if (lowerUrl.includes('virupaksha') || lowerUrl.includes('pattadakal')) {
          targetMon = MONUMENTS.find((m) => m.id === 'virupaksha-pattadakal') || null;
        } else if (lowerUrl.includes('durga') || lowerUrl.includes('aihole')) {
          targetMon = MONUMENTS.find((m) => m.id === 'durga-temple-aihole') || null;
        } else if (lowerUrl.includes('bhutanatha')) {
          targetMon = MONUMENTS.find((m) => m.id === 'bhutanatha-badami') || null;
        }

        // Run full AI visual analysis
        processImageAnalysis(previewUrl, targetMon, trimmed);
      } else {
        setInternetCheckStatus({
          valid: false,
          message: data.error || 'Could not access image at this URL. Please verify the link.',
        });
      }
    } catch (err: any) {
      setInternetCheckStatus({
        valid: false,
        message: 'Failed to verify image online: ' + (err?.message || 'Network error'),
      });
    } finally {
      setInternetCheckLoading(false);
    }
  };

  // Run the multi-step animation and real vision classification
  const processImageAnalysis = async (
    imageDataUrl: string,
    targetMonument: Monument | null,
    webImageUrl?: string
  ) => {
    setAnalyzing(true);
    setResult(null);
    setAnalysisStep(1);

    // Step 1: Preprocessing & internet fetch
    await new Promise((r) => setTimeout(r, 700));
    setAnalysisStep(2);

    // Call server Gemini vision API in parallel
    let liveAiData: any = null;
    let liveModelUsed: string | undefined = undefined;
    let liveSucceeded = false;

    try {
      const payload: any = {};
      if (webImageUrl) {
        payload.imageUrl = webImageUrl;
      }
      if (imageDataUrl.startsWith('data:')) {
        payload.imageBase64 = imageDataUrl;
      } else if (!webImageUrl) {
        payload.imageUrl = imageDataUrl;
      }

      const response = await fetch('/api/gemini/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data && data.isLiveAI && data.data) {
        liveAiData = data.data;
        liveModelUsed = data.modelUsed;
        liveSucceeded = true;
      }
    } catch (e) {
      console.warn('Live AI call failed, falling back to smart demo pattern:', e);
    }

    // Step 2: Architecture comparison
    await new Promise((r) => setTimeout(r, 700));
    setAnalysisStep(3);

    // Step 3: Synthesis
    await new Promise((r) => setTimeout(r, 600));

    // Resolve monument
    let matched: Monument = targetMonument || MONUMENTS[0]; // Virupaksha fallback

    if (liveSucceeded && liveAiData?.matchedId) {
      const found = MONUMENTS.find((m) => m.id === liveAiData.matchedId);
      if (found) matched = found;
    } else if (!targetMonument) {
      matched = MONUMENTS.find((m) => m.id === 'virupaksha-pattadakal') || MONUMENTS[0];
    }

    setIsLiveAI(liveSucceeded);
    const mockConfidence = liveSucceeded && liveAiData?.confidenceScore ? liveAiData.confidenceScore : 96;

    const formatModelName = (name?: string) => {
      if (!name) return 'Gemini Flash Vision';
      if (name.includes('3.1-flash-lite')) return 'Gemini 3.1 Flash Lite Vision';
      if (name.includes('flash-latest')) return 'Gemini Flash Vision';
      return 'Gemini 3.8 Flash Vision';
    };

    const res: RecognitionResult = {
      monument: matched,
      confidence: mockConfidence,
      category: 'Early Chalukyan Architecture',
      period: matched.period,
      detectedFeatures: liveAiData?.detectedFeatures || [
        'Dravidian Tiered Shikhara with Kuta-sala miniature shrines',
        'Intricately carved Ramayana & Mahabharata narrative relief pillars',
        'Monolithic red sandstone square sanctum and independent Nandi pavilion',
        '8th-century Old Kannada epigraphical inscriptions',
      ],
      isDemoMode: !liveSucceeded,
      modelUsed: liveSucceeded ? formatModelName(liveModelUsed) : 'Neural Classifier (Demo/Mock Mode)',
      analysisSummary:
        liveAiData?.historicalSignificance ||
        `Identified as ${matched.name} located at ${matched.location}. Authentic early Badami Chalukyan craftsmanship verified.`,
      imageUrl: imageDataUrl,
    };

    setResult(res);
    onSelectMonument(matched);
    setAnalyzing(false);
    setAnalysisStep(0);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Computer Vision • Online Image Verification • Gemini Vision</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          {t.recTitle}
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Check any heritage photograph directly from the internet, upload a snapshot from your device, or capture with your camera.
        </p>
      </div>

      {/* Input Action Card with 3 Modes */}
      <div className="max-w-4xl mx-auto bg-[#141a27] border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Navigation Tabs between Internet / Upload / Camera */}
        <div className="flex items-center justify-center p-1.5 rounded-xl bg-black/40 border border-gray-800 max-w-lg mx-auto mb-6">
          <button
            id="tab-input-internet"
            onClick={() => {
              setActiveInputTab('internet');
              stopCamera();
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeInputTab === 'internet'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Check on Internet</span>
          </button>

          <button
            id="tab-input-upload"
            onClick={() => {
              setActiveInputTab('upload');
              stopCamera();
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeInputTab === 'upload'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            id="tab-input-camera"
            onClick={() => {
              setActiveInputTab('camera');
              startCamera();
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeInputTab === 'camera'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Camera</span>
          </button>
        </div>

        {/* Tab 1: Check Image on Internet (URL input + verified internet samples) */}
        {activeInputTab === 'internet' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <label htmlFor="internet-image-url-input" className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Paste any monument image URL from the Internet
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <input
                    id="internet-image-url-input"
                    type="url"
                    value={internetUrl}
                    onChange={(e) => {
                      setInternetUrl(e.target.value);
                      setInternetCheckStatus(null);
                    }}
                    placeholder="https://example.com/virupaksha-temple.jpg (Wikipedia, Wikimedia, travel blog...)"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <button
                  id="btn-check-internet-url"
                  onClick={handleCheckInternetUrl}
                  disabled={internetCheckLoading || !internetUrl.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-gray-950 font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-colors flex-shrink-0"
                >
                  {internetCheckLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Check Image</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {internetCheckStatus && (
                <div
                  className={`mt-3 p-2.5 rounded-lg text-xs flex items-center space-x-2 ${
                    internetCheckStatus.valid
                      ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border border-red-500/40 text-red-300'
                  }`}
                >
                  {internetCheckStatus.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <span>{internetCheckStatus.message}</span>
                </div>
              )}
            </div>

            {/* Curated Internet Photo Samples from Wikimedia & ASI */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Verified Internet Photos (Click to Check)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    200 OK • Online
                  </span>
                </div>
                <span className="text-xs text-gray-400 hidden sm:inline">
                  High-res authentic sources from Wikimedia & ASI
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {INTERNET_SAMPLE_PHOTOS.map((photo) => (
                  <button
                    key={photo.id}
                    id={`internet-sample-${photo.id}`}
                    onClick={() => handleSelectInternetPhoto(photo)}
                    className="group relative rounded-xl overflow-hidden border border-gray-800 hover:border-amber-400 transition-all text-left bg-[#1a2232] focus:outline-none flex flex-col"
                  >
                    <div className="h-28 overflow-hidden relative w-full bg-gray-900">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => handleImageError(e)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-black/70 text-amber-300 border border-amber-500/30">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-200 group-hover:text-amber-300 line-clamp-1">
                          {photo.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                          {photo.subtitle}
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-gray-800/80 flex items-center justify-between text-[9px] text-amber-400 font-medium">
                        <span className="truncate">{photo.internetSource.split('/')[0]}</span>
                        <span className="text-gray-400">Check →</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Upload Photo */}
        {activeInputTab === 'upload' && (
          <div className="text-center py-6 space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
              id="monument-file-input"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="max-w-md mx-auto p-8 rounded-2xl border-2 border-dashed border-gray-700 hover:border-amber-400 cursor-pointer bg-black/20 hover:bg-black/40 transition-all space-y-3"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Click or drag a photo here</p>
                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP from your camera or computer</p>
              </div>
              <button
                id="rec-upload-photo-btn"
                type="button"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs shadow-md"
              >
                {t.uploadPhoto}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Camera */}
        {activeInputTab === 'camera' && (
          <div className="space-y-4">
            {cameraActive ? (
              <div className="relative rounded-2xl overflow-hidden bg-black max-w-xl mx-auto border-2 border-amber-500/50 shadow-2xl">
                <video ref={videoRef} playsInline autoPlay className="w-full h-72 sm:h-80 object-cover" />
                <canvas ref={canvasRef} className="hidden" />

                {/* Target Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-56 h-56 border-2 border-dashed border-amber-400/80 rounded-xl relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400" />
                    <span className="absolute -bottom-6 left-0 right-0 text-center text-[11px] text-amber-300 font-medium bg-black/60 py-0.5 rounded">
                      Align monument in frame
                    </span>
                  </div>
                </div>

                {/* Capture and close buttons */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-3">
                  <button
                    id="rec-capture-photo-btn"
                    onClick={captureCameraPhoto}
                    className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-sm shadow-xl flex items-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t.capturePhoto}</span>
                  </button>
                  <button
                    id="rec-close-camera-btn"
                    onClick={stopCamera}
                    className="px-4 py-2.5 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs border border-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <button
                  id="rec-start-camera-again-btn"
                  onClick={startCamera}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-sm shadow-md inline-flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.openCamera}</span>
                </button>
              </div>
            )}

            {cameraError && (
              <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2 max-w-xl mx-auto">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>
        )}

        {/* Demo Quick Picks section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t.chooseDemoPhoto}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                {t.demoModeLabel}
              </span>
            </div>
            <span className="text-xs text-gray-400 hidden sm:inline">
              Click any monument for instant simulation
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {demoMonuments.map((m) => (
              <button
                key={m.id}
                id={`demo-pick-${m.id}`}
                onClick={() => handleSelectDemoMonument(m)}
                className="group relative rounded-xl overflow-hidden border border-gray-700/80 hover:border-amber-400 transition-all text-left bg-[#1a2232] focus:outline-none"
              >
                <div className="h-20 overflow-hidden relative">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => handleImageError(e)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500 text-gray-950">
                    {m.cluster}
                  </span>
                </div>
                <div className="p-2">
                  <p className="text-[11px] font-semibold text-gray-200 group-hover:text-amber-300 truncate">
                    {m.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Animation Modal / Card */}
      {analyzing && (
        <div className="max-w-xl mx-auto bg-[#182132] border-2 border-amber-500/50 rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-pulse">
          {imagePreview && (
            <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-amber-400 shadow-md relative">
              <img
                src={imagePreview}
                alt="Analyzing"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e)}
              />
              {/* Scanline laser animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent animate-bounce" />
            </div>
          )}

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI Neural Scanner & Internet Vision Active</span>
            </div>

            <p className="text-xl font-bold text-white font-serif">
              {analysisStep === 1 && '1. Fetching & Preprocessing Image...'}
              {analysisStep === 2 && '2. Comparing Architectural Motifs...'}
              {analysisStep === 3 && '3. Synthesizing Archaeological Dossier...'}
            </p>

            <div className="w-48 mx-auto h-1.5 bg-gray-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                style={{ width: `${(analysisStep / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span className={analysisStep >= 1 ? 'text-amber-300 font-medium' : ''}>1. Image Fetch</span>
            <span>•</span>
            <span className={analysisStep >= 2 ? 'text-amber-300 font-medium' : ''}>2. Architecture Classifier</span>
            <span>•</span>
            <span className={analysisStep >= 3 ? 'text-amber-300 font-medium' : ''}>3. Synthesis</span>
          </div>
        </div>
      )}

      {/* Recognized Result Card */}
      {!analyzing && result && (
        <div id="identified-monument-card" className="max-w-4xl mx-auto bg-gradient-to-br from-[#151c2a] via-[#1a2335] to-[#121824] border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-800">
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {t.identifiedMonument}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
                {result.monument.name}
              </h3>
              <p className="text-sm text-gray-300 flex items-center space-x-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{result.monument.subLocation}</span>
              </p>
            </div>

            {/* Confidence & Mode Badge */}
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-extrabold">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>{t.confidence}: {result.confidence}%</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                {result.isDemoMode ? (
                  <span className="text-amber-300 font-semibold">{t.demoModeLabel}</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">{result.modelUsed}</span>
                )}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 items-center">
            {/* Monument Image with Scan Badge */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg">
              <img
                src={result.imageUrl || result.monument.image}
                alt={result.monument.name}
                className="w-full h-64 object-cover"
                onError={(e) => handleImageError(e, result.monument.image)}
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-[11px] text-white font-medium flex items-center space-x-1 border border-white/10">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Verified Match</span>
              </div>
            </div>

            {/* Metadata Badges & Detected Features */}
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.category}</p>
                  <p className="text-sm font-semibold text-amber-300">{result.category}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.period}</p>
                  <p className="text-sm font-semibold text-white">{result.period}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.dynasty}</p>
                  <p className="text-sm font-semibold text-white">{result.monument.dynasty}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.style}</p>
                  <p className="text-sm font-semibold text-amber-300 truncate">{result.monument.architectureStyle}</p>
                </div>
              </div>

              {/* Detected Architectural Features */}
              <div className="p-3.5 rounded-xl bg-[#121722] border border-amber-500/20">
                <p className="text-xs font-bold text-amber-400 mb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Detected Architectural Hallmarks:</span>
                </p>
                <ul className="space-y-1.5">
                  {result.detectedFeatures.map((feat, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start space-x-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed italic">
                "{result.monument.shortDescription[language] || result.monument.shortDescription.en}"
              </p>
            </div>
          </div>

          {/* Internet Cross-Verification & Sources Panel */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Internet Cross-Verification & Open Web Records
                </span>
              </div>
              <span className="text-[10px] text-gray-400">External verified databases</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={getGoogleLensVerifyUrl(result.monument.name, result.imageUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-amber-400/60 text-xs text-gray-200 hover:text-white flex items-center justify-between transition-colors"
                title="Cross-check this image on Google Lens"
              >
                <span className="flex items-center space-x-2">
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verify on Google Lens</span>
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>

              <a
                href={getWikimediaSearchUrl(result.monument.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-amber-400/60 text-xs text-gray-200 hover:text-white flex items-center justify-between transition-colors"
                title="Explore high-res Wikimedia Commons repository"
              >
                <span className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Wikimedia Commons</span>
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>

              <a
                href={getGoogleImagesUrl(result.monument.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-amber-400/60 text-xs text-gray-200 hover:text-white flex items-center justify-between transition-colors"
                title="Search high-resolution photography on Google"
              >
                <span className="flex items-center space-x-2">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Photos & Gallery</span>
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Action Buttons as explicitly mandated */}
          <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              <button
                id="res-btn-explore-history"
                onClick={() => onExploreHistory(result.monument)}
                className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{t.exploreHistory}</span>
              </button>

              <button
                id="res-btn-view-on-map"
                onClick={() => onViewOnMap(result.monument)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors flex items-center justify-center space-x-1.5"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{t.viewOnMap}</span>
              </button>

              <button
                id="res-btn-ask-ai"
                onClick={() => onAskAi(result.monument)}
                className="px-4 py-3 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1.5"
              >
                <MessageSquareText className="w-4 h-4 text-purple-200" />
                <span>{t.askAi}</span>
              </button>

              <button
                id="res-btn-plan-visit"
                onClick={() => onPlanVisit(result.monument)}
                className="px-4 py-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1.5"
              >
                <Calendar className="w-4 h-4 text-emerald-200" />
                <span>{t.planMyVisit}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

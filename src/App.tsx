import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Check, X, 
  CheckCircle2, MessageSquare,
  MapPin, ShieldCheck,
  SlidersHorizontal, Menu
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import confetti from 'canvas-confetti';

function InstagramIcon({ className = "w-4 h-4 text-[#E1306C]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

// SLIDER INTERACTIVO DE COMPARATIVA BRACKETS VS INVISALIGN
function InteractiveBeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Contenedor del Slider */}
      <div 
        ref={containerRef}
        onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[340px] sm:h-[440px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#CBDDE9] select-none cursor-ew-resize bg-slate-900"
      >
        {/* Lado Derecho (Invisalign - Fondo completo) */}
        <div className="absolute inset-0">
          <img 
            src="/assets/brackets-vs-invisalign.png" 
            alt="Dientes con Alineadores Transparentes Invisalign" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 right-4 bg-[#1C3646]/90 backdrop-blur-md text-[#81C5F0] border border-[#549BBD]/40 px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Invisalign® Transparente</span>
          </div>
        </div>

        {/* Lado Izquierdo (Brackets - Recortado dinámicamente) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="w-full h-full relative" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
            <img 
              src="/assets/brackets-vs-invisalign.png" 
              alt="Dientes con Brackets Tradicionales" 
              className="w-full h-full object-cover object-center max-w-none"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%', height: '100%' }}
            />
          </div>
          <div className="absolute top-4 left-4 bg-[#1C3646]/90 backdrop-blur-md text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Brackets Tradicionales</span>
          </div>
        </div>

        {/* Línea Divisoria y Manija Central */}
        <div 
          className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center -ml-5 w-10 z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-1 h-full bg-white shadow-lg"></div>
          <div className="absolute w-10 h-10 rounded-full bg-white text-[#1C3646] shadow-2xl border-2 border-[#549BBD] flex items-center justify-center font-bold text-xs pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <SlidersHorizontal className="w-4 h-4 text-[#549BBD]" />
          </div>
        </div>

        {/* Indicador de ayuda inferior */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
          <div className="bg-[#1C3646]/80 backdrop-blur-md text-white/90 text-[11px] font-mono px-3.5 py-1 rounded-full border border-white/10 shadow-sm flex items-center gap-2">
            <span>⇄ Deslizá el cursor para comparar en tiempo real</span>
          </div>
        </div>
      </div>

      {/* Botones de Selección Rápida */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => setSliderPos(15)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            sliderPos < 35 
              ? 'bg-[#1C3646] text-white shadow-sm ring-2 ring-[#549BBD]' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Ver Brackets (Metálicos)
        </button>
        <button
          type="button"
          onClick={() => setSliderPos(50)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            sliderPos >= 35 && sliderPos <= 65 
              ? 'bg-[#549BBD] text-white shadow-sm ring-2 ring-[#81C5F0]' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Comparativa 50 / 50
        </button>
        <button
          type="button"
          onClick={() => setSliderPos(85)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            sliderPos > 65 
              ? 'bg-[#1C3646] text-white shadow-sm ring-2 ring-[#549BBD]' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Ver Invisalign (Invisible)
        </button>
      </div>
    </div>
  );
}

export function App() {
  // PANTALLA DE PRESENTACIÓN / INTRODUCING SCREEN
  const [showIntro, setShowIntro] = useState(true);
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIntroProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowIntro(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  // Filtro de Pre-Calificación
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState('Dientes apiñados o montados');
  const [previousBrackets, setPreviousBrackets] = useState('No, nunca usé brackets');
  const [urgency, setUrgency] = useState('Lo antes posible (este mes)');
  const [patientName, setPatientName] = useState('');
  const [isQualified, setIsQualified] = useState(false);

  // Barra de progreso de lectura al scrollear
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));
      setScrolled(totalScroll > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFinishQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQualified(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hola Dr. Máximo Rabovich / Equipo Dental Perfection.\n` +
      `Completé la Ficha de Valoración de Invisalign en la web:\n\n` +
      `• Paciente: ${patientName || 'Interesado'}\n` +
      `• Caso a corregir: ${issue}\n` +
      `• Tratamiento previo: ${previousBrackets}\n` +
      `• Deseo de inicio: ${urgency}\n\n` +
      `Quisiera agendar una consulta en Las Heras 3053 para realizar el escaneo digital 3D y conocer el plan de tratamiento con alineadores.`
    );
    return `https://wa.me/5491131329477?text=${text}`;
  };

  // Variantes de animación para scroll suave y elegante
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] text-[#2D3940] font-sans selection:bg-[#549BBD] selection:text-white pb-24 md:pb-0 overflow-x-hidden">
      
      {/* 0. PANTALLA DE PRESENTACIÓN / INTRO SCREEN ELEGANTE */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 bg-[#142632] flex flex-col items-center justify-center p-6 text-white overflow-hidden"
          >
            {/* Resplandor radial de fondo */}
            <div className="absolute w-[500px] h-[500px] bg-[#549BBD]/20 rounded-full blur-3xl pointer-events-none"></div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md w-full"
            >
              {/* Logo Oficial de la Clínica con resplandor suave */}
              <div className="relative flex flex-col items-center">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#1C3646]/80 border border-[#549BBD]/40 shadow-2xl backdrop-blur-md">
                  <img 
                    src="/assets/dentalperfection_logo_white.svg" 
                    alt="Dental Perfection - Clínica Odontológica" 
                    className="h-12 sm:h-14 w-auto object-contain animate-pulse"
                  />
                </div>
              </div>

              {/* Subtítulo médico oficial */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#81C5F0] uppercase font-bold block">
                  Ortodoncia Invisible · Invisalign® Provider
                </span>
                <p className="text-xs text-[#CBDDE9] font-mono">
                  Dr. Máximo Rabovich · Buenos Aires, Argentina
                </p>
              </div>

              {/* Barra de progreso interactiva */}
              <div className="w-full space-y-2 pt-2">
                <div className="h-1.5 w-full bg-[#1C3646] rounded-full overflow-hidden border border-[#2C4E63]">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#549BBD] via-[#81C5F0] to-[#549BBD]"
                    style={{ width: `${introProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  ></motion.div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-[#81C5F0]">
                  <span>Invisalign® Platinum Clinic</span>
                  <span>{Math.min(100, introProgress)}%</span>
                </div>
              </div>

              {/* Botón rápido para saltar si lo desea */}
              <button
                type="button"
                onClick={() => setShowIntro(false)}
                className="text-[11px] font-mono text-[#7A9EB2] hover:text-white transition-colors pt-2 underline underline-offset-4"
              >
                Entrar al sitio →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BARRA DE PROGRESO DE SCROLL EN TIEMPO REAL */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#549BBD] via-[#81C5F0] to-[#549BBD] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1C3646] text-[#81C5F0] py-2 px-4 text-xs font-medium border-b border-[#2C4E63]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#81C5F0] shrink-0 animate-ping"></span>
            <span className="text-white">Clínica Especializada en Ortodoncia Invisible Invisalign® · <strong className="text-[#81C5F0]">Dr. Máximo Rabovich</strong></span>
          </div>
          <div className="font-mono text-[11px] text-[#A6C9DC] flex items-center gap-3">
            <span>Av. Las Heras 3053, Palermo, CABA</span>
            <span>•</span>
            <span className="text-white">Lu a Vi 09:00 - 20:00</span>
          </div>
        </div>
      </div>

      {/* NAVBAR STICKY CON EFECTO DE ELEVACIÓN DINÁMICO */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4'
      } border-b border-[#D8E6F0]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/assets/dentalperfection_logo_horizontal.svg" 
              alt="Dental Perfection" 
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* MENÚ DE ESCRITORIO */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#4E4E4E]">
            <a href="#que-es" className="hover:text-[#549BBD] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#549BBD] hover:after:w-full after:transition-all">¿Qué es Invisalign?</a>
            <a href="#kit" className="hover:text-[#549BBD] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#549BBD] hover:after:w-full after:transition-all">El Kit Oficial</a>
            <a href="#comparativa" className="hover:text-[#549BBD] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#549BBD] hover:after:w-full after:transition-all">Invisalign vs Brackets</a>
            <a href="#proceso" className="hover:text-[#549BBD] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#549BBD] hover:after:w-full after:transition-all">Cómo Funciona</a>
            <a href="#doctor" className="hover:text-[#549BBD] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#549BBD] hover:after:w-full after:transition-all">Dr. Rabovich & Ubicación</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href="#evaluador" 
              className="hidden sm:inline-flex items-center gap-2 bg-[#549BBD] hover:bg-[#3F7C9A] active:scale-95 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <span>Evaluar Caso</span>
              <ArrowRight className="w-4 h-4 text-[#C2E4F8]" />
            </a>

            {/* BOTÓN HAMBURGUESA PARA CELULAR (3 RAYITAS) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white border border-[#CBDDE9] text-[#1C3646] hover:bg-[#F4F8FB] active:scale-95 transition-all shadow-xs flex items-center justify-center focus:outline-none"
              aria-label="Abrir Menú de Navegación"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1C3646]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1C3646]" />
              )}
            </button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL (DRAWER) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-[#CBDDE9] bg-white/98 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-5 py-6 space-y-5">
                
                {/* Enlaces de secciones */}
                <div className="space-y-1 font-display font-bold text-base text-[#1A3342]">
                  <a 
                    href="#que-es" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EBF5FB] transition-colors"
                  >
                    <span>¿Qué es Invisalign?</span>
                    <span className="text-xs font-mono text-[#549BBD]">01</span>
                  </a>
                  <a 
                    href="#kit" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EBF5FB] transition-colors"
                  >
                    <span>El Kit Oficial de Alineadores</span>
                    <span className="text-xs font-mono text-[#549BBD]">02</span>
                  </a>
                  <a 
                    href="#comparativa" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EBF5FB] transition-colors"
                  >
                    <span>Invisalign vs Brackets (Comparador)</span>
                    <span className="text-xs font-mono text-[#549BBD]">03</span>
                  </a>
                  <a 
                    href="#proceso" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EBF5FB] transition-colors"
                  >
                    <span>Cómo Inicia Tu Tratamiento</span>
                    <span className="text-xs font-mono text-[#549BBD]">04</span>
                  </a>
                  <a 
                    href="#doctor" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EBF5FB] transition-colors"
                  >
                    <span>Dr. Máximo Rabovich & Consultorio</span>
                    <span className="text-xs font-mono text-[#549BBD]">05</span>
                  </a>
                </div>

                {/* Acciones directas en Celular */}
                <div className="pt-2 border-t border-[#CBDDE9] space-y-2.5">
                  <a 
                    href="#evaluador" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#549BBD] active:scale-95 text-white font-bold text-sm py-3.5 rounded-xl shadow-md"
                  >
                    <span>Hacer Test Diagnóstico (40s)</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono font-bold">
                    <a 
                      href="https://wa.me/5491131329477?text=Hola%20Dr.%20Rabovich%2C%20quisiera%20consultar%20por%20un%20turno%20en%20Las%20Heras%203053"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-[#25D366] text-white shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/dentalperfectionba/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-white border border-[#CBDDE9] text-[#1A3342] shadow-xs"
                    >
                      <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                      <span>Instagram</span>
                    </a>
                  </div>

                  <div className="text-[11px] font-mono text-[#5C788A] text-center pt-1">
                    📍 Av. Las Heras 3053, Palermo / Recoleta, CABA
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION CON MOTION Y PARALLAX SUTIL */}
      <section className="relative pt-8 pb-16 md:pt-20 md:pb-28 px-4 sm:px-8 bg-gradient-to-b from-[#EBF5FB] via-[#DFEEF7] to-[#F4F8FB] border-b border-[#CBDDE9] overflow-hidden">
        
        {/* Círculos decorativos de fondo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#81C5F0]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-[#549BBD]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
            >
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#B8D7E8] text-xs font-bold text-[#549BBD] shadow-xs hover:border-[#549BBD] transition-colors">
                <img src="/assets/dentalperfection_isologo.svg" alt="Isologo" className="w-4 h-4" />
                <span>PIONEROS EN ORTODONCIA DIGITAL EN BUENOS AIRES</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[4rem] font-black tracking-tight text-[#1A3342] leading-[1.05]">
                Tu sonrisa perfecta. <br />
                <span className="text-[#549BBD]">Sin brackets,</span> sin dolor, <br />
                100% invisible.
              </h1>

              <p className="text-base sm:text-lg text-[#4A6475] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Con Invisalign®, todo encaja a la perfección. Corregimos tu mordida con alineadores transparentes de autor, planificados por el <strong>Dr. Máximo Rabovich</strong> en Recoleta / Palermo.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                <a 
                  href="#evaluador" 
                  className="inline-flex items-center justify-center gap-2.5 bg-[#549BBD] hover:bg-[#3F7C9A] active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Hacer Test de Compatibilidad</span>
                  <ArrowRight className="w-4 h-4 text-[#C2E4F8]" />
                </a>
                <a 
                  href="#comparativa" 
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F7FB] text-[#1A3342] border border-[#B8D7E8] font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-xs hover:border-[#549BBD]"
                >
                  <span>Ver Comparativa Interactiva</span>
                </a>
              </div>

              {/* 3 Pilares con Micro-interacción al pasar el mouse */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#CBDDE9] text-left">
                <motion.div 
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-3.5 rounded-xl bg-white border border-[#CBDDE9] shadow-xs hover:border-[#549BBD] transition-colors"
                >
                  <span className="font-display text-lg sm:text-xl font-black text-[#549BBD] block">+ Cómodos</span>
                  <span className="text-xs text-[#5C788A]">Removibles para comer y cepillarte con libertad</span>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-3.5 rounded-xl bg-white border border-[#CBDDE9] shadow-xs hover:border-[#549BBD] transition-colors"
                >
                  <span className="font-display text-lg sm:text-xl font-black text-[#549BBD] block">+ Efectivos</span>
                  <span className="text-xs text-[#5C788A]">Fuerzas biológicas suaves semana a semana</span>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-3.5 rounded-xl bg-white border border-[#CBDDE9] shadow-xs hover:border-[#549BBD] transition-colors"
                >
                  <span className="font-display text-lg sm:text-xl font-black text-[#549BBD] block">+ Respaldo</span>
                  <span className="text-xs text-[#5C788A]">Dr. Máximo Rabovich: Categoría Platinum</span>
                </motion.div>
              </div>

            </motion.div>

            {/* FOTO HERO OFICIAL CON EFECTO DE SOMBRA ELEGANTE */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#81C5F0] bg-white shadow-xl p-2.5 sm:p-3 group">
                <img 
                  src="/assets/Invisalign-Buenos-Aires.jpg" 
                  alt="Alineador transparente Invisalign oficial" 
                  className="w-full h-[320px] sm:h-[420px] object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="mt-2.5 p-3 sm:p-4 rounded-xl bg-white border border-[#B8D7E8] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#549BBD] uppercase block">Material SmartTrack®</span>
                    <span className="text-[11px] sm:text-xs text-[#2D3940]">Placas transparentes a tu medida exacta</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#EBF5FB] text-[#549BBD] font-bold border border-[#81C5F0]/40 shrink-0">
                    100% Original
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. SECCIÓN: ¿QUÉ ES INVISALIGN? (CON SCROLL REVEAL) */}
      <section id="que-es" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#549BBD] font-bold">
            El Producto
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#1A3342]">
            ¿Qué es exactamente Invisalign®?
          </h2>
          <p className="text-sm sm:text-base text-[#5C788A] leading-relaxed">
            Invisalign es la alternativa transparente y predecible a los aparatos fijos metálicos. Consiste en una serie de placas transparentes personalizadas que mueven tus dientes de forma gradual hasta la posición planificada por el Dr. Rabovich.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[
            {
              num: '01 / TECNOLOGÍA DIGITAL',
              title: 'Escaneo 3D Sin Pastas',
              desc: 'En tu primera consulta en Las Heras 3053 digitalizamos tu boca en 5 minutos con el escáner intraoral. Chau náuseas con cubetas de alginato.'
            },
            {
              num: '02 / SERIE PERSONALIZADA',
              title: 'Alineadores Numerados',
              desc: 'Recibís tus alineadores transparentes a medida. Cada placa ejerce una fuerza suave y precisa durante 1 a 2 semanas antes del recambio.'
            },
            {
              num: '03 / RESULTADO PERMANENTE',
              title: 'Retenedores Vivera®',
              desc: 'Una vez lograda la alineación perfecta, sellamos el resultado con contenciones nocturnas para proteger tu inversión de por vida.'
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#CBDDE9] space-y-3 shadow-xs hover:border-[#549BBD] hover:shadow-md transition-all"
            >
              <span className="text-xs font-mono font-bold text-[#549BBD] block">{item.num}</span>
              <h3 className="font-display text-lg font-bold text-[#1A3342]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C788A] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECCIÓN DEL KIT OFICIAL: FOTO REAL DE CAJA-INVISALIGN */}
      <section id="kit" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#EBF5FB] border-y border-[#CBDDE9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeIn}
              className="lg:col-span-6 space-y-4 sm:space-y-5"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#549BBD] font-bold">
                Tu Set de Alineadores
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A3342]">
                El kit que recibís para tu tratamiento
              </h2>
              <p className="text-sm text-[#5C788A] leading-relaxed">
                En Dental Perfection te entregamos tu caja oficial Invisalign® con toda la serie de alineadores transparentes numerados, estuches magnéticos de protección y las instrucciones de uso para cada etapa.
              </p>

              <div className="space-y-2.5 pt-1 text-xs font-mono">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#B8D7E8]">
                  <Check className="w-4 h-4 text-[#549BBD] shrink-0" />
                  <span className="text-[#2D3940]">Serie completa de placas numeradas según el plan ClinCheck®</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#B8D7E8]">
                  <Check className="w-4 h-4 text-[#549BBD] shrink-0" />
                  <span className="text-[#2D3940]">Estuche oficial Invisalign para guardarlos mientras comés</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#B8D7E8]">
                  <Check className="w-4 h-4 text-[#549BBD] shrink-0" />
                  <span className="text-[#2D3940]">Controles presenciales periódicos con el Dr. Rabovich</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border-2 border-[#81C5F0] shadow-md max-w-sm sm:max-w-md w-full group">
                <img 
                  src="/assets/caja-invisalign.png" 
                  alt="Caja y kit original de alineadores Invisalign" 
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* COMPARATIVA DIRECTA CON SLIDER INTERACTIVO */}
      <section id="comparativa" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#549BBD] font-bold">
            Tratamientos
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Brackets vs Alineadores Transparentes
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Deslizá el control interactivo para ver la diferencia visual real entre ambos sistemas sobre la sonrisa.
          </p>
        </motion.div>

        {/* SLIDER INTERACTIVO DE COMPARATIVA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-12"
        >
          <InteractiveBeforeAfterSlider />
        </motion.div>

        {/* TARJETAS COMPARATIVAS DETALLADAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
          {/* 1. LADO BRACKETS */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col"
          >
            <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-bold text-xs sm:text-sm text-slate-800 font-display">Ortodoncia Tradicional</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px] font-mono font-bold">Brackets</span>
            </div>
            
            <div className="p-4 sm:p-6 bg-white space-y-3 flex-1 flex flex-col justify-center">
              <h4 className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider">Desventajas Frecuentes</h4>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Alambres y arcos metálicos que pinchan encías y generan llagas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Aparatos fijos que no se pueden remover para comer ni higienizarse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Urgencias frecuentes por brackets despegados o alambres sueltos.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* 2. LADO INVISALIGN */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#81C5F0] overflow-hidden shadow-md flex flex-col"
          >
            <div className="p-3.5 sm:p-4 bg-[#EBF5FB] border-b border-[#CBDDE9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-xs sm:text-sm text-[#1A3342] font-display">Alineadores Transparentes</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#549BBD] text-white text-[11px] font-mono font-bold">Invisalign®</span>
            </div>
            
            <div className="p-4 sm:p-6 bg-white space-y-3 flex-1 flex flex-col justify-center">
              <h4 className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">Ventajas Exclusivas</h4>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Totalmente invisibles:</strong> nadie nota que los llevás puestos durante el día.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Removibles en segundos:</strong> comé sin restricciones y cepillate con total comodidad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Material SmartTrack®:</strong> micro-movimientos suaves, sin dolor y predecibles.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. EVALUADOR DE CANDIDATURA (FILTRO DE PRECALIFICACIÓN) */}
      <section id="evaluador" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center space-y-2 mb-8 sm:mb-10"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#549BBD] font-bold">
              Pre-Calificación Diagnóstica
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Evaluá tu sonrisa antes de escribir a WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respondé 3 preguntas para recibir una valoración personalizada directa con el Dr. Máximo Rabovich.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#81C5F0] p-5 sm:p-9 shadow-lg"
          >
            {!isQualified ? (
              <div className="space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#CBDDE9]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#549BBD] text-white flex items-center justify-center text-xs font-bold font-mono">
                      {step}
                    </span>
                    <span className="text-xs font-mono uppercase font-bold text-[#1A3342]">
                      Paso {step} de 3
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#549BBD]">40 segundos</span>
                </div>

                {/* PASO 1 */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#1A3342]">
                      1. ¿Qué te gustaría corregir de tus dientes?
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { title: 'Dientes apiñados o montados', note: 'Falta de espacio en arcadas' },
                        { title: 'Espacios o diastemas', note: 'Separación entre dientes' },
                        { title: 'Mordida profunda o abierta', note: 'Incomodidad al masticar' },
                        { title: 'Estética y alineación general', note: 'Perfeccionar detalles de la sonrisa' },
                      ].map((item) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setIssue(item.title)}
                          className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] ${
                            issue === item.title 
                              ? 'border-[#549BBD] bg-[#EBF5FB] ring-1 ring-[#549BBD]' 
                              : 'border-[#CBDDE9] hover:border-[#81C5F0] bg-white'
                          }`}
                        >
                          <div className="font-semibold text-xs sm:text-sm text-[#1A3342] flex items-center justify-between">
                            <span>{item.title}</span>
                            {issue === item.title && <CheckCircle2 className="w-4 h-4 text-[#549BBD]" />}
                          </div>
                          <span className="text-[11px] text-[#5C788A] block mt-0.5">{item.note}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 bg-[#549BBD] hover:bg-[#3F7C9A] active:scale-95 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-all"
                      >
                        <span>Siguiente Paso</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* PASO 2 */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#1A3342]">
                      2. ¿Tuviste ortodoncia convencional (brackets) en el pasado?
                    </h3>
                    
                    <div className="space-y-2.5">
                      {[
                        { title: 'No, nunca usé brackets', desc: 'Sería mi primer tratamiento ortodóncico.' },
                        { title: 'Sí, pero se me movieron los dientes (Recidiva)', desc: 'Usé brackets antes y volvieron a desalinearse.' },
                        { title: 'Uso brackets actualmente', desc: 'Deseo retirarlos y continuar con alineadores invisibles.' },
                      ].map((item) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setPreviousBrackets(item.title)}
                          className={`w-full p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] ${
                            previousBrackets === item.title 
                              ? 'border-[#549BBD] bg-[#EBF5FB] ring-1 ring-[#549BBD]' 
                              : 'border-[#CBDDE9] hover:border-[#81C5F0] bg-white'
                          }`}
                        >
                          <div className="font-semibold text-xs sm:text-sm text-[#1A3342]">{item.title}</div>
                          <span className="text-[11px] text-[#5C788A] block mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-mono text-[#5C788A] hover:text-[#1A3342]"
                      >
                        ← Volver
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 bg-[#549BBD] hover:bg-[#3F7C9A] active:scale-95 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-all"
                      >
                        <span>Siguiente Paso</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* PASO 3 */}
                {step === 3 && (
                  <form onSubmit={handleFinishQuiz} className="space-y-4">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#1A3342]">
                      3. ¿Cuándo te gustaría comenzar tu tratamiento?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { title: 'Lo antes posible', desc: 'Este mes' },
                        { title: 'En 30 a 60 días', desc: 'Evaluando tiempos' },
                        { title: 'Solo me informo', desc: 'Conocer costos' },
                      ].map((item) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setUrgency(item.title)}
                          className={`p-3 rounded-xl text-left border transition-all active:scale-[0.98] ${
                            urgency === item.title 
                              ? 'border-[#549BBD] bg-[#EBF5FB] ring-1 ring-[#549BBD]' 
                              : 'border-[#CBDDE9] hover:border-[#81C5F0] bg-white'
                          }`}
                        >
                          <div className="font-semibold text-xs text-[#1A3342]">{item.title}</div>
                          <span className="text-[10px] text-[#5C788A] block mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="text-xs font-mono uppercase text-[#4E4E4E] font-bold block mb-1">
                        Tu Nombre Completo:
                      </label>
                      <input 
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Ej: Sofía Gómez"
                        className="w-full px-4 py-3 rounded-xl border border-[#CBDDE9] bg-white text-sm text-[#1A3342] focus:outline-none focus:border-[#549BBD]"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-mono text-[#5C788A] hover:text-[#1A3342]"
                      >
                        ← Volver
                      </button>
                      <button
                        type="submit"
                        disabled={!patientName}
                        className="inline-flex items-center gap-2 bg-[#549BBD] hover:bg-[#3F7C9A] active:scale-95 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all shadow-sm"
                      >
                        <span>Ver Compatibilidad</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

              </div>
            ) : (
              /* RESULTADO */
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 bg-[#EBF5FB] text-[#549BBD] rounded-full flex items-center justify-center mx-auto border border-[#81C5F0]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase font-bold text-[#549BBD]">
                    CASO APTO PARA INVISALIGN®
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1A3342]">
                    ¡Ficha lista, {patientName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C788A] max-w-md mx-auto">
                    Tu situación de <strong>"{issue}"</strong> aplica para alineadores transparentes sin brackets.
                  </p>
                </div>

                {/* Resumen Ficha */}
                <div className="bg-[#EBF5FB] border border-[#CBDDE9] rounded-xl p-3.5 text-left max-w-sm mx-auto space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[#5C788A] pb-1 border-b border-[#CBDDE9]">
                    <span>PACIENTE:</span>
                    <span className="text-[#1A3342] font-bold">{patientName}</span>
                  </div>
                  <div className="flex justify-between text-[#5C788A] pb-1 border-b border-[#CBDDE9]">
                    <span>MOTIVO:</span>
                    <span className="text-[#1A3342]">{issue}</span>
                  </div>
                  <div className="flex justify-between text-[#5C788A]">
                    <span>INICIO:</span>
                    <span className="text-[#549BBD] font-bold">{urgency}</span>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="pt-2">
                  <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all w-full sm:w-auto"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Enviar Ficha por WhatsApp</span>
                  </a>
                  <p className="text-[11px] font-mono text-[#5C788A] mt-2">
                    Consultorio Las Heras 3053, Palermo, CABA.
                  </p>
                </div>

                <div>
                  <button 
                    onClick={() => { setIsQualified(false); setStep(1); }}
                    className="text-xs font-mono text-[#5C788A] hover:text-[#549BBD] underline"
                  >
                    Reiniciar Test
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* 5. CÓMO INICIA TU TRATAMIENTO: 4 PASOS */}
      <section id="proceso" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center space-y-3 mb-12 sm:mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#549BBD] font-bold">
            El Recorrido
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#1A3342]">
            Cómo inicia tu tratamiento en Dental Perfection
          </h2>
          <p className="text-sm text-[#5C788A] max-w-xl mx-auto">
            Proceso 100% digital, transparente y ordenado.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            {
              step: '01',
              title: 'Consulta y Escaneo 3D',
              desc: 'En Las Heras 3053 escaneamos tus dientes con tecnología intraoral. Visualizás la simulación de tu sonrisa final en pantalla.'
            },
            {
              step: '02',
              title: 'Plan ClinCheck® de Autor',
              desc: 'El Dr. Rabovich diseña de forma digital la biomecánica y cantidad exacta de alineadores que necesita tu caso.'
            },
            {
              step: '03',
              title: 'Entrega de Alineadores',
              desc: 'Recibís tu set de placas transparentes en su caja oficial. Te las cambiás cada 1-2 semanas y vivís tu tratamiento sin restricciones.'
            },
            {
              step: '04',
              title: 'Retenedores y Mantenimiento',
              desc: 'Alcanzada la alineación perfecta, sellamos el resultado con contenciones Vivera para proteger tu inversión de por vida.'
            }
          ].map((item) => (
            <motion.div 
              key={item.step} 
              variants={fadeIn}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#CBDDE9] space-y-2.5 shadow-xs hover:border-[#549BBD] hover:shadow-md transition-all"
            >
              <span className="font-display text-2xl font-black text-[#549BBD] block">
                {item.step}
              </span>
              <h3 className="font-display text-base font-bold text-[#1A3342]">
                {item.title}
              </h3>
              <p className="text-xs text-[#5C788A] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. DR. MÁXIMO RABOVICH & DIRECCIÓN DE LA CLÍNICA */}
      <section id="doctor" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* FOTO REAL HD DEL DOCTOR DE LA CLÍNICA */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg group">
                <img 
                  src="/assets/doctor-maximo-rabovich.jpg" 
                  alt="Dr. Máximo Rabovich - Director de Dental Perfection" 
                  className="w-full h-[380px] sm:h-[480px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badge superpuesto en la foto */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1C3646]/95 via-[#1C3646]/70 to-transparent p-5 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#549BBD] text-[11px] font-mono font-bold tracking-wide uppercase mb-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Invisalign® Platinum Provider</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Dr. Máximo Rabovich</h3>
                  <p className="text-xs text-[#CBDDE9]">Titular y Especialista en Ortodoncia Digital</p>
                </div>
              </div>
            </motion.div>

            {/* INFORMACIÓN Y DIRECCIÓN DEL CONSULTORIO */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#549BBD] font-bold">
                  Dirección Médica & Consultorio
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#1A3342]">
                  Dr. Máximo Rabovich
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#549BBD] font-bold">
                  Pionero en Ortodoncia Digital Invisalign® en Buenos Aires
                </p>
              </div>

              <p className="text-sm text-[#4A6475] leading-relaxed">
                Titular de <strong>Dental Perfection</strong> en Palermo / Recoleta. Con más de una década de experiencia exclusiva en la tecnología de alineadores, el Dr. Rabovich diseña de forma personalizada cada caso para devolver a los pacientes la seguridad de una sonrisa sana y alineada sin brackets metálicos.
              </p>

              {/* TARJETA DE DIRECCIÓN Y CONTACTO DESTACADA */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#CBDDE9] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#CBDDE9] pb-3.5">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/assets/dentalperfection_logo_horizontal.svg" 
                      alt="Dental Perfection" 
                      className="h-8 sm:h-9 w-auto object-contain"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5FB] border border-[#CBDDE9] text-xs font-mono font-bold text-[#549BBD] self-start sm:self-auto">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Palermo / Recoleta, CABA</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#2D3940]">
                  <div className="p-3 rounded-xl bg-[#F4F8FB] border border-[#D8E6F0] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#5C788A] block">Dirección</span>
                    <div className="font-bold text-[#1A3342] text-sm">Av. Las Heras 3053</div>
                    <div className="text-[11px] text-[#5C788A]">Planta Baja "A" · CABA, Argentina</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F4F8FB] border border-[#D8E6F0] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#5C788A] block">Horarios</span>
                    <div className="font-bold text-[#1A3342] text-sm">Lunes a Viernes</div>
                    <div className="text-[11px] text-[#5C788A]">09:00 a 20:00 hs</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F4F8FB] border border-[#D8E6F0] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#5C788A] block">WhatsApp / Teléfono</span>
                    <div className="font-bold text-[#1A3342] text-sm">+54 9 11 3132-9477</div>
                    <div className="text-[11px] text-[#5C788A]">Tel: (011) 4802-9189</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F4F8FB] border border-[#D8E6F0] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#5C788A] block">Instagram Oficial</span>
                    <div className="font-bold text-[#1A3342] text-sm">@dentalperfectionba</div>
                    <div className="text-[11px] text-[#5C788A]">Casos clínicos y novedades</div>
                  </div>
                </div>

                {/* BOTONES DE ACCIÓN RÁPIDA */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a 
                    href="https://maps.google.com/?q=Av.+Las+Heras+3053,+Buenos+Aires" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1C3646] hover:bg-[#2C4E63] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
                  >
                    <MapPin className="w-4 h-4 text-[#81C5F0]" />
                    <span>Cómo llegar en Google Maps</span>
                  </a>

                  <a 
                    href="https://www.instagram.com/dentalperfectionba/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-[#F4F8FB] text-[#1A3342] border border-[#CBDDE9] text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram @dentalperfectionba</span>
                  </a>

                  <a 
                    href="https://wa.me/5491131329477?text=Hola%20Dr.%20Rabovich%2C%20quisiera%20consultar%20por%20un%20turno%20en%20Las%20Heras%203053" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-xs sm:ml-auto"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Pedir Turno WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* FOOTER OFICIAL CON LOGO REAL */}
      <footer className="bg-[#1C3646] text-[#A6C9DC] py-12 sm:py-14 px-4 sm:px-8 border-t border-[#2C4E63]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <img 
              src="/assets/dentalperfection_logo_white.svg" 
              alt="Dental Perfection" 
              className="h-10 w-auto object-contain"
            />
            <p className="text-xs text-[#CBDDE9] max-w-sm leading-relaxed mt-2">
              Centro odontológico especializado en ortodoncia estética digital Invisalign®. A cargo de su titular Dr. Máximo Rabovich.
            </p>
            <p className="text-xs font-mono text-[#81C5F0]">
              Av. Las Heras 3053, PB "A", Palermo / Recoleta, Buenos Aires.
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <h4 className="font-mono uppercase text-white font-bold tracking-wider">Contacto</h4>
            <p>WhatsApp: +54 9 11 3132-9477</p>
            <p>Teléfono: (011) 4802 9189</p>
            <p>Email: info@dentalperfectionba.com</p>
            <p>
              <a 
                href="https://www.instagram.com/dentalperfectionba/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#81C5F0] hover:underline"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#81C5F0]" />
                <span>@dentalperfectionba</span>
              </a>
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <h4 className="font-mono uppercase text-white font-bold tracking-wider">Acceso Rápido</h4>
            <ul className="space-y-1.5 font-mono">
              <li>
                <a href="#evaluador" className="hover:text-[#81C5F0]">→ Test de Sonrisa</a>
              </li>
              <li>
                <a href="#kit" className="hover:text-[#81C5F0]">→ Kit de Alineadores</a>
              </li>
              <li>
                <a href="https://wa.me/5491131329477" target="_blank" rel="noreferrer" className="hover:text-[#81C5F0]">
                  → WhatsApp Directo
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Av.+Las+Heras+3053,+Buenos+Aires" target="_blank" rel="noreferrer" className="hover:text-[#81C5F0]">
                  → Ubicación Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#2C4E63] text-xs text-[#7A9EB2] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {new Date().getFullYear()} Dental Perfection. Todos los derechos reservados.</p>
          <p className="font-mono text-[11px]">Boceto interactivo diseñado por Aurex Studios.</p>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE / BARRA STICKY INFERIOR PARA MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#CBDDE9] z-40 md:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#1A3342]">Dental Perfection</span>
          <span className="text-[10px] text-[#549BBD] font-mono">Las Heras 3053</span>
        </div>
        <a
          href="#evaluador"
          className="inline-flex items-center gap-2 bg-[#549BBD] active:scale-95 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md"
        >
          <span>Hacer Test 40s</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* BOTÓN FLOTANTE DESKTOP */}
      <aside aria-label="Acceso rápido" className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href="#evaluador"
          className="flex items-center gap-2 bg-[#549BBD] hover:bg-[#3F7C9A] text-white px-5 py-3 rounded-full shadow-lg border border-white/20 transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-[#81C5F0] animate-ping"></span>
          <span className="text-xs font-bold">Test de Sonrisa</span>
          <ArrowRight className="w-4 h-4 text-[#C2E4F8]" />
        </a>
      </aside>

    </div>
  );
}
export default App;

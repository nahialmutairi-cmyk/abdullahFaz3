/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scale,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  Users,
  Award,
  ChevronDown,
  CheckCircle,
  Menu,
  X,
  Send,
  BookOpen,
  FileText,
  Shield,
  ArrowDown,
  ExternalLink,
  ChevronLeft
} from "lucide-react";

// Robust counter element triggering count-up upon intersection
function SafeCounter({ end, duration = 1500, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const startInstant = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startInstant;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad formula for smooth decelerating counter
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return (
    <div ref={elementRef} className="inline-block font-serif font-bold text-3xl sm:text-4xl text-[#E8C86A]">
      {count}
      {suffix}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Interactive consultation booking form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "القضايا المدنية والتجارية",
    message: ""
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Auto-remove loader on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Track scrolled position to upgrade navbar transparency to backdrop blur glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, subject, message } = formData;

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setFormError("يرجى تعبئة كافة الحقول للإرسال.");
      return;
    }

    setFormError("");
    setFormSuccess(true);

    // Format WhatsApp outbound message fully URL encoded
    const textMsg = `السلام عليكم ورحمة الله وبركاته،%0Aأود طلب استشارة قانونية من *المركز التنفيذي للمحاماة*:%0A%0A- *الاسم المستعلم:* ${encodeURIComponent(name)}%0A- *رقم هاتف التواصل:* ${encodeURIComponent(phone)}%0A- *الموضوع / الاختصاص:* ${encodeURIComponent(subject)}%0A- *شرح وتفاصيل الحالة عاجلاً:*%0A${encodeURIComponent(message)}`;

    const whatsappBaseUrl = `https://wa.me/96569333933?text=${textMsg}`;

    // Graceful temporary confirmation layout and launch
    setTimeout(() => {
      window.open(whatsappBaseUrl, "_blank");
      setFormSuccess(false);
      setFormData({ name: "", phone: "", subject: "القضايا المدنية والتجارية", message: "" });
    }, 1200);
  };

  // 6 Prestigious legal modules representation
  const servicesData = [
    {
      id: 1,
      title: "القضايا المدنية والتجارية",
      short: "تأمين المصالح التجارية وحل المنازعات المالية والشركات الفاخرة.",
      details: "دعم متمكن في صياغة مذكرات التأسيس، إدارة الاستحواذات، قضايا الاستثمار، التحصيل وضمان التعاقدات وفق القانون التجاري الكويتي لحماية الأرصدة والحد من المخاطر.",
      icon: <Scale className="w-6 h-6 text-[#C9A84C]" />
    },
    {
      id: 2,
      title: "قضايا الأحوال الشخصية",
      short: "خصوصية كاملة ورعاية تامة للمنزلة والعائلة وكافة المعاملات الشخصية.",
      details: "رعاية قضايا التركات وتوزيع الميراث الشرعي، الحضانة والولاية وصيانة الالتزامات ونفقة الأبناء، بوعي إنساني رفيع ومعايير سرية بالغة الشدة والوقار.",
      icon: <Users className="w-6 h-6 text-[#C9A84C]" />
    },
    {
      id: 3,
      title: "قضايا العمل والعمال",
      short: "تنظيم علاقات التوظيف وضمان الحقوق الكاملة لكلا الطرفين.",
      details: "معالجة المنازعات الناشئة عن عقود ومكافآت نهاية الخدمة والتعويضات عن الفصل التعسفي والتمثيل القانوني الرصين أمام الهيئة العامة للقوى العاملة ومحاكم الاستئناف.",
      icon: <BookOpen className="w-6 h-6 text-[#C9A84C]" />
    },
    {
      id: 4,
      title: "الاستشارات القانونية المسبقة",
      short: "رؤية استباقية تحول دون العقبات وتحمي حواضر ومستقبل أعمالك.",
      details: "إبداء المشورة الشفهية والمكتوبة بدراسات عتيدة متزنة تفصل في مستويات الخطر ونبل الفرص للكيانات الاستثمارية والعلاقات المدنية والتعاملات الحياتية المتكررة.",
      icon: <MessageSquare className="w-6 h-6 text-[#C9A84C]" />
    },
    {
      id: 5,
      title: "صياغة العقود والاتفاقيات",
      short: "مراجعة وتشييد العهود بلغة رصينة تغلق كافة الثغرات والالتباسات.",
      details: "إعداد وصياغة كافة الاتفاقيات التجارية، عقود العمل، الشراكات الدولية والخدمات، لرفع الثقة وضمان تطبيق كافة شروط المسؤولية في مواجهة أي خروقات مستقبلية.",
      icon: <FileText className="w-6 h-6 text-[#C9A84C]" />
    },
    {
      id: 6,
      title: "التحكيم وفض النزاعات بالصلح",
      short: "حلول سريعة ومرنة معتمدة وموفرة للجهد والوقت ومصاريف الفروع.",
      details: "فض النزاعات وتجنيب موكلينا الخوض في مسارات التقاضي الطويلة إن أمكن، عبر جلسات تحكيم فكرية منضبطة وبصفتنا محكمين معتمدين بكفاءة قانونية مشهودة.",
      icon: <Scale className="w-6 h-6 text-[#C9A84C]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-[#F4F4F0] relative selection:bg-[#C9A84C] selection:text-[#0A0A0E] overflow-x-hidden font-sans">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="loading-stage"
            className="fixed inset-0 bg-[#0A0A0E] z-50 flex flex-col items-center justify-center pointer-events-auto"
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          >
            <div className="flex flex-col items-center">
              {/* Luxury spinning diamonds and scale icon inside */}
              <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 w-20 h-20 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin"></div>
                <Scale className="w-8 h-8 text-[#C9A84C]" />
              </div>
              <h1 className="text-2xl font-serif text-[#C9A84C] font-bold tracking-wide">المركز التنفيذي للمحاماة</h1>
              <p className="text-[#8B9099] text-[11px] mt-2 tracking-[0.2em] uppercase">المحامي عبدالله فازع المطيري</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Pattern Background Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ 
             backgroundImage: "radial-gradient(#C9A84C 1px, transparent 1px)", 
             backgroundSize: "40px 40px" 
           }} 
      />

      {/* Hero golden light aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[40vh] pointer-events-none bg-gradient-to-b from-[#C9A84C]/10 to-transparent blur-[140px]" />

      {/* Navbar Container */}
      <nav id="app-nav" className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0A0A0E]/90 border-b border-[#C9A84C]/25 py-3.5 backdrop-blur-md shadow-2xl" 
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Title brand */}
            <a href="#hero-section" className="flex items-center gap-3 group">
              <div className="w-10 h-10 border border-[#C9A84C] flex items-center justify-center rotate-45 group-hover:border-[#E8C86A] transition-all duration-300">
                <Scale className="-rotate-45 w-5 h-5 text-[#C9A84C] group-hover:text-[#E8C86A]" />
              </div>
              <div className="flex flex-col text-right">
                <h1 className="text-xl font-serif font-bold tracking-tight text-[#C9A84C] group-hover:text-[#E8C86A] transition-colors leading-tight">
                  المركز التنفيذي
                </h1>
                <span className="text-[9px] text-[#8B9099] tracking-wider leading-none">
                  للمحاماة والاستشارات القانونية
                </span>
              </div>
            </a>

            {/* Middle Nav Items */}
            <div className="hidden md:flex items-center gap-8 text-sm tracking-wider">
              <a href="#hero-section" className="text-[#F4F4F0] hover:text-[#C9A84C] transition-colors">الرئيسية</a>
              <a href="#about-section" className="text-[#F4F4F0] hover:text-[#C9A84C] transition-colors">من نحن</a>
              <a href="#services-section" className="text-[#F4F4F0] hover:text-[#C9A84C] transition-colors">خدماتنا</a>
              <a href="#contact-section" className="text-[#F4F4F0] hover:text-[#C9A84C] transition-colors">تواصل معنا</a>
            </div>

            {/* Reach-Out Call of Action in Nav */}
            <div className="hidden md:block">
              <a 
                href="#consultation-card" 
                className="px-6 py-2.5 border border-[#C9A84C] text-[#C9A84C] text-xs font-semibold hover:bg-[#C9A84C] hover:text-[#0A0A0E] transition-all tracking-wider"
              >
                طلب استشارة
              </a>
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#C9A84C] hover:text-[#E8C86A] p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu pane */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A0A0E] border-b border-[#C9A84C]/25"
            >
              <div className="px-6 py-6 space-y-4">
                <a 
                  href="#hero-section" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block text-base text-[#F4F4F0] hover:text-[#C9A84C] transition-colors"
                >
                  الرئيسية
                </a>
                <a 
                  href="#about-section" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block text-base text-[#F4F4F0] hover:text-[#C9A84C] transition-colors"
                >
                  من نحن
                </a>
                <a 
                  href="#services-section" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block text-base text-[#F4F4F0] hover:text-[#C9A84C] transition-colors"
                >
                  خدماتنا
                </a>
                <a 
                  href="#contact-section" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block text-base text-[#F4F4F0] hover:text-[#C9A84C] transition-colors"
                >
                  تواصل معنا
                </a>
                <div className="pt-4 border-t border-[#C9A84C]/10">
                  <a 
                    href="#consultation-card" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-3 bg-[#C9A84C] text-[#0A0A0E] font-bold text-sm"
                  >
                    رقم التواصل: 69333933
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-[90vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-32 pb-16 overflow-hidden">
        {/* Deep dark abstract mesh layout */}
        <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <p className="text-[#8B9099] uppercase tracking-[0.25em] text-xs sm:text-sm">
            خبرة قانونية متميزة تتجاوز التوقعات
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif leading-tight sm:leading-tight md:leading-tight text-white mb-2">
            المركز <span className="text-[#C9A84C] inline-block relative">التنفيذي<span className="absolute bottom-1 left-0 right-0 h-[2px] bg-[#C9A84C]/40"></span></span>
            <br />
            للمحاماة والاستشارات القانونية
          </h1>

          {/* Underline */}
          <div className="flex justify-center py-2">
            <div className="w-24 h-[3px] bg-[#C9A84C] shadow-[0_0_15px_#C9A84C]" />
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-serif text-[#F4F4F0]/90 leading-relaxed max-w-2xl mx-auto pt-2">
            بإشراف وتوجيه المستشار القانوني المدرب
            <br />
            <span className="text-[#E8C86A] text-xl sm:text-2xl font-bold border-b border-[#C9A84C]/40 pb-0.5 inline-block mt-2">
              المحامي / عبدالله فازع المطيري
            </span>
          </p>

          <p className="text-sm sm:text-base text-[#8B9099] max-w-2xl mx-auto leading-relaxed">
            نكرس جل خبراتنا ومواردنا لحفظ مصالحكم وتدعيم مواقفكم بأسس تشريعية ثاقبة وقناعات نزيهة، مرخصين للدفاع والتقاضي بكافة درجاته في المحاكم الكويتية.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a 
              href="tel:69333933" 
              className="w-full sm:w-auto bg-[#C9A84C] text-[#0A0A0E] px-8 py-4 px-10 font-bold flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(201,168,76,0.5)] hover:bg-[#E8C86A] transition-all"
            >
              <Phone className="w-5 h-5 ml-2 rotate-y-180" />
              <span>اتصل بنا: 69333933</span>
            </a>
            <a
              href="#consultation-card"
              className="w-full sm:w-auto border border-[#C9A84C]/40 hover:border-[#C9A84C] px-8 py-4 font-bold flex items-center justify-center text-[#F4F4F0] hover:bg-white/5 transition-all"
            >
              احجز استشارتك الآن
            </a>
          </div>
        </div>

        {/* Scroll indicator bouncing arrow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
          <a href="#stats-strip" className="flex flex-col items-center gap-1.5 text-[#8B9099] hover:text-[#C9A84C] transition-colors">
            <span className="text-[10px] tracking-widest uppercase">شاهد الإحصاءات</span>
            <ChevronDown className="w-5 h-5 animate-bounce-slow" />
          </a>
        </div>
      </section>

      {/* Stats Counter Bar Section (Immersive Design Segment) */}
      <section id="stats-strip" className="relative min-h-24 bg-[#0D0D15] border-y border-[#C9A84C]/30 flex flex-col md:flex-row items-center justify-around py-8 md:py-0 px-6 sm:px-12 gap-8 md:gap-0 z-10">
        <div className="text-center">
          <SafeCounter end={500} suffix="+" />
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8B9099] mt-1">قضية ناجحة ومطالبة ربح</div>
        </div>
        <div className="hidden md:block w-px h-10 bg-[#C9A84C]/25" />
        <div className="text-center">
          <SafeCounter end={15} suffix="+" />
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8B9099] mt-1">سنة من العطاء القانوني المعتمد</div>
        </div>
        <div className="hidden md:block w-px h-10 bg-[#C9A84C]/25" />
        <div className="text-center">
          <SafeCounter end={1000} suffix="+" />
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8B9099] mt-1">موكل راضٍ ومتعاقد مستمر</div>
        </div>
        <div className="hidden md:block w-px h-10 bg-[#C9A84C]/25" />
        <div className="text-center">
          <SafeCounter end={98} suffix="%" />
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8B9099] mt-1">نسبة كسب ونجاح القضايا</div>
        </div>
      </section>

      {/* About Us (من نحن) */}
      <section id="about-section" className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm text-[#C9A84C] font-semibold tracking-wider uppercase">منظومة العدل والنزاهة</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">من هو المحامي عبدالله فازع المطيري؟</h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image / Graphic SVG Column (Right visual element) */}
            <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
              <div className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-[#12121A] to-[#0A0A0E] border border-[#C9A84C]/30 p-8 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#C9A84C]/5 group-hover:bg-[#C9A84C]/10 transition-colors duration-500 pointer-events-none" />
                
                {/* Embedded luxury glowing icon */}
                <svg className="w-48 h-48 text-[#C9A84C] transition-transform duration-700 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6"/>
                  <path d="M50 15 V82" stroke="#C9A84C" strokeWidth="2.5" />
                  <path d="M35 82 H65" stroke="#C9A84C" strokeWidth="3.5" />
                  <path d="M22 32 H78" stroke="#C9A84C" strokeWidth="2.5" />
                  <circle cx="50" cy="32" r="3" fill="#E8C86A" />

                  {/* Plates */}
                  <path d="M22 32 L14 55 M22 32 L30 55" stroke="#C8C8C8" strokeWidth="1" opacity="0.8" />
                  <path d="M12 55 C12 60, 32 60, 32 55 Z" fill="#C9A84C" opacity="0.9" />

                  <path d="M78 32 L70 55 M78 32 L86 55" stroke="#C8C8C8" strokeWidth="1" opacity="0.8" />
                  <path d="M68 55 C68 60, 88 60, 88 55 Z" fill="#C9A84C" opacity="0.9" />
                </svg>

                {/* Corner legal frame lines */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#C9A84C]" />
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#C9A84C]" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#C9A84C]" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#C9A84C]" />

                <span className="text-xs text-[#8B9099] font-mono mt-4">شعار الريادة والعدالة</span>
              </div>
            </div>

            {/* Text Column (Left detailed article) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8C86A] font-serif leading-relaxed">
                رؤية تنبثق وتلتزم بسيادة القانون الكويتي الأصيل
              </h3>

              <div className="space-y-4 text-[#8B9099] text-sm sm:text-base leading-relaxed">
                <p>
                  يمثل <strong className="text-white font-medium">المركز التنفيذي للمحاماة والاستشارات القانونية</strong> واحداً من الصروح القانونية المرموقة في الكويت، والمصممة لتفي باحتياجات الموكل الفنية والتشريعية في منتهى المرونة واليقظة.
                </p>
                <p>
                  يقود هذه المؤسسة الأستاذ <strong className="text-[#C9A84C] font-semibold">المحامي عبدالله فازع المطيري</strong>، ملتزماً بنقل ملفات الدفاع من النمط التقليدي الساكن والمحدود، إلى منظومة استراتيجية دءوبة تقوم على الملاحظة الجنائية الدقيقة والقراءة المتفحصة لنصوص المحاكم وشروط التعاقد لتأمين حقوق الموكل بالكامل.
                </p>
                <p>
                  يحرص مكتبنا على مرافقة الموكل خطوة بخطوة وإتاحة النفاذ الكامل للحقائق القانونية بكل صدق وشجاعة، مع تيسير سبل التواصل المباشر عبر السوشيال ميديا وقنوات التواصل الفوري لرفع القلق وتلبية النداء في كافة الظروف.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="border-r border-[#C9A84C]/30 pr-4 space-y-1">
                  <h4 className="text-white font-serif font-bold text-base">النزاهة والمباشرة</h4>
                  <p className="text-[12px] text-[#8B9099]">تقييم صريح، دون وعود طائشة أو مبالغات تجارية زائلة.</p>
                </div>
                <div className="border-r border-[#C9A84C]/30 pr-4 space-y-1">
                  <h4 className="text-white font-serif font-bold text-base">الدراسة والتنقيب</h4>
                  <p className="text-[12px] text-[#8B9099]">بحث متكامل وسبر لغوار الثغرات القضائية قبل الوقوع فيها.</p>
                </div>
                <div className="border-r border-[#C9A84C]/30 pr-4 space-y-1">
                  <h4 className="text-white font-serif font-bold text-base">حماية الأسرار</h4>
                  <p className="text-[12px] text-[#8B9099]">السرية التامة والمصونة لكافة النزاعات والممتلكات الشخصية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (خدماتنا) */}
      <section id="services-section" className="py-24 bg-[#0D0D15]/50 border-y border-[#C9A84C]/10 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm text-[#C9A84C] font-semibold tracking-wider uppercase">مجالات الاختصاص والعمل</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">الخدمات القانونية التي نتميز بصدارتها</h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesData.map((svc) => (
              <div 
                key={svc.id}
                className="bg-[#12121A] border border-[#C9A84C]/20 p-8 flex flex-col justify-between group hover:border-[#C9A84C] hover:translate-y-[-6px] transition-all duration-300 relative overflow-hidden rounded-md"
              >
                {/* Glow bar */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-[#C9A84C]/30 group-hover:bg-[#C9A84C] transition-colors" />

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] mb-4">
                    {svc.icon}
                  </div>
                  <h3 className="font-bold font-serif text-xl tracking-tight text-white group-hover:text-[#E8C86A] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-[#C9A84C] font-semibold">
                    {svc.short}
                  </p>
                  <p className="text-xs text-[#8B9099] leading-relaxed pt-2 border-t border-[#C9A84C]/5">
                    {svc.details}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#C9A84C]/10 flex items-center justify-between text-xs text-[#8B9099] group-hover:text-[#C9A84C] transition-colors">
                  <span>طلب مناقشة واستشارة</span>
                  <ChevronLeft className="w-4 h-4 transform group-hover:translate-x-[-4px] transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulsing Interstital Call to Action Banner */}
      <section className="relative py-16 px-6 sm:px-12 text-center bg-gradient-to-r from-[#0C0C12] via-[#12121A] to-[#0C0C12] border-b border-[#C9A84C]/20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-normal">
            هل النزاع يهدد مصالحك أو استثماراتك؟
          </h2>
          <p className="text-sm sm:text-base text-[#8B9099] max-w-xl mx-auto">
            لا داعي للبحث العشوائي والمجازفة. مكتب عبدالله فازع المطيري يضع بين يديك أمان الخبرة وسداد الإجراء. راسلنا الآن واحصل على مشورة مسبقة.
          </p>

          <div className="inline-block pt-2">
            <a
              href="https://wa.me/96569333933"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#0A0A0E] font-bold text-base shadow-[0_4px_20px_rgba(201,168,76,0.3)] animate-gold-pulse hover:bg-[#E8C86A] transition-all"
            >
              <MessageSquare className="w-5 h-5 ml-1" />
              <span>ابدأ محادثة واتساب فورية آمنة</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Consultation Booking Form Block */}
      <section id="contact-section" className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm text-[#C9A84C] font-semibold tracking-wider uppercase">استعلام آمن</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">تواصل معنا وموقعنا الرئيسي</h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Right side: Information block with real links */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#C9A84C]">قنوات ووسائل المراسلة السريعة</h3>
              
              <a 
                href="https://wa.me/96569333933" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-6 bg-[#12121A] border border-[#C9A84C]/20 hover:border-[#C9A84C] rounded-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C9A84C]/10 text-[#C9A84C] rounded-md">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#E8C86A] transition-colors">محادثة واتساب الفورية</h4>
                    <span className="text-xs text-[#8B9099] mt-0.5 block font-mono">69333933</span>
                    <p className="text-[11px] text-[#C9A84C] mt-2 flex items-center gap-1">
                      راسل المكتب الآن <ExternalLink className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </a>

              <a 
                href="tel:69333933"
                className="block p-6 bg-[#12121A] border border-[#C9A84C]/20 hover:border-[#C9A84C] rounded-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C9A84C]/10 text-[#C9A84C] rounded-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#E8C86A] transition-colors">اتصال هاتفي مباشر</h4>
                    <span className="text-xs text-[#8B9099] mt-0.5 block font-mono">69333933 965+</span>
                    <p className="text-[11px] text-[#C9A84C] mt-2 flex items-center gap-1">
                      اتصال هاتفي سريع <ExternalLink className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/bZLuUzB3WUd2aLjE8"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-[#12121A] border border-[#C9A84C]/20 hover:border-[#C9A84C] rounded-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C9A84C]/10 text-[#C9A84C] rounded-md group-hover:bg-[#C9A84C]/20 transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#E8C86A] transition-colors">المقر والموقع الجغرافي</h4>
                    <p className="text-xs text-[#8B9099] mt-1 leading-relaxed">
                      دولة الكويت - العاصمة والمحاكم الرئيسية. يرجى التنسيق المسبق هاتفياً لترتيب وتأكيد مواعيد الزيارة والمقابلات الاستشارية المباشرة.
                    </p>
                    <p className="text-[11px] text-[#C9A84C] mt-2 flex items-center gap-1">
                      عرض الموقع على خرائط جوجل <ExternalLink className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Left side: Animated high-fidelity booking reservation form */}
            <div id="consultation-card" className="lg:col-span-8 bg-[#12121A] border border-[#C9A84C]/30 p-8 sm:p-10 rounded-md relative shadow-2xl">
              
              {/* Luxury Frame corner highlights */}
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#C9A84C]/45" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#C9A84C]/45" />

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">طلب استشارة وتعجيل موعد قضايا</h3>
              <p className="text-xs sm:text-sm text-[#8B9099] mb-8 leading-relaxed">
                يرجى تسجيل اسمك الكريم وتفاصيل الموضوع بدقة متناهية. سيقوم المكتب باستلام طلبك مباشرة وتجهيز ملفك لسرعة الرد والمباشرة فيه على الواتساب.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6 text-right">
                
                {formError && (
                  <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded">
                    {formError}
                  </div>
                )}

                {formSuccess && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs rounded flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    تم حفظ بيانات الاستشارة لجهوزية التمرير، يجري فتح الواتساب الآن...
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="block text-xs font-semibold text-[#8B9099] tracking-wider">
                      الاسم الكامل الكريم *
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="الأستاذ / العميل..."
                      className="w-full bg-[#0A0A0E] border border-[#C9A84C]/20 focus:border-[#C9A84C] text-white px-4 py-3 placeholder-[#8B9099]/40 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <label htmlFor="phone-input" className="block text-xs font-semibold text-[#8B9099] tracking-wider">
                      رقم الهاتف / التواصل للتأكيد *
                    </label>
                    <input
                      id="phone-input"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="رقم هاتف الموكل..."
                      className="w-full bg-[#0A0A0E] border border-[#C9A84C]/20 focus:border-[#C9A84C] text-white px-4 py-3 placeholder-[#8B9099]/40 text-sm text-left font-mono focus:outline-none transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Select Legal Category */}
                  <div className="space-y-2">
                    <label htmlFor="subject-select" className="block text-xs font-semibold text-[#8B9099] tracking-wider">
                      نوع وقسم القضية / الاستشارة
                    </label>
                    <div className="relative">
                      <select
                        id="subject-select"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0A0E] border border-[#C9A84C]/20 focus:border-[#C9A84C] text-white px-4 py-3 text-sm focus:outline-none transition-colors appearance-none"
                      >
                        <option value="القضايا المدنية والتجارية">القضايا المدنية والتجارية</option>
                        <option value="قضايا الأحوال الشخصية والأسرة">قضايا الأحوال الشخصية والأسرة</option>
                        <option value="قضايا العمل والمطالبات العمالية">قضايا العمل والمطالبات العمالية</option>
                        <option value="الاستشارات والبحوث القانونية">الاستشارات والبحوث القانونية</option>
                        <option value="صياغة العقود وتوثيق الاتفاقيات">صياغة العقود وتوثيق الاتفاقيات</option>
                        <option value="جلسات التحكيم والحلول البديلة">جلسات التحكيم والحلول البديلة</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-[#C9A84C]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Fast Whatsapp Quick Direct Trigger */}
                  <div className="space-y-2 flex flex-col justify-end">
                    <span className="block text-[11px] text-[#8B9099] leading-relaxed mb-1">
                      * يرجى العلم بأن الإرسال سيقوم بفتح تطبيق الواتساب المعتمد للمكتب عاجلاً لتأكيد التوقيت والملف.
                    </span>
                  </div>
                </div>

                {/* Consultation Message */}
                <div className="space-y-2">
                  <label htmlFor="message-area" className="block text-xs font-semibold text-[#8B9099] tracking-wider">
                    شرح وتفاصيل موضوع الاستشارة عاجلاً *
                  </label>
                  <textarea
                    id="message-area"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب هنا كافّة تفاصيل القضية أو الاستعلام لنقوم بالبحث والإفادة المناسبة والمكتوبة للمستشار..."
                    className="w-full bg-[#0A0A0E] border border-[#C9A84C]/20 focus:border-[#C9A84C] text-white px-4 py-3 placeholder-[#8B9099]/40 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button inside form */}
                <div className="pt-4 flex justify-start">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#C9A84C] text-[#0A0A0E] font-bold px-10 py-4 hover:bg-[#E8C86A] shadow-lg shadow-black/30 transition-all cursor-pointer flex items-center justify-center gap-2 hover:translate-y-[-2px]"
                  >
                    <Send className="w-4 h-4 ml-2 transform scale-x-[-1]" />
                    <span>إرسال وتجهيز ملف الاستشارة</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Block */}
      <footer className="bg-[#060608] border-t border-[#C9A84C]/20 py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#C9A84C] flex items-center justify-center rotate-45">
              <Scale className="-rotate-45 w-4 h-4 text-[#C9A84C]" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-base font-serif font-bold text-[#C9A84C]">المركز التنفيذي للمحاماة</span>
              <span className="text-[9px] text-[#8B9099] -mt-1">للمحاماة والاستشارات القانونية</span>
            </div>
          </div>

          <div className="text-xs text-[#8B9099] tracking-wide">
            © {new Date().getFullYear()} المركز التنفيذي للمحاماة والاستشارات القانونية. كافة الحقوق محفوظة ومصونة.
          </div>

          <div className="flex items-center gap-6 text-xs text-[#8B9099]">
            <span>الكويت، العاصمة والمحاكم</span>
            <span className="text-[#C9A84C] font-semibold">تواصل: 69333933</span>
          </div>

        </div>
      </footer>

    </div>
  );
}

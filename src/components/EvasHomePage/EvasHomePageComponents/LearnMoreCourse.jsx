import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown, CheckCircle2, Leaf, Milk, Heart, Globe } from "lucide-react";

// Data Definitions
const ingredients = [
  {
    name: "Ashwagandha",
    name_hi: "अश्वगंधा",
    benefit_en: "Reduces stress, boosts testosterone, and improves endurance.",
    benefit_hi: "तनाव कम करता है, टेस्टोस्टेरोन बढ़ाता है और सहनशक्ति में सुधार करता है।"
  },
  {
    name: "Sudha Shilajit",
    name_hi: "शुद्ध शिलाजीत",
    benefit_en: "Enhances strength, stamina, and cellular energy.",
    benefit_hi: "शक्ति, स्टैमिना और कोशिकीय ऊर्जा को बढ़ाता है।"
  },
  {
    name: "Musali",
    name_hi: "मूसली",
    benefit_en: "Improves vitality, hormonal balance and reproductive wellness.",
    benefit_hi: "ऊर्जा, हार्मोन संतुलन और प्रजनन स्वास्थ्य में सुधार करता है।"
  },
  {
    name: "Salam Panja",
    name_hi: "सलाम पंजा",
    benefit_en: "Supports muscle recovery and boosts energy.",
    benefit_hi: "मांसपेशियों की रिकवरी में मदद करता है और ऊर्जा बढ़ाता है।"
  },
  {
    name: "Swarna Bhasma",
    name_hi: "स्वर्ण भस्म",
    benefit_en: "Enhances immunity, reduces inflammation, increases energy.",
    benefit_hi: "प्रतिरक्षा बढ़ाता है, सूजन कम करता है और ऊर्जा बढ़ाता है।"
  },
  {
    name: "Atma Gupta",
    name_hi: "आत्म गुप्ता",
    benefit_en: "Improves strength and supports overall rejuvenation.",
    benefit_hi: "शक्ति बढ़ाता है और संपूर्ण पुनरुत्थान में सहायक।"
  },
  {
    name: "Varahi",
    name_hi: "वराही",
    benefit_en: "Boosts fertility and strengthens vital organs.",
    benefit_hi: "उर्वरता बढ़ाता है और महत्वपूर्ण अंगों को मजबूती देता है।"
  },
  {
    name: "Akara",
    name_hi: "अकरा",
    benefit_en: "Supports metabolism and improves digestive fire.",
    benefit_hi: "मेटाबॉलिज्म को सपोर्ट करता है और पाचन अग्नि को बढ़ाता है।"
  },
  {
    name: "Karabha",
    name_hi: "करभा",
    benefit_en: "Enhances immunity and physical strength.",
    benefit_hi: "प्रतिरक्षा और शारीरिक शक्ति को बढ़ाता है।"
  },
  {
    name: "Lavanga",
    name_hi: "लवंग (लौंग)",
    benefit_en: "Improves digestion and boosts metabolic fire.",
    benefit_hi: "पाचन में सुधार करता है और मेटाबॉलिक अग्नि बढ़ाता है।"
  },
  {
    name: "Kunkuma",
    name_hi: "कुमकुम (केसर)",
    benefit_en: "Enhances mood, energy, and blood circulation.",
    benefit_hi: "मूड, ऊर्जा और रक्त प्रवाह में सुधार करता है।"
  },
  {
    name: "Tavak",
    name_hi: "त्वक (दालचीनी)",
    benefit_en: "Strengthens nerves and boosts vitality.",
    benefit_hi: "नसों को मजबूत करता है और जीवन शक्ति बढ़ाता है।"
  },
  {
    name: "Karpura",
    name_hi: "कपूर",
    benefit_en: "Improves respiratory health and increases alertness.",
    benefit_hi: "श्वसन स्वास्थ्य में सुधार करता है और सतर्कता बढ़ाता है।"
  },
  {
    name: "Jattphala",
    name_hi: "जायफल",
    benefit_en: "Improves digestion and supports endocrine balance.",
    benefit_hi: "पाचन में सुधार करता है और एंडोक्राइन संतुलन को सपोर्ट करता है।"
  },
  {
    name: "Yasada Bhasma",
    name_hi: "यशद भस्म",
    benefit_en: "Boosts testosterone and supports metabolic functions.",
    benefit_hi: "टेस्टोस्टेरोन बढ़ाता है और मेटाबॉलिक कार्यों को सपोर्ट करता है।"
  },
  {
    name: "Rajata Bhasma",
    name_hi: "रजत भस्म",
    benefit_en: "Enhances immunity, nerve strength, and vitality.",
    benefit_hi: "प्रतिरक्षा, नसों की शक्ति और जीवन ऊर्जा बढ़ाता है।"
  },
];

// Updated timeline data with Hindi translations
const timeline = [
  { day: "Day 1–10: Adaptation & Detox", text_en: "Your body starts adapting. Stress lowers, sleep improves, and digestive stability begins as the initial cleansing takes effect.", text_hi: "दिन 1–10: अनुकूलन और विषहरण (Detox)। आपका शरीर अनुकूलन शुरू करता है। तनाव कम होता है, नींद बेहतर होती है, और प्रारंभिक सफाई के साथ पाचन स्थिरता शुरू होती है।" },
  { day: "Day 11–30: Energy & Stamina Boost", text_en: "Energy levels significantly increase, noticeable improvements in stamina, reduced fatigue, and foundational hormonal balance starts to restore.", text_hi: "दिन 11–30: ऊर्जा और स्टैमिना वृद्धि। ऊर्जा स्तरों में महत्वपूर्ण वृद्धि, स्टैमिना में ध्यान देने योग्य सुधार, थकान कम होना, और मूलभूत हार्मोनल संतुलन बहाल होना शुरू होता है।" },
  { day: "Day 31–60: Visible Strength & Wellness", text_en: "Users typically see visible improvement in physical strength, mood stability, enhanced libido, faster muscle recovery, and overall uplifted vitality.", text_hi: "दिन 31–60: दृश्य शक्ति और कल्याण। उपयोगकर्ता आमतौर पर शारीरिक शक्ति, मूड की स्थिरता, बढ़ी हुई कामेच्छा, मांसपेशियों की तेज रिकवरी और समग्र रूप से बेहतर जीवन शक्ति में दृश्य सुधार देखते हैं।" },
  { day: "Day 61–90: Optimization & Peak Healing", text_en: "Deep cellular healing is achieved. Experience long-term hormone optimization, a profoundly calm mind, and sustained peak wellness and rejuvenation.", text_hi: "दिन 61–90: अनुकूलन और चरम उपचार। गहरा कोशिकीय उपचार प्राप्त होता है। दीर्घकालिक हार्मोन अनुकूलन, एक अत्यंत शांत मन, और निरंतर चरम कल्याण और पुनरुत्थान का अनुभव करें।" },
];

// Custom component for the Timeline Card
const TimelineCard = ({ day, text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, amount: 0.5 }}
    className={`relative p-8 bg-white border border-[#715036]/10 rounded-3xl shadow-sm 
      hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-1 
      md:w-[48%] ${index % 2 === 0 ? 'md:self-start' : 'md:self-end'} mb-8`}
  >
    {/* Decorative circle on the timeline axis (only visible on large screens) */}
    <div className="hidden md:block absolute w-4 h-4 rounded-full bg-[#C17C3A] -left-6 top-9 transform -translate-x-1/2 border-4 border-[#FDFBF7] z-10 shadow-md"></div>

    <div className="flex items-center text-lg font-serif font-bold text-[#2A3B28] mb-3">
      <Heart size={20} className="mr-3 text-[#C17C3A]" />
      {day}
    </div>
    <p className="text-[#715036]/80 text-sm leading-relaxed font-medium">{text}</p>

    {/* Mobile marker */}
    <div className="absolute top-0 left-0 h-full w-1.5 bg-[#C17C3A] rounded-tl-3xl rounded-bl-3xl md:hidden opacity-80"></div>
  </motion.div>
);


export default function LearnMoreCourse() {
  const [openIndex, setOpenIndex] = useState(null);
  const [language, setLanguage] = useState('en');

  const getText = (en, hi) => language === 'en' ? en : hi;

  const translations = {
    headerTitle: { en: "The 90-Day Wellness Journey", hi: "90-दिवसीय कल्याण यात्रा" },
    headerSubtitle: { en: "Experience deep cellular healing with nature's most potent ingredients.", hi: "प्रकृति के सबसे शक्तिशाली तत्वों के साथ गहरे कोशिकीय उपचार का अनुभव करें।" },
    ingredientsTitle: { en: "Ayurvedic Formulation Breakdown", hi: "आयुर्वेदिक सूत्र का विवरण" },
    timelineTitle: { en: "Your Healing Timeline", hi: "आपकी उपचार समयरेखा" },
    usageTitle: { en: "Recommended Usage", hi: "अनुशंसित उपयोग" },
    usageText: { en: "For optimal absorption and efficacy, take one dose daily with a glass of warm, organic milk. Ensure consistent usage for the full 90-day cycle.", hi: "इष्टतम अवशोषण और प्रभावकारिता के लिए, एक खुराक रोज़ाना एक गिलास गर्म, जैविक दूध के साथ लें। पूरे 90-दिवसीय चक्र के लिए निरंतर उपयोग सुनिश्चित करें।" },
    disclaimerTitle: { en: "Important Disclaimer", hi: "महत्वपूर्ण अस्वीकरण" },
    disclaimerText: { en: "This product is a dietary supplement and not intended to diagnose, treat, cure, or prevent any disease. It is essential to consult your physician or a qualified Ayurvedic practitioner before use, especially if you are pregnant, nursing, taking existing medication, or have a pre-existing medical condition. Individual results may vary.", hi: "यह उत्पाद एक आहार अनुपूरक है और इसका उद्देश्य किसी भी बीमारी का निदान, उपचार, इलाज या रोकथाम करना नहीं है। उपयोग से पहले अपने चिकित्सक या योग्य आयुर्वेदिक चिकित्सक से परामर्श करना आवश्यक है, खासकर यदि आप गर्भवती हैं, स्तनपान करा रही हैं, कोई दवा ले रही हैं, या कोई चिकित्सीय स्थिति है। व्यक्तिगत परिणाम भिन्न हो सकते हैं।" },
  };


  return (
    // Background: Cream
    <div className="pt-13 sm:pt-5 min-h-screen bg-[#FDFBF7] font-sans relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2A3B28]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C17C3A]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-8 relative z-10">

        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#2A3B28] border border-[#715036]/20 hover:bg-[#C17C3A] hover:text-white hover:border-[#C17C3A] transition-all shadow-sm"
          >
            <Globe size={16} />
            <span className="text-sm font-bold uppercase tracking-wider">{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>

        {/* Header Section */}
        <header className="text-center mb-16 p-10 bg-[#2A3B28] rounded-3xl shadow-2xl text-[#FDFBF7] relative overflow-hidden">
          {/* Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4 leading-tight">
            {getText(translations.headerTitle.en, translations.headerTitle.hi)}
          </h2>
          <p className="text-[#C17C3A] mt-4 text-lg max-w-2xl mx-auto font-medium italic">
            {getText(translations.headerSubtitle.en, translations.headerSubtitle.hi)}
          </p>
        </header>

        {/* Ingredients Section */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Natural Potency</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28] flex items-center justify-center gap-3">
              <Leaf size={28} className="text-[#C17C3A]" />
              {getText(translations.ingredientsTitle.en, translations.ingredientsTitle.hi)}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden 
                  ${openIndex === index
                    ? "bg-[#FDFBF7] border-[#C17C3A] shadow-md ring-1 ring-[#C17C3A]/20"
                    : "bg-white border-[#715036]/10 hover:border-[#C17C3A]/30 hover:shadow-sm"}`}
              >
                <button
                  className="w-full p-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <p className={`font-serif font-bold text-lg ${openIndex === index ? "text-[#C17C3A]" : "text-[#2A3B28]"}`}>
                    {getText(item.name, item.name_hi)}
                  </p>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${openIndex === index ? "rotate-180 text-[#C17C3A]" : "text-[#715036]/50"}`}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, padding: 0 }}
                      animate={{ opacity: 1, height: "auto", padding: "0 1.25rem 1.25rem 1.25rem" }}
                      exit={{ opacity: 0, height: 0, padding: "0 1.25rem 0 1.25rem" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#715036]/80 border-l-2 border-[#C17C3A] pl-4 pt-1 text-sm font-medium leading-relaxed">
                        {getText(item.benefit_en, item.benefit_hi)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">The Journey</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28] flex items-center justify-center gap-3">
              <CheckCircle2 size={28} className="text-[#C17C3A]" />
              {getText(translations.timelineTitle.en, translations.timelineTitle.hi)}
            </h3>
          </div>

          {/* Timeline Container */}
          <div className="relative flex flex-col items-center md:items-stretch">
            {/* Spine */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#C17C3A]/30"></div>

            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between w-full space-y-6 md:space-y-0">
              {timeline.map((step, index) => (
                <TimelineCard
                  key={index}
                  day={step.day}
                  text={getText(step.text_en, step.text_hi)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How to Consume & Disclaimer */}
        <footer className="mt-24 grid md:grid-cols-2 gap-8">
          {/* How to Consume Card */}
          <div className="bg-[#EADDCF]/30 p-8 rounded-3xl border border-[#C17C3A]/20 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-[#2A3B28] flex items-center gap-3 mb-3">
              <span className="bg-[#C17C3A] p-1.5 rounded-full text-white"><Milk size={16} /></span>
              {getText(translations.usageTitle.en, translations.usageTitle.hi)}
            </h3>
            <p className="text-[#715036]/90 leading-relaxed font-medium">
              {getText(translations.usageText.en, translations.usageText.hi)}
            </p>
          </div>

          {/* Disclaimer Card */}
          <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-red-800 flex items-center gap-3 mb-3">
              <span className="bg-red-200 p-1.5 rounded-full text-red-700"><Info size={16} /></span>
              {getText(translations.disclaimerTitle.en, translations.disclaimerTitle.hi)}
            </h3>
            <p className="text-red-900/70 text-sm leading-relaxed font-medium">
              {getText(translations.disclaimerText.en, translations.disclaimerText.hi)}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
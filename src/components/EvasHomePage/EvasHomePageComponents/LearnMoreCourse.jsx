import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown, CheckCircle2, Leaf, Milk, Heart, Globe } from "lucide-react"; // Added Globe icon

// Data Definitions
const ingredients = [
  { 
    name: "Ashwagandha", 
    name_hi: "अश्वगंधा", // Added Hindi name
    benefit_en: "Reduces stress, boosts testosterone, and improves endurance.", 
    benefit_hi: "तनाव कम करता है, टेस्टोस्टेरोन बढ़ाता है और सहनशक्ति में सुधार करता है।" 
  },
  { 
    name: "Sudha Shilajit", 
    name_hi: "शुद्ध शिलाजीत", // Added Hindi name
    benefit_en: "Enhances strength, stamina, and cellular energy.", 
    benefit_hi: "शक्ति, स्टैमिना और कोशिकीय ऊर्जा को बढ़ाता है।" 
  },
  { 
    name: "Musali", 
    name_hi: "मूसली", // Added Hindi name
    benefit_en: "Improves vitality, hormonal balance and reproductive wellness.", 
    benefit_hi: "ऊर्जा, हार्मोन संतुलन और प्रजनन स्वास्थ्य में सुधार करता है।" 
  },
  { 
    name: "Salam Panja", 
    name_hi: "सलाम पंजा", // Added Hindi name
    benefit_en: "Supports muscle recovery and boosts energy.",
    benefit_hi: "मांसपेशियों की रिकवरी में मदद करता है और ऊर्जा बढ़ाता है।"
  },
  { 
    name: "Swarna Bhasma", 
    name_hi: "स्वर्ण भस्म", // Added Hindi name
    benefit_en: "Enhances immunity, reduces inflammation, increases energy.",
    benefit_hi: "प्रतिरक्षा बढ़ाता है, सूजन कम करता है और ऊर्जा बढ़ाता है।"
  },
  { 
    name: "Atma Gupta", 
    name_hi: "आत्म गुप्ता", // Added Hindi name
    benefit_en: "Improves strength and supports overall rejuvenation.",
    benefit_hi: "शक्ति बढ़ाता है और संपूर्ण पुनरुत्थान में सहायक।"
  },
  { 
    name: "Varahi", 
    name_hi: "वराही", // Added Hindi name
    benefit_en: "Boosts fertility and strengthens vital organs.",
    benefit_hi: "उर्वरता बढ़ाता है और महत्वपूर्ण अंगों को मजबूती देता है।"
  },
  { 
    name: "Akara", 
    name_hi: "अकरा", // Added Hindi name
    benefit_en: "Supports metabolism and improves digestive fire.",
    benefit_hi: "मेटाबॉलिज्म को सपोर्ट करता है और पाचन अग्नि को बढ़ाता है।"
  },
  { 
    name: "Karabha", 
    name_hi: "करभा", // Added Hindi name
    benefit_en: "Enhances immunity and physical strength.",
    benefit_hi: "प्रतिरक्षा और शारीरिक शक्ति को बढ़ाता है।"
  },
  { 
    name: "Lavanga", 
    name_hi: "लवंग (लौंग)", // Added Hindi name
    benefit_en: "Improves digestion and boosts metabolic fire.",
    benefit_hi: "पाचन में सुधार करता है और मेटाबॉलिक अग्नि बढ़ाता है।"
  },
  { 
    name: "Kunkuma", 
    name_hi: "कुमकुम (केसर)", // Added Hindi name
    benefit_en: "Enhances mood, energy, and blood circulation.",
    benefit_hi: "मूड, ऊर्जा और रक्त प्रवाह में सुधार करता है।"
  },
  { 
    name: "Tavak", 
    name_hi: "त्वक (दालचीनी)", // Added Hindi name
    benefit_en: "Strengthens nerves and boosts vitality.",
    benefit_hi: "नसों को मजबूत करता है और जीवन शक्ति बढ़ाता है।"
  },
  { 
    name: "Karpura", 
    name_hi: "कपूर", // Added Hindi name
    benefit_en: "Improves respiratory health and increases alertness.",
    benefit_hi: "श्वसन स्वास्थ्य में सुधार करता है और सतर्कता बढ़ाता है।"
  },
  { 
    name: "Jattphala", 
    name_hi: "जायफल", // Added Hindi name
    benefit_en: "Improves digestion and supports endocrine balance.",
    benefit_hi: "पाचन में सुधार करता है और एंडोक्राइन संतुलन को सपोर्ट करता है।"
  },
  { 
    name: "Yasada Bhasma", 
    name_hi: "यशद भस्म", // Added Hindi name
    benefit_en: "Boosts testosterone and supports metabolic functions.",
    benefit_hi: "टेस्टोस्टेरोन बढ़ाता है और मेटाबॉलिक कार्यों को सपोर्ट करता है।"
  },
  { 
    name: "Rajata Bhasma", 
    name_hi: "रजत भस्म", // Added Hindi name
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
    className={`relative p-6 bg-white border border-emerald-100 rounded-xl shadow-lg 
      hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 
      md:w-[48%] ${index % 2 === 0 ? 'md:self-start' : 'md:self-end'}`}
  >
    {/* Decorative circle on the timeline axis (only visible on large screens) */}
    <div className="hidden md:block absolute w-4 h-4 rounded-full bg-emerald-600 -left-6 top-7 transform -translate-x-1/2 border-4 border-white z-10"></div>
    
    <div className="flex items-center text-lg font-semibold text-emerald-700">
      <Heart size={20} className="mr-2" />
      {day}
    </div>
    <p className="text-gray-600 mt-2 text-sm">{text}</p>
    
    {/* Mobile marker */}
    <div className="absolute top-0 left-0 h-full w-1 bg-emerald-600 rounded-tl-xl md:hidden"></div>
  </motion.div>
);


export default function LearnMoreCourse() {
  const [openIndex, setOpenIndex] = useState(null);
  const [language, setLanguage] = useState('en'); // New state for language

  // Utility function for conditional text
  const getText = (en, hi) => language === 'en' ? en : hi;
  
  // Static translations object for non-data text
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
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-8">
        
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
            <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-2 p-2 rounded-full bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-50 transition"
            >
                <Globe size={18} />
                <span className="text-sm font-medium">{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
        </div>

        {/* Header Section */}
        <header className="text-center mb-16 p-6 bg-emerald-700 rounded-3xl shadow-2xl text-white">
          <h2 className="4xl font-extrabold tracking-tight sm:text-5xl">
            {getText(translations.headerTitle.en, translations.headerTitle.hi)}
          </h2>
          <p className="text-emerald-200 mt-3 text-lg max-w-2xl mx-auto">
            {getText(translations.headerSubtitle.en, translations.headerSubtitle.hi)}
          </p>
        </header>

        {/* Ingredients Section */}
        <section className="mt-12">
          <h3 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center justify-center sm:justify-start gap-3">
            <Leaf size={28} className="text-emerald-600" /> {getText(translations.ingredientsTitle.en, translations.ingredientsTitle.hi)}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {ingredients.map((item, index) => (
              <div 
                key={index}
                className={`border rounded-xl transition-all duration-300 overflow-hidden 
                  ${openIndex === index ? "bg-emerald-50 border-emerald-400 shadow-lg" : "bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md"}`}
              >
                <button
                  className="w-full p-4 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <p className={`font-semibold text-lg ${openIndex === index ? "text-emerald-700" : "text-gray-800"}`}>
                    {/* Display name based on selected language */}
                    {getText(item.name, item.name_hi)}
                  </p>
                  <ChevronDown 
                    size={20}
                    className={`transition-transform duration-300 ${openIndex === index ? "rotate-180 text-emerald-600" : "text-gray-500"}`}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, padding: 0 }}
                      animate={{ opacity: 1, height: "auto", padding: "0 1rem 1rem 1rem" }}
                      exit={{ opacity: 0, height: 0, padding: "0 1rem 0 1rem" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-600 border-l-2 border-emerald-300 pl-3 pt-2 text-sm">
                        {/* Display benefit based on selected language */}
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
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-emerald-800 mb-12 text-center flex items-center justify-center gap-3">
            <CheckCircle2 size={28} className="text-emerald-600" /> {getText(translations.timelineTitle.en, translations.timelineTitle.hi)}
          </h3>

          {/* Timeline Container: Visual axis for large screens */}
          <div className="relative flex flex-col items-center md:items-stretch">
            {/* The vertical timeline spine for desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200"></div>

            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between w-full space-y-6 md:space-y-0">
              {timeline.map((step, index) => (
                <TimelineCard 
                  key={index} 
                  day={step.day} 
                  text={getText(step.text_en, step.text_hi)} // Use translated text
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* How to Consume & Disclaimer */}
        <footer className="mt-16 grid md:grid-cols-2 gap-6">
          {/* How to Consume Card */}
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-inner">
            <h3 className="text-xl font-semibold text-amber-800 flex items-center gap-2">
              <Milk size={20} className="text-amber-600" /> {getText(translations.usageTitle.en, translations.usageTitle.hi)}
            </h3>
            <p className="text-gray-700 mt-2">
              {getText(translations.usageText.en, translations.usageText.hi)}
            </p>
          </div>

          {/* Disclaimer Card */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-inner">
            <h3 className="text-xl font-semibold text-red-800 flex items-center gap-2">
              <Info size={20} className="text-red-600" /> {getText(translations.disclaimerTitle.en, translations.disclaimerTitle.hi)}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              {getText(translations.disclaimerText.en, translations.disclaimerText.hi)}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
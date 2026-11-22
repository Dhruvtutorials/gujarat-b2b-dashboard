import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Globe2, 
  CheckCircle, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  Users,
  MessageSquare
} from 'lucide-react';

export default function ObjectionHandlerModal({ onClose, theme = 'dark' }) {
  const [lang, setLang] = useState('guj'); // 'guj' or 'hin'
  const [copiedKey, setCopiedKey] = useState(null);

  const isDark = theme === 'dark';

  const copyScript = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const SCRIPTS_GUJARATI = {
    openerTitle: '૩૦-સેકન્ડ કોલ્ડ કોલિંગ ઓપનર (Icebreaker Pitch)',
    openerDesc: 'ફેક્ટરી માલિક અથવા ડિરેક્ટર સાથે સીધી અને આદરપૂર્વક વાત શરૂ કરવા માટે:',
    openerScript: `"નમસ્તે પટેલ સાહેબ / શેઠ! હું ધ્રુવ રાણા વાત કરું છું ગુજરાત ઇન્ડસ્ટ્રિયલ કોરિડોર માંથી.\n\n` +
      `હું તમારો ફક્ત ૧ મિનિટ લઈશ. અમે હાલમાં મોરબી/સુરત ના ટોચના ઉત્પાદકો સાથે કામ કરીએ છીએ જેમના માટે અમે ડિજિટલ માર્કેટિંગ અને ગૂગલ/મેટા એડ્સ દ્વારા મહારાષ્ટ્ર, દિલ્હી અને દક્ષિણ ભારતના વેરિફાઇડ હોલસેલ ડીલર્સની પૂછપરછ (ઇન્ક્વાયરી) લાવીએ છીએ.\n\n` +
      `અમે તમારી કંપનીની પ્રોફાઇલ જોઈ, હાલમાં તમારા ઘણા પ્રતિસ્પર્ધીઓ ઓનલાઇન એડ્સ ચલાવીને મોટો ઓર્ડર લઈ જાય છે. અમે તમારા માટે એક મફત 'ડિજિટલ ઓડિટ રિપોર્ટ' બનાવ્યો છે. આજે સાંજે ૫ વાગ્યે ૫ મિનિટ વાત થઈ શકે?"`,
    
    objections: [
      {
        id: 'offline',
        q: '૧. "અમારે તો બધું કામ ઓફલાઇન જ ચાલે છે, ડિજિટલ ની શું જરૂર?"',
        a: `"બિલકુલ સાચી વાત છે સાહેબ, તમારું ઓફલાઇન નેટવર્ક અને જૂના સંબંધો મજબૂત છે જ.\n\n` +
          `પણ સાહેબ, આજકાલ મુંબઈ, પુણે કે બેંગલોરના નવા બિલ્ડરો અને ડીલરો કોઈને પૂછવા કરતાં પહેલા ગૂગલ અને ઇન્સ્ટાગ્રામ પર સર્ચ કરે છે. જો તમે ત્યાં નહિ હોવ, તો એ લાખો રૂપિયાનો નવો ઓર્ડર સીધો તમારા પ્રતિસ્પર્ધી પાસે જાય છે.\n\n` +
          `અમે તમારું ઓફલાઇન કામ બંધ નથી કરાવતા, બલ્કે દર મહિને ૨૫-૪૦ નવી જથ્થાબંધ પાર્ટીઓ તમારી ફેક્ટરી સાથે જોડી આપીએ છીએ."`
      },
      {
        id: 'fraud_agency',
        q: '૨. "પહેલા એક એજન્સી ને પૈસા આપ્યા હતા, કંઈ રિઝલ્ટ ન આવ્યું!"',
        a: `"સાહેબ તમારી ફરિયાદ ૧૦૦% સાચી છે. મોટાભાગની એજન્સીઓ સિટીમાં બેસીને ફક્ત ફેસબુક પર પોસ્ટ મૂકી દે છે, એમને B2B મેન્યુફેક્ચરિંગ નો કોઈ અનુભવ નથી હોતો.\n\n` +
          `અમે કોઈ સામાન્ય સોશિયલ મીડિયા એજન્સી નથી. અમે ચોક્કસ B2B કોરિડોર પર કામ કરીએ છીએ. અમારી સિસ્ટમમાં: \n` +
          `૧. જાહેરાતનો પૂરો ખર્ચ તમારા પોતાના એકાઉન્ટમાંથી ડાયરેક્ટ કપાય છે (૧૦૦% પારદર્શિતા અને GST ઇનપુટ ક્રેડિટ).\n` +
          `૨. અમે માત્ર લાઈક્સ નહિ, પણ સાચા હોલસેલ વેપારીઓના WhatsApp લીડ્સ અને ફોન નંબર આપીએ છીએ.\n` +
          `તમે એકવાર અમારો રિપોર્ટ જુઓ, તમને જાતે ફરક દેખાશે."`
      },
      {
        id: 'expensive',
        q: '૩. "બજેટ વધારે છે / બહુ મોંઘું લાગે છે."',
        a: `"સાહેબ, તમે જે પ્રોડક્ટ બનાવો છો એનો ૧ કન્ટેનર કે ૧ લોટ કેટલાનો હોય છે? ઓછામાં ઓછો ₹૨ થી ₹૩ લાખનો!\n\n` +
          `અમારું આખું મંથલી મેનેજમેન્ટ ફક્ત ₹૨૨,૦૦૦ છે. જો આખા મહિનામાં આખી સિસ્ટમમાંથી ફક્ત ૧ પણ વધારાનો નવો કસ્ટમર ક્લોઝ થઈ જાય, તો તમારો આખો ખર્ચ નીકળી જાય અને સીધો ૨૦૦% નફો થાય.\n\n` +
          `આ ખર્ચ નથી સાહેબ, ફેક્ટરી માટે નવો નફો કમાવવાનું રોકાણ છે."`
      },
      {
        id: 'stall',
        q: '૪. "અમે પછી વિચારીને કહીશું / અત્યારે સમય નથી."',
        a: `"ચોક્કસ સાહેબ, ઉતાવળ કરવાની કોઈ જરૂર નથી. \n\n` +
          `હું તમને WhatsApp પર અમારો ૨-પેજનો ઓફિશિયલ પ્રપોઝલ અને તમારી ફેક્ટરીનો ફ્રી ઓડિટ રિપોર્ટ મોકલી દઉં છું. તમે રાત્રે ફ્રી થઈને ફક્ત ૫ મિનિટ જોઈ લેજો.\n\n` +
          `જો તમને યોગ્ય લાગે તો આપણે સોમવારે આગળ વાત કરીશું. તમારો WhatsApp નંબર આ જ છે ને સાહેબ?"`
      },
      {
        id: 'reference',
        q: '૫. "અમારે તો જૂના રેફરન્સ થી જ પૂરતો માલ વેચાઈ જાય છે."',
        a: `"ખૂબ સરસ વાત છે સાહેબ, એ તમારી ક્વોલિટીની સાબિતી છે!\n\n` +
          `પણ સાહેબ, જ્યારે માર્કેટ સ્લો થાય અથવા જૂની પાર્ટી પેમેન્ટ મોડું કરે, ત્યારે નવી વેરિફાઇડ પાર્ટીઓ હાથમાં હોવી ખૂબ જરૂરી છે જેથી ફેક્ટરીનું ઉત્પાદન ક્યારેય અટકે નહિ.\n\n` +
          `અમે તમને આખા ભારતના કેશ અને એડવાન્સ પેમેન્ટ આપતા નવા ખરીદદારો સાથે જોડીએ છીએ."`
      }
    ],

    gatekeeper: `"નમસ્તે મેડમ/સર, મારે ફેક્ટરી ના ઓનર / મેનેજિંગ ડિરેક્ટર સાહેબ સાથે વાત કરવી છે. અમે ગુજરાત ચેમ્બર ઓફ કોમર્સ ના ડેટા મુજબ એમની નવી બલ્ક એક્સપોર્ટ અને ડીલર ઇન્ક્વાયરી બાબતે કનેક્ટ કરી રહ્યા છીએ. લાઈન ટ્રાન્સફર કરી આપશો?"`
  };

  const SCRIPTS_HINDI = {
    openerTitle: '30-सेकंड कोल्ड कॉलिंग ओपनर (Icebreaker Pitch)',
    openerDesc: 'फैक्ट्री ओनर या एमडी से आत्मविश्वास के साथ कॉल शुरू करने के लिए:',
    openerScript: `"नमस्ते सर! मैं ध्रुव राणा बात कर रहा हूँ गुजरात इंडस्ट्रियल कॉरिडोर से।\n\n` +
      `मैं आपका सिर्फ 1 मिनट लूँगा। हम मोरबी, सूरत और अहमदाबाद के प्रमुख मैन्युफैक्चरर्स के लिए डिजिटल मार्केटिंग और मेटा/गूगल ऐड्स के जरिए पूरे भारत से वेरिफ़िएड होलसेल डीलर्स की सीधी इन्क्वायरी लाते हैं।\n\n` +
      `हमने आपकी यूनिट का एनालिसिस किया, अभी आपकी फ़ैक्टरी का काफी बड़ा ऑनलाइन बिज़नेस प्रतियोगी फ़ैक्टरियों के पास जा रहा है। हमने आपके लिए एक 1-पेज का 'फ्री डिजिटल ऑडिट' तैयार किया है। आज शाम 5 बजे 5 मिनट बात हो सकती है?"`,
    
    objections: [
      {
        id: 'offline',
        q: '1. "हमारा काम तो ऑफलाइन ही चलता है, डिजिटल की क्या जरूरत?"',
        a: `"बिल्कुल सही बात है सर, आपका पुराना ऑफलाइन नेटवर्क मजबूत है ही।\n\n` +
          `लेकिन सर, आज मुंबई, दिल्ली या हैदराबाद का कोई भी नया डीलर या बिल्डर किसी के रेफरेंस से पहले गूगल और सोशल मीडिया पर सर्च करता है। अगर आपकी फैक्ट्री वहाँ नहीं दिखेगी, तो वो लाखों का थोक आर्डर सीधे आपके कॉम्पिटिटर को चला जाता है।\n\n` +
          `हम आपका ऑफलाइन काम बंद नहीं कर रहे, बल्कि हर महीने 25-40 नए थोक खरीदार आपकी फैक्ट्री से जोड़ रहे हैं।"`
      },
      {
        id: 'fraud_agency',
        q: '2. "पहले किसी एजेंसी को पैसा दिया था, कोई फायदा नहीं हुआ!"',
        a: `"सर आपका गुस्सा बिल्कुल जायज है। आजकल बहुत सी एजेंसियां सिर्फ इंस्टाग्राम पर फोटो डालकर बैठ जाती हैं, उन्हें B2B मैन्युफैक्चरिंग का कोई आइडिया नहीं होता।\n\n` +
          `हम कोई आम सोशल मीडिया एजेंसी नहीं हैं, हम शुद्ध B2B इंडस्ट्रियल लीड्स पर काम करते हैं:\n` +
          `1. ऐड का पूरा खर्च आपके अपने कार्ड से कटता है (100% पारदर्शिता + GST इनपुट क्रेडिट)।\n` +
          `2. हम लाइक्स नहीं, सीधे होलसेल बायर्स के मोबाइल नंबर और WhatsApp इनक्वायरी देते हैं।\n` +
          `आप हमारा प्रपोजल देखिए, आपको खुद फर्क नजर आ जाएगा।"`
      },
      {
        id: 'expensive',
        q: '3. "बजट ज्यादा है / महंगा लग रहा है।"',
        a: `"सर, आपकी फैक्ट्री से जो 1 कंटेनर या 1 लॉट माल जाता है, उसकी वैल्यू कितनी होती है? कम से कम ₹2 से ₹5 लाख!\n\n` +
          `हमारा पूरा मंथली मैनेजमेंट सिर्फ ₹22,000 है। अगर पूरे महीने में हमारे सिस्टम से सिर्फ 1 नया ग्राहक भी बन गया, तो आपकी पूरी मार्केटिंग फ्री हो गई और ऊपर से 200% शुद्ध मुनाफा हुआ।\n\n` +
          `यह खर्च नहीं, आपकी फैक्ट्री के लिए नया मुनाफा कमाने का इन्वेस्टमेंट है।"`
      },
      {
        id: 'stall',
        q: '4. "हम बाद में सोचकर बताएंगे / अभी समय नहीं है।"',
        a: `"बिल्कुल सर, जल्दबाजी की कोई बात नहीं है।\n\n` +
          `मैं आपको WhatsApp पर हमारी 2-पेज की ऑफिशियल कोटेशन और आपकी फैक्ट्री का डिजिटल ऑडिट भेज देता हूँ। आप रात में फ्री होकर 5 मिनट देख लीजिएगा।\n\n` +
          `अगर आपको सही लगे तो हम सोमवार को 5 मिनट बात करेंगे। क्या यह नंबर WhatsApp पर चालू है सर?"`
      },
      {
        id: 'reference',
        q: '5. "हमारे पास तो रेफरेंस से ही पूरा काम आ जाता है।"',
        a: `"बहुत बढ़िया बात है सर, यह आपकी बेहतरीन क्वालिटी का सबूत है!\n\n` +
          `लेकिन सर, जब कभी मार्केट स्लो होता है या पुरानी पार्टियां पेमेंट में देरी करती हैं, तो नई एक्टिव पार्टियां हाथ में होना बहुत जरूरी है ताकि प्लांट कभी बंद न रहे।\n\n` +
          `हम आपको देश भर के नए कैश और एडवांस पेमेंट वाले खरीदारों से सीधे जोड़ते हैं।"`
      }
    ],

    gatekeeper: `"नमस्ते मैम/सर, मुझे फैक्ट्री के मैनेजिंग डायरेक्टर साहब से बात करनी है। गुजरात चैंबर ऑफ कॉमर्स डायरेक्टरी से हमारे पास उनकी फाइल है और नए बल्क डिस्ट्रीब्यूटर ऑर्डर के सिलसिले में बात करनी है। लाइन कनेक्ट कर दीजिए प्लीज।"'`
  };

  const activeData = lang === 'guj' ? SCRIPTS_GUJARATI : SCRIPTS_HINDI;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden my-auto ${
        isDark ? 'bg-[#0b1120] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Gujarati & Hindi Calling Scripts</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                  OBJECTION BUSTER
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Word-for-Word Native Closing Scripts for Gujarat Industrial Decision Makers
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Switcher Bar */}
        <div className={`px-5 py-2.5 border-b flex items-center justify-between ${
          isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-blue-400" />
            <span>Select Calling Language:</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang('guj')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                lang === 'guj' 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30' 
                  : isDark ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              ગુજરાતી (Gujarati)
            </button>
            <button
              onClick={() => setLang('hin')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                lang === 'hin' 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30' 
                  : isDark ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 max-h-[72vh] overflow-y-auto">
          
          {/* Best Calling Times Box */}
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
            isDark ? 'bg-blue-950/20 border-blue-900/40 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="text-xs">
                <strong>Best Calling Times for Factory Owners:</strong> 11:30 AM – 1:00 PM (Morning review) & 5:00 PM – 6:30 PM (Evening dispatch time).
              </div>
            </div>
          </div>

          {/* Icebreaker Opener */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{activeData.openerTitle}</span>
              </h4>
              <button
                onClick={() => copyScript(activeData.openerScript, 'opener')}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
              >
                {copiedKey === 'opener' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'opener' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">{activeData.openerDesc}</p>
            <div className={`p-3 rounded-lg text-xs leading-relaxed font-sans whitespace-pre-line border ${
              isDark ? 'bg-slate-950 border-slate-800/80 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}>
              {activeData.openerScript}
            </div>
          </div>

          {/* Gatekeeper Bypasser */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reception / Gatekeeper Bypasser (रिसेप्शनिस्ट से ओनर तक पहुँचना)</span>
              </h4>
              <button
                onClick={() => copyScript(activeData.gatekeeper, 'gatekeeper')}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
              >
                {copiedKey === 'gatekeeper' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'gatekeeper' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className={`p-2.5 rounded-lg text-xs leading-relaxed font-sans border ${
              isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              {activeData.gatekeeper}
            </div>
          </div>

          {/* Top 5 Objections List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Top 5 Gujarat Factory Objections & Word-for-Word Answers:
            </h4>

            {activeData.objections.map((obj) => (
              <div 
                key={obj.id}
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-rose-400 leading-snug">
                    {obj.q}
                  </span>
                  <button
                    onClick={() => copyScript(obj.a, obj.id)}
                    className="shrink-0 flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedKey === obj.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === obj.id ? 'Copied' : 'Copy Answer'}</span>
                  </button>
                </div>
                <div className={`p-3 rounded-lg text-xs leading-relaxed font-sans whitespace-pre-line border ${
                  isDark ? 'bg-slate-950/90 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  {obj.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className="text-xs text-slate-400">
            Use these scripts during live calls to close factory owners with confidence.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

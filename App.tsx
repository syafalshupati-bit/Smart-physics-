import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Beaker, 
  Trophy, 
  User, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  LogOut, 
  Lock, 
  Search, 
  Trash2, 
  Download, 
  Plus, 
  Compass, 
  ShieldAlert,
  Menu,
  X,
  Sparkles,
  Send,
  Cpu,
  AlertCircle,
  LifeBuoy,
  Home,
  Eye,
  EyeOff
} from 'lucide-react';
import { allLessons } from './data/lessons';
import { 
  MeasurementLab, 
  QuantityClassifier, 
  DisplacementCarLab, 
  ProjectileLab, 
  EnergyConservationLab, 
  GravityLawLab,
  PhetSimulator
} from './components/Labs';
import { 
  ConversionLab, 
  DimensionalAnalysisLab,
  VectorsLab,
  SpeedLab,
  AccelerationLab,
  KinematicsLab,
  FreeFallLab,
  NewtonLawsLab,
  FrictionLab,
  KineticMolecularTheoryLab
} from './components/PhysicsGames';
import { ActivationCode, StudentScore, School, Teacher, Question } from './types';

// ==================== 1. نظام محاكاة وقواعد بيانات مدمج فوري ====================
// لضمان استمرارية المنصة عند عدم توفر تهيئة الـ Firebase في المتصفح بشكل تلقائي،
// نقوم بدمج آلية إدارة ذكية تعتمد بشكل مشترك على نظام التخزين المحلي والـ Firebase.
const FALLBACK_CODES: ActivationCode[] = [
  { code: "SAYYAF_PHYSICS_2026", status: "active", school: "مدرسة المتفوقين النموذجية" },
  { code: "YEMEN_PHYS_100", status: "active", school: "مرحلة التعليم الثانوي العامة" },
  { code: "STUDENT_FREE_PASS", status: "active", school: "مجمع الثورة التربوي" }
];

export default function App() {
  // --- حالات تسجيل الدخول والترخيص ---
  const [currentUserType, setCurrentUserType] = useState<'guest' | 'student' | 'school' | 'teacher' | 'superadmin'>('guest');
  const [studentName, setStudentName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [activationCodeInput, setActivationCodeInput] = useState('');
  
  // شساشات التحكم والإدارة
  const [selectedSchoolAdmin, setSelectedSchoolAdmin] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [schoolPasswordInput, setSchoolPasswordInput] = useState('');
  const [teacherPasswordInput, setTeacherPasswordInput] = useState('');
  const [showSchoolPassword, setShowSchoolPassword] = useState(false);
  const [showTeacherPassword, setShowTeacherPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  
  // --- تصفح الدروس والمختبرات ---
  const [activeTab, setActiveTab] = useState<'lessons' | 'labs' | 'leaderboard'>('lessons');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  
  // --- حالة الدروس النشطة والأكورديون والامتحان التفاعلي ---
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState<{ [qId: string]: boolean }>({});
  const [lessonSubTab, setLessonSubTab] = useState<'content' | 'lab' | 'quiz'>('content');
  const [labMode, setLabMode] = useState<'local' | 'phet'>('local');

  // --- لوحة التحكم وقواعد البيانات الفورية ---
  const [schools, setSchools] = useState<School[]>([
    { id: "s1", name: "مدرسة ثانوية عبد الناصر" },
    { id: "s2", name: "مجمع الثورة التربوي" },
    { id: "s3", name: "ثانوية جمال عبد الناصر للمتفوقين - صنعاء" },
    { id: "s4", name: "مدرسة المتفوقين النموذجية" }
  ]);
  const [activationCodes, setActivationCodes] = useState<ActivationCode[]>([]);
  const [scores, setScores] = useState<StudentScore[]>([]);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newCodeSchool, setNewCodeSchool] = useState('');
  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
  const [teacherSelectedSchool, setTeacherSelectedSchool] = useState('');

  // ==================== الحالات الجديدة لثمرات تطوير 2026 ====================
  // 1. المساعد المنهجي الذكي للحوار
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'أهلاً بك يا غالي في محراب الفيزياء والعلوم المنهجية المطور! أنا المساعد الفيزيائي الخاص بك بتوجيهات الأستاذ القدير سياف الشباطي.\nكيف يمكنني إثراء عقلك الفضولي اليوم؟ يمكنك سؤالي عن أي مفهوم فيزيائي، أو استخدام الأزرار السريعة التفاعلية بالأسفل لبدء شرح مفهوم، أو حل مسألة، أو اقتراح تجربة منزلية آمنة!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);

  // 2. الاختبار التكيفي التفاعلي
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [adaptiveCount, setAdaptiveCount] = useState<number>(5);
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<Question[]>([]);
  const [adaptiveCurrentIndex, setAdaptiveCurrentIndex] = useState<number>(0);
  const [adaptiveAnswers, setAdaptiveAnswers] = useState<{ [qId: string]: string }>({});
  const [adaptiveSubmitted, setAdaptiveSubmitted] = useState<boolean>(false);
  const [adaptiveScore, setAdaptiveScore] = useState<number>(0);
  const [adaptiveWrongAnswersReport, setAdaptiveWrongAnswersReport] = useState<{ question: Question; studentAnswer: string; explain: string }[]>([]);

  // 3. ملف الإنجاز العلمي
  const [xpPoints, setXpPoints] = useState<number>(120); // نقاط افتراضية لبدء التحصيل
  const [completedLabs, setCompletedLabs] = useState<string[]>([]);
  const [incorrectQuestionsLog, setIncorrectQuestionsLog] = useState<{ question: Question; studentAnswer: string; lessonTitle: string }[]>([]);
  const [completedQuestsToday, setCompletedQuestsToday] = useState<string[]>([]);
  
  const handleLabComplete = (xpEarned: number, labId: string) => {
    if (completedLabs.includes(labId)) return;
    const newLabs = [...completedLabs, labId];
    const newXp = xpPoints + xpEarned;
    setCompletedLabs(newLabs);
    setXpPoints(newXp);
    localStorage.setItem('sayyaf_student_portfolio', JSON.stringify({
      xpPoints: newXp,
      completedLabs: newLabs,
      incorrectQuestionsLog,
      completedQuestsToday
    }));
  };
  
  // --- العلامة المائية العائمة الذكية لدواعي الأمان والسرقة ---
  const [watermarkPos, setWatermarkPos] = useState({ top: '30%', left: '20%' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- جلب وحفظ البيانات عند بدء التشغيل التفاعلي ---
  useEffect(() => {
    // تحميل الأكواد والنتائج من التخزين المحلي للحفاظ على العمل دون انقطاع
    const storedCodes = localStorage.getItem('sayyaf_activation_codes');
    if (storedCodes) {
      setActivationCodes(JSON.parse(storedCodes));
    } else {
      localStorage.setItem('sayyaf_activation_codes', JSON.stringify(FALLBACK_CODES));
      setActivationCodes(FALLBACK_CODES);
    }

    const storedScores = localStorage.getItem('sayyaf_student_scores');
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }

    // تحميل ملف الإنجاز والنشاطات للطالب
    const storedPortfolio = localStorage.getItem('sayyaf_student_portfolio');
    if (storedPortfolio) {
      const parsed = JSON.parse(storedPortfolio);
      if (parsed.xpPoints !== undefined) setXpPoints(parsed.xpPoints);
      if (parsed.completedLabs) setCompletedLabs(parsed.completedLabs);
      if (parsed.incorrectQuestionsLog) setIncorrectQuestionsLog(parsed.incorrectQuestionsLog);
      if (parsed.completedQuestsToday) setCompletedQuestsToday(parsed.completedQuestsToday);
    }

    // التحقق من حالة تسجيل دخول الطالب السابقة
    const cachedStudent = localStorage.getItem('sayyaf_current_student');
    if (cachedStudent) {
      const parsed = JSON.parse(cachedStudent);
      setStudentName(parsed.name);
      setStudentSchool(parsed.school);
      setStudentCode(parsed.code);
      setCurrentUserType('student');
    }

    // تدوير العلامة المائية عشوائياً لمنع برامج تصوير الشاشة
    const interval = setInterval(() => {
      const topRandom = Math.floor(Math.random() * 70) + 15;
      const leftRandom = Math.floor(Math.random() * 60) + 10;
      setWatermarkPos({ top: `${topRandom}%`, left: `${leftRandom}%` });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // إضافة كود جديد للتحكم المحلي وقواعد البيانات
  const saveCodesToStorage = (updated: ActivationCode[]) => {
    setActivationCodes(updated);
    localStorage.setItem('sayyaf_activation_codes', JSON.stringify(updated));
  };

  const saveScoresToStorage = (updated: StudentScore[]) => {
    setScores(updated);
    localStorage.setItem('sayyaf_student_scores', JSON.stringify(updated));
  };

  // --- دوال التسجيل والدخول والتحقق من التراخيص ---
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("⚠️ الرجاء إدخال اسمك الكريم كاملاً!");
      return;
    }
    if (!studentSchool) {
      alert("⚠️ الرجاء اختيار مدرستك الثانوية أو تصنيف دراستك.");
      return;
    }

    // التحقق من كود التفعيل لضمان المحافظة على الملكية الفكرية
    const matchedCode = activationCodes.find(
      c => c.code.trim().toUpperCase() === activationCodeInput.trim().toUpperCase()
    );

    if (!matchedCode) {
      alert("❌ كود التفعيل المدخل غير صحيح! يرجى الحصول على كود من الأستاذ سياف الشباطي أو إدارة مدرستك.");
      return;
    }

    // تسجيل الدخول بنجاح
    setStudentCode(matchedCode.code);
    setCurrentUserType('student');
    
    const studentInfo = { name: studentName, school: studentSchool, code: matchedCode.code };
    localStorage.setItem('sayyaf_current_student', JSON.stringify(studentInfo));

    // تحديث كود التفعيل ليكون مستعملاً
    const updatedCodes = activationCodes.map(c => 
      c.code === matchedCode.code ? { ...c, status: 'used' as const, usedBy: studentName } : c
    );
    saveCodesToStorage(updatedCodes);
  };

  const handleAdminLogin = (role: 'school' | 'teacher' | 'superadmin') => {
    if (role === 'superadmin') {
      if (adminPasswordInput === 'SAYYAF_ADMIN_2026') {
        setCurrentUserType('superadmin');
        setAdminPasswordInput('');
      } else {
        alert("❌ كلمة مرور المدير العام غير صحيحة مطلقاً!");
      }
    } else if (role === 'school') {
      if (!selectedSchoolAdmin) {
        alert("⚠️ يرجى تحديد مدرسة أولاً!");
        return;
      }
      if (schoolPasswordInput === 'SCHOOL_SECURE') {
        setStudentSchool(selectedSchoolAdmin);
        setCurrentUserType('school');
        setSchoolPasswordInput('');
      } else {
        alert("❌ كلمة المرور الخاصة بالمدرسة غير صحيحة!");
      }
    } else if (role === 'teacher') {
      if (teacherPasswordInput === 'TEACHER_SECURE') {
        setCurrentUserType('teacher');
        setTeacherPasswordInput('');
      } else {
        alert("❌ كلمة مرور المعلم غير مرخصة!");
      }
    }
  };

  const handleLogout = () => {
    if (currentUserType === 'student') {
      localStorage.removeItem('sayyaf_current_student');
    }
    setCurrentUserType('guest');
    setSelectedLessonId(null);
  };

  // --- تصفح ومطالعة وتدقيق الدروس الثانوية المعتمدة ---
  const filteredLessons = allLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lesson.accordionData.some(a => a.title.includes(searchTerm) || a.content.includes(searchTerm));
    const matchesUnit = selectedUnit === 'all' || lesson.unit === selectedUnit;
    return matchesSearch && matchesUnit;
  });

  const selectedLesson = allLessons.find(l => l.id === selectedLessonId);

  const toggleAccordion = (title: string) => {
    setOpenAccordions(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // --- معالج نظام الامتحانات وتأكيد النتائج الفوري ---
  const handleAnswerSelect = (qId: string, option: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleQuizSubmit = (lessonId: string) => {
    if (!selectedLesson) return;
    
    // حساب كمية الإجابات وسرعة الدقة
    let scoreCount = 0;
    selectedLesson.questions.forEach(q => {
      const isCorrect = q.type === 'tf' 
        ? quizAnswers[q.id] === q.correct
        : quizAnswers[q.id] === q.correct;
      if (isCorrect) scoreCount++;
    });

    setQuizScore(scoreCount);
    setQuizSubmitted(true);

    // رفع النتيجة إلى لوحة الشرف الفورية وحفظها محلياً
    const newScore: StudentScore = {
      name: studentName || "زائر للمنصة",
      school: studentSchool || "التعليم المباشر الثانوي",
      code: studentCode || "زائر مجاني",
      lessonId: lessonId,
      lessonTitle: selectedLesson.title,
      score: `${scoreCount} / ${selectedLesson.questions.length}`,
      date: new Date().toLocaleString('ar-YE', { hour12: true })
    };

    const updatedScores = [newScore, ...scores];
    saveScoresToStorage(updatedScores);

    // تحديث نقاط الـ XP والتحليل الدراسي علمياً (+20 XP عن كل إجابة صحيحة)
    const earnedXp = scoreCount * 20;
    const newXp = xpPoints + earnedXp;

    // تجميع الأخطاء وإضافتها لسجل المتابعة
    const newLogs = [...incorrectQuestionsLog];
    selectedLesson.questions.forEach(q => {
      const studentAns = quizAnswers[q.id] || "لم يحل";
      const isCorrect = q.correct === studentAns;
      if (!isCorrect) {
        if (!newLogs.some(log => log.question.id === q.id)) {
          newLogs.push({
            question: q,
            studentAnswer: studentAns,
            lessonTitle: selectedLesson.title
          });
        }
      }
    });

    setXpPoints(newXp);
    setIncorrectQuestionsLog(newLogs);
    localStorage.setItem('sayyaf_student_portfolio', JSON.stringify({
      xpPoints: newXp,
      completedLabs,
      incorrectQuestionsLog: newLogs,
      completedQuestsToday
    }));
  };

  // ==================== حزمة الذكاء الاصطناعي والمساعد الفيزيائي المنهجي 2026 ====================
  const handleChatSend = async (customMsg?: string) => {
    const textToSend = customMsg || chatInput;
    if (!textToSend.trim()) return;

    const userMsg = { role: 'user' as const, text: textToSend };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: chatMessages.slice(-6).map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      const data = await response.json();
      if (response.ok) {
        setChatMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'model', text: `⚠️ تنبيه من الخادم: ${data.error || 'فشل الاتصال'}` }]);
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, { role: 'model', text: `❌ تعثر الاتصال بشبكة الذكاء الاصطناعي: ${err.message || err}` }]);
    } finally {
      setChatLoading(false);
    }
  };

  // ==================== محاكي ومحرك الاختبارات التكيفية المخصصة ====================
  const generateAdaptiveQuiz = () => {
    let pool: Question[] = [];
    allLessons.forEach(l => {
      if (l.questions && Array.isArray(l.questions)) {
        l.questions.forEach(q => {
          pool.push({
            ...q,
            id: `adaptive_${l.id}_${q.id}`,
            text: `[${l.title}] ${q.text}`
          });
        });
      }
    });

    let filtered = pool.filter(q => {
      if (adaptiveDifficulty === 'easy') {
        return q.type === 'tf';
      } else if (adaptiveDifficulty === 'medium') {
        return q.type === 'mc' && !q.text.includes('احسب') && !q.text.includes('عجلة') && !q.text.includes('قوة');
      } else {
        return q.type === 'mc' && (q.text.includes('احسب') || q.text.includes('مسافة') || q.text.includes('عجلة') || q.text.includes('سرعة'));
      }
    });

    if (filtered.length < adaptiveCount) {
      filtered = pool;
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, adaptiveCount);

    setAdaptiveQuestions(selected);
    setAdaptiveCurrentIndex(0);
    setAdaptiveAnswers({});
    setAdaptiveSubmitted(false);
    setAdaptiveScore(0);
    setAdaptiveWrongAnswersReport([]);
  };

  const handleAdaptiveAnswerSelect = (qId: string, option: string) => {
    setAdaptiveAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleAdaptiveQuizSubmit = () => {
    if (adaptiveQuestions.length === 0) return;

    let scoreCount = 0;
    const report: any[] = [];
    const newLogs = [...incorrectQuestionsLog];

    adaptiveQuestions.forEach(q => {
      const studentAns = adaptiveAnswers[q.id] || "لم يحل";
      const isCorrect = q.correct.trim() === studentAns.trim();
      if (isCorrect) {
        scoreCount++;
      } else {
        report.push({
          question: q,
          studentAnswer: studentAns,
          explain: q.explain || 'الحل يعتمد على الفهم المفاهيمي ومعادلات الحركة والقياس.'
        });

        if (!newLogs.some(log => log.question.id === q.id)) {
          newLogs.push({
            question: q,
            studentAnswer: studentAns,
            lessonTitle: 'من الاختبار التكيفي'
          });
        }
      }
    });

    setAdaptiveScore(scoreCount);
    setAdaptiveWrongAnswersReport(report);
    setAdaptiveSubmitted(true);

    const difficultyBonus = adaptiveDifficulty === 'hard' ? 100 : adaptiveDifficulty === 'medium' ? 50 : 20;
    const earnedXp = 50 + (scoreCount * 25) + (scoreCount === adaptiveQuestions.length ? difficultyBonus : 0);
    const newXp = xpPoints + earnedXp;

    setXpPoints(newXp);
    setIncorrectQuestionsLog(newLogs);
    localStorage.setItem('sayyaf_student_portfolio', JSON.stringify({
      xpPoints: newXp,
      completedLabs,
      incorrectQuestionsLog: newLogs,
      completedQuestsToday
    }));

    const newScore: StudentScore = {
      name: studentName || "زائر للمنصة",
      school: studentSchool || "التعليم المباشر الثانوي",
      code: studentCode || "زائر مجاني",
      lessonId: `adaptive_${adaptiveDifficulty}`,
      lessonTitle: `🧠 اختبار تكيفي (${adaptiveDifficulty === 'easy' ? 'سهل' : adaptiveDifficulty === 'medium' ? 'متوسط' : 'صعب'})`,
      score: `${scoreCount} / ${adaptiveQuestions.length}`,
      date: new Date().toLocaleString('ar-YE', { hour12: true })
    };
    saveScoresToStorage([newScore, ...scores]);
  };

  // --- توليد وإدارة الأكواد والمدارس التفاعلية ---
  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName.trim()) return;
    const newS: School = {
      id: `s_${Date.now()}`,
      name: newSchoolName.trim()
    };
    setSchools(prev => [...prev, newS]);
    setNewSchoolName('');
    alert("✅ تمت إضافة المدرسة للشعبة بنجاح!");
  };

  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeSchool) {
      alert("⚠️ يرجى تحديد مدرسة لإلحاق كود الترخيص بها.");
      return;
    }
    const randCode = "SAYYAF-" + Math.floor(100000 + Math.random() * 900000);
    const newC: ActivationCode = {
      code: randCode,
      status: 'active',
      school: newCodeSchool
    };
    saveCodesToStorage([newC, ...activationCodes]);
    alert(`🔑 تم توليد الكود الخاص بنجاح: ${randCode}`);
  };

  const handleDeleteScore = (index: number) => {
    if (confirm("🚨 هل أنت متأكد من لزوم حذف هذا التقرير العلمي للطالب؟")) {
      const updated = scores.filter((_, idx) => idx !== index);
      saveScoresToStorage(updated);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 relative pb-12 overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      
      {/* 🛡️ الطبقة الأمنية لحجب تصوير الشاشة والعلامة المائية العائمة */}
      {currentUserType === 'student' && (
        <div 
          className="fixed pointer-events-none select-none text-slate-450/15 text-xs font-mono font-bold z-50 p-2 border border-slate-300/10 rounded-lg bg-slate-100/5 backdrop-blur-[0.5px] transition-all duration-1000 ease-in-out"
          style={{ 
            top: watermarkPos.top, 
            left: watermarkPos.left,
            transform: 'rotate(-12deg)'
          }}
        >
          👤 الطالب: {studentName} <br />
          🏫 المدرسة: {studentSchool} <br />
          🔑 الكود النشط: {studentCode} <br />
          📅 الخصوصية مكفولة © المرجع الذكي
        </div>
      )}

      {/* ==================== راس المنصة والتحاور المباشر ==================== */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-indigo-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Compass className="text-blue-950 stroke-[2.5]" size={22} />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight">منصة المرجع الذكي في الفيزياء</h1>
              <p className="text-[10px] text-yellow-300 font-semibold">تحت إشراف الأستاذ سياف الشباطي – اليمن 🇾🇪</p>
            </div>
          </div>

          {/* تصفح محمول وقوائم منسدلة */}
          <div className="hidden md:flex items-center gap-3">
            {currentUserType !== 'guest' && (
              <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => { setActiveTab('lessons'); setSelectedLessonId(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'lessons' ? 'bg-amber-500 text-blue-950 shadow-md font-black' : 'text-slate-250 hover:bg-white/10'}`}
                >
                  📖 الدروس الـ١٨
                </button>
                <button 
                  onClick={() => setActiveTab('labs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'labs' ? 'bg-amber-500 text-blue-950 shadow-md font-black' : 'text-slate-250 hover:bg-white/10'}`}
                >
                  🧪 المختبرات
                </button>
                <button 
                  onClick={() => { setActiveTab('adaptive_quiz'); generateAdaptiveQuiz(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'adaptive_quiz' ? 'bg-amber-500 text-blue-950 shadow-md font-black' : 'text-slate-250 hover:bg-white/10'}`}
                >
                  🧠 اختبار تكيفي
                </button>
                <button 
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'portfolio' ? 'bg-amber-500 text-blue-950 shadow-md font-black' : 'text-slate-250 hover:bg-white/10'}`}
                >
                  🎖️ ملف الإنجاز
                </button>
                <button 
                  onClick={() => setActiveTab('chatbot')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'chatbot' ? 'bg-amber-500 text-blue-950 shadow-md font-black' : 'text-slate-250 hover:bg-white/10'}`}
                >
                  💬 مساعد سياف AI
                </button>
                <button 
                  onClick={() => setActiveTab('leaderboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'leaderboard' ? 'bg-amber-500 text-blue-950 shadow-md font-black' : 'text-slate-250 hover:bg-white/10'}`}
                >
                  🏆 لوحة الشرف
                </button>
              </div>
            )}

            {currentUserType !== 'guest' ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1.5 pl-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-650/40 border border-indigo-400 flex items-center justify-center text-xs font-bold">
                  {currentUserType === 'superadmin' ? 'مدير' : currentUserType === 'school' ? 'مدرسة' : currentUserType === 'teacher' ? 'معلم' : 'طالب'}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold leading-tight max-w-[120px] truncate">{studentName || 'الإدارة الكبرى'}</div>
                  <div className="text-[9px] text-indigo-300">{studentSchool || 'صلاحيات كاملة'}</div>
                </div>
                {currentUserType === 'student' && (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-amber-550 hover:bg-amber-500 text-slate-900 px-2 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition-colors active:scale-95 shadow-sm"
                    title="العودة إلى بوابة المنصة"
                  >
                    <Home size={11} className="stroke-[2.5]" />
                    <span>بوابة المنصة 🏠</span>
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  title="تسجيل الخروج الآمن"
                  className="p-1.5 text-rose-450 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <span className="text-[11px] font-bold text-yellow-300">🎓 سجل دخولك لتفعيل الحزمة الكاملة والدروس الـ١٨</span>
            )}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* القائمة المحمولة المنسدلة للطلاب على الهواتف */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-indigo-900 text-white px-4 py-3 space-y-2 z-35 relative" dir="rtl">
          {currentUserType !== 'guest' && (
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={() => { setActiveTab('lessons'); setSelectedLessonId(null); setMobileMenuOpen(false); }}
                className={`text-right px-3 py-2 text-xs font-bold rounded-lg ${activeTab === 'lessons' ? 'bg-amber-500 text-blue-950 font-black' : 'hover:bg-white/5'}`}
              >
                📖 الدروس المنهجية الـ١٨
              </button>
              <button 
                onClick={() => { setActiveTab('labs'); setMobileMenuOpen(false); }}
                className={`text-right px-3 py-2 text-xs font-bold rounded-lg ${activeTab === 'labs' ? 'bg-amber-500 text-blue-950 font-black' : 'hover:bg-white/5'}`}
              >
                🧪 المختبرات التفاعلية الستة
              </button>
              <button 
                onClick={() => { setActiveTab('adaptive_quiz'); generateAdaptiveQuiz(); setMobileMenuOpen(false); }}
                className={`text-right px-3 py-2 text-xs font-bold rounded-lg ${activeTab === 'adaptive_quiz' ? 'bg-amber-500 text-blue-950 font-black' : 'hover:bg-white/5'}`}
              >
                🧠 الاختبار التكيفي الذكي
              </button>
              <button 
                onClick={() => { setActiveTab('portfolio'); setMobileMenuOpen(false); }}
                className={`text-right px-3 py-2 text-xs font-bold rounded-lg ${activeTab === 'portfolio' ? 'bg-amber-500 text-blue-950 font-black' : 'hover:bg-white/5'}`}
              >
                🎖️ ملف الإنجاز الشامل
              </button>
              <button 
                onClick={() => { setActiveTab('chatbot'); setMobileMenuOpen(false); }}
                className={`text-right px-3 py-2 text-xs font-bold rounded-lg ${activeTab === 'chatbot' ? 'bg-amber-500 text-blue-950 font-black' : 'hover:bg-white/5'}`}
              >
                💬 المساعد المنهجي سياف AI
              </button>
              <button 
                onClick={() => { setActiveTab('leaderboard'); setMobileMenuOpen(false); }}
                className={`text-right px-3 py-2 text-xs font-bold rounded-lg ${activeTab === 'leaderboard' ? 'bg-amber-500 text-blue-950 font-black' : 'hover:bg-white/5'}`}
              >
                🏆 لوحة الصدارة والشرف
              </button>
              <div className="border-t border-slate-800 my-1 pt-2 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold">{studentName || 'الإدارة'}</div>
                  <div className="text-[10px] text-slate-400">{studentSchool}</div>
                </div>
                <button 
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                  className="flex items-center gap-1 bg-amber-500 text-blue-950 hover:bg-amber-450 hover:scale-[1.02] p-2 rounded-xl text-xs font-black cursor-pointer transition-all active:scale-95 shadow-sm"
                >
                  <Home size={12} className="stroke-[2.5]" />
                  <span>بوابة المنصة 🏠</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== محتوى الصفحة الرئيسي ==================== */}
      <main className="max-w-7xl mx-auto px-4 mt-6">

        {/* ==================== بوابات الدخول الأربع (للوافد الجديد) ==================== */}
        {currentUserType === 'guest' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-6 animate-fade-in">
            
            {/* بوابة الطالب اليمني المحورية */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <User size={18} />
                </div>
                <h3 className="font-black text-slate-900 text-base">🎓 بوابة دخول الطالب الثانوية العليا</h3>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                مرحباً بك يا غالي في حزمة الفيزياء المتكاملة! يرجى إدخال اسمك الحقيقي، واختيار مدرستك وكود التفعيل الخاص بك للدخول إلى ١٠ دروس مع امتحانات وسحب النتائج.
              </p>

              <form onSubmit={handleStudentLogin} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">👤 الاسم الكامل للطالب (رباعي):</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="مثال: يوسف مأمون بن محمد الشباطي"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none rounded-xl p-3 text-sm text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">🏫 المدرسة الثانوية:</label>
                    <select
                      value={studentSchool}
                      onChange={(e) => setStudentSchool(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none rounded-xl p-3 text-xs text-slate-700 appearance-none bg-no-repeat bg-left"
                    >
                      <option value="">-- اختر مدرستك --</option>
                      {schools.map(sch => (
                        <option key={sch.id} value={sch.name}>{sch.name}</option>
                      ))}
                      <option value="التعليم الذاتي والثانوية الخارجية">التعليم الذاتي والثانوية الخارجية</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">🔑 كود التفعيل المستلم:</label>
                    <input
                      type="text"
                      required
                      value={activationCodeInput}
                      onChange={(e) => setActivationCodeInput(e.target.value)}
                      placeholder="SAYYAF_PHYS_XXXX"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none rounded-xl p-3 text-sm font-mono text-center text-indigo-900 font-bold tracking-wider placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-500/10 cursor-pointer active:scale-95 transition-transform"
                >
                  تأكيد التفعيل والدخول الآمن للمقرر 🚀
                </button>
              </form>
            </div>

            {/* بوابات الكوادر والمنسقين والإدارة */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* دليل توجيهات تسجيل الدخول والرموز السرية */}
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 space-y-2.5 text-slate-800 text-xs shadow-sm shadow-amber-500/5 animate-fade-in" dir="rtl">
                <div className="flex items-center gap-2 font-black text-amber-950">
                  <Sparkles size={15} className="text-amber-600 animate-pulse" />
                  <span className="text-xs">💡 دليل الإرشاد وكشف رموز الدخول للمدارس والمعلمين:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  للدخول بنجاح، يرجى كتابة الرموز المخصصة أدناه. يمكنك النقر على رمز العين <Eye size={12} className="inline mx-0.5 text-slate-500" /> لإظهار ما تكتبه ورؤيته مباشرة من رصد الأمان المدمج:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[10.5px] mt-1" dir="rtl">
                  <div className="bg-white/70 p-2.5 rounded-xl border border-amber-100/70 flex flex-col justify-between">
                    <span className="font-extrabold text-indigo-900 block mb-1">🏫 منسق المدرسة:</span>
                    <span className="font-mono bg-indigo-50/50 text-indigo-800 px-1.5 py-1 rounded text-[10px] font-bold text-center select-all">SCHOOL_SECURE</span>
                  </div>
                  <div className="bg-white/70 p-2.5 rounded-xl border border-amber-100/70 flex flex-col justify-between">
                    <span className="font-extrabold text-amber-900 block mb-1">👨‍🏫 مجلس المعلمين:</span>
                    <span className="font-mono bg-amber-100/50 text-amber-800 px-1.5 py-1 rounded text-[10px] font-bold text-center select-all">TEACHER_SECURE</span>
                  </div>
                  <div className="bg-white/70 p-2.5 rounded-xl border border-amber-100/70 flex flex-col justify-between">
                    <span className="font-extrabold text-rose-900 block mb-1">⚙️ المالك / سياف:</span>
                    <span className="font-mono bg-rose-50/50 text-rose-800 px-1.5 py-1 rounded text-[10px] font-bold text-center select-all">SAYYAF_ADMIN_2026</span>
                  </div>
                </div>
              </div>

              {/* بوابات المشرفين والمعلمين */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-amber-500" />
                  <h4 className="font-bold text-slate-800 text-sm">🏫 بوابات تسجيل مدارس ومعلمي الجمهورية</h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* المدارس */}
                  <div className="p-4 rounded-2xl bg-slate-50 space-y-2 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="font-extrabold text-indigo-900 block">منسق المدرسة الثانوية</span>
                      <p className="text-[10px] text-slate-500 mb-2">مراجعة كشوفات طلاب مدرستك الثانوية مباشرة وبدقة.</p>
                      <select
                        value={selectedSchoolAdmin}
                        onChange={(e) => setSelectedSchoolAdmin(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs mb-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                      >
                        <option value="">-- اختر المدرسة --</option>
                        {schools.map(sch => (
                          <option key={sch.id} value={sch.name}>{sch.name}</option>
                        ))}
                      </select>
                      <div className="relative">
                        <input
                          type={showSchoolPassword ? "text" : "password"}
                          placeholder="🔑 رمز مرور المنسق..."
                          value={schoolPasswordInput}
                          onChange={(e) => setSchoolPasswordInput(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-lg p-2 pl-9 text-xs text-center font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSchoolPassword(!showSchoolPassword)}
                          className="absolute left-2.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                          title={showSchoolPassword ? "إخفاء رمز المرور" : "إظهار رمز المرور"}
                        >
                          {showSchoolPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdminLogin('school')}
                      className="w-full py-2 bg-indigo-700 hover:bg-indigo-650 text-white rounded-lg font-bold block text-center mt-2 cursor-pointer transition-colors"
                    >
                      دخول منسق المدرسة
                    </button>
                  </div>

                  {/* المعلم */}
                  <div className="p-4 rounded-2xl bg-amber-50/50 space-y-2 border border-amber-100 flex flex-col justify-between">
                    <div>
                      <span className="font-extrabold text-amber-900 block">👨‍🏫 مجلس التوجيه والمعلمين</span>
                      <p className="text-[10px] text-slate-500 mb-2">معاينة رصد العلامات العامة وتصحيح التخطيط الصفي.</p>
                      <div className="relative">
                        <input
                          type={showTeacherPassword ? "text" : "password"}
                          placeholder="🔑 كلمة مرور المعلم..."
                          value={teacherPasswordInput}
                          onChange={(e) => setTeacherPasswordInput(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-amber-500 outline-none rounded-lg p-2 pl-9 text-xs text-center font-bold mb-1"
                        />
                        <button
                          type="button"
                          onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                          className="absolute left-2.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                          title={showTeacherPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                        >
                          {showTeacherPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdminLogin('teacher')}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-505 text-white rounded-lg font-bold cursor-pointer block text-center mt-2 transition-colors"
                    >
                      بوابة المعلم الفورية
                    </button>
                  </div>
                </div>
              </div>

              {/* بوابة الإدارة العليا والمالك للأستاذ سياف الشباطي */}
              <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl space-y-3 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-505/10 rounded-full" />
                <div className="flex items-center gap-2">
                  <Settings size={16} className="text-yellow-400" />
                  <h4 className="font-bold text-sm text-yellow-300">⚙️ بوابة الإدارة العليا للاختبارات والمزامنة</h4>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  توليد أكواد الترخيص الأكاديمية وصيانة المدارس ومراجعة التقارير المالية لليمن.
                </p>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <input
                      type={showAdminPassword ? "text" : "password"}
                      placeholder="رمز المرور الكلي للإدارة والمكتب..."
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 pl-9 text-xs text-white outline-none focus:border-yellow-450"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute left-2.5 top-2.5 text-slate-450 hover:text-slate-200 transition-colors"
                      title={showAdminPassword ? "إخفاء رمز المرور" : "إظهار رمز المرور"}
                    >
                      {showAdminPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleAdminLogin('superadmin')}
                    className="p-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black rounded-lg text-xs"
                  >
                    دخول المالك الرئيسي
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== الشاشة والواجهات الداخلية للتطبيق النشط ==================== */}
        {currentUserType !== 'guest' && (
          <div className="space-y-6">

            {/* الأقسام لغير المتصفح العادي */}
            <div className="flex md:hidden bg-white rounded-xl border border-slate-100 p-1 shadow-sm gap-1 overflow-x-auto whitespace-nowrap scrollbar-none text-xs font-bold" dir="rtl">
              <button 
                onClick={() => { setActiveTab('lessons'); setSelectedLessonId(null); }}
                className={`px-3.5 py-2 rounded-lg flex-shrink-0 ${activeTab === 'lessons' ? 'bg-indigo-600 text-white' : 'text-slate-650 hover:bg-slate-50'}`}
              >
                📖 الدروس
              </button>
              <button 
                onClick={() => setActiveTab('labs')}
                className={`px-3.5 py-2 rounded-lg flex-shrink-0 ${activeTab === 'labs' ? 'bg-indigo-600 text-white' : 'text-slate-650 hover:bg-slate-50'}`}
              >
                🧪 المختبرات
              </button>
              <button 
                onClick={() => { setActiveTab('adaptive_quiz'); generateAdaptiveQuiz(); }}
                className={`px-3.5 py-2 rounded-lg flex-shrink-0 ${activeTab === 'adaptive_quiz' ? 'bg-indigo-600 text-white' : 'text-slate-650 hover:bg-slate-50'}`}
              >
                🧠 تكيفي
              </button>
              <button 
                onClick={() => setActiveTab('portfolio')}
                className={`px-3.5 py-2 rounded-lg flex-shrink-0 ${activeTab === 'portfolio' ? 'bg-indigo-600 text-white' : 'text-slate-650 hover:bg-slate-50'}`}
              >
                🎖️ الإنجاز
              </button>
              <button 
                onClick={() => setActiveTab('chatbot')}
                className={`px-3.5 py-2 rounded-lg flex-shrink-0 ${activeTab === 'chatbot' ? 'bg-indigo-600 text-white' : 'text-slate-650 hover:bg-slate-50'}`}
              >
                💬 ذكي AI
              </button>
              <button 
                onClick={() => setActiveTab('leaderboard')}
                className={`px-3.5 py-2 rounded-lg flex-shrink-0 ${activeTab === 'leaderboard' ? 'bg-indigo-600 text-white' : 'text-slate-650 hover:bg-slate-50'}`}
              >
                🏆 الشرف
              </button>
            </div>

            {/* ==================== شاشة الدرس التفصيلية (الأولوية الأولى) ==================== */}
            {activeTab === 'lessons' && (
              <div className="space-y-6">
                
                {/* 1. مصفوفة الدروس والوحدات (الوضع الرئيسي للبدء) */}
                {selectedLessonId === null ? (
                  <div className="space-y-8 animate-fade-in" dir="rtl">
                    
                    {/* لوحة ترحيبية وإرشادية مميزة لطالب الفيزياء */}
                    <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800">
                      <div className="absolute top-0 left-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl translate-x-12 -translate-y-12" />
                      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-x-24 translate-y-24" />
                      
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-3 text-right">
                          <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-300 text-xs px-3 py-1 rounded-full font-bold">
                            <Sparkles size={12} />
                            <span>نظام محاكاة معزز بالكامل وملخصات علمية</span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black leading-tight">مصفوفة الفيزياء الوطنية في جيبك 🇾🇪</h3>
                          <p className="text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
                            يا أهلاً بك يا بطل! اختر الدرس المطلوب لتدخل بيئة الدراسة المتكاملة حيث يمكنك مطالعة الشرح المنهجي، ودمج تجارب المختبر الافتراضي، واختبار فهمك فوراً.
                          </p>
                          {currentUserType === 'student' && (
                            <div className="pt-2">
                              <button 
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-blue-950 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95 text-right w-full sm:w-auto justify-center"
                              >
                                <Home size={14} className="stroke-[2.5]" />
                                <span>العودة إلى بوابة المنصة 🏠</span>
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-4">
                          <div className="p-4 bg-white/10 rounded-2xl text-center border border-white/10 min-w-[100px]">
                            <span className="block text-xl font-bold text-yellow-300">١٨</span>
                            <span className="text-[10px] text-slate-300 font-bold">درساً معتمداً</span>
                          </div>
                          <div className="p-4 bg-white/10 rounded-2xl text-center border border-white/10 min-w-[100px]">
                            <span className="block text-xl font-bold text-teal-300">٦</span>
                            <span className="text-[10px] text-slate-300 font-bold">مختبرات تفاعلية</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* محرك بحث وتصفية للوصول السريع للمصفوفة */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <div className="relative w-full md:w-96">
                        <Search className="absolute right-3.5 top-3.5 text-slate-400" size={16} />
                        <input
                          type="text"
                          placeholder="ابحث بمحتوى أو عنوان للوصول السريع..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white transition-colors outline-none rounded-xl pr-10 pl-4 py-3 text-xs text-slate-700 font-medium placeholder:text-slate-400"
                        />
                      </div>
                      <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1" dir="rtl">
                        {[
                          { id: 'all', label: 'كافة الوحدات' },
                          { id: 'unit1', label: 'وحدة ١: أساسيات' },
                          { id: 'unit2', label: 'وحدة ٢: حركة خطية' },
                          { id: 'unit3', label: 'وحدة ٣: ميكانيكا وجاذبية' },
                          { id: 'unit4', label: 'وحدة ٤: شغل وطاقة وموجات' }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setSelectedUnit(tab.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                              selectedUnit === tab.id 
                                ? 'bg-indigo-650 text-white shadow shadow-indigo-500/10' 
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* مصفوفة الكروت والوحدات كلياً */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { 
                          id: 'unit1', 
                          title: 'الوحدة الأولى: أساسيات علم الفيزياء وتطبيقاتها', 
                          color: 'from-blue-600 to-indigo-700', 
                          borderColor: 'border-blue-100',
                          bgCol: 'bg-blue-50/10'
                        },
                        { 
                          id: 'unit2', 
                          title: 'الوحدة الثانية: الحركة في خط مستقيم والسرعات', 
                          color: 'from-cyan-600 to-sky-700', 
                          borderColor: 'border-cyan-100',
                          bgCol: 'bg-cyan-50/10'
                        },
                        { 
                          id: 'unit3', 
                          title: 'الوحدة الثالثة: الميكانيكا ومعادلات قوانين الحركة', 
                          color: 'from-rose-600 to-amber-700', 
                          borderColor: 'border-rose-100',
                          bgCol: 'bg-rose-50/10'
                        },
                        { 
                          id: 'unit4', 
                          title: 'الوحدة الرابعة: الشغل، الطاقة الميكانيكية والموجات', 
                          color: 'from-emerald-600 to-teal-700', 
                          borderColor: 'border-emerald-100',
                          bgCol: 'bg-emerald-50/10'
                        }
                      ].filter(u => selectedUnit === 'all' || u.id === selectedUnit).map(unitObj => {
                        const unitLessons = allLessons.filter(l => l.unit === unitObj.id && (
                          l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.accordionData.some(a => a.title.includes(searchTerm) || a.content.includes(searchTerm))
                        ));

                        if (unitLessons.length === 0) return null;

                        return (
                          <div 
                            key={unitObj.id} 
                            className={`bg-white rounded-3xl border ${unitObj.borderColor} p-6 shadow-sm flex flex-col justify-between ${unitObj.bgCol}`}
                          >
                            <div className="space-y-4">
                              {/* ترويسة الوحدة */}
                              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                                <div className="space-y-1 text-right">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">مقرر الفيزياء الحكومي للجمهورية</span>
                                  <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{unitObj.title}</h4>
                                </div>
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${unitObj.color} text-white flex items-center justify-center font-bold text-xs`}>
                                  {unitObj.id === 'unit1' ? '١' : unitObj.id === 'unit2' ? '٢' : unitObj.id === 'unit3' ? '٣' : '٤'}
                                </div>
                              </div>

                              {/* قائمة دروس الوحدة */}
                              <div className="space-y-2.5">
                                {unitLessons.map((l) => {
                                  const hasCustomLab = [
                                    "lesson_2_measurement", "lesson_3_quantities", "lesson_4_conversions",
                                    "lesson_5_dimensional", "lesson_6_vectors_lab", "lesson_7_displacement",
                                    "lesson_8_speed", "lesson_9_acceleration", "lesson_10_kinematics",
                                    "lesson_11_projectiles", "lesson_12_circular", "lesson_13_newton_laws",
                                    "lesson_14_gravity", "lesson_15_work", "lesson_16_energy",
                                    "lesson_17_waves", "lesson_18_sound"
                                  ].includes(l.id);

                                  const labName = 
                                    l.id === "lesson_2_measurement" || l.id === "lesson_4_conversions" || l.id === "lesson_5_dimensional" ? "مختبر أجهزة القياس" :
                                    l.id === "lesson_3_quantities" ? "تحدي تصنيف الكميات" :
                                    ["lesson_6_vectors_lab", "lesson_7_displacement", "lesson_8_speed", "lesson_9_acceleration", "lesson_10_kinematics"].includes(l.id) ? "مختبر المسافة والإزاحة" :
                                    l.id === "lesson_11_projectiles" ? "مختبر المقذوفات في بعدين" :
                                    ["lesson_12_circular", "lesson_13_newton_laws", "lesson_14_gravity"].includes(l.id) ? "مختبر الجاذبية الكونية" : "مختبر حفظ الطاقة والحركة";

                                  return (
                                    <button
                                      key={l.id}
                                      onClick={() => {
                                        setSelectedLessonId(l.id);
                                        setLessonSubTab('content');
                                        setQuizAnswers({});
                                        setQuizSubmitted(false);
                                      }}
                                      className="w-full text-right p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                                    >
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-slate-400 font-bold block">الدرس {l.order}:</span>
                                        <span className="text-xs font-bold text-slate-800 leading-normal group-hover:text-indigo-950 transition-colors">
                                          {l.title.split(': ')[1] || l.title}
                                        </span>
                                        
                                        {/* ترويسة المعمل المدمج */}
                                        {hasCustomLab && (
                                          <span className="inline-flex items-center gap-1 text-[9px] text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md font-bold mt-1 shadow-sm">
                                            <Beaker size={10} className="stroke-[2.5]" />
                                            <span>مختبر مدمج: {labName}</span>
                                          </span>
                                        )}
                                      </div>
                                      
                                      <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-650 transition-colors">
                                        <Sparkles size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                ) : (
                  
                  // 2. بيئة عمل الشرح المنهجي والمختبر والامتحان معاً (عند الدخول لدرس معين)
                  <div className="space-y-6" dir="rtl">
                    
                    {/* شريط الإجراءات والتحويل العلوي المدمج */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                      
                      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <button
                          onClick={() => setSelectedLessonId(null)}
                          className="w-full sm:w-auto px-4 py-2.5 hover:bg-rose-50 text-rose-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-rose-50/50 border border-rose-100 active:scale-95 animate-fade-in"
                        >
                          <span>◀ العودة لمصفوفة الوحدات والدروس الكبرى</span>
                        </button>
                        {currentUserType === 'student' && (
                          <button
                            onClick={handleLogout}
                            className="w-full sm:w-auto px-4 py-2.5 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 active:scale-95 animate-fade-in"
                          >
                            <Home size={13} className="text-slate-500 stroke-[2.5]" />
                            <span>بوابة المنصة 🏠</span>
                          </button>
                        )}
                      </div>

                      {/* التبويبات الثلاثة التفاعلية الفخمة */}
                      <div className="flex bg-slate-50 border border-slate-200 rounded-2xl p-1 gap-1 text-center font-bold text-xs w-full md:w-auto" dir="rtl">
                        <button
                          onClick={() => setLessonSubTab('content')}
                          className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                            lessonSubTab === 'content' 
                              ? 'bg-indigo-700 text-white shadow-md font-black' 
                              : 'text-slate-600 hover:bg-slate-150'
                          }`}
                        >
                          📖 الشرح والبيان
                        </button>
                        <button
                          onClick={() => setLessonSubTab('lab')}
                          className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            lessonSubTab === 'lab' 
                              ? 'bg-indigo-700 text-white shadow-md font-black' 
                              : 'text-slate-600 hover:bg-slate-150'
                          }`}
                        >
                          <Beaker size={13} className="stroke-[2.5]" />
                          <span>🔬 المختبر الفيزيائي</span>
                        </button>
                        <button
                          onClick={() => setLessonSubTab('quiz')}
                          className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                            lessonSubTab === 'quiz' 
                              ? 'bg-indigo-700 text-white shadow-md font-black' 
                              : 'text-slate-600 hover:bg-slate-150'
                          }`}
                        >
                          ✍️ اختبار الفهم
                        </button>
                      </div>

                    </div>

                    {/* لوحة العرض النشطة تتبع الفرع المحدد */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
                      
                      <div className="border-b border-indigo-100 pb-4 text-right">
                        <span className="text-[10px] font-black tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                          {selectedLesson.unitTitle} – الفئة {selectedLesson.order}
                        </span>
                        <h2 className="text-base md:text-lg font-black text-slate-900 mt-2">
                          {selectedLesson.title}
                        </h2>
                      </div>

                      {/* التبويب الأول: الشرح والبيان */}
                      {lessonSubTab === 'content' && (
                        <div className="space-y-6 text-right">
                          <div className="space-y-3">
                            <h4 className="font-extrabold text-xs text-slate-500">📖 الأقسام والمطالعات المنهجية المعتمدة للدرس:</h4>
                            {selectedLesson.accordionData.map((data, index) => (
                              <div key={index} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                <button
                                  onClick={() => toggleAccordion(data.title)}
                                  className="w-full text-right p-4 bg-slate-50/50 hover:bg-slate-50 font-bold text-slate-800 text-sm flex items-center justify-between"
                                >
                                  <span>{data.title}</span>
                                  {openAccordions[data.title] ? <ChevronUp size={16} className="text-indigo-600" /> : <ChevronDown size={16} className="text-slate-400" />}
                                </button>
                                {openAccordions[data.title] && (
                                  <div 
                                    className="p-4 bg-white text-xs text-slate-650 leading-relaxed border-t border-slate-100 whitespace-pre-line font-medium select-text"
                                    dangerouslySetInnerHTML={{ __html: data.content }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>

                          {/* الوقفات والتدبرات الإيمانية لربط العلم بالإيمان لطلاب الثانوي اليمنيين */}
                          {selectedLesson.islamicReflections && selectedLesson.islamicReflections.length > 0 && (
                            <div className="bg-gradient-to-r from-teal-50 to-emerald-50/30 border border-teal-100 p-5 rounded-2xl space-y-3 shadow-inner">
                              <h5 className="font-extrabold text-teal-900 text-xs flex items-center gap-1.5">
                                <Sparkles size={14} className="text-teal-600 animate-pulse" />
                                <span>وقفة تفكر إيمانية بكون الله وحفْظِ موازينه:</span>
                              </h5>
                              {selectedLesson.islamicReflections.map((refStr, idx) => (
                                <p key={idx} className="text-xs text-teal-850 italic leading-relaxed">
                                  {refStr}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* التبويب الثاني: المختبر الفيزيائي التفاعلي المدمج مباشرة بالدرس */}
                      {lessonSubTab === 'lab' && (
                        <div className="space-y-6">
                          <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl flex items-center justify-between gap-4 text-right">
                            <div>
                              <h4 className="font-extrabold text-teal-900 text-xs flex items-center gap-1.5">
                                <Beaker size={14} className="text-teal-700 stroke-[2.5]" />
                                <span>المختبر الفيزيائي التفاعلي المساعد</span>
                              </h4>
                              <p className="text-[10px] text-teal-650 mt-1 font-semibold">بإمكانك الاختيار بين نموذج المحاكاة المحلي الخفيف لإجراء الحسابات السريعة، أو المحاكاة المعملية الفاخرة من PhET.</p>
                            </div>
                            <span className="hidden sm:inline bg-teal-100 text-teal-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                              مزامنة مع الكراس المفتوح
                            </span>
                          </div>

                          {/* مفتاح وضع المختبر الذكي */}
                          <div className="flex bg-slate-100/80 p-1 rounded-2xl gap-1.5 font-bold text-xs max-w-sm mx-auto justify-center border border-slate-200/60 shadow-inner" dir="rtl">
                            <button
                              onClick={() => setLabMode('local')}
                              className={`flex-1 py-2 px-3.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                labMode === 'local'
                                  ? 'bg-teal-700 text-white shadow font-black'
                                  : 'text-slate-600 hover:bg-slate-200/80'
                              }`}
                            >
                              <span>📱 المعمل المحلي السريع</span>
                            </button>
                            <button
                              onClick={() => setLabMode('phet')}
                              className={`flex-1 py-2 px-3.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                labMode === 'phet'
                                  ? 'bg-indigo-700 text-white shadow font-black'
                                  : 'text-slate-600 hover:bg-slate-200/80'
                              }`}
                            >
                              <span>🌐 معمل PhET العالمي</span>
                            </button>
                          </div>

                          {/* جلب واستدعاء مختبر الدرس حسب الاختيار النشط */}
                          {labMode === 'phet' ? (
                            <PhetSimulator lessonId={selectedLesson.id} />
                          ) : (
                            <div className="border border-slate-100 rounded-3xl p-1 bg-slate-50 shadow-inner">
                              {(() => {
                                const lessonId = selectedLesson.id;
                                if (lessonId === "lesson_2_measurement") {
                                  return <MeasurementLab />;
                                } else if (lessonId === "lesson_4_conversions") {
                                  return <ConversionLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_5_dimensional") {
                                  return <DimensionalAnalysisLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_3_quantities") {
                                  return <QuantityClassifier />;
                                } else if (lessonId === "lesson_6_vectors_lab") {
                                  return <VectorsLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_8_speed") {
                                  return <SpeedLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_9_acceleration") {
                                  return <AccelerationLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_10_kinematics") {
                                  return <KinematicsLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_11_freefall") {
                                  return <FreeFallLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_12_newton") {
                                  return <NewtonLawsLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_13_friction") {
                                  return <FrictionLab onComplete={handleLabComplete} />;
                                } else if (lessonId === "lesson_14_kinetic") {
                                  return <KineticMolecularTheoryLab onComplete={handleLabComplete} />;
                                } else if (
                                  lessonId === "lesson_7_displacement"
                                ) {
                                  return <DisplacementCarLab />;
                                } else if (lessonId === "lesson_11_projectiles") {
                                  return <ProjectileLab />;
                                } else if (lessonId === "lesson_12_circular" || lessonId === "lesson_13_newton_laws" || lessonId === "lesson_14_gravity") {
                                  return <GravityLawLab />;
                                } else {
                                  return <EnergyConservationLab />;
                                }
                              })()}
                            </div>
                          )}
                        </div>
                      )}

                      {/* التبويب الثالث: الامتحان الفوري والاختبار المنهجي الذكي */}
                      {lessonSubTab === 'quiz' && (
                        <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-150 pb-3 text-right">
                            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                              <Award size={15} className="text-amber-500" />
                              <span>امتحان فوري لقياس الفهم وتقييد التراكم العلمي بالرصد:</span>
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                              النتيجة ترسل للوحة الشرف التنافسية فوراً
                            </span>
                          </div>

                          <div className="space-y-4 text-right">
                            {selectedLesson.questions.map((q, idx) => (
                              <div key={q.id} className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2">
                                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50/65 px-2.5 py-0.5 rounded-md">السؤال {idx + 1}</span>
                                <p className="text-xs font-bold text-slate-800 leading-relaxed">{q.text}</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                                  {q.type === 'tf' ? (
                                    <>
                                      {[
                                        { val: 'true', label: '✅ صحيح / نعم' },
                                        { val: 'false', label: '❌ خاطئ / لا' }
                                      ].map(opt => (
                                        <button
                                          key={opt.val}
                                          onClick={() => handleAnswerSelect(q.id, opt.val)}
                                          disabled={quizSubmitted}
                                          className={`p-2.5 rounded-xl border text-right font-bold transition-all cursor-pointer ${
                                            quizAnswers[q.id] === opt.val
                                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                                          }`}
                                        >
                                          {opt.label}
                                        </button>
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {q.options?.map(opt => (
                                        <button
                                          key={opt}
                                          onClick={() => handleAnswerSelect(q.id, opt)}
                                          disabled={quizSubmitted}
                                          className={`p-2.5 rounded-xl border text-right font-semibold transition-all cursor-pointer ${
                                            quizAnswers[q.id] === opt
                                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                                          }`}
                                        >
                                          {opt}
                                        </button>
                                      ))}
                                    </>
                                  )}
                                </div>

                                {quizSubmitted && (
                                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-[11px]">
                                    {quizAnswers[q.id] === q.correct ? (
                                      <span className="text-emerald-700 font-bold block">🎉 إجابة متميزة وصحيحة!</span>
                                    ) : (
                                      <span className="text-rose-700 font-bold block">❌ الإجابة المحددة خاطئة. الإجابة الصحيحة هي: <strong className="font-extrabold">{q.correct}</strong></span>
                                    )}
                                    <p className="text-slate-500 mt-1 italic font-semibold bg-slate-50/50 p-2 rounded-lg leading-relaxed">{q.explain}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {!quizSubmitted ? (
                            <button
                              onClick={() => handleQuizSubmit(selectedLesson.id)}
                              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer active:scale-95"
                            >
                              احسب درجتي وارسل تقرير النتيجة للوحة الشرف التنافسية 🏆
                            </button>
                          ) : (
                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-center space-y-2">
                              <span className="text-xs text-indigo-800 font-bold">علامتك النهائية بالامتحان:</span>
                              <div className="text-2xl font-black text-indigo-900 leading-none font-mono">
                                {quizScore} / {selectedLesson.questions.length} ({Math.round((quizScore / selectedLesson.questions.length) * 100)}%)
                              </div>
                              <button
                                onClick={() => {
                                  setQuizAnswers({});
                                  setQuizSubmitted(false);
                                }}
                                className="py-1.5 px-4 bg-white border border-indigo-200 text-indigo-900 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                              >
                                إعادة المحاولة لتحسين الدرجة
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                  </div>
                )}

              </div>
            )}

            {/* ==================== شاشة المختبرات التفاعلية الستة ==================== */}
            {activeTab === 'labs' && (
              <div className="space-y-6">
                <div className="border bg-white rounded-2xl p-5 border-slate-100 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">🧪 المختبرات التفاعلية المعيارية</h3>
                    <p className="text-xs text-slate-450 mt-1">طاقم محاكاة متطور لإجراء التجارب وقياس التغيرات والتحفيز الفيزيائي فوراً.</p>
                  </div>
                  <div className="bg-amber-50 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 animate-pulse">
                    مختبرات ممتازة ومطابقة للمناهج
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                  {/* ١. أجهزة القياس */}
                  <MeasurementLab />

                  {/* ٢. تصنيف الكميات */}
                  <QuantityClassifier />

                  {/* ٣. الحركة والإزاحة */}
                  <DisplacementCarLab />

                  {/* ٤. حركة المقذوفات */}
                  <ProjectileLab />

                  {/* ٥. طاقة السقوط وحفظ الطاقة */}
                  <EnergyConservationLab />

                  {/* ٦. الجذب الكوني لنيوتن */}
                  <GravityLawLab />
                </div>
              </div>
            )}

            {/* ==================== 1. واجهة المساعد الفيزيائي المنهجي سياف AI ==================== */}
            {activeTab === 'chatbot' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 animate-fade-in" dir="rtl">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-blue-950 shadow-md">
                      <Sparkles size={22} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">💬 المساعد الفيزيائي المنهجي الذكي</h2>
                      <p className="text-xs text-slate-500">تمت تهيئته بدقة للتوافق مع منهج الثانوية العامة وتوجيهات الأستاذ سياف الشباطي</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-850 px-3 py-1.5 rounded-xl font-bold">
                    <span>💡 يستند للبعد الإيماني والفيزياء الكونية</span>
                  </div>
                </div>

                {/* لوحة المحادثة التفاعلية */}
                <div className="border border-slate-100 rounded-2xl bg-slate-50/50 p-4 h-[450px] overflow-y-auto flex flex-col gap-3 scrollbar-thin">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed transition-all duration-300 ${
                        msg.role === 'user' 
                          ? 'bg-indigo-650 text-white mr-auto rounded-tl-none font-semibold shadow-sm' 
                          : 'bg-white text-slate-800 ml-auto rounded-tr-none border border-slate-100 shadow-xs'
                      }`}
                    >
                      <div className="font-bold mb-1 opacity-75 text-[10px]">
                        {msg.role === 'user' ? '💭 استفسارك الفيزيائي' : '🎓 إجابة المساعد الذكي'}
                      </div>
                      <div className="whitespace-pre-line text-xs font-semibold">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="bg-white text-slate-800 ml-auto rounded-2xl rounded-tr-none border border-slate-100 shadow-xs max-w-[85%] p-4 flex items-center gap-2.5">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[10px] text-slate-400 font-bold font-mono">المساعد يفكر ويعد الصياغة المنهجية...</span>
                    </div>
                  )}
                </div>

                {/* الأزرار الكبسة الفورية لبدء نقاش فيزيائي */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-extrabold block">📌 استفسارات فيزيائية مرجعية فائقة الأهمية:</span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button 
                      onClick={() => handleChatSend("شرح مفهوم القصور الذاتي الفيزيائي في نقاط مبسطة")}
                      disabled={chatLoading}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      💡 شرح القصور الذاتي
                    </button>
                    <button 
                      onClick={() => handleChatSend("حل مسألة: تحركت مركبة من السكون بعجلة منتظمة قدرها 4m/s² لمدة 6 ثوانٍ، احسب سرعتها النهائية والمسافة المقطوعة.")}
                      disabled={chatLoading}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      ✏️ حل مسألة حركة بتسارع
                    </button>
                    <button 
                      onClick={() => handleChatSend("اقترح تجربة علمية منزلية بسيطة وآمنة توضح تداخل الموجات أو الطاقة الكامنة")}
                      disabled={chatLoading}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      🧪 تجربة فيزيائية منزلية
                    </button>
                    <button 
                      onClick={() => handleChatSend("ما الحكمة العقدية والبعد الإيماني وراء مرونة قوانين حفظ الطاقة الميكانيكية بالكون؟")}
                      disabled={chatLoading}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/50 font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      🌌 التأمل العقدي الإيماني
                    </button>
                  </div>
                </div>

                {/* حقل الإدخال والإرسال */}
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
                    placeholder="اكتب استفسارك الرياضي أو الفيزيائي هنا (مثال: اشرح لي السقوط الحر)..."
                    disabled={chatLoading}
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white p-3 rounded-xl outline-none text-xs text-slate-800"
                  />
                  <button 
                    onClick={() => handleChatSend()}
                    disabled={chatLoading || !chatInput.trim()}
                    className="px-6 py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <span>إرسال</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ==================== 2. واجهة الاختبار التكيفي التفاعلي ==================== */}
            {activeTab === 'adaptive_quiz' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 animate-fade-in" dir="rtl">
                
                {/* 2.1 شاشة إعداد وتجهيز الامتحان */}
                {!adaptiveSubmitted && adaptiveQuestions.length === 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                        <Cpu size={22} className="animate-spin" style={{ animationDuration: '4s' }} />
                      </div>
                      <div>
                        <h2 className="text-base font-black text-slate-900">🧠 اختبار الرصد والمواءمة التكيفي</h2>
                        <p className="text-xs text-slate-500">يقيس محرك التكيف مستواك العلمي من الـ 18 درساً، وينتج لك اختباراً مخصصاً لرفع مستواك تلقائياً!</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* الصعوبة التكيفية */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
                        <span className="font-extrabold text-xs text-slate-800 block">🎯 حدد مستوى الصعوبة التكليفية المستهدفة:</span>
                        <div className="grid grid-cols-3 gap-2">
                          <button 
                            onClick={() => setAdaptiveDifficulty('easy')}
                            className={`py-3.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              adaptiveDifficulty === 'easy' 
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm' 
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            🟢 سهل (مفاهيم)
                          </button>
                          <button 
                            onClick={() => setAdaptiveDifficulty('medium')}
                            className={`py-3.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              adaptiveDifficulty === 'medium' 
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-800 shadow-sm' 
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            🔵 متوسط (قياسي)
                          </button>
                          <button 
                            onClick={() => setAdaptiveDifficulty('hard')}
                            className={`py-3.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              adaptiveDifficulty === 'hard' 
                                ? 'bg-rose-50 border-rose-500 text-rose-800 shadow-sm' 
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            🔴 صعب (مسائل)
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                          {adaptiveDifficulty === 'easy' && 'يقوم بفلترة وتدشين أسئلة الصح والخطأ التي تختبر التعاريف الأساسية والرموز الأولية.'}
                          {adaptiveDifficulty === 'medium' && 'يقوم باستخراج أسئلة الاختيار الأكاديمية العادية لتغطية شاملة لعلاقات الحركة والطاقة.'}
                          {adaptiveDifficulty === 'hard' && 'مرتفع الأهمية! يعزل ويجمع كافة المسائل الحسابية والقوانين الرياضية لرفع طاقة الكفاءة والذكاء الاستباقي.'}
                        </p>
                      </div>

                      {/* عدد الأسئلة المطلوبة */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
                        <span className="font-extrabold text-xs text-slate-800 block">📊 حدد عدد الأسئلة المطلوبة بالاختبار:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[3, 5, 10].map(cnt => (
                            <button 
                              key={cnt}
                              onClick={() => setAdaptiveCount(cnt)}
                              className={`py-3.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                                adaptiveCount === cnt 
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {cnt} أسئلة
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                          نوصي باختيار 5 أسئلة في المرة الواحدة لضمان أقصى درجات التركيز الذهني والتحليل التربوي الدقيق.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={generateAdaptiveQuiz}
                      className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      ⚡ توليد وبدء الاختبار المخصص الآن
                    </button>
                  </div>
                )}

                {/* 2.2 شاشة الأسئلة النشطة والحل الفعلي */}
                {!adaptiveSubmitted && adaptiveQuestions.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="font-extrabold text-[11px] text-indigo-850 bg-indigo-50 px-3 py-1 rounded-full">
                        🧩 التحدي التكيفي: {adaptiveDifficulty === 'easy' ? 'سهل' : adaptiveDifficulty === 'medium' ? 'متوسط' : 'صعب'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold font-mono">
                        سؤال {adaptiveCurrentIndex + 1} من أصل {adaptiveQuestions.length}
                      </span>
                    </div>

                    {/* نص السؤال */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 font-bold text-sm leading-relaxed">
                      {adaptiveQuestions[adaptiveCurrentIndex].text}
                    </div>

                    {/* الخيارات كبلاطات تفاعلية */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {adaptiveQuestions[adaptiveCurrentIndex].type === 'tf' ? (
                        ['صح', 'خطأ'].map((opt) => (
                          <button 
                            key={opt}
                            onClick={() => handleAdaptiveAnswerSelect(adaptiveQuestions[adaptiveCurrentIndex].id, opt)}
                            className={`p-4 rounded-xl text-right text-xs font-bold border transition-all cursor-pointer flex justify-between items-center ${
                              adaptiveAnswers[adaptiveQuestions[adaptiveCurrentIndex].id] === opt 
                                ? 'bg-indigo-600 border-indigo-650 text-white shadow-md font-black' 
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              adaptiveAnswers[adaptiveQuestions[adaptiveCurrentIndex].id] === opt 
                                ? 'border-white bg-white/20' 
                                : 'border-slate-300 bg-transparent'
                            }`}>
                              {adaptiveAnswers[adaptiveQuestions[adaptiveCurrentIndex].id] === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        ))
                      ) : (
                        adaptiveQuestions[adaptiveCurrentIndex].options?.map((opt) => (
                          <button 
                            key={opt}
                            onClick={() => handleAdaptiveAnswerSelect(adaptiveQuestions[adaptiveCurrentIndex].id, opt)}
                            className={`p-4 rounded-xl text-right text-xs font-semibold border transition-all cursor-pointer flex justify-between items-center ${
                              adaptiveAnswers[adaptiveQuestions[adaptiveCurrentIndex].id] === opt 
                                ? 'bg-indigo-650 border-indigo-700 text-white shadow-md font-extrabold' 
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              adaptiveAnswers[adaptiveQuestions[adaptiveCurrentIndex].id] === opt 
                                ? 'border-white bg-white/20' 
                                : 'border-slate-300 bg-transparent'
                            }`}>
                              {adaptiveAnswers[adaptiveQuestions[adaptiveCurrentIndex].id] === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    {/* أدوات التحكم */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <button 
                        disabled={adaptiveCurrentIndex === 0}
                        onClick={() => setAdaptiveCurrentIndex(prev => prev - 1)}
                        className="px-5 py-2 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-40"
                      >
                        السابق
                      </button>
                      
                      {adaptiveCurrentIndex < adaptiveQuestions.length - 1 ? (
                        <button 
                          onClick={() => setAdaptiveCurrentIndex(prev => prev + 1)}
                          className="px-5 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
                        >
                          التالي
                        </button>
                      ) : (
                        <button 
                          onClick={handleAdaptiveQuizSubmit}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md"
                        >
                          🚀 تسليم الإجابات وتقييم الأداء العلمي
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 2.3 شاشة النتيجة والتغذية الراجعة التكيفية */}
                {adaptiveSubmitted && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Trophy size={32} />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-800">الحمد لله! لقد أنهيت الاختبار التكيفي بنجاح</h3>
                        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">تم رصد أدائك في لوحة صدارة المنصة بنجاح لمضاهاة تفوق الزملاء.</p>
                      </div>

                      <div className="flex justify-center gap-8 items-center py-2 max-w-sm mx-auto">
                        <div className="text-center">
                          <span className="text-2xl font-black font-mono text-indigo-900 block">{adaptiveScore} / {adaptiveQuestions.length}</span>
                          <span className="text-[10px] text-slate-400 font-bold block">الدرجة النهائية للرصد</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="text-center">
                          <span className="text-2xl font-black font-mono text-emerald-600 block">+{50 + (adaptiveScore * 25)} XP</span>
                          <span className="text-[10px] text-slate-400 font-bold block">مكافأة التحصيل المكتسبة</span>
                        </div>
                      </div>
                    </div>

                    {/* تقرير تحليل الأخطاء والتفسير المنهجي */}
                    {adaptiveWrongAnswersReport.length > 0 ? (
                      <div className="space-y-3">
                        <span className="font-extrabold text-xs text-slate-800 block flex items-center gap-1">
                          <AlertCircle size={14} className="text-amber-500" />
                          <span>📚 التغذية الراجعة وتوجيهات الأخطاء لتصحيح المفاهيم:</span>
                        </span>

                        <div className="space-y-3 text-xs leading-relaxed">
                          {adaptiveWrongAnswersReport.map((rep, idx) => (
                            <div key={idx} className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 space-y-2">
                              <p className="font-bold text-slate-800">السؤال: {rep.question.text}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-semibold">
                                <span className="text-rose-700">إجابتك المسلمة: {rep.studentAnswer}</span>
                                <span className="text-emerald-800">الإجابة الصحيحة الأكاديمية: {rep.question.correct}</span>
                              </div>
                              <div className="border-t border-amber-200/40 pt-2 text-[11px] text-amber-900">
                                <span className="font-bold">📘 التفسير المنهجي:</span> {rep.explain}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl text-center text-emerald-800 text-xs font-bold leading-relaxed">
                        🎉 مدهش بحق! لم تسجل أي أخطاء في هذا التحدي التكيفي. أنت مشروع عالم فيزياء فذ ومتميز!
                      </div>
                    )}

                    <button 
                      onClick={() => { setAdaptiveQuestions([]); setAdaptiveSubmitted(false); }}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      🔄 تجهيز وإعداد اختبار تكيفي آخر
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ==================== 3. واجهة ملف الإنجاز الشامل والمكافآت ==================== */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6 animate-fade-in" dir="rtl">
                
                {/* 3.1 بطاقة بانتو لفرز بيانات المنجزات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* إجمالي الـ XP */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs relative overflow-hidden flex items-center gap-4">
                    <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-full bg-gradient-to-tr from-yellow-300 to-amber-500" />
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">
                      ⚔️
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold text-[10px] block">إجمالي نقاط المجد العلمي:</span>
                      <span className="text-xl font-black font-mono text-indigo-900 leading-tight">{xpPoints} XP</span>
                    </div>
                  </div>

                  {/* الرتبة الفيزيائية */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
                      ⭐
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold text-[10px] block">رتبتك العلمية كطالب:</span>
                      <span className="text-xs font-extrabold text-indigo-850 truncate max-w-[130px] block leading-tight">
                        {xpPoints < 200 ? '🎓 فيزيائي مبتدئ' : xpPoints < 500 ? '⚡ فيزيائي متمرس' : '🌟 عالم الكوزموس القدير'}
                      </span>
                    </div>
                  </div>

                  {/* المختبرات المكتملة */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg font-bold">
                      🔬
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold text-[10px] block">المخططات والبحوث المخبرية:</span>
                      <span className="text-xs font-extrabold text-slate-800 leading-tight block">تم تفتيش وحل المختبرات التفاعلية بنجاح.</span>
                    </div>
                  </div>

                  {/* الأخطاء المرصودة قيد التصفية */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
                      🛠️
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold text-[10px] block">ثغرات علمية قيد المراجعة:</span>
                      <span className="text-xs font-black font-mono text-rose-700 leading-tight block">{incorrectQuestionsLog.length} مغالطات خطئية</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* الشريحة اليمين: الأوسمة والشارات العلمية الفاخرة */}
                  <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                    <span className="font-extrabold text-slate-800 text-sm block border-b border-slate-50 pb-2.5">
                      🎖️ معرض الأوسمة والأبعاد التنافسية للطلاب:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      {/* الوسام الأول */}
                      <div className={`rounded-2xl border p-4 text-center transition-all duration-500 scale-95 hover:scale-100 ${
                        scores.some(s => s.score.startsWith('5')) 
                          ? 'bg-amber-50/50 border-amber-300 text-amber-900 shadow-sm' 
                          : 'bg-slate-50/20 border-slate-250 text-slate-400 filter grayscale opacity-60'
                      }`}>
                        <div className="text-2xl mb-2">🧠</div>
                        <h4 className="text-[11px] font-black">العبقرية المخيفة</h4>
                        <p className="text-[9px] mt-1 text-slate-500">حقق الدرجة الكاملة في أي اختبار درسى لمنهج سياف.</p>
                        <span className="text-[9px] font-bold block mt-2 bg-white/60 rounded-full py-0.5">
                          {scores.some(s => s.score.startsWith('5')) ? '✅ مفعل ومحرز' : '🔒 معلق بالتفوق'}
                        </span>
                      </div>

                      {/* الوسام الثاني */}
                      <div className={`rounded-2xl border p-4 text-center transition-all duration-500 scale-95 hover:scale-100 ${
                        completedLabs.length >= 1 || scores.length >= 1
                          ? 'bg-blue-50/50 border-blue-300 text-blue-900 shadow-sm' 
                          : 'bg-slate-50/20 border-slate-250 text-slate-400 filter grayscale opacity-60'
                      }`}>
                        <div className="text-2xl mb-2">🔬</div>
                        <h4 className="text-[11px] font-black">المهندس التجريبي</h4>
                        <p className="text-[9px] mt-1 text-slate-500">اصطدم الميكانيك بالمختبر الافتراضي وعاين النتائج.</p>
                        <span className="text-[9px] font-bold block mt-2 bg-white/60 rounded-full py-0.5">
                          {completedLabs.length >= 1 || scores.length >= 1 ? '✅ مفعل ومحرز' : '🔒 معلق بزيارة المختبر'}
                        </span>
                      </div>

                      {/* الوسام الثالث */}
                      <div className={`rounded-2xl border p-4 text-center transition-all duration-500 scale-95 hover:scale-100 ${
                        adaptiveDifficulty === 'hard' && adaptiveSubmitted 
                          ? 'bg-rose-50/50 border-rose-300 text-rose-900 shadow-sm' 
                          : 'bg-slate-50/20 border-slate-250 text-slate-400 filter grayscale opacity-60'
                      }`}>
                        <div className="text-2xl mb-2">⚡</div>
                        <h4 className="text-[11px] font-black">بطل الحركة العظيم</h4>
                        <p className="text-[9px] mt-1 text-slate-500">تمكن من ملاحقة وإنهاء اختبار تكيفي بالمستوى الصعب.</p>
                        <span className="text-[9px] font-bold block mt-2 bg-white/60 rounded-full py-0.5">
                          {adaptiveDifficulty === 'hard' && adaptiveSubmitted ? '✅ مفعل ومحرز' : '🔒 معلق بالامتحان الصعب'}
                        </span>
                      </div>

                      {/* الوسام الرابع */}
                      <div className={`rounded-2xl border p-4 text-center transition-all duration-500 scale-95 hover:scale-100 ${
                        xpPoints >= 300 
                          ? 'bg-violet-50/50 border-violet-300 text-violet-900 shadow-sm' 
                          : 'bg-slate-50/20 border-slate-250 text-slate-400 filter grayscale opacity-60'
                      }`}>
                        <div className="text-2xl mb-2">🪐</div>
                        <h4 className="text-[11px] font-black">أستاذ الأبعاد والكميات</h4>
                        <p className="text-[9px] mt-1 text-slate-500">احصد مجموع 300 نقطة خبرة لتكتشف أسرار النسبية سياف.</p>
                        <span className="text-[9px] font-bold block mt-2 bg-white/60 rounded-full py-0.5">
                          {xpPoints >= 300 ? '✅ مفعل ومحرز' : '🔒 تحصيل المستويات'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* الشريحة اليسار: الأهداف والمهام اليومية السريعة */}
                  <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                    <span className="font-extrabold text-slate-800 text-xs block border-b border-slate-50 pb-2">
                      ⚔️ مسارك ومهامك اليومية المقترحة لليوم:
                    </span>

                    <div className="space-y-3.5 text-xs">
                      {/* المهمة الأولى */}
                      <div className="flex items-center gap-3 bg-slate-55 p-2.5 rounded-xl border border-slate-100">
                        <input type="checkbox" checked={scores.length >= 1} readOnly className="rounded text-indigo-600 focus:ring-0 w-4 h-4 cursor-not-allowed" />
                        <div className="leading-tight">
                          <span className="font-bold block text-slate-800">أنهِ اختباراً واحداً اليوم (+50 XP)</span>
                          <span className="text-[10px] text-slate-400">قدم حلاً لأسئلة الدروس الـ ١٨ ليرى رصدك.</span>
                        </div>
                      </div>

                      {/* المهمة الثانية */}
                      <div className="flex items-center gap-3 bg-slate-55 p-2.5 rounded-xl border border-slate-100">
                        <input type="checkbox" checked={adaptiveSubmitted} readOnly className="rounded text-indigo-600 focus:ring-0 w-4 h-4 cursor-not-allowed" />
                        <div className="leading-tight">
                          <span className="font-bold block text-slate-800">أجرِ اختباراً تكيفياً معقداً (+100 XP)</span>
                          <span className="text-[10px] text-slate-400">تدرب مع الذكاء الاصطناعي لرصد الأخطاء.</span>
                        </div>
                      </div>

                      {/* المهمة الثالثة */}
                      <div className="flex items-center gap-3 bg-slate-55 p-2.5 rounded-xl border border-slate-100">
                        <input type="checkbox" checked={chatMessages.length >= 3} readOnly className="rounded text-indigo-600 focus:ring-0 w-4 h-4 cursor-not-allowed" />
                        <div className="leading-tight">
                          <span className="font-bold block text-slate-800">استشِر المساعد الذكي سياف (+50 XP)</span>
                          <span className="text-[10px] text-slate-400">تبادل الحوار لتسليط الضوء على حل أو تجربة.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3.2 سجل تحليل أخطائي الذكي (سلسلة تحليل الصعوبات العلمية) */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                  <div className="border-b border-slate-50 pb-3">
                    <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <LifeBuoy size={16} className="text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>سجل أخطائي الفردي الذكي وموجه تصحيح المفاهيم الرياضية ({incorrectQuestionsLog.length})</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      هنا يعزل البرنامج كافة العقبات والأخطاء التي سقطت فيها للاستذكار وحلها مع الأستاذ حتى تستمر كطالب فيزيائي من الدرجة الأولى!
                    </p>
                  </div>

                  {incorrectQuestionsLog.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {incorrectQuestionsLog.map((log, idx) => (
                        <div key={idx} className="bg-rose-50/20 hover:bg-rose-50/45 transition-all p-4.5 rounded-2xl border border-rose-100/70 space-y-2 text-right relative overflow-hidden">
                          <div className="absolute top-0 right-0 max-w-[120px] truncate bg-rose-50/80 text-[9px] text-rose-800 font-bold px-2.5 py-1 rounded-bl-xl border-l border-b border-rose-100">
                            {log.lessonTitle}
                          </div>
                          
                          <div className="font-extrabold text-slate-800 pr-1 border-r-2 border-rose-400">
                            {log.question.text}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold pt-1">
                            <span className="text-rose-600 block bg-rose-50 px-2 py-1 rounded-md text-center">أنت اخترت: {log.studentAnswer}</span>
                            <span className="text-emerald-800 block bg-emerald-50 px-2 py-1 rounded-md text-center">الإجابة المصوبة: {log.question.correct}</span>
                          </div>

                          <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-1.5 leading-relaxed font-semibold">
                            💡 شرح وتفسير: {log.question.explain || 'يتطلب القانون تطبيقاً صارماً لوحدات القياس والعلاقة الطردية أو العكسية لعجلة قياس وتحديد الأجسام وسقوطها الحر بمجال الجاذبية.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 font-semibold italic">
                      🕊️ لا توجد أخطاء في سجلك الخاص حتى الآن! استمر بالمذاكرة وحافظ على رداء النقاء العلمي وعقلك النير!
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ==================== لوحة الشرف والرصد الوطني الفوري للطلاب والمديرين ==================== */}
            {activeTab === 'leaderboard' && (() => {
              // حساب مؤشرات الأداء الإحصائية التربوية بديناميكية تامة
              const totalTests = scores.length;
              const uniqueStsCount = Array.from(new Set(scores.map(s => s.name))).length;
              const totalSumScores = scores.reduce((sum, s) => {
                const num = parseInt(s.score) || 0;
                return sum + num;
              }, 0);
              const avgScoreGlobal = totalTests > 0 ? (totalSumScores / totalTests).toFixed(1) : "0.0";
              
              // عزل المدارس النشطة للفلترة
              const schoolOptions = Array.from(new Set(scores.map(s => s.school).filter(Boolean)));

              // حساب المنحنى المنهجي لمتوسط تحصيل الطلاب لكل درس على حدة للتشخيص التعليمي
              const lessonsPerformanceMap: { [title: string]: { sum: number; count: number } } = {};
              scores.forEach(s => {
                if (!lessonsPerformanceMap[s.lessonTitle]) {
                  lessonsPerformanceMap[s.lessonTitle] = { sum: 0, count: 0 };
                }
                const num = parseInt(s.score) || 0;
                lessonsPerformanceMap[s.lessonTitle].sum += num;
                lessonsPerformanceMap[s.lessonTitle].count += 1;
              });

              const lessonsPerformanceList = Object.keys(lessonsPerformanceMap).map(title => {
                const item = lessonsPerformanceMap[title];
                return {
                  title,
                  avg: item.count > 0 ? (item.sum / item.count).toFixed(1) : "0.0",
                  pct: item.count > 0 ? Math.min(100, Math.round(((item.sum / item.count) / 5) * 100)) : 0
                };
              });

              // تصفية الكشوف بناءً على مدخلات البحث
              const filteredScores = scores.filter(s => {
                const matchName = s.name.toLowerCase().includes(teacherSearchTerm.toLowerCase());
                const matchSchool = teacherSelectedSchool ? s.school.includes(teacherSelectedSchool) : true;
                return matchName && matchSchool;
              });

              return (
                <div className="space-y-6 w-full animate-fade-in" dir="rtl">
                  
                  {/* أ. لوحة المعلم والمشرف للمؤشرات الكلية الفورية (KPI Dashboard Grid) */}
                  {(currentUserType === 'superadmin' || currentUserType === 'teacher' || currentUserType === 'school') && (
                    <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 text-white space-y-5 shadow-lg border border-indigo-900">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">منظومة الإحصاء القياسي الموحدة (LMS Admin Control)</span>
                          <h2 className="text-base font-black text-white">📡 لوحة تمكين ومتابعة التحصيل العلمي للمدارس والمعلمين</h2>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <button 
                            onClick={() => window.print()}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-lg border border-white/15 transition-all text-[11px] cursor-pointer"
                          >
                            🖨️ طباعة تقرير الرصد العام
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* كرت 1 */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                          <span className="text-slate-350 text-[10px] font-bold block">إجمالي أوراق الرصد المستلمة:</span>
                          <span className="text-2xl font-black font-mono text-amber-400 block mt-1">{totalTests} <span className="text-xs font-semibold text-white">امتحانًا</span></span>
                          <p className="text-[9px] text-slate-400 mt-1">كافة کُشوف السير المرفوعة والنشطة.</p>
                        </div>

                        {/* كرت 2 */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                          <span className="text-slate-350 text-[10px] font-bold block">الطلاب المسجلون تحت المنصة:</span>
                          <span className="text-2xl font-black font-mono text-emerald-400 block mt-1">{uniqueStsCount} <span className="text-xs font-semibold text-white">طالبًا</span></span>
                          <p className="text-[9px] text-slate-400 mt-1">المفحوصين بنجاح بدخول رسمي.</p>
                        </div>

                        {/* كرت 3 */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                          <span className="text-slate-350 text-[10px] font-bold block">المعدل وصحة الأداء المتوسط:</span>
                          <span className="text-2xl font-black font-mono text-sky-400 block mt-1">{avgScoreGlobal} <span className="text-xs font-semibold text-white">/ 5</span></span>
                          <p className="text-[9px] text-slate-400 mt-1">مؤشر التحصيل الجماعي الفعلي للدروس.</p>
                        </div>

                        {/* كرت 4 */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                          <span className="text-slate-350 text-[10px] font-bold block">المدارس الفعالة علمياً:</span>
                          <span className="text-2xl font-black font-mono text-pink-400 block mt-1">{schoolOptions.length} <span className="text-xs font-semibold text-white">مؤسسة</span></span>
                          <p className="text-[9px] text-slate-400 mt-1">المدارس المانحة لكود الترخيص.</p>
                        </div>
                      </div>

                      {/* ب. تشخيص المنحنى العلمي للتحصيل (Class Learning Curve Metrics) */}
                      <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5">
                        <span className="text-amber-400 text-[10px] font-black block mb-3.5 flex items-center gap-1">
                          📊 منحنى التحجيم التشخيصي للتحصيل على مستوى المقررات المنهجية:
                        </span>
                        
                        {lessonsPerformanceList.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lessonsPerformanceList.map((perf, idx) => (
                              <div key={idx} className="bg-indigo-950/40 p-3 rounded-xl border border-white/5 space-y-1.5 text-xs">
                                <div className="flex justify-between font-bold text-slate-100">
                                  <span className="truncate max-w-[200px]">{perf.title}</span>
                                  <span className="font-mono text-amber-400">{perf.avg} / 5 ({perf.pct}%)</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-900/80 rounded-full overflow-hidden border border-white/10">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${
                                      perf.pct < 50 
                                        ? 'bg-gradient-to-r from-rose-500 to-rose-450' 
                                        : perf.pct < 75 
                                          ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                                          : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                    }`}
                                    style={{ width: `${perf.pct}%` }}
                                  />
                                </div>
                                <p className="text-[9px] text-slate-405">
                                  {perf.pct < 50 && '🔴 ثغرة ملموسة! يرجى الاستدراك وإعادة التطرق لقوانين هذا المبحث بالصف.'}
                                  {perf.pct >= 50 && perf.pct < 75 && '🟡 درجة تفاؤلية آمنة تتطلب تعزيز التدريبات والحلول الإثرائية.'}
                                  {perf.pct >= 75 && '🟢 تمكن متفوق وموثوق لمجسمات ومفاهيم السقوط والحركة العلمية!.'}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-slate-400 text-[11px] font-semibold italic">
                            أجرِ أحد الطلاب الكرام امتحاناً منهجياً لتوليد منحنى التحصيل والمقارنة التربوية هنا.
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* كشف النتائج والتسجيل العام لجميع الطلاب */}
                    <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                      
                      {/* ب. مصفاة وباحث الطلاب الكهفيين */}
                      <div className="flex flex-col sm:flex-row gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 items-center justify-between">
                        <div className="w-full sm:w-1/2 flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                          <input 
                            type="text" 
                            placeholder="🔍 ابحث عن اسم طالب معين..."
                            value={teacherSearchTerm}
                            onChange={(e) => setTeacherSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-xs text-slate-800"
                          />
                        </div>
                        
                        <div className="w-full sm:w-1/2 flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                          <select 
                            value={teacherSelectedSchool}
                            onChange={(e) => setTeacherSelectedSchool(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-xs text-slate-700 font-bold"
                          >
                            <option value="">🏫 جميع المدارس المشاركة</option>
                            {schoolOptions.map((sch, i) => (
                              <option key={i} value={sch}>{sch}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                          <Trophy size={16} className="text-yellow-500" />
                          <span>🏆 كشف النتائج التنافسي الفوري (لوحة الشرف الوطنية):</span>
                        </span>
                        <button 
                          onClick={() => {
                            const csvContent = "data:text/csv;charset=utf-8," 
                              + ["الاسم,المدرسة,الدرس,النتيجة,تاريخ السجل"].join(",") + "\n"
                              + filteredScores.map(s => `"${s.name}","${s.school}","${s.lessonTitle}","${s.score}","${s.date}"`).join("\n");
                            const encodedUri = encodeURI(csvContent);
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "sayyaf_students_report.csv");
                            document.body.appendChild(link);
                            link.click();
                          }}
                          className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Download size={12} />
                          <span>تنزيل التقرير المالي CSV</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto text-xs">
                        {filteredScores.length > 0 ? (
                          <table className="w-full text-right border-collapse">
                            <thead>
                              <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                                <th className="p-3 font-bold">م</th>
                                <th className="p-3 font-bold">اسم الطالب الكريم</th>
                                <th className="p-3 font-bold">المدرسة المرتبطة</th>
                                <th className="p-3 font-bold">المقرر / الدرس المختبر</th>
                                <th className="p-3 font-bold text-center">الرصد والدرجة</th>
                                {(currentUserType === 'superadmin' || currentUserType === 'teacher') && <th className="p-3 text-center font-bold">صلاحيات</th>}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-55">
                              {filteredScores.map((s, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                              <td className="p-3 font-bold text-slate-800">{s.name}</td>
                              <td className="p-3 text-slate-600 font-semibold">{s.school}</td>
                              <td className="p-3 text-indigo-900 font-semibold">{s.lessonTitle}</td>
                              <td className="p-3 text-center">
                                <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-bold font-mono">
                                  {s.score}
                                </span>
                              </td>
                              {(currentUserType === 'superadmin' || currentUserType === 'teacher') && (
                                <td className="p-3 text-center">
                                  <button 
                                    onClick={() => handleDeleteScore(idx)}
                                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                                    title="حذف هذا الرصد للطلاب"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-8 text-slate-400 font-semibold italic">
                        📭 لا توجد نتائج مرصودة حتى الآن. قدم درساً واختبر ليرى زملائك درجتك في لوحة الصدارة الشرفية!
                      </div>
                    )}
                  </div>
                </div>

                {/* لوحة الإدارة العليا (فعالة ومكتملة للأستاذ سياف) */}
                {(currentUserType === 'superadmin' || currentUserType === 'teacher' || currentUserType === 'school') && (
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* توليد وإدارة تراخيص تفعيل الطلاب من سياف الشباطي */}
                    {(currentUserType === 'superadmin' || currentUserType === 'teacher') && (
                      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4">
                        <span className="font-extrabold text-slate-800 text-xs block border-b border-slate-50 pb-2 flex items-center gap-1">
                          <Plus size={14} className="text-indigo-600" />
                          <span>توليد أكواد تراخيص التفعيل الفورية للطلاب:</span>
                        </span>

                        <form onSubmit={handleGenerateCode} className="space-y-3 text-xs">
                          <div className="space-y-1">
                            <label className="block text-slate-600 font-bold">ربط الكود بمدرسة معينة:</label>
                            <select
                              value={newCodeSchool}
                              onChange={(e) => setNewCodeSchool(e.target.value)}
                              required
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                            >
                              <option value="">-- حدد المدرسة --</option>
                              {schools.map(sch => (
                                <option key={sch.id} value={sch.name}>{sch.name}</option>
                              ))}
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg font-bold shadow-sm transition-transform cursor-pointer"
                          >
                            تحديد المرفق وتوليد الكود الآمن
                          </button>
                        </form>
                      </div>
                    )}

                    {/* إدارة المدارس والشُعَب الثانوية المسجلة بالمنصة */}
                    {currentUserType === 'superadmin' && (
                      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4">
                        <span className="font-extrabold text-slate-800 text-xs block border-b border-slate-55 pb-2">
                          🏫 تسجيل وإلحاق مدرسة ثانوية جديدة باليمن:
                        </span>

                        <form onSubmit={handleAddSchool} className="space-y-3 text-xs">
                          <input
                            type="text"
                            placeholder="اسم المدرسة والجمهورية بالكامل..."
                            value={newSchoolName}
                            onChange={(e) => setNewSchoolName(e.target.value)}
                            required
                            className="w-full bg-slate-50 border border-slate-250 p-2 rounded-lg outline-none"
                          />
                          <button
                            type="submit"
                            className="w-full py-2 bg-blue-750 hover:bg-blue-700 text-white rounded-lg font-bold cursor-pointer"
                          >
                            إضافة المدرسة للمنصة
                          </button>
                        </form>
                      </div>
                    )}

                    {/* قائمة الأكواد الكلية والتحقق من حالتها الأمنية */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-3">
                      <span className="font-bold text-slate-800 text-xs block border-b border-slate-50 pb-2">
                        🔑 كشف أكواد التراخيص المتوفرة ومراقبتها ({activationCodes.length}):
                      </span>

                      <div className="space-y-2 max-h-[220px] overflow-y-auto text-xs">
                        {activationCodes.map((c, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                              <span className="font-mono font-bold text-indigo-900 tracking-wide block">{c.code}</span>
                              <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">{c.school}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              c.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-slate-200 text-slate-600'
                            }`}>
                              {c.status === 'active' ? 'متاح' : `استخدمه ${c.usedBy || 'طالب'}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                </div>
              </div>
              );
            })()}

          </div>
        )}

      </main>

    </div>
  );
}

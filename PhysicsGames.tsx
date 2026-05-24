import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Check, 
  Sparkles, 
  MoveRight, 
  HelpCircle, 
  ArrowUpRight, 
  Beaker, 
  TrendingUp, 
  Award, 
  Flame, 
  Activity, 
  Scale, 
  Compass, 
  CheckCircle, 
  XCircle, 
  Zap,
  Users,
  Target,
  Maximize2,
  Minimize2
} from 'lucide-react';

export interface LabProps {
  onComplete?: (xp: number, labId: string) => void;
  studentName?: string;
  studentSchool?: string;
}

// ==========================================
// 1. مختبر التحويلات الفيزيائية (الدرس الرابع)
// ==========================================
export function ConversionLab({ onComplete }: LabProps) {
  const [answers, setAnswers] = useState<{ [key: string]: { op: string; val: string } }>({
    conv1: { op: '', val: '' },
    conv2: { op: '', val: '' },
    conv3: { op: '', val: '' },
    conv4: { op: '', val: '' },
    conv5: { op: '', val: '' },
    conv6: { op: '', val: '' },
  });

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  const correctAnswers = {
    conv1: { op: '×', val: '1000' }, // كم إلى م
    conv2: { op: '×', val: '100' },  // م إلى سم
    conv3: { op: '×', val: '60' },   // س إلى دقيقة
    conv4: { op: '×', val: '1000' }, // كجم إلى ج
    conv5: { op: '×', val: '1000' }, // طن إلى كجم
    conv6: { op: '÷', val: '1000' }, // ملم إلى م
  };

  const handleOpChange = (key: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: { ...prev[key], op: value }
    }));
  };

  const handleValChange = (key: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: { ...prev[key], val: value.trim() }
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(key => {
      const userAns = answers[key];
      const correctAns = correctAnswers[key as keyof typeof correctAnswers];
      if (userAns.op === correctAns.op && parseFloat(userAns.val) === parseFloat(correctAns.val)) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);

    if (correctCount === 6) {
      setFeedback('🎉 إجابات كاملة وصحيحة 100%! بارك الله في ذكائك المنهجي. لقد أحرزت نقاط التفوق.');
      if (onComplete) onComplete(40, 'lab_conversions_full');
    } else {
      setFeedback(`⚠️ رصدنا بعض الأخطاء. لقد حققت ${correctCount} من أصل 6 مستويات. راجع جدول البادئات والتحويلات وأعد المحاولة!`);
    }
  };

  const resetLab = () => {
    setAnswers({
      conv1: { op: '', val: '' },
      conv2: { op: '', val: '' },
      conv3: { op: '', val: '' },
      conv4: { op: '', val: '' },
      conv5: { op: '', val: '' },
      conv6: { op: '', val: '' },
    });
    setSubmitted(false);
    setScore(0);
    setFeedback('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 shadow-sm text-right" dir="rtl">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-xl shadow-xs">
        <h4 className="font-bold text-base flex items-center gap-2">
          <Scale size={18} />
          <span>🔢 مختبر التدريب العملي على التحويلات والبادئات الفيزيائية</span>
        </h4>
        <p className="text-xs text-amber-550 mt-1">تغلب على تحدي الأعداد الضخمة والصغيرة بتعلم كيفية التحويل واشتقاق البادئات المنهجية اليمنية</p>
      </div>

      <div className="bg-amber-50 border-r-4 border-amber-500 p-3.5 rounded-l-xl text-amber-900 text-xs leading-relaxed font-semibold">
        💡 <b>إستراتيجية الحل الذهبي:</b> عند التحويل من وحدة <b>كبيرة إلى صغيرة</b> نستخدم الضرب (×)، وعند التحويل من وحدة <b>صغيرة إلى كبيرة</b> نستخدم القسمة (÷). جرب الآن واختبر مهاراتك الرياضية!
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-xs text-slate-700 table-auto border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-100">
              <th className="p-3 text-right">تحويل من</th>
              <th className="p-3 text-right">تحويل إلى</th>
              <th className="p-3 text-center">العملية الرياضية</th>
              <th className="p-3 text-right">المعامل أو القيمة</th>
              <th className="p-3 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: 'conv1', from: 'كيلومتر (km)', to: 'متر (m)', hint: 'ألف متر' },
              { id: 'conv2', from: 'متر (m)', to: 'سنتيمتر (cm)', hint: 'مئة جزء' },
              { id: 'conv3', from: 'ساعة (hr)', to: 'دقيقة (min)', hint: '٦٠ دقيقة' },
              { id: 'conv4', from: 'كيلوجرام (kg)', to: 'جرام (g)', hint: 'ألف جرام' },
              { id: 'conv5', from: 'طن (ton)', to: 'كيلوجرام (kg)', hint: 'ألف كجم' },
              { id: 'conv6', from: 'مليمتر (mm)', to: 'متر (m)', hint: 'جزء من الألف' },
            ].map(row => {
              const userAns = answers[row.id];
              const correctAns = correctAnswers[row.id as keyof typeof correctAnswers];
              const isEachCorrect = submitted && userAns.op === correctAns.op && parseFloat(userAns.val) === parseFloat(correctAns.val);

              return (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 font-bold text-slate-800">{row.from}</td>
                  <td className="p-3 text-slate-600 font-medium">{row.to}</td>
                  <td className="p-3">
                    <div className="flex justify-center">
                      <select
                        value={userAns.op}
                        onChange={(e) => handleOpChange(row.id, e.target.value)}
                        disabled={submitted}
                        className="p-1 px-2.5 rounded-lg border border-slate-200 bg-white font-bold text-center focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="">اختر</option>
                        <option value="×">✖ ضرب</option>
                        <option value="÷">➗ قسمة</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder={row.hint}
                        value={userAns.val}
                        onChange={(e) => handleValChange(row.id, e.target.value)}
                        disabled={submitted}
                        className="w-24 p-1.5 px-2 rounded-lg border border-slate-200 text-center font-mono font-bold focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    {submitted ? (
                      isEachCorrect ? (
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">✅ صح</span>
                      ) : (
                        <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full inline-block">❌ خطأ (الحل: {correctAns.op} {correctAns.val})</span>
                      )
                    ) : (
                      <span className="text-slate-400 font-medium">قيد الإجابة</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs font-bold leading-relaxed border ${
          score === 6 ? 'bg-emerald-50 border-emerald-100 text-emerald-850' : 'bg-rose-50 border-rose-100 text-rose-850'
        }`}>
          {feedback}
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button
          onClick={checkAnswers}
          disabled={submitted}
          className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md disabled:opacity-50"
        >
          <CheckCircle size={15} />
          <span>تحقق من جميع الإجابات</span>
        </button>
        <button
          onClick={resetLab}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
        >
          <RotateCcw size={15} />
          <span>إعادة تعيين</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. مختبر التحليل البعدي (الدرس الخامس)
// ==========================================
export function DimensionalAnalysisLab({ onComplete }: LabProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lhsInput, setLhsInput] = useState('');
  const [rhsInput, setRhsInput] = useState('');
  const [isConsistent, setIsConsistent] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const equations = [
    {
      eq: "ع = ع₀ + ج ز",
      desc: "سيارة تتسارع. ع (السرعة النهائية)، ع₀ (السرعة الابتدائية)، ج (العجلة)، ز (الزمن).",
      lhsCorrect: "L T^-1",
      rhsCorrect: "L T^-1",
      correctConsistency: true,
      explain: "✅ معادلة صحيحة بعدياً! أبعاد الطرف الأيسر [ع] = L T⁻¹، وأبعاد الطرف الأيمن: [ع₀] = L T⁻¹، و[ج ز] = (L T⁻²) × T = L T⁻¹."
    },
    {
      eq: "ف = ج ز²",
      desc: "مسافة سقوط حر. ف (المسافة)، ج (العجلة تسارع الجاذبية)، ز (الزمن البعدي).",
      lhsCorrect: "L",
      rhsCorrect: "L",
      correctConsistency: true,
      explain: "✅ معادلة صحيحة بعدياً! أبعاد الطرف الأيسر [ف] = L، والطرف الأيمن [ج ز²] = (L T⁻²) × T² = L. (ملاحظة: الثوابت العددية لا أبعاد لها لذا تتفق الصيغتان بعدياً)."
    },
    {
      eq: "ف = ع₀ ز² + ج ز",
      desc: "علاقة تجريبية مفترضة لقياس الحركة الثنائية.",
      lhsCorrect: "L",
      rhsCorrect: "L T", // ع₀ ز² = LT^-1 * T^2 = LT (أو ج ز = LT^-1) فهي غير متجانسة لأن الحدود غير متجانسة
      correctConsistency: false,
      explain: "❌ خطأ وغير متجانسة! أبعاد الطرف الأيسر [ف] = L. أبعاد أطراف الأيمن: [ع₀ ز²] = L T⁻¹ × T² = L T، و[ج ز] = L T⁻² × T = L T⁻¹. الحدود اليمينية مختلفة بالتالي لا يمكن جمعها أصلاً والسرعتان فاشلتان علمياً."
    }
  ];

  const currentEq = equations[currentIdx];

  const handleVerify = () => {
    if (lhsInput.trim() === '' || rhsInput.trim() === '' || isConsistent === null) {
      setFeedback('⚠️ عذراً يا ذكي! الرجاء كتابة صيغ الأبعاد لكلا الطرفين وتحديد التجانس أولاً.');
      return;
    }

    // تنظيف المدخلات لتقليل الأخطاء الإملائية والمسافات
    const cleanLHS = lhsInput.trim().replace(/\s+/g, '').toLowerCase();
    const cleanTrueLHS = currentEq.lhsCorrect.replace(/\s+/g, '').toLowerCase();
    const cleanRHS = rhsInput.trim().replace(/\s+/g, '').toLowerCase();
    const cleanTrueRHS = currentEq.rhsCorrect.replace(/\s+/g, '').toLowerCase();

    const isLhsOk = cleanLHS === cleanTrueLHS;
    const isRhsOk = cleanRHS === cleanTrueRHS;
    const isChoiceOk = isConsistent === currentEq.correctConsistency;

    setSubmitted(true);

    if (isLhsOk && isRhsOk && isChoiceOk) {
      setScore(prev => prev + 1);
      setFeedback(`🎉 قياس عبقري وصحيح! ${currentEq.explain}`);
      if (currentIdx === equations.length - 1 && onComplete) {
        onComplete(40, 'lab_dimensional_full');
      }
    } else {
      let errStr = "⚠️ بعض الرصود خاطئة! ";
      if (!isLhsOk) errStr += `صيغة الطرف الأيسر غير دقيقة (الصحيحة: ${currentEq.lhsCorrect}). `;
      if (!isRhsOk) errStr += `صيغة الطرف الأيمن غير دقيقة (الصحيحة: ${currentEq.rhsCorrect}). `;
      if (!isChoiceOk) errStr += `اختيار تجانس المعادلة خطأ. `;
      errStr += `\n📌 الشرح العلمي: ${currentEq.explain}`;
      setFeedback(errStr);
    }
  };

  const nextEquation = () => {
    if (currentIdx < equations.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setLhsInput('');
      setRhsInput('');
      setIsConsistent(null);
      setSubmitted(false);
      setFeedback('');
    } else {
      setFeedback(`🏆 أحسنت الصنع بإنهاء التدريب كامل! نتيجتك الإجمالية: ${score} من أصل ${equations.length}.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 shadow-sm text-right" dir="rtl">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 rounded-xl shadow-xs">
        <h4 className="font-bold text-base flex items-center gap-2">
          <Beaker size={18} />
          <span>🔬 مختبر التحليل البعدي واختبار تجانس القوانين</span>
        </h4>
        <p className="text-xs text-indigo-100 mt-1">تأكد من سلامة وصحة أي قانون فيزيائي بمطابقة وحدات أبعاده الأساسية بقوى [L] و [M] و [T]</p>
      </div>

      <div className="bg-indigo-50 border-r-4 border-indigo-600 p-3.5 rounded-l-xl text-indigo-950 text-[11px] leading-relaxed">
        ✏️ <b>إسهامات دقيقة وصيغ القياس المنهجي:</b><br />
        • الطول أو المسافة ◄ <b>[L]</b> | الكتلة ◄ <b>[M]</b> | الزمن دقيقة أو ثانية ◄ <b>[T]</b><br />
        • السرعة [ع] ◄ <b>L T^-1</b> | العجلة [ج] ◄ <b>L T^-2</b><br />
        • اكتب الصيغ مستخدماً الأحرف الكبيرة وإشارة القوة (مثال: <b>L T^-1</b> أو <b>L T^-2</b>)
      </div>

      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center space-y-3">
        <span className="text-[10px] font-bold text-slate-400">العلاقة الفيزيائية المراد فحصها ({currentIdx + 1} / {equations.length})</span>
        <h3 className="text-xl font-bold font-sans text-indigo-950 block select-all">{currentEq.eq}</h3>
        <p className="text-xs text-slate-600 leading-normal">{currentEq.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
        <div className="space-y-1.5 text-right">
          <label className="block text-slate-700">صيغة أبعاد الطرف الأيسر [LHS]:</label>
          <input
            type="text"
            placeholder="مثال: L T^-1"
            value={lhsInput}
            onChange={(e) => setLhsInput(e.target.value)}
            disabled={submitted}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-center font-mono font-bold focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          />
        </div>
        <div className="space-y-1.5 text-right">
          <label className="block text-slate-700">صيغة أبعاد أطراف الأيمن [RHS]:</label>
          <input
            type="text"
            placeholder="مثال: L T^-2"
            value={rhsInput}
            onChange={(e) => setRhsInput(e.target.value)}
            disabled={submitted}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-center font-mono font-bold focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center space-y-2.5">
        <span className="text-[11px] font-bold text-slate-700 block text-right">الاستنتاج المنهجي: هل المعادلة متجانسة بعدياً؟</span>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsConsistent(true)}
            disabled={submitted}
            className={`px-6 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isConsistent === true
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white hover:bg-slate-100 border-slate-250 text-slate-705'
            }`}
          >
            ✅ متجانسة (ممكنة علمياً)
          </button>
          <button
            onClick={() => setIsConsistent(false)}
            disabled={submitted}
            className={`px-6 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isConsistent === false
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white hover:bg-slate-100 border-slate-250 text-slate-705'
            }`}
          >
            ❌ غير متجانسة (خاطئة حتماً)
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs font-bold leading-relaxed border whitespace-pre-line ${
          feedback.includes('🎉') ? 'bg-emerald-50 border-emerald-100 text-emerald-850' : 'bg-red-50 border-red-100 text-red-850'
        }`}>
          {feedback}
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button
          onClick={handleVerify}
          disabled={submitted}
          className="bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md disabled:opacity-50"
        >
          <CheckCircle size={15} />
          <span>تحقق من الحل ونقاط الرصد</span>
        </button>
        {(submitted || currentIdx < equations.length - 1) && (
          <button
            onClick={nextEquation}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>المعادلة التالية</span>
            <MoveRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. مختبر المتجهات (الدرس السادس)
// ==========================================
export function VectorsLab({ onComplete }: LabProps) {
  const [row1R, setRow1R] = useState('');
  const [row2R, setRow2R] = useState('');
  const [row3R, setRow3R] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const checkVectorsTable = () => {
    const val1 = parseFloat(row1R);
    const val2 = parseFloat(row2R);
    const val3 = parseFloat(row3R);

    if (isNaN(val1) || isNaN(val2) || isNaN(val3)) {
      setFeedback('⚠️ الرجاء ملء جميع خانات المحصلات R في جدول رصد تجارب المتجهات لتصحيحها.');
      return;
    }

    const is1Correct = Math.abs(val1 - 10) < 0.1;
    const is2Correct = Math.abs(val2 - 10) < 0.1;
    const is3Correct = Math.abs(val3 - 4) < 0.1;

    setSubmitted(true);

    if (is1Correct && is2Correct && is3Correct) {
      setFeedback('🎉 قياسات ممتازة ودقيقة للمحصلة! لقد تحققت من قوانين جمع المتجهات في أبعادها الصفرية والمتعامدة والمعاكسة بدقة بالغة.');
      if (onComplete) onComplete(30, 'lab_vectors_full');
    } else {
      setFeedback(`❌ نأسف! هناك أخطاء في قياس بعض المحصلات:\n` +
                 `• الحالة الأولى: المحصلة R هي A + B = 5 + 5 = 10.\n` +
                 `• الحالة الثانية (متعامدان): R = √(6² + 8²) = √(36+64) = √100 = 10.\n` +
                 `• الحالة الثالثة (متعاكسان): R = |A - B| = |10 - 6| = 4.`);
    }
  };

  const resetTable = () => {
    setRow1R('');
    setRow2R('');
    setRow3R('');
    setSubmitted(false);
    setFeedback('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 shadow-sm text-right" dir="rtl">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-xl shadow-xs">
        <h4 className="font-bold text-base flex items-center gap-2">
          <Compass size={18} />
          <span>📐 مختبر تحليل المتجهات وحساب المحصلات (R)</span>
        </h4>
        <p className="text-xs text-emerald-100 mt-1">تفاعل مع معمل PhET الافتراضي لقياس قوى وحساب محصلة متجهين بزاوية مختلفة</p>
      </div>

      {/* تعليمات المعمل */}
      <div className="bg-emerald-50 border-r-4 border-emerald-600 p-4 rounded-l-xl space-y-2 text-emerald-950 text-xs">
        <h5 className="font-bold flex items-center gap-1">
          <Sparkles size={14} className="text-emerald-700" />
          <span>خطوات التجربة التفاعلية المنهجية:</span>
        </h5>
        <ol className="list-decimal list-inside space-y-1 text-[11px] font-medium leading-relaxed">
          <li>افتح المحاورة التفاعلية لجامعة كولورادو بالأسفل (أو عايرها خارجياً).</li>
          <li>اسحب المتجه (A) و (B) واضبط أطوالهما في ساحة التجريب بالدرجات المذكورة بالجدول.</li>
          <li>فعّل خيار <b>المحصلة (SUM)</b> وقم بقراءة قيمة المحصلة وادخلها في الجدول فوراً للمطابقة الحية.</li>
        </ol>
      </div>

      <div className="border border-slate-150 rounded-2xl overflow-hidden h-[420px] bg-slate-900 relative">
        <iframe 
          src="https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_all.html?locale=ar&screens=1,2"
          allowFullScreen
          className="w-full h-full border-none relative z-10"
          title="معمل المتجهات الافتراضي PhET"
        />
      </div>

      <div className="space-y-3.5">
        <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1">
          <Activity size={15} className="text-emerald-600" />
          <span>📊 جدول رصد وتحليل المتجهات (التصحيح والرصد الفوري)</span>
        </h4>

        <div className="overflow-x-auto border border-slate-100 rounded-xl bg-white">
          <table className="w-full text-xs text-slate-700 table-auto border-collapse text-right">
            <thead>
              <tr className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-150">
                <th className="p-3">المقدار A</th>
                <th className="p-3">المقدار B</th>
                <th className="p-3">الزاوية θ</th>
                <th className="p-3">الموقع التحليلي</th>
                <th className="p-3 text-center">المحصلة العددية R</th>
                <th className="p-3 text-center">الحالة رصداً</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-mono font-bold">5 وحدات</td>
                <td className="p-3 font-mono font-bold">5 وحدات</td>
                <td className="p-3 font-mono text-emerald-700 font-bold">0° (بنفس الاتجاه)</td>
                <td className="p-3 text-slate-500 font-medium">على المحور السيني الموجب</td>
                <td className="p-3">
                  <div className="flex justify-center">
                    <input
                      type="number"
                      placeholder="?"
                      value={row1R}
                      onChange={(e) => setRow1R(e.target.value)}
                      disabled={submitted}
                      className="w-16 p-1.5 rounded-lg border border-slate-200 text-center font-mono font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </td>
                <td className="p-3 text-center">
                  {submitted ? (
                    Math.abs(parseFloat(row1R) - 10) < 0.1 ? (
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">✅ صح (10)</span>
                    ) : (
                      <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full inline-block">❌ خطأ (10)</span>
                    )
                  ) : <span className="text-slate-400">قيد الرصد</span>}
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-mono font-bold">6 وحدات</td>
                <td className="p-3 font-mono font-bold">8 وحدات</td>
                <td className="p-3 font-mono text-indigo-700 font-bold">90° (متعامدان)</td>
                <td className="p-3 text-slate-500 font-medium">زاوية قائمة فيثاغورية</td>
                <td className="p-3">
                  <div className="flex justify-center">
                    <input
                      type="number"
                      placeholder="?"
                      value={row2R}
                      onChange={(e) => setRow2R(e.target.value)}
                      disabled={submitted}
                      className="w-16 p-1.5 rounded-lg border border-slate-200 text-center font-mono font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </td>
                <td className="p-3 text-center">
                  {submitted ? (
                    Math.abs(parseFloat(row2R) - 10) < 0.1 ? (
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">✅ صح (10)</span>
                    ) : (
                      <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full inline-block">❌ خطأ (10)</span>
                    )
                  ) : <span className="text-slate-400">قيد الرصد</span>}
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-mono font-bold">10 وحدات</td>
                <td className="p-3 font-mono font-bold">6 وحدات</td>
                <td className="p-3 font-mono text-amber-700 font-bold">180° (متعاكسان)</td>
                <td className="p-3 text-slate-500 font-medium">على طول خط مستقيم عكسياً</td>
                <td className="p-3">
                  <div className="flex justify-center">
                    <input
                      type="number"
                      placeholder="?"
                      value={row3R}
                      onChange={(e) => setRow3R(e.target.value)}
                      disabled={submitted}
                      className="w-16 p-1.5 rounded-lg border border-slate-200 text-center font-mono font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </td>
                <td className="p-3 text-center">
                  {submitted ? (
                    Math.abs(parseFloat(row3R) - 4) < 0.1 ? (
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">✅ صح (4)</span>
                    ) : (
                      <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full inline-block">❌ خطأ (4)</span>
                    )
                  ) : <span className="text-slate-400">قيد الرصد</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs font-bold leading-relaxed border whitespace-pre-line ${
          feedback.includes('🎉') ? 'bg-emerald-50 border-emerald-100 text-emerald-850' : 'bg-rose-50 border-rose-100 text-rose-850'
        }`}>
          {feedback}
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button
          onClick={checkVectorsTable}
          disabled={submitted}
          className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md disabled:opacity-50"
        >
          <CheckCircle size={15} />
          <span>تحقق من قراءات جدول الرصد</span>
        </button>
        <button
          onClick={resetTable}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
        >
          <RotateCcw size={15} />
          <span>إعادة تعيين القراءات</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. مختبر حساب متوسط السرعة (الدرس الثامن)
// ==========================================
export function SpeedLab({ onComplete }: LabProps) {
  const [speed, setSpeed] = useState(30); // م/ث
  const [runs, setRuns] = useState<{ id: number; speed: number; distance: number; time: number }[]>([]);
  const [carPosition, setCarPosition] = useState(0); // نسبة مئوية
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const runTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (runTimerRef.current) clearInterval(runTimerRef.current);
    };
  }, []);

  const changeSpeed = (delta: number) => {
    if (isRunning) return;
    setSpeed(prev => Math.max(10, Math.min(100, prev + delta)));
  };

  const startRun = () => {
    if (isRunning) return;
    setCarPosition(0);
    setElapsedTime(0);
    setIsRunning(true);
    setAvgSpeed(null);
    setFeedback('');

    const targetDistance = 100; // مئة متر عيارياً
    // الزمن المطلوب لقطع المسافة = المسافة ÷ السرعة
    const totalDurationSeconds = targetDistance / speed; 
    const stepMs = 50;
    const progressPerStep = (stepMs / 1000) * (speed / targetDistance) * 100;

    let localPos = 0;
    let localTime = 0;

    runTimerRef.current = window.setInterval(() => {
      localPos += progressPerStep;
      localTime += stepMs / 1000;

      if (localPos >= 100) {
        localPos = 100;
        localTime = targetDistance / speed; // حساب زمني مثالي رياضي دقيق
        if (runTimerRef.current) clearInterval(runTimerRef.current);
        setIsRunning(false);

        // إضافة المحاولة بشكل نهائي لجدول الرصد المنهجي
        const newRun = {
          id: Date.now(),
          speed: speed,
          distance: targetDistance,
          time: parseFloat(localTime.toFixed(2))
        };
        setRuns(prev => [newRun, ...prev].slice(0, 5)); // الاحتفاظ بآخر 5 محاولات
        setFeedback(`✅ رصد مكتمل! قطعت السيارة مسافة ${targetDistance}م بسرعة ${speed}م/ث في زمن قدره ${localTime.toFixed(2)} ثانية.`);
      }

      setCarPosition(localPos);
      setElapsedTime(parseFloat(localTime.toFixed(2)));
    }, stepMs);
  };

  const calculateTotalAverage = () => {
    if (runs.length === 0) {
      setFeedback('⚠️ عذراً! يرجى تنفيذ تجربة ومحاولة جري واحدة على الأقل قبل حساب متوسط السرعة.');
      return;
    }

    // الحسم الرياضي الفعلي: متوسط السرعة = مجموع المسافات ÷ مجموع الأزمنة الكلية
    const totalDistance = runs.reduce((acc, curr) => acc + curr.distance, 0);
    const totalTime = runs.reduce((acc, curr) => acc + curr.time, 0);
    const average = totalDistance / totalTime;

    setAvgSpeed(parseFloat(average.toFixed(2)));
    setFeedback(`🏆 تم التقييد بنجاح! متوسط السرعة لكافة المحاولات الحقيقية هو ${average.toFixed(2)} م/ث.\n` +
                 `مجموع المسافات لرحلتك: ${totalDistance}م ، مجموع الأزمنة: ${totalTime.toFixed(2)}ث.`);
    
    if (runs.length >= 3 && onComplete) {
      onComplete(35, 'lab_speed_average_full');
    }
  };

  const clearRuns = () => {
    setRuns([]);
    setCarPosition(0);
    setIsRunning(false);
    setElapsedTime(0);
    setAvgSpeed(null);
    setFeedback('');
    if (runTimerRef.current) clearInterval(runTimerRef.current);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 shadow-sm text-right" dir="rtl">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-xl shadow-xs">
        <h4 className="font-bold text-base flex items-center gap-2">
          <TrendingUp size={18} />
          <span>🚗 مختبر حساب متوسط السرعة ورصد الزمن الحركي</span>
        </h4>
        <p className="text-xs text-blue-100 mt-1">اضبط سرعة انطلاق سيارتك، شغل المعايرة، واحسب متوسط السرعة الإجمالي لمختلف المحاولات بدقة علمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* وحدة التحكم وسرعة العداد */}
        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
          <span className="text-[10px] font-bold text-slate-400 block text-right">لوحة التحكم والمؤشرات الرقمية</span>
          
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => changeSpeed(-10)}
              disabled={isRunning || speed <= 10}
              className="w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold flex items-center justify-center text-lg active:scale-90 cursor-pointer disabled:opacity-40"
            >
              ➖
            </button>
            
            <div className="text-center bg-white p-3.5 rounded-xl border border-slate-200 min-w-40 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">السرعة المحددة لرحلتك</span>
              <strong className="text-3xl font-black font-sans text-indigo-900 leading-none">{speed}</strong>
              <span className="text-[10px] text-slate-400 font-bold block mt-1">متر / ثانية (m/s)</span>
            </div>

            <button
              onClick={() => changeSpeed(10)}
              disabled={isRunning || speed >= 100}
              className="w-10 h-10 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold flex items-center justify-center text-lg active:scale-90 cursor-pointer disabled:opacity-40"
            >
              ➕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-150">
              <span className="text-[10px] text-slate-450 font-bold block">المسافة العيارية ف</span>
              <strong className="text-sm text-indigo-950 font-bold font-mono">100 متر (m)</strong>
            </div>
            <div className="bg-teal-50/60 p-2.5 rounded-lg border border-teal-150">
              <span className="text-[10px] text-slate-450 font-bold block">الزمن المرصود ز</span>
              <strong className="text-sm text-teal-950 font-bold font-mono">{elapsedTime} ثانية (s)</strong>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={startRun}
              disabled={isRunning}
              className="flex-1 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 inline-flex items-center justify-center gap-1.5 text-white font-extrabold text-xs p-3 rounded-xl active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <Play size={14} />
              <span>انطلق في التجربة</span>
            </button>
            <button
              onClick={calculateTotalAverage}
              className="bg-emerald-600 hover:bg-emerald-700 inline-flex items-center justify-center gap-1.5 text-white font-extrabold text-xs px-4 rounded-xl active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <Award size={14} />
              <span>احسب المتوسط</span>
            </button>
          </div>
        </div>

        {/* مسار الانطلاق التشبيهي */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white flex flex-col justify-between min-h-[180px] border border-slate-950 relative overflow-hidden">
          <span className="text-[10px] text-slate-450 font-bold">بوابة رصد ومتابعة السيارة على الطريق العلمي</span>
          
          <div className="h-6 w-full bg-slate-800 rounded border border-slate-750 relative flex items-center my-6">
            {/* خطوط الطريق المتقطعة */}
            <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-slate-400 opacity-30"></div>
            {/* خط البداية والنهاية */}
            <span className="absolute right-1 text-[8px] bg-indigo-600 px-1 py-0.2 rounded text-white z-10">البداية 0م</span>
            <span className="absolute left-1 text-[8px] bg-red-650 px-1 py-0.2 rounded text-white z-10">النهاية 100م</span>
            
            {/* السيارة المتحركة الفائقة */}
            <div 
              className="absolute text-xl transition-all duration-75 ease-linear"
              style={{ right: `calc(${carPosition}% - 14px)` }}
            >
              🚗
            </div>
          </div>

          <div className="h-0.5 bg-slate-850 w-full mb-1"></div>
          <p className="text-[10px] text-indigo-250 italic text-center font-medium animate-pulse">سيارة الأستاذ سياف الشباطي للتعليم المتكامل والديناميكا الحية</p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-xs font-bold leading-normal text-emerald-850 whitespace-pre-line">
          {feedback}
        </div>
      )}

      {/* جدول رصد محاولات الصانع الفيزيائي */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1">
            <Activity size={15} className="text-indigo-600" />
            <span>📊 سجل رصد محاولات السرعة الحركية (آخر 5 تجارب)</span>
          </h4>
          <button 
            onClick={clearRuns} 
            className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg hover:bg-rose-100 cursor-pointer"
          >
            مسح السجل
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-xl bg-white">
          <table className="w-full text-xs text-slate-700 table-auto border-collapse text-right">
            <thead>
              <tr className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-150">
                <th className="p-3">رقم المحاولة</th>
                <th className="p-3">السرعة المهروسة v</th>
                <th className="p-3">المسافة ف</th>
                <th className="p-3">الزمن المستهلك t</th>
                <th className="p-3">الحالة رياضيًا</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono font-bold text-slate-800">
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-400 font-medium">لا يوجد محاولات منجزة بعد. انقر على 'انطلق في التجربة' للبدء.</td>
                </tr>
              ) : (
                runs.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-slate-50/50">
                    <td className="p-3 text-slate-400">محاولة {runs.length - idx}</td>
                    <td className="p-3 text-indigo-800">{r.speed} م/ث</td>
                    <td className="p-3 text-emerald-800">{r.distance} م</td>
                    <td className="p-3 text-teal-800">{r.time} ثانية</td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] font-sans font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full inline-block">✅ رصد ناجح</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. مختبر رصد العجلة المتسارعة (الدرس التاسع)
// ==========================================
export function AccelerationLab({ onComplete }: LabProps) {
  const [accelType, setAccelType] = useState<'positive' | 'negative' | 'zero'>('positive');
  
  // New Physical Slider States
  const [v0, setV0] = useState(10); // m/s
  const [accel, setAccel] = useState(5.0); // m/s²
  const [duration, setDuration] = useState(8.0); // s

  // Simulation Running State
  const [isRunning, setIsRunning] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentDisplacement, setCurrentDisplacement] = useState(0);

  // Time-series data recorded during active run
  const [currentRunData, setCurrentRunData] = useState<{ t: number, v: number, d: number }[]>([]);

  // Historical / Saved runs for comparison
  const [savedRuns, setSavedRuns] = useState<any[]>([]);
  const [runsColors] = useState(['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899']);

  // Quiz States (Original)
  const [userAnswer, setUserAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState('');
  const [feedback, setFeedback] = useState('');

  const animRef = useRef<number | null>(null);
  const trackCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const vtCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dtCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Quick Preset Selection (Bridges sliders with original preset IDs)
  const selectPreset = (type: 'positive' | 'negative' | 'zero') => {
    setAccelType(type);
    setFeedback('');
    if (type === 'positive') {
      setV0(10);
      setAccel(5.0);
      setDuration(8.0);
    } else if (type === 'negative') {
      setV0(50);
      setAccel(-6.0);
      setDuration(8.0);
    } else {
      setV0(30);
      setAccel(0.0);
      setDuration(8.0);
    }

    // Reset current active run
    setCurrentTime(0);
    setCurrentSpeed(0);
    setCurrentDisplacement(0);
    setCurrentRunData([]);
  };

  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setFeedback('');
    
    // Clear and put initial state
    const points: { t: number, v: number, d: number }[] = [];
    points.push({ t: 0, v: v0, d: 0 });
    setCurrentRunData(points);
    setCurrentTime(0);
    setCurrentSpeed(v0);
    setCurrentDisplacement(0);

    const stepSeconds = 0.05;
    const intervalMs = 50;
    let t = 0;

    // If brakes are applied (accel < 0), calculate exact time of coming to stop
    const stoppingTime = accel < 0 ? -v0 / accel : Infinity;

    animRef.current = window.setInterval(() => {
      t += stepSeconds;
      if (t > duration) t = duration;

      let v = v0 + accel * t;
      let d = v0 * t + 0.5 * accel * t * t;

      // Handle full stop if negative acceleration stops motion
      if (accel < 0 && t >= stoppingTime) {
        v = 0;
        const tStop = stoppingTime;
        d = v0 * tStop + 0.5 * accel * tStop * tStop;
      }

      const cleanV = parseFloat(v.toFixed(2));
      const cleanT = parseFloat(t.toFixed(2));
      const cleanD = parseFloat(d.toFixed(2));

      setCurrentSpeed(cleanV);
      setCurrentTime(cleanT);
      setCurrentDisplacement(cleanD);

      points.push({ t: cleanT, v: cleanV, d: cleanD });
      setCurrentRunData([...points]);

      if (t >= duration) {
        if (animRef.current) clearInterval(animRef.current);
        setIsRunning(false);
      }
    }, intervalMs);
  };

  const saveCurrentRun = () => {
    if (currentRunData.length === 0) {
      setFeedback('⚠️ الرجاء تشغيل المحاكاة أولاً لتسجيل ورصد حركة التجربة!');
      return;
    }
    const runId = Date.now();
    const index = savedRuns.length % runsColors.length;
    
    const newRun = {
      id: runId,
      name: `تجربة #${savedRuns.length + 1} (سرعة=${v0} م/ث، عجلة=${accel}، زمن=${duration}ث)`,
      v0,
      accel,
      duration,
      finalV: currentSpeed,
      finalD: currentDisplacement,
      color: runsColors[index],
      data: [...currentRunData],
      showOnGraph: true
    };

    setSavedRuns(prev => [...prev, newRun]);
    setFeedback(`📥 تم حفظ التجربة رقم #${savedRuns.length + 1} بنجاح! تم قيدها في جدول مقارنة التجارب وتظليلها على الرسم البياني.`);
  };

  const deleteSavedRun = (id: number) => {
    setSavedRuns(prev => prev.filter(r => r.id !== id));
  };

  const toggleRunVisibility = (id: number) => {
    setSavedRuns(prev => prev.map(r => r.id === id ? { ...r, showOnGraph: !r.showOnGraph } : r));
  };

  const clearComparisons = () => {
    setSavedRuns([]);
    setFeedback('🗑️ تم إفراغ سجل المقارنات الحركية بالكامل.');
  };

  const checkQuiz = () => {
    if (!userAnswer) {
      setQuizFeedback('⚠️ الرجاء اختيار خيار للإجابة على تحدي العجلة أولاً.');
      return;
    }
    setQuizSubmitted(true);
    if (userAnswer === 'a2') {
      setQuizFeedback('🎉 إجابة مذهلة وصحيحة! العجلة سالبة (تباطؤ) وقيمتها = (ع - ع₀) / ز = (0 - 20) / 5 = -4 م/ث².');
      if (onComplete) onComplete(30, 'lab_acceleration_quiz');
    } else {
      setQuizFeedback('❌ الإجابة غير صحيحة. القيمة الرياضية هي -4 م/ث² لأن السيارة تباطأت حتى توقفت (السرعة النهائية ع=0 والابتدائية ع₀=20).');
    }
  };

  // Graph and track auto-scales calculations
  const findMaxT = () => {
    let list = [duration];
    savedRuns.forEach(r => { if (runNeedsPlotting(r)) list.push(r.duration); });
    return Math.max(...list);
  };

  const findMaxV = () => {
    let list = [v0, Math.abs(v0 + accel * duration)];
    savedRuns.forEach(r => {
      if (runNeedsPlotting(r)) {
        list.push(r.v0);
        list.push(Math.abs(r.v0 + r.accel * r.duration));
      }
    });
    return Math.max(40, ...list);
  };

  const findMaxD = () => {
    const currentEndD = v0 * duration + 0.5 * accel * duration * duration;
    let list = [currentEndD];
    savedRuns.forEach(r => {
      if (runNeedsPlotting(r)) {
        list.push(r.finalD);
      }
    });
    return Math.max(100, ...list);
  };

  const runNeedsPlotting = (run: any) => {
    return run.showOnGraph && run.data && run.data.length > 0;
  };

  // Real-time Canvas Renderer Effects
  useEffect(() => {
    // 1) Render Roadway Simulation Track
    const drawTrack = () => {
      const canvas = trackCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Asphalt roadway background
      ctx.fillStyle = '#1e293b'; 
      ctx.fillRect(0, 20, W, 40);

      // Yellow dashed lane lines
      ctx.strokeStyle = '#eab308'; 
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 40); ctx.lineTo(W, 40);
      ctx.stroke();
      ctx.setLineDash([]); 

      // Road shoulder railings
      ctx.strokeStyle = '#64748b'; 
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 20); ctx.lineTo(W, 20);
      ctx.moveTo(0, 60); ctx.lineTo(W, 60);
      ctx.stroke();

      const activeMaxD = findMaxD();
      const maxTrackD = Math.max(100, activeMaxD);

      // Distance labels on the shoulder and ticks
      ctx.fillStyle = '#94a3b8'; 
      ctx.font = 'bold 8px sans-serif';
      const stepsCount = 10;
      const stepDist = Math.ceil(maxTrackD / stepsCount / 10) * 10 || 10;
      for (let dMark = 0; dMark <= maxTrackD; dMark += stepDist) {
        const xMark = 30 + (dMark / maxTrackD) * (W - 60);
        ctx.strokeStyle = '#475569';
        ctx.beginPath();
        ctx.moveTo(xMark, 16); ctx.lineTo(xMark, 20);
        ctx.stroke();
        ctx.fillText(`${dMark}م`, xMark - 7, 12);
      }

      // Draw final position markers of saved Runs!
      savedRuns.forEach(run => {
        if (runNeedsPlotting(run)) {
          const runX = 30 + (run.finalD / maxTrackD) * (W - 60);
          ctx.strokeStyle = run.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(runX, 20); ctx.lineTo(runX, 55);
          ctx.stroke();

          ctx.fillStyle = run.color;
          ctx.fillRect(runX, 20, 14, 10);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 6px sans-serif';
          ctx.fillText(`ت${savedRuns.indexOf(run) + 1}`, runX + 2, 28);
        }
      });

      // Draw active car emoji at mapped position
      const carPosPercent = currentDisplacement / maxTrackD;
      const carX = 30 + carPosPercent * (W - 60);
      ctx.font = '20px Arial';
      ctx.fillText('🚗', carX - 10, 48);

      // Sparkles and status indicator on track
      if (isRunning) {
        ctx.fillStyle = accel > 0 ? '#10b981' : accel < 0 ? '#ef4444' : '#60a5fa';
        ctx.font = 'bold 7px sans-serif';
        ctx.fillText(accel > 0 ? '⟫⟫ تزايد' : accel < 0 ? '⟪⟪ تباطؤ' : 'منتظم', carX - 15, 69);
      }
    };

    // 2) Render Velocity-Time (v-t) Graph
    const drawVtGraph = () => {
      const canvas = vtCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Tech Slate Background
      ctx.fillStyle = '#0f172a'; 
      ctx.fillRect(0, 0, W, H);

      const margin = 30;
      const graphW = W - 2 * margin;
      const graphH = H - 2 * margin;

      const maxT = findMaxT();
      const maxV = findMaxV();

      // Draw Grid Lines & text values
      ctx.strokeStyle = '#1e293b'; 
      ctx.lineWidth = 0.5;
      ctx.fillStyle = '#64748b'; 
      ctx.font = '7px monospace';

      for (let vStep = 0; vStep <= maxV; vStep += Math.max(5, Math.ceil(maxV / 5))) {
        const y = H - margin - (vStep / maxV) * graphH;
        ctx.beginPath(); ctx.moveTo(margin, y); ctx.lineTo(W - margin, y); ctx.stroke();
        ctx.fillText(`${vStep}`, 6, y + 3);
      }

      for (let tStep = 0; tStep <= maxT; tStep += Math.max(1, Math.ceil(maxT / 5))) {
        const x = margin + (tStep / maxT) * graphW;
        ctx.beginPath(); ctx.moveTo(x, margin); ctx.lineTo(x, H - margin); ctx.stroke();
        ctx.fillText(`${tStep}ث`, x - 5, H - margin + 12);
      }

      // Main Axes
      ctx.strokeStyle = '#94a3b8'; 
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(margin, margin); ctx.lineTo(margin, H - margin);
      ctx.lineTo(W - margin, H - margin);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#cbd5e1'; 
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText('السرعة ع (m/s)', margin - 15, margin - 10);
      ctx.fillText('الزمن ز (s)', W - margin - 35, H - margin + 12);

      // Plot overlay compared runs (dashed lines)
      savedRuns.forEach((run, idx) => {
        if (runNeedsPlotting(run)) {
          ctx.strokeStyle = run.color;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          run.data.forEach((pt: any, pIdx: number) => {
            const x = margin + (pt.t / maxT) * graphW;
            const y = H - margin - (pt.v / maxV) * graphH;
            if (pIdx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.stroke();
        }
      });
      ctx.setLineDash([]); 

      // Plot active run line
      if (currentRunData.length > 0) {
        ctx.strokeStyle = '#6366f1'; 
        ctx.lineWidth = 3;
        ctx.beginPath();
        currentRunData.forEach((pt, pIdx) => {
          const x = margin + (pt.t / maxT) * graphW;
          const y = H - margin - (pt.v / maxV) * graphH;
          if (pIdx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
    };

    // 3) Render Displacement-Time (d-t) Graph
    const drawDtGraph = () => {
      const canvas = dtCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, W, H);

      const margin = 30;
      const graphW = W - 2 * margin;
      const graphH = H - 2 * margin;

      const maxT = findMaxT();
      const maxD = findMaxD();

      // Draw Grid Lines & text values
      ctx.strokeStyle = '#1e293b'; 
      ctx.lineWidth = 0.5;
      ctx.fillStyle = '#64748b'; 
      ctx.font = '7px monospace';

      for (let dStep = 0; dStep <= maxD; dStep += Math.max(10, Math.ceil(maxD / 5))) {
        const y = H - margin - (dStep / maxD) * graphH;
        ctx.beginPath(); ctx.moveTo(margin, y); ctx.lineTo(W - margin, y); ctx.stroke();
        ctx.fillText(`${dStep}`, 6, y + 3);
      }

      for (let tStep = 0; tStep <= maxT; tStep += Math.max(1, Math.ceil(maxT / 5))) {
        const x = margin + (tStep / maxT) * graphW;
        ctx.beginPath(); ctx.moveTo(x, margin); ctx.lineTo(x, H - margin); ctx.stroke();
        ctx.fillText(`${tStep}ث`, x - 5, H - margin + 12);
      }

      // Draw Main Axes
      ctx.strokeStyle = '#94a3b8'; 
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(margin, margin); ctx.lineTo(margin, H - margin);
      ctx.lineTo(W - margin, H - margin);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#cbd5e1'; 
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText('الإزاحة ف (m)', margin - 15, margin - 10);
      ctx.fillText('الزمن ز (s)', W - margin - 35, H - margin + 12);

      // Plot overlay compared runs 
      savedRuns.forEach(run => {
        if (runNeedsPlotting(run)) {
          ctx.strokeStyle = run.color;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          run.data.forEach((pt: any, pIdx: number) => {
            const x = margin + (pt.t / maxT) * graphW;
            const y = H - margin - (pt.d / maxD) * graphH;
            if (pIdx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.stroke();
        }
      });
      ctx.setLineDash([]); 

      // Plot active run line (quadratic curve)
      if (currentRunData.length > 0) {
        ctx.strokeStyle = '#10b981'; 
        ctx.lineWidth = 3;
        ctx.beginPath();
        currentRunData.forEach((pt, pIdx) => {
          const x = margin + (pt.t / maxT) * graphW;
          const y = H - margin - (pt.d / maxD) * graphH;
          if (pIdx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
    };

    drawTrack();
    drawVtGraph();
    drawDtGraph();
  }, [currentRunData, savedRuns, currentTime, v0, accel, duration, currentDisplacement]);

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 shadow-sm text-right" dir="rtl">
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-4 rounded-xl shadow-xs">
        <h4 className="font-bold text-base flex items-center gap-2">
          <Flame size={18} />
          <span>🚀 علم العجلة والتسارع ورسم المنحنيات البيانية حركياً</span>
        </h4>
        <p className="text-xs text-indigo-150 mt-1">قم بتصميم وتجربة حركة سيارة تحت عواطف العجلة (الموجبة والسالبة والمنعدمة) ورؤية انحناء المبيانات لحظياً!</p>
      </div>

      <div className="bg-indigo-50 border-r-4 border-indigo-650 p-3 text-indigo-950 text-xs leading-relaxed font-semibold">
        🏷️ <b>مفهوم رائد:</b> العجلة المنتظمة هي مقدار التغير الثابت المنحدر لسرعة مركبتك في كل ثانية حتمية. العجلة الصفرية تعني سيارة تسير بسرعة ثابتة دون زيادة أو نقصان ترفاً.
      </div>

      {/* Preset selections */}
      <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 block text-right mb-1">تحديد سريع لنوع العجلة المعيارية للدرس:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: 'positive', label: '🚀 موجب (عجلة تزايدية)', color: 'border-emerald-600 bg-emerald-50/30 font-extrabold text-emerald-900' },
            { id: 'negative', label: '🛑 سالب (عجلة تباطؤية)', color: 'border-rose-600 bg-rose-50/30 font-extrabold text-rose-900' },
            { id: 'zero', label: '➡️ صفر (عجلة منعدمة)', color: 'border-blue-600 bg-blue-50/30 font-extrabold text-blue-900' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => selectPreset(item.id as any)}
              disabled={isRunning}
              className={`p-3 rounded-xl border text-center text-xs transition-all active:scale-95 cursor-pointer flex justify-center items-center ${
                accelType === item.id 
                  ? item.color
                  : 'border-slate-250 bg-white text-slate-705 font-semibold hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Physics Sliders Panel */}
      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs space-y-4">
        <span className="text-[10px] font-bold text-slate-400 block">اضبط العوامل الفيزيائية للحركة المخصصة:</span>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
            <label className="font-bold text-slate-700 flex justify-between">
              <span>⚡ السرعة الابتدائية ع₀:</span>
              <span className="font-mono text-indigo-700 font-extrabold">{v0} م/ث</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="2"
              value={v0}
              onChange={(e) => { setV0(parseInt(e.target.value)); setFeedback(''); }}
              disabled={isRunning}
              className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-indigo-650"
            />
          </div>

          <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
            <label className="font-bold text-slate-700 flex justify-between">
              <span>🌍 العجلة المطبقة حـ:</span>
              <span className="font-mono text-emerald-700 font-extrabold">{accel} م/ث²</span>
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.5"
              value={accel}
              onChange={(e) => { setAccel(parseFloat(e.target.value)); setFeedback(''); }}
              disabled={isRunning}
              className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
            />
          </div>

          <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
            <label className="font-bold text-slate-700 flex justify-between">
              <span>⏱️ مدة التجربة الكلية ز:</span>
              <span className="font-mono text-teal-700 font-extrabold">{duration} ثوانٍ</span>
            </label>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={duration}
              onChange={(e) => { setDuration(parseFloat(e.target.value)); setFeedback(''); }}
              disabled={isRunning}
              className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-teal-600"
            />
          </div>
        </div>
      </div>

      {/* Interactive Canvases Group */}
      <div className="space-y-4">
        {/* Track simulation screen */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 relative">
          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
            <span>🛣️ محاكاة واقعية لحركة المركبة على الطريق المعياري</span>
            <div className="flex gap-2">
              <span className="bg-slate-900 px-2 py-0.5 rounded text-indigo-400 font-bold font-mono">الزمن: {currentTime} ث</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400 font-bold font-mono">الإزاحة: {currentDisplacement} م</span>
            </div>
          </div>
          <canvas
            ref={trackCanvasRef}
            width={580}
            height={75}
            className="w-full h-auto bg-slate-900 block rounded-xl"
          />
        </div>

        {/* Side-by-side Velocity and Displacement graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-900">
            <span className="text-[10px] text-slate-400 block mb-1">📈 منحنى السرعة والزمن (v-t Curve):</span>
            <canvas
              ref={vtCanvasRef}
              width={280}
              height={160}
              className="w-full h-auto bg-slate-900 block rounded-xl border border-slate-900"
            />
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-900">
            <span className="text-[10px] text-slate-400 block mb-1">📈 منحنى الإزاحة والزمن (d-t Curve):</span>
            <canvas
              ref={dtCanvasRef}
              width={280}
              height={160}
              className="w-full h-auto bg-slate-900 block rounded-xl border border-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Simulation Controls & Automatic Math Calculations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
        {/* Action button center */}
        <div className="bg-slate-50 p-4 rounded-xl flex flex-col justify-center space-y-2 border border-slate-100">
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="w-full bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-extrabold p-3 rounded-xl transition-all active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
          >
            <Play size={14} />
            <span>{isRunning ? '⏳ محاكاة حية...' : '▶ انطلق وجدد الرصد'}</span>
          </button>
          
          <button
            onClick={saveCurrentRun}
            disabled={isRunning || currentRunData.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-extrabold p-3 rounded-xl transition-all active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>📥 حفظ التجربة للمقارنة</span>
          </button>
        </div>

        {/* Live Metrics readout */}
        <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100 flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 block mb-1">الرصد الرقمي التلقائي:</span>
          <div className="space-y-1 text-slate-700 leading-normal">
            <div>💡 السرعة الابتدائية ع₀: <strong className="text-indigo-900 font-mono">{v0} م/ث</strong></div>
            <div>💡 السرعة اللحظية ع: <strong className="text-amber-700 font-mono">{currentSpeed} م/ث</strong></div>
            <div>💡 الحركة المنقضية ز: <strong className="text-teal-700 font-mono">{currentTime} ث</strong></div>
            <div>💡 الإزاحة الكلية ف: <strong className="text-emerald-700 font-mono">{currentDisplacement} م</strong></div>
          </div>
        </div>

        {/* Automatic calculation formula block */}
        <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 flex flex-col justify-between">
          <span className="text-[10px] text-emerald-900 block mb-1">⚙️ معادلة حساب العجلة تلقائياً:</span>
          <div className="space-y-1 text-emerald-950 font-serif" dir="ltr">
            <div className="text-center font-bold text-sm text-emerald-850">
              a = (v<sub>f</sub> - v<sub>i</sub>) / t
            </div>
            <div className="text-center text-[11px] font-mono mt-1 text-slate-750">
              a = ({currentSpeed} - {v0}) / {currentTime || '...'}
            </div>
            <div className="text-center text-xs font-bold text-emerald-900 font-mono mt-1" dir="rtl">
              العجلة المحسوبة = {currentTime > 0 ? ((currentSpeed - v0) / currentTime).toFixed(2) : '...'} م/ث²
            </div>
          </div>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-xs font-bold leading-normal text-emerald-850 whitespace-pre-line text-right">
          {feedback}
        </div>
      )}

      {/* Comparisons Panel Section (Compare more than one experiment) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h5 className="font-extrabold text-slate-800 text-xs flex items-center gap-1">
            <Activity size={14} className="text-indigo-600 animate-pulse" />
            <span>📊 جناح مقارنة التجارب الحركية المتعددة (تراكب المبيانات)</span>
          </h5>
          {savedRuns.length > 0 && (
            <button 
              onClick={clearComparisons} 
              className="text-[9px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded hover:bg-rose-100 cursor-pointer"
            >
              مسح كافة المقارنات
            </button>
          )}
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-xl bg-slate-50">
          <table className="w-full text-[10.5px] table-auto border-collapse text-right">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
                <th className="p-2 border-l border-slate-200 text-center">تظليل ع المخطط</th>
                <th className="p-2">التجربة</th>
                <th className="p-2">السرعة البدئية</th>
                <th className="p-2">العجلة</th>
                <th className="p-2">الزمن الكلي</th>
                <th className="p-2">مجموع الإزاحة</th>
                <th className="p-2">السرعة النهائية</th>
                <th className="p-2 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-bold text-slate-800">
              {savedRuns.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-slate-450 font-medium bg-white">سجل المقارنات فارغ. انطلق بالسيارة ثم اضغط على 'حفظ التجربة للمقارنة' لتراكب مبياناتها المائلة.</td>
                </tr>
              ) : (
                savedRuns.map((run, index) => (
                  <tr key={run.id} className="hover:bg-slate-50/50 bg-white" style={{ borderLeft: `5px solid ${run.color}` }}>
                    <td className="p-2 text-center border-l border-slate-200">
                      <input 
                        type="checkbox"
                        checked={run.showOnGraph}
                        onChange={() => toggleRunVisibility(run.id)}
                        className="rounded text-indigo-650 focus:ring-0 cursor-pointer w-3.5 h-3.5"
                      />
                    </td>
                    <td className="p-2" style={{ color: run.color }}>{run.name}</td>
                    <td className="p-2 font-mono">{run.v0} م/ث</td>
                    <td className="p-2 font-mono">{run.accel >= 0 ? `+${run.accel}` : run.accel} م/ث²</td>
                    <td className="p-2 font-mono">{run.duration} ث</td>
                    <td className="p-2 font-mono text-emerald-800">{run.finalD} م</td>
                    <td className="p-2 font-mono text-amber-800">{run.finalV} م/ث</td>
                    <td className="p-2 text-center">
                      <button 
                        onClick={() => deleteSavedRun(run.id)}
                        className="text-[9px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded hover:bg-rose-100 cursor-pointer"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Challenge / Quiz (Original preserved exactly) */}
      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
        <h5 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5 border-b border-indigo-100 pb-2">
          <Target size={14} className="text-indigo-600" />
          <span>تحدي الفهم ومنهجية الحسبة المنهجية (مثال 30 للثانوي):</span>
        </h5>
        <p className="text-xs font-bold text-slate-700 leading-normal">
          تضغط سيارة عائلية على الفرامل لتتبخر سرعتها من 20 م/ث من السكون تدريجياً حتى السكون التام والوقف في 5 ثوانٍ كاملة. فما ميزة التسارع المحتم؟
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-right">
          {[
            { id: 'a1', label: 'عجلة موجبة بقيمة +4 م/ث²' },
            { id: 'a2', label: 'عجلة سالبة بقيمة -4 م/ث²' },
            { id: 'a3', label: 'عجلة منعدمة بقيمة صفر م/ث²' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => { if (!quizSubmitted) setUserAnswer(opt.id); }}
              disabled={quizSubmitted}
              className={`p-3 rounded-xl border text-right transition-all font-semibold cursor-pointer ${
                userAnswer === opt.id 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {quizFeedback && (
          <div className={`p-4 rounded-xl text-xs font-bold leading-relaxed border ${
            userAnswer === 'a2' ? 'bg-emerald-50 border-emerald-100 text-emerald-850' : 'bg-rose-50 border-rose-100 text-rose-850'
          }`}>
            {quizFeedback}
          </div>
        )}

        {!quizSubmitted && (
          <div className="flex justify-center">
            <button
              onClick={checkQuiz}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              إرسال الحل والتحقق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 6. مختبر معادلات الحركة المنهجي (الدرس العاشر)
// ==========================================
export function KinematicsLab({ onComplete }: LabProps) {
  const [currentTab, setCurrentTab] = useState<'match' | 'equation' | 'comp'>('match');

  // 1. لعبة مطابقة الرموز بالرموز الفيزيائية
  const quantities = [
    { name: "الزمن الكلي للرصد", correctSymbol: "ز" },
    { name: "المسافة الكلية المقطوعة", correctSymbol: "ف" },
    { name: "السرعة الابتدائية المنطلقة", correctSymbol: "ع₀" },
    { name: "العجلة المتولدة", correctSymbol: "ج" },
    { name: "السرعة النهائية للحركة", correctSymbol: "ع" }
  ];

  const symbols = ["ز", "ف", "ع₀", "ج", "ع"];

  const [matches, setMatches] = useState<{ [qName: string]: string }>({});
  const [selectedQty, setSelectedQty] = useState<string | null>(null);
  const [matchDone, setMatchDone] = useState(false);
  const [matchFeedback, setMatchFeedback] = useState('');

  const handleQtySelect = (qtyName: string) => {
    if (matchDone) return;
    setSelectedQty(qtyName);
    setMatchFeedback('');
  };

  const handleSymbolSelect = (symbol: string) => {
    if (!selectedQty || matchDone) return;
    setMatches(prev => ({
      ...prev,
      [selectedQty]: symbol
    }));
    setSelectedQty(null);
  };

  const verifyMatches = () => {
    let wrongCount = 0;
    quantities.forEach(q => {
      const userSymbol = matches[q.name];
      if (userSymbol !== q.correctSymbol) {
        wrongCount++;
      }
    });

    setMatchDone(true);

    if (wrongCount === 0) {
      setMatchFeedback('🎉 مطابقة ناجحة وإبداع منقطع النظير! لقد طابقت الرموز المنهجية بكفاءة 100%.');
      if (onComplete) onComplete(20, 'kinematics_symbols_match');
    } else {
      setMatchFeedback(`❌ رصدنا أخطاء! هناك ${wrongCount} رموز طوبقت بشكل غير سليم. انقر على إعادة المحاولة لإتقانها.`);
    }
  };

  const resetMatches = () => {
    setMatches({});
    setSelectedQty(null);
    setMatchDone(false);
    setMatchFeedback('');
  };

  // 2. تحدي اختيار المعادلة الملائمة
  const [eqProblemIdx, setEqProblemIdx] = useState(0);
  const [eqAnswer, setEqAnswer] = useState<string | null>(null);
  const [eqSubmitted, setEqSubmitted] = useState(false);
  const [eqFeedback, setEqFeedback] = useState('');

  const physicsProblems = [
    {
      problem: "ينطلق فهد من السكون بعجلة 2م/ث² لمدة 10 ثوانٍ. ما هي المسافة التي يقطعها؟",
      eqs: [
        { id: "eq1", formula: "ع = ع₀ + ج ز (الأولى)", desc: "تصل السرعة بالزمن دون مسافة" },
        { id: "eq2", formula: "ف = ع₀ ز + ½ ج ز² (الثانية)", desc: "ترص الإزاحة بالزمن بدقة" },
        { id: "eq3", formula: "ع² = ع₀² + 2 ج ف (الثالثة)", desc: "تدرس السرعة والمسافة دون زمن" }
      ],
      correctEq: "eq2",
      explain: "✅ نعم، المعادلة الثانية هي المطلوبة! حيث لدينا الزمن والمطلوب الإزاحة والسرعة الابتدائية صفر."
    },
    {
      problem: "تتباطأ حافلة مدرسية من سرعة 20 م/ث حتى تقف تماماً بقطع مسافة 40 متراً مساوياً. عين مقدار التراجع؟",
      eqs: [
        { id: "eq1", formula: "ع = ع₀ + ج ز (الأولى)", desc: "هذا يلزم معرفة زمن الرصد" },
        { id: "eq2", formula: "ف = ع₀ ز + ½ ج ز² (الثانية)", desc: "هذا يتطلب معرفة زمن الرصد" },
        { id: "eq3", formula: "ع² = ع₀² + 2 ج ف (الثالثة)", desc: "مستقلة عن الزمن وتجمع السرعة والمسافة" }
      ],
      correctEq: "eq3",
      explain: "✅ مثير للدهشة! نختار المعادلة الثالثة نظراً لأن الزمن معزول ومجهول تماماً في المسألة المنهجية."
    }
  ];

  const currentProb = physicsProblems[eqProblemIdx];

  const checkEqChoice = (choice: string) => {
    if (eqSubmitted) return;
    setEqAnswer(choice);
    setEqSubmitted(true);
    if (choice === currentProb.correctEq) {
      setEqFeedback(`🎉 أصبت كبد الحقيقة! ${currentProb.explain}`);
      if (onComplete) onComplete(25, `kinematics_eq_selection_${eqProblemIdx}`);
    } else {
      setEqFeedback(`❌ اختيار غير موافق. المعادلة الفعالة هي: ${currentProb.eqs.find(e => e.id === currentProb.correctEq)?.formula}. السبب: ${currentProb.explain}`);
    }
  };

  const nextProb = () => {
    if (eqProblemIdx < physicsProblems.length - 1) {
      setEqProblemIdx(prev => prev + 1);
      setEqAnswer(null);
      setEqSubmitted(false);
      setEqFeedback('');
    } else {
      setEqFeedback('🏆 رائع! لقد أنهيت بنجاح مهارة اختيار القوانين الفيزيائية السلوكية للحساب.');
    }
  };

  // 3. مسابقة الفريقين (الأحمر 🆚 الأزرق) في 4 أسئلة بالتناوب
  const compQuestions = [
    { q: "ما هو رمز السرعة الابتدائية؟", options: ["ع", "ع₀", "ف", "ج"], correct: "ع₀" },
    { q: "السرعة النهائية للارتطام من السكون تماماً تعني ع₀ تساوي؟", options: ["0", "9.8", "10", "لا شيء"], correct: "0" },
    { q: "وحدة قياس العجلة دولياً هي؟", options: ["م/ث", "م/ث²", "م/ث³", "كم/س"], correct: "م/ث²" },
    { q: "إذا تسارع جسم من السكون بعجلة 1 م/ث² في 5 ثوانٍ، فكم سرعته النهائية؟", options: ["1 م/ث", "5 م/ث", "10 م/ث", "0.5 م/ث"], correct: "5 م/ث" }
  ];

  const [compActive, setCompActive] = useState(false);
  const [compStep, setCompStep] = useState(0); // 0 to 3
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [compFeedback, setCompFeedback] = useState('');
  const [compEnded, setCompEnded] = useState(false);

  const startComp = () => {
    setCompActive(true);
    setCompStep(0);
    setRedScore(0);
    setBlueScore(0);
    setCompFeedback('🛡️ بدأت الحرب الفكرية! السؤال الأول للأحمر 🔴');
    setCompEnded(false);
  };

  const handleCompAnswer = (selectedOpt: string) => {
    if (compEnded) return;

    const currentQ = compQuestions[compStep];
    const isRedTurn = compStep % 2 === 0;
    const isCorrect = selectedOpt === currentQ.correct;

    if (isCorrect) {
      if (isRedTurn) {
        setRedScore(prev => prev + 1);
      } else {
        setBlueScore(prev => prev + 1);
      }
    }

    let nextStepFeedback = '';
    const currentTeamName = isRedTurn ? '🔴 الفريق الأحمر' : '🔵 الفريق الأزرق';
    const nextTeamName = !isRedTurn ? '🔴 الفريق الأحمر' : '🔵 الفريق الأزرق';

    if (isCorrect) {
      nextStepFeedback = `✅ أصاب ${currentTeamName} الجبهة الصحيحة وحصد نقطة! `;
    } else {
      nextStepFeedback = `❌ تعثر ${currentTeamName} وكانت الإجابة الصحيحة هي: ${currentQ.correct}. `;
    }

    if (compStep < compQuestions.length - 1) {
      setCompStep(prev => prev + 1);
      setCompFeedback(nextStepFeedback + `دوران السجال لـ ${nextTeamName}.`);
    } else {
      setCompEnded(true);
      const finalMsg = redScore === blueScore 
        ? `🏁 تعادل الفريقان بصبر وحسم: ${redScore} - ${blueScore}!`
        : redScore > blueScore 
          ? `🏆 فاز اليمانيون الأحمر 🔴 بقيمة متميزة: ${redScore} مقابل ${blueScore} للأزرق!`
          : `🏆 ظفر الفريق الأزرق 🔵 بنتيجة متميزة: ${blueScore} مقابل ${redScore} للأحمر!`;
      setCompFeedback(nextStepFeedback + '\n' + finalMsg);
      if (onComplete) onComplete(30, 'kinematics_team_competition');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 shadow-sm text-right" dir="rtl">
      <div className="bg-gradient-to-r from-teal-700 via-indigo-800 to-indigo-950 text-white p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-base flex items-center gap-1.5 text-white">
            <Award size={18} />
            <span>📖 كراس أنشطة وتطوير معادلات الحركة العجائبية الثلاث</span>
          </h4>
          <p className="text-xs text-slate-100 mt-0.5 font-medium">مهارات وألعاب عملية مطابقة ميثودولوجياً للمنهج الدراسي اليمني مع الأستاذ سياف الشباطي</p>
        </div>
        
        {/* مبدّل التبويبات الكراسي */}
        <div className="flex bg-slate-900/30 p-1 rounded-xl gap-1 text-[10px] font-bold border border-white/10 shadow-inner">
          {[
            { id: 'match', label: '🧩 مطابقة الرموز' },
            { id: 'equation', label: '🧠 اختيار القانون' },
            { id: 'comp', label: '⚔️ مسابقة الفريقين' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`p-2 px-3.5 rounded-lg border-none active:scale-95 duration-75 cursor-pointer ${
                currentTab === tab.id 
                  ? 'bg-white text-indigo-950 shadow-xs' 
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* التبويب الأول: مطابقة الرموز */}
      {currentTab === 'match' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-indigo-50 p-4 rounded-xl space-y-1.5 text-right">
            <h5 className="font-extrabold text-indigo-950 text-xs">🎮 الخطوة 1: طابق الكمية الفيزيائية برمزها الرياضي المقنن</h5>
            <p className="text-[10px] text-slate-500 font-medium">طريقة اللعب: انقر على الكمية الفيزيائية باليمين أولاً، ثم انقر على رمزها المناسب باليسار لتنصيب الوصلة الحية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* قائمة الكميات */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">الكميات المنهجية</span>
              {quantities.map(q => {
                const matchedSymbol = matches[q.name];
                return (
                  <button
                    key={q.name}
                    onClick={() => handleQtySelect(q.name)}
                    disabled={matchDone}
                    className={`w-full text-right p-3 rounded-xl border transition-all text-xs font-bold flex items-center justify-between cursor-pointer active:scale-98 ${
                      selectedQty === q.name 
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900' 
                        : matchedSymbol 
                          ? 'border-emerald-250 bg-emerald-50/20 text-emerald-950' 
                          : 'border-slate-150 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{q.name}</span>
                    {matchedSymbol ? (
                      <span className="font-mono bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs leading-none">
                        الرمز المطابق: {matchedSymbol}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-normal">غير محدد</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* أزرار الرموز الكونية */}
            <div className="space-y-3">
              <span className="text-[10px] text-slate-400 font-bold block">الرموز المتاحة للتركيب والربط</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs font-black">
                {symbols.map(sym => {
                  const isAssigned = Object.values(matches).includes(sym);
                  return (
                    <button
                      key={sym}
                      onClick={() => handleSymbolSelect(sym)}
                      disabled={isAssigned || matchDone}
                      className={`p-4 rounded-xl border text-base font-extrabold font-mono transition-all cursor-pointer active:scale-90 ${
                        isAssigned 
                          ? 'bg-slate-100 text-slate-350 border-slate-200' 
                          : 'bg-white hover:border-indigo-500 text-indigo-700 border-slate-200 hover:shadow-xs'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {matchFeedback && (
            <div className={`p-4 rounded-xl text-xs font-bold border ${
              matchFeedback.includes('🎉') ? 'bg-emerald-50 border-emerald-100 text-emerald-850' : 'bg-rose-50 border-rose-100 text-rose-850'
            }`}>
              {matchFeedback}
            </div>
          )}

          <div className="flex justify-center gap-2">
            <button
              onClick={verifyMatches}
              disabled={matchDone || Object.keys(matches).length < 5}
              className="bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              طابق وتحقق من الصحة
            </button>
            <button
              onClick={resetMatches}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95"
            >
              🔄 إعادة تصفير المحطة
            </button>
          </div>
        </div>
      )}

      {/* التبويب الثاني: اختيار القانون */}
      {currentTab === 'equation' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-amber-50 p-4 rounded-xl space-y-1 text-right">
            <h5 className="font-extrabold text-amber-950 text-xs">🎮 الخطوة 2: اختبار ذكاء اختيار المعادلات الملائمة</h5>
            <p className="text-[10px] text-slate-500 font-medium">سياقات المسألة اللفظية تستدعي تفكيرك لاختيار المعادلة الأبسط والملائمة لتجاوز الأبعاد غير المرغوبة.</p>
          </div>

          <div className="bg-amber-100/40 border border-amber-200 rounded-2xl p-5 text-right space-y-3 shadow-xs">
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase">المعضلة اللفظية الموجهة</span>
            <p className="text-xs font-black text-slate-800 leading-relaxed font-sans select-all">{currentProb.problem}</p>
          </div>

          <div className="space-y-2.5 text-xs text-right">
            <span className="text-[10px] text-slate-400 font-bold block">القوانين المتاحة للاختيار البرمجي:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentProb.eqs.map(eq => {
                const isUserChoice = eqAnswer === eq.id;
                return (
                  <button
                    key={eq.id}
                    onClick={() => checkEqChoice(eq.id)}
                    disabled={eqSubmitted}
                    className={`p-4 rounded-2xl border text-right transition-all cursor-pointer active:scale-98 hover:shadow-xs group ${
                      isUserChoice 
                        ? eqAnswer === currentProb.correctEq
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-rose-600 text-white border-rose-600 font-bold'
                        : 'bg-white hover:border-slate-350 text-slate-700 border-slate-200'
                    }`}
                  >
                    <strong className="font-sans font-bold text-sm block mb-1 group-hover:text-amber-700 transition-colors">{eq.formula}</strong>
                    <span className="text-[10px] text-slate-400 font-medium leading-normal block">{eq.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {eqFeedback && (
            <div className={`p-4 rounded-xl text-xs font-bold border leading-relaxed ${
              eqFeedback.includes('🎉') ? 'bg-emerald-50 border-emerald-100 text-emerald-850' : 'bg-rose-50 border-rose-100 text-rose-850'
            }`}>
              {eqFeedback}
            </div>
          )}

          {eqSubmitted && eqProblemIdx < physicsProblems.length - 1 && (
            <div className="flex justify-center">
              <button
                onClick={nextProb}
                className="bg-indigo-750 hover:bg-indigo-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                المعضلة التالية ◄
              </button>
            </div>
          )}
        </div>
      )}

      {/* التبويب الثالث: مسابقة الفريقين */}
      {currentTab === 'comp' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-right space-y-1">
            <h5 className="font-extrabold text-slate-900 text-xs text-indigo-950">🎮 الخطوة 3: معركة الرموز والمفاهيم (الأحمر 🆚 الأزرق)</h5>
            <p className="text-[10px] text-slate-500 font-medium">مسابقة سريعة من 4 أسئلة لحسم تفوق فريق الأحمر أو الأزرق وإرسال المحاولة للرصد النهائي.</p>
          </div>

          {!compActive ? (
            <div className="text-center p-8 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
              <Users size={32} className="mx-auto text-indigo-600 animate-pulse" />
              <h5 className="font-bold text-slate-800 text-xs">مسابقة الفريقين (فيزياء ومعادلات)</h5>
              <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-normal">يتم الإجابة عن أربعة معضلات بالتناوب للفريقين لتعزيز روح المنافسة والابتسام الفكري داخل المجموعات الدراسية اليمنية.</p>
              <button
                onClick={startComp}
                className="bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white text-xs font-extrabold px-8 py-3 rounded-xl cursor-pointer shadow-xs transition-all"
              >
                ⚔️ بدء مسابقة الغمار الفكري
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* لوحة النتائج */}
              <div className="flex justify-center items-center gap-6">
                <div className="bg-rose-50 border-2 border-rose-550 p-4 rounded-xl text-center min-w-32 shadow-xs">
                  <span className="text-[10px] text-rose-700 font-extrabold block mb-1">🔴 الفريق الأحمر</span>
                  <strong className="text-3xl font-black font-mono text-rose-800">{redScore}</strong>
                </div>
                <div className="text-slate-450 font-black text-xl font-sans">VS</div>
                <div className="bg-blue-50 border-2 border-blue-550 p-4 rounded-xl text-center min-w-32 shadow-xs">
                  <span className="text-[10px] text-blue-700 font-extrabold block mb-1">🔵 الفريق الأزرق</span>
                  <strong className="text-3xl font-black font-mono text-blue-800">{blueScore}</strong>
                </div>
              </div>

              {/* السؤال الفعال وسجاله */}
              {!compEnded && (
                <div className="bg-slate-900 text-white rounded-2xl p-5 text-center space-y-4 border border-slate-950">
                  <span className="bg-indigo-950 text-indigo-400 px-3 py-1 rounded-full font-bold text-[10px]">
                    دور السجال: {compStep % 2 === 0 ? '🔴 الفريق الأحمر' : '🔵 الفريق الأزرق'}
                  </span>
                  <h4 className="text-sm font-bold leading-relaxed">{compQuestions[compStep].q}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                    {compQuestions[compStep].options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleCompAnswer(opt)}
                        className="bg-white hover:bg-slate-100 p-3 rounded-xl border-none transition-all cursor-pointer font-bold active:scale-95 text-center"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {compFeedback && (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-xs font-bold leading-normal text-indigo-850 whitespace-pre-line text-center">
                  {compFeedback}
                </div>
              )}

              {compEnded && (
                <div className="flex justify-center">
                  <button
                    onClick={startComp}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-8 py-2.5 rounded-xl cursor-pointer leading-tight active:scale-95"
                  >
                    🔄 خوض مسابقة جديدة
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. مختبر السقوط الحر والحركة الرأسية (الدرس الحادي عشر)
// ==========================================
export function FreeFallLab({ onComplete }: LabProps) {
  const [currentTab, setCurrentTab] = useState<'freefall' | 'vertical'>('freefall');

  // 1. معمل السقوط الحر (الحجر والريشة)
  const [height, setHeight] = useState<number>(30); // 10 to 100 meters
  const [medium, setMedium] = useState<'vacuum' | 'air'>('vacuum');
  const [isFalling, setIsFalling] = useState<boolean>(false);
  
  const [stonePos, setStonePos] = useState<number>(0); 
  const [featherPos, setFeatherPos] = useState<number>(0); 
  
  const [stoneTime, setStoneTime] = useState<number>(0);
  const [featherTime, setFeatherTime] = useState<number>(0);
  
  const [stoneSpeed, setStoneSpeed] = useState<number>(0);
  const [featherSpeed, setFeatherSpeed] = useState<number>(0);

  const [attempts, setAttempts] = useState<{
    id: number;
    height: number;
    medium: string;
    stoneTime: number;
    featherTime: number;
    stoneSpeed: number;
  }[]>([]);

  // 2. معمل القذف الرأسي (كرة السلة)
  const [v0, setV0] = useState<number>(15); // 5 to 30 m/s
  const [gravityType, setGravityType] = useState<'earth' | 'moon' | 'mars'>('earth');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [ballHeight, setBallHeight] = useState<number>(0); 
  const [ballSpeed, setBallSpeed] = useState<number>(0); 
  const [launchTime, setLaunchTime] = useState<number>(0);
  const [maxHeightReached, setMaxHeightReached] = useState<number>(0);
  const [timeToPeak, setTimeToPeak] = useState<number>(0);

  const gravityValues = {
    earth: 9.8,
    moon: 1.62,
    mars: 3.7
  };

  const gravityLabels = {
    earth: "الجاذبية الأرضية (9.8 م/ث²)",
    moon: "جاذبية القمر (1.62 م/ث²)",
    mars: "جاذبية المريخ (3.7 م/ث²)"
  };

  const startFall = () => {
    if (isFalling) return;
    setIsFalling(true);
    setStonePos(0);
    setFeatherPos(0);
    setStoneTime(0);
    setFeatherTime(0);
    setStoneSpeed(0);
    setFeatherSpeed(0);

    const g = 9.8;
    const realStoneTime = Math.sqrt((2 * height) / g);
    const realFeatherTime = medium === 'vacuum' ? realStoneTime : realStoneTime * 2.8;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // تحديث الحجر
      if (elapsed <= realStoneTime) {
        setStoneTime(elapsed);
        const currentSpeed = g * elapsed;
        setStoneSpeed(currentSpeed);
        const currentS = 0.5 * g * elapsed * elapsed;
        const percent = Math.min((currentS / height) * 100, 100);
        setStonePos(percent);
      } else {
        setStoneTime(realStoneTime);
        setStoneSpeed(g * realStoneTime);
        setStonePos(100);
      }

      // تحديث الريشة
      if (elapsed <= realFeatherTime) {
        setFeatherTime(elapsed);
        const currentG = medium === 'vacuum' ? g : g / (2.8 * 2.8);
        const currentSpeed = currentG * elapsed;
        setFeatherSpeed(currentSpeed);
        const currentS = 0.5 * currentG * elapsed * elapsed;
        const percent = Math.min((currentS / height) * 100, 100);
        setFeatherPos(percent);
      } else {
        setFeatherTime(realFeatherTime);
        const currentG = medium === 'vacuum' ? g : g / (2.8 * 2.8);
        setFeatherSpeed(currentG * realFeatherTime);
        setFeatherPos(100);
      }

      if (elapsed >= realStoneTime && elapsed >= realFeatherTime) {
        clearInterval(interval);
        setIsFalling(false);
        setAttempts(prev => {
          const newAtt = [
            ...prev,
            {
              id: prev.length + 1,
              height: height,
              medium: medium === 'vacuum' ? 'فراغ تام 🌌' : 'مقاومة الهواء 💨',
              stoneTime: parseFloat(realStoneTime.toFixed(2)),
              featherTime: parseFloat(realFeatherTime.toFixed(2)),
              stoneSpeed: parseFloat((g * realStoneTime).toFixed(1))
            }
          ];
          if (newAtt.length >= 4 && onComplete) {
            onComplete(25, 'freefall_four_attempts');
          }
          return newAtt;
        });
      }
    }, 25);
  };

  const startLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setBallHeight(0);
    setBallSpeed(v0);
    setLaunchTime(0);

    const g = gravityValues[gravityType];
    const peakTime = v0 / g;
    const maxH = (v0 * v0) / (2 * g);
    const totalTime = peakTime * 2;

    setTimeToPeak(parseFloat(peakTime.toFixed(2)));
    setMaxHeightReached(parseFloat(maxH.toFixed(2)));

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed < totalTime) {
        setLaunchTime(elapsed);
        const currentSpeed = v0 - g * elapsed;
        setBallSpeed(currentSpeed);
        const currentH = v0 * elapsed - 0.5 * g * elapsed * elapsed;
        setBallHeight(Math.max(currentH, 0));
      } else {
        clearInterval(interval);
        setLaunchTime(totalTime);
        setBallHeight(0);
        setBallSpeed(-v0);
        setIsLaunching(false);
        
        if (onComplete) {
          onComplete(15, `vertical_launch_${gravityType}_${v0}`);
        }
      }
    }, 25);
  };

  const removeAttempt = (id: number) => {
    setAttempts(prev => prev.filter(att => att.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-6 text-right w-full" dir="rtl">
      {/* رأس المختبر وأيقونته */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-550 to-indigo-750 text-white rounded-2xl shadow-sm">
            <Beaker size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs">🧪 مختبر السقوط الحر والحركة الرأسية المتطور</h4>
            <p className="text-[10px] text-slate-500 font-medium">تجربة عملية في غزارة السقوط بالتفريغ وجاذبيات العوالم الفضائية المتعاقبة.</p>
          </div>
        </div>
        <div className="flex border border-slate-150 p-1 bg-slate-50 rounded-xl gap-1 w-full sm:w-auto">
          <button
            onClick={() => setCurrentTab('freefall')}
            className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              currentTab === 'freefall' ? 'bg-indigo-650 text-white shadow' : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            🪶 السقوط الحر بالفراغ
          </button>
          <button
            onClick={() => setCurrentTab('vertical')}
            className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              currentTab === 'vertical' ? 'bg-indigo-650 text-white shadow' : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            🏀 القذف الرأسي لأعلى
          </button>
        </div>
      </div>

      {/* التبويب الأول: السقوط الحر (الحجر والريشة) */}
      {currentTab === 'freefall' && (
        <div className="space-y-6">
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl space-y-2">
            <h5 className="font-extrabold text-indigo-950 text-xs flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" />
              <span>المحاكاة الأولى: تجربة جاليليو جاليلي في السقوط المقارن</span>
            </h5>
            <p className="text-[10px] text-indigo-850 leading-relaxed font-semibold">
              اختر ارتفاع السقوط الحر وشاهد الفرق الرهيب بين سرعة الحجر والريشة عند السقوط في الهواء العادي مقابل السقوط في الغرفة المفرغة من الهواء تماماً (محاكاة مثالية).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* اللوحة التحكمية اليسرى */}
            <div className="lg:col-span-4 space-y-4">
              {/* شريط الارتفاع */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">الارتفاع المبدئي (متر):</span>
                  <span className="text-xs font-black font-mono text-indigo-750 bg-indigo-50 px-2.5 py-0.5 rounded-md">{height} م</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={height}
                  disabled={isFalling}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                  <span>10م</span>
                  <span>50م</span>
                  <span>100م</span>
                </div>
              </div>

              {/* وسط السقوط */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-slate-800 block">وسط التجربة:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setMedium('vacuum')}
                    disabled={isFalling}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      medium === 'vacuum'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    🌌 فراغ تام (مثالي)
                  </button>
                  <button
                    onClick={() => setMedium('air')}
                    disabled={isFalling}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      medium === 'air'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    💨 مقاومة الهواء
                  </button>
                </div>
              </div>

              {/* زر التشغيل والعداد الفوري */}
              <button
                onClick={startFall}
                disabled={isFalling}
                className={`w-full py-3 text-xs font-black text-white rounded-xl shadow transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 ${
                  isFalling ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-indigo-850 hover:from-indigo-500 hover:to-indigo-750'
                }`}
              >
                {isFalling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>يجري رصد السقوط الحر...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>ابدأ محاكاة السقوط الحر فجأة 🚀</span>
                  </>
                )}
              </button>

              {/* بطاقات البيانات الديناميكية */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-2xl text-center space-y-1">
                  <span className="text-[9px] font-bold text-slate-550 block">زمن سقوط الحجر:</span>
                  <strong className="text-lg font-black font-mono text-indigo-900">{stoneTime.toFixed(2)} ث</strong>
                </div>
                <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-2xl text-center space-y-1">
                  <span className="text-[9px] font-bold text-slate-550 block">سرعة ارتطام الحجر:</span>
                  <strong className="text-lg font-black font-mono text-indigo-900">{stoneSpeed.toFixed(1)} م/ث</strong>
                </div>
                <div className="p-3 bg-teal-50/40 border border-teal-100 rounded-2xl text-center space-y-1">
                  <span className="text-[9px] font-bold text-slate-550 block">زمن سقوط الريشة:</span>
                  <strong className="text-lg font-black font-mono text-teal-900">{featherTime.toFixed(2)} ث</strong>
                </div>
                <div className="p-3 bg-teal-50/40 border border-teal-100 rounded-2xl text-center space-y-1">
                  <span className="text-[9px] font-bold text-slate-550 block">سرعة ارتطام الريشة:</span>
                  <strong className="text-lg font-black font-mono text-teal-900">{featherSpeed.toFixed(1)} م/ث</strong>
                </div>
              </div>
            </div>

            {/* اللوحة البصرية للتجريب */}
            <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-5 border border-slate-950 relative overflow-hidden h-96 flex flex-col justify-between">
              {/* خلفية جمالية مفرغة أو سماء حسب الوسط */}
              <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-indigo-950/20 to-transparent pointer-events-none"></div>
              {medium === 'vacuum' && (
                <div className="absolute top-3 right-3 bg-indigo-900/60 text-indigo-300 border border-indigo-850 px-2 py-0.5 rounded-full text-[8px] font-bold animate-pulse">
                  🌌 محاكاة التفريغ الهوائي المثالي
                </div>
              )}

              {/* خطوط الارتفاع المنهجية */}
              <div className="absolute left-6 top-8 bottom-8 border-r border-dashed border-slate-700 flex flex-col justify-between text-[8px] text-slate-500 font-mono">
                <span>{height}م</span>
                <span>{(height / 2).toFixed(0)}م</span>
                <span>0م (الأرض)</span>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 relative py-4">
                {/* عمود الحجر */}
                <div className="flex flex-col items-center justify-start h-full relative">
                  <span className="text-[9px] text-slate-450 font-bold mb-1.5 mt-2">عمود الحجر 🪨</span>
                  <div className="w-1 bg-slate-800 h-full absolute top-12 bottom-0 pointer-events-none opacity-50"></div>
                  
                  {/* الصخرة الساقطة */}
                  <div 
                    style={{ transform: `translateY(${stonePos * 2.3}px)` }}
                    className="absolute w-8 h-8 bg-slate-700 border-2 border-slate-500 rounded-full flex items-center justify-center text-sm shadow-xl transition-all duration-75"
                  >
                    🪨
                  </div>
                </div>

                {/* عمود الريشة */}
                <div className="flex flex-col items-center justify-start h-full relative">
                  <span className="text-[9px] text-slate-450 font-bold mb-1.5 mt-2">عمود الريشة 🪶</span>
                  <div className="w-1 bg-slate-800 h-full absolute top-12 bottom-0 pointer-events-none opacity-50"></div>

                  {/* الريشة الساقطة */}
                  <div 
                    style={{ transform: `translateY(${featherPos * 2.3}px)` }}
                    className="absolute w-8 h-8 bg-teal-800 border-2 border-teal-500 rounded-full flex items-center justify-center text-sm shadow-xl transition-all duration-75"
                  >
                    🪶
                  </div>
                </div>
              </div>

              {/* الأرض العيارية */}
              <div className="h-4 bg-gradient-to-r from-slate-950 to-slate-850 border-t-2 border-slate-700 rounded-xl relative">
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 text-[8px] text-slate-400 font-black">
                  <span>سطح المختبر المعياري</span>
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>

          {/* جدول المحاولات الأربعة للتثبت المعملي */}
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-150">
              <h5 className="font-extrabold text-slate-800 text-xs">📊 جدول رصد المحاولات المخبرية للتثبت:</h5>
              <span className="text-[10px] text-indigo-750 font-extrabold bg-indigo-550/10 px-3 py-1 rounded-full">
                {attempts.length >= 4 ? '🎉 تم استحقاق الـ 25 XP والمكالمة مخبرياً بنجاح!' : `أكمل ${4 - attempts.length} محاولات مختلفة لربح (25 XP)`}
              </span>
            </div>

            <div className="overflow-x-auto select-none rounded-xl border border-slate-150">
              <table className="w-full text-xs text-right text-slate-650 min-w-[500px]">
                <thead className="bg-slate-100 text-[10px] text-slate-750 font-bold uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 border-l border-slate-200">المحاولة</th>
                    <th scope="col" className="px-4 py-3">ارتفاع السقوط</th>
                    <th scope="col" className="px-4 py-3">وسط التفريغ المعياري</th>
                    <th scope="col" className="px-4 py-3">زمن الحجر (ث)</th>
                    <th scope="col" className="px-4 py-3">زمن الريشة (ث)</th>
                    <th scope="col" className="px-4 py-3">سرعة ارتطام الحجر (م/ث)</th>
                    <th scope="col" className="px-4 py-3 text-center">التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {attempts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-slate-400 italic font-bold">
                        لم يتم رصد أي محاولات بعد. اضبط الارتفاع واضغط على "ابدأ محاكاة السقوط الحر فجأة" لتسجيل رصدك.
                      </td>
                    </tr>
                  ) : (
                    attempts.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50 font-medium">
                        <td className="px-4 py-3 font-bold text-slate-800 border-l border-slate-200">محاولة #{att.id}</td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">{att.height} م</td>
                        <td className="px-4 py-3 font-extrabold">{att.medium}</td>
                        <td className="px-4 py-3 font-mono text-indigo-700 font-bold">{att.stoneTime} ث</td>
                        <td className="px-4 py-3 font-mono text-teal-700 font-bold">{att.featherTime} ث</td>
                        <td className="px-4 py-3 font-mono font-bold">{att.stoneSpeed} م/ث</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => removeAttempt(att.id)}
                            className="text-rose-600 hover:text-rose-800 font-extrabold text-[10px] bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded cursor-pointer"
                          >
                            حذف الرصد 🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* التبويب الثاني: القذف الرأسي (كرة السلة) */}
      {currentTab === 'vertical' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl space-y-2">
            <h5 className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-600" />
              <span>المحاكاة الثانية: قذف الأجسام رأسياً لأعلى وبلوغ أوج الصعود</span>
            </h5>
            <p className="text-[10px] text-emerald-850 leading-relaxed font-semibold">
              قم بقذف كرة السلة رأسيّاً مع تحديد السرعة الابتدائية واستكشف مدى فاعلية وتأثير عجلة الجاذبية في كواكب وعوالم فضائية متباينة لرصد أقصى ارتفاع وزمن صعود.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* اللوحة التحكمية لليسار */}
            <div className="lg:col-span-4 space-y-4">
              {/* اختيار الكوكب والجاذبية */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-slate-800 block">مجال الجاذبية الفضائي:</span>
                <select
                  disabled={isLaunching}
                  value={gravityType}
                  onChange={(e) => setGravityType(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:ring-1 focus:ring-indigo-500 text-slate-850 outline-none"
                >
                  <option value="earth">🌍 الأرض (د = 9.8 م/ث²)</option>
                  <option value="mars">🔴 المريخ (د = 3.7 م/ث²)</option>
                  <option value="moon">🌑 القمر (د = 1.62 م/ث²)</option>
                </select>
              </div>

              {/* السرعة الابتدائية */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">السرعة الابتدائية (ع₀):</span>
                  <span className="text-xs font-black font-mono text-emerald-750 bg-emerald-50 px-2.5 py-0.5 rounded-md">{v0} م/ث</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={v0}
                  disabled={isLaunching}
                  onChange={(e) => setV0(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                  <span>5 م/ث</span>
                  <span>15 م/ث</span>
                  <span>30 م/ث</span>
                </div>
              </div>

              {/* تشغيل القذف */}
              <button
                onClick={startLaunch}
                disabled={isLaunching}
                className={`w-full py-3 text-xs font-black text-white rounded-xl shadow transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 ${
                  isLaunching ? 'bg-emerald-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-650'
                }`}
              >
                {isLaunching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>عملية رصد المسار جارية...</span>
                  </>
                ) : (
                  <>
                    <ArrowUpRight size={14} />
                    <span>اقذف كرة السلة لأعلى رأسياً 🏀</span>
                  </>
                )}
              </button>

              {/* بطاقة التوقعات المنهجية */}
              <div className="p-4 bg-indigo-50 border border-indigo-150 rounded-2xl space-y-2.5">
                <span className="text-xs font-black text-slate-800 block">📊 التنبؤات والقياسات الحقيقية لأقصى أوج:</span>
                <div className="space-y-1.5 text-xs text-slate-700 font-bold leading-relaxed">
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span>زمن الصعود لأقصى ارتفاع:</span>
                    <span className="text-indigo-800 font-extrabold">{isLaunching ? timeToPeak : (v0 / gravityValues[gravityType]).toFixed(2)} ثانية</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span>أقصى ارتفاع يصله (أوج):</span>
                    <span className="text-indigo-800 font-extrabold">{(v0 * v0 / (2 * gravityValues[gravityType])).toFixed(1)} متر</span>
                  </div>
                </div>
              </div>
            </div>

            {/* اللوح البصري للقذف الرأسي */}
            <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-5 border border-slate-950 relative overflow-hidden h-96 flex flex-col justify-between">
              {/* وسم الكوكب النشط ورسمته المائية */}
              <div className="absolute top-3 left-3 bg-indigo-950/70 border border-indigo-850 px-3 py-1 rounded-full text-[9px] font-black animate-pulse">
                👽 المختبر الفضائي: {gravityLabels[gravityType]}
              </div>

              {/* العدادات الفورية الهابطة */}
              <div className="absolute left-4 top-14 flex flex-col gap-2 font-mono text-[9px] bg-slate-950/50 p-3 rounded-xl border border-slate-800 z-10 w-44">
                <div className="flex justify-between text-slate-400">
                  <span>الزمن الجاري:</span>
                  <span className="text-white font-bold">{launchTime.toFixed(2)} ث</span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-1.5">
                  <span className="flex items-center gap-1">السرعة اللحظية:</span>
                  <span className={`font-bold ${ballSpeed >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {ballSpeed.toFixed(1)} م/ث
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-1.5">
                  <span>الارتفاع الراهن:</span>
                  <span className="text-teal-400 font-bold">{ballHeight.toFixed(1)} م</span>
                </div>
              </div>

              {/* علامة أقصى ارتفاع نظري */}
              {isLaunching && (
                <div 
                  style={{ bottom: `${Math.min((maxHeightReached / (v0 * v0 / (2 * 1.62))) * 100, 80) + 12}%` }}
                  className="absolute right-12 border-b border-rose-500 border-dashed w-3/4 flex justify-end text-[8px] text-rose-500 font-black"
                >
                  ◄ أوج الارتفاع المتوقع: {maxHeightReached}م
                </div>
              )}

              {/* عمود صعود الكرة الفعلي وبصرياته */}
              <div className="flex-1 w-full flex items-end justify-center relative pb-2 select-none">
                <div className="w-1 bg-gradient-to-t from-slate-800 via-slate-700 to-transparent h-full absolute bottom-4 pointer-events-none opacity-40"></div>
                
                {/* شبكة ومقعد السلة الجمالي */}
                <div className="absolute top-1/3 text-4xl opacity-15 select-none pointer-events-none">🕸️</div>

                {/* كرة السلة التفاعلية */}
                <div 
                  style={{ 
                    transform: `translateY(${-Math.min((ballHeight / (v0 * v0 / (2 * 1.62))) * 280, 280)}px)` 
                  }}
                  className="w-10 h-10 bg-orange-600 rounded-full border-2 border-orange-400 shadow-2xl flex items-center justify-center text-xl transition-all duration-75 relative"
                >
                  🏀
                  {/* سهم اتجاه السرعة التفاعلي */}
                  {isLaunching && (
                    <div className={`absolute -top-6 text-[10px] font-black ${ballSpeed >= 0 ? 'text-emerald-400' : 'text-rose-400 animate-bounce'}`}>
                      {ballSpeed >= 0 ? '▲' : '▼'}
                    </div>
                  )}
                </div>
              </div>

              {/* أرض الملعب المعيارية */}
              <div className="h-4 bg-gradient-to-r from-amber-950 to-orange-950 border-t-2 border-orange-600 rounded-xl relative">
                <div className="absolute inset-0 flex items-center justify-center text-[8px] text-orange-200 font-black">
                  مستوى الإطلاق الرأسي المنهجي
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. مختبر قوانين نيوتن والجاذبية الكونية (الدرس الثاني عشر)
// ==========================================
export function NewtonLawsLab({ onComplete }: LabProps) {
  const [currentTab, setCurrentTab] = useState<'cart' | 'cannon' | 'massweight'>('cart');

  // 1. مختبر العربة والسطل (نيوتن الثاني)
  const [force, setForce] = useState<number>(5); // 1 to 20 Newtons
  const [hiddenMass, setHiddenMass] = useState<number>(2.5); // عشوائي لحساب الطالب
  const [isSimulatingCart, setIsSimulatingCart] = useState<boolean>(false);
  const [cartX, setCartX] = useState<number>(0); // 0% to 100%
  const [bucketY, setBucketY] = useState<number>(0); // 0% to 100%
  const [cartAcceleration, setCartAcceleration] = useState<number>(0);
  const [cartTime, setCartTime] = useState<number>(0);
  const [cartAttempts, setCartAttempts] = useState<{
    id: number;
    force: number;
    acceleration: number;
    time: number;
    hint: string;
  }[]>([]);

  // 2. مختبر ارتداد المدفع (نيوتن الثالث)
  const [cannonMass, setCannonMass] = useState<number>(120); // 50 to 250 kg
  const [bulletMass, setBulletMass] = useState<number>(2); // 0.5 to 5 kg
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [cannonRecoilX, setCannonRecoilX] = useState<number>(0); // displacement left
  const [bulletX, setBulletX] = useState<number>(0); // displacement right
  const [recoilVelocity, setRecoilVelocity] = useState<number>(0);
  const [bulletVelocity, setBulletVelocity] = useState<number>(0);

  // 3. مختبر الكتلة والوزن (الجاذبية الكونية)
  const [selectedMass, setSelectedMass] = useState<number>(35); // 1 to 100 kg
  const [selectedPlanet, setSelectedPlanet] = useState<'earth' | 'moon' | 'mars' | 'jupiter'>('earth');

  const planetData = {
    earth: { name: 'الأرض', g: 9.8, emoji: '🌍', bg: 'from-blue-600 to-emerald-600' },
    moon: { name: 'القمر', g: 1.62, emoji: '🌑', bg: 'from-slate-500 to-slate-700' },
    mars: { name: 'المريخ', g: 3.7, emoji: '🔴', bg: 'from-red-600 to-amber-700' },
    jupiter: { name: 'المشتري', g: 24.8, emoji: '🪐', bg: 'from-amber-600 to-orange-850' }
  };

  // توليد كتلة عشوائية مخفية للعربة عند التحميل
  useEffect(() => {
    generateNewHiddenMass();
  }, []);

  const generateNewHiddenMass = () => {
    const randomM = parseFloat((Math.random() * 3 + 1.5).toFixed(2)); // 1.5 to 4.5 kg
    setHiddenMass(randomM);
    setCartX(0);
    setBucketY(0);
    setCartAcceleration(0);
    setCartTime(0);
  };

  const startCartSimulation = () => {
    if (isSimulatingCart) return;
    setIsSimulatingCart(true);
    setCartX(0);
    setBucketY(0);
    setCartTime(0);

    // التسارع طبقاً لقانون نيوتن الثاني: جـ = ق / ك
    const acceleration = force / hiddenMass;
    setCartAcceleration(parseFloat(acceleration.toFixed(2)));

    const distance = 1.0; // 1 meter track
    const totalSimTime = Math.sqrt((2 * distance) / acceleration); // t = sqrt(2d/a)

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed <= totalSimTime) {
        setCartTime(elapsed);
        const currentD = 0.5 * acceleration * elapsed * elapsed;
        const progressPercent = Math.min((currentD / distance) * 100, 100);
        setCartX(progressPercent);
        setBucketY(progressPercent);
      } else {
        clearInterval(interval);
        setCartTime(totalSimTime);
        setCartX(100);
        setBucketY(100);
        setIsSimulatingCart(false);

        // إضافة الرصد للجدول
        setCartAttempts(prev => {
          const newAttempts = [
            ...prev,
            {
              id: prev.length + 1,
              force: force,
              acceleration: parseFloat(acceleration.toFixed(2)),
              time: parseFloat(totalSimTime.toFixed(2)),
              hint: `قسمة القوة (${force}N) على العجلة (${acceleration.toFixed(2)} م/ث²) تعطى كتلة العربة = ${hiddenMass} كجم.`
            }
          ];
          if (newAttempts.length >= 4 && onComplete) {
            onComplete(25, 'newton_cart_four_attempts');
          }
          return newAttempts;
        });
      }
    }, 25);
  };

  const fireCannon = () => {
    if (isFiring) return;
    setIsFiring(true);
    setCannonRecoilX(0);
    setBulletX(0);

    // دفع القذيفة بقوة انفجارية ثابتة (فلو إفترضنا ق = 450N تؤثر لزمن تلامس 0.1 ث)
    const explosionForce = 600; // Newtons
    const actVel = explosionForce / bulletMass * 0.1; // v = a * t = (F/m) * t
    const recVel = explosionForce / cannonMass * 0.1; // v_recoil = (F/M) * t

    setBulletVelocity(parseFloat(actVel.toFixed(1)));
    setRecoilVelocity(parseFloat(recVel.toFixed(2)));

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed <= 1.2) {
        // حركة المقذوف للأمام بسرعة ثابتة
        const bulletDisp = actVel * elapsed * 25; // معامل تكبير الحجم لرؤية المسار
        setBulletX(Math.min(bulletDisp, 350));

        // حركة ارتداد المدفع للخلف
        const recoilDisp = recVel * elapsed * 20;
        setCannonRecoilX(Math.min(recoilDisp, 60));
      } else {
        clearInterval(interval);
        setIsFiring(false);
        if (onComplete) {
          onComplete(15, `newton_third_fire_mC${cannonMass}_mB${bulletMass}`);
        }
      }
    }, 30);
  };

  const currentPlanetInfo = planetData[selectedPlanet];
  const calculatedWeight = parseFloat((selectedMass * currentPlanetInfo.g).toFixed(2));

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-6 text-right w-full" dir="rtl">
      {/* هيدر المختبر */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-550 to-indigo-750 text-white rounded-2xl shadow-sm">
            <Scale size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs">🧪 مختبر قوانين نيوتن والجاذبية الكونية المتطور</h4>
            <p className="text-[10px] text-slate-500 font-medium font-semibold">استكشف العلاقة الحركية بين القوى والتجربيات الميكانيكية المتقنة لنيوتن وجاليليو.</p>
          </div>
        </div>
        <div className="flex border border-slate-150 p-1 bg-slate-50 rounded-xl gap-1 w-full sm:w-auto">
          <button
            onClick={() => setCurrentTab('cart')}
            className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'cart' ? 'bg-indigo-650 text-white shadow' : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            🛒 العربة والسطل (نيوتن الثاني)
          </button>
          <button
            onClick={() => setCurrentTab('cannon')}
            className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'cannon' ? 'bg-indigo-650 text-white shadow' : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            💣 ارتداد المدفع (نيوتن الثالث)
          </button>
          <button
            onClick={() => setCurrentTab('massweight')}
            className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'massweight' ? 'bg-indigo-650 text-white shadow' : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            🌌 الكتلة والوزن (الجاذبية)
          </button>
        </div>
      </div>

      {/* التبويب الأول: العربة والسطل (نيوتن الثاني) */}
      {currentTab === 'cart' && (
        <div className="space-y-6">
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl space-y-2">
            <h5 className="font-extrabold text-indigo-950 text-xs flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" />
              <span>تجربة التحقيق من قانون نيوتن الثاني ورصد الكتلة المجهولة</span>
            </h5>
            <p className="text-[10px] text-indigo-850 leading-relaxed font-semibold">
              يقوم السطل المعلق بسحب العربة على مسار بطول 1 متر كامل. كتلة العربة <b>مخفية مجهولة</b> وعليك الكشف عنها وحسابها رياضياً عبر رصد قيمة العجلة والتسارع الناتج مع كل قوة محصلة تختارها!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* القوة والتحكم */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">قوة السحب المؤثرة (نيوتن):</span>
                  <span className="text-xs font-black font-mono text-indigo-755 bg-indigo-50 px-2.5 py-0.5 rounded-md">{force} N</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={force}
                  disabled={isSimulatingCart}
                  onChange={(e) => setForce(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                  <span>2 نيوتن</span>
                  <span>11 نيوتن</span>
                  <span>20 نيوتن</span>
                </div>
              </div>

              {/* تحذير وتجديد الكتلة */}
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-[9px] text-amber-900 font-bold">هل ترغب بتغيير كتلة العربة فجأة؟</span>
                <button
                  type="button"
                  disabled={isSimulatingCart}
                  onClick={generateNewHiddenMass}
                  className="px-2.5 py-1 text-[9px] font-extrabold bg-amber-600 text-white rounded cursor-pointer hover:bg-amber-700 disabled:opacity-50"
                >
                  توليد كتلة جديدة 🎲
                </button>
              </div>

              {/* زر بدء السحب */}
              <button
                onClick={startCartSimulation}
                disabled={isSimulatingCart}
                className={`w-full py-3 text-xs font-black text-white rounded-xl shadow transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 ${
                  isSimulatingCart ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-indigo-850 hover:from-indigo-500 hover:to-indigo-750'
                }`}
              >
                {isSimulatingCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>العربة تسير تحت وطأة القوة...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>ابدأ رصد الحركة والسحب المعياري ▶️</span>
                  </>
                )}
              </button>

              {/* عدادات السرعة والتسارع الفورية */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-2xl text-center space-y-1">
                  <span className="text-[9px] font-bold text-slate-550 block">العجلة المكتسبة (جـ):</span>
                  <strong className="text-base font-black font-mono text-indigo-900">{cartAcceleration.toFixed(2)} م/ث²</strong>
                </div>
                <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-2xl text-center space-y-1">
                  <span className="text-[9px] font-bold text-slate-550 block">زمن قطع المسار (ز):</span>
                  <strong className="text-base font-black font-mono text-indigo-900">{cartTime.toFixed(2)} ثانية</strong>
                </div>
              </div>
            </div>

            {/* عمود الرسم المتحرك للعربة والسطل المعلق */}
            <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-5 border border-slate-950 relative overflow-hidden h-72 flex flex-col justify-between select-none">
              <div className="absolute top-2.5 right-2.5 bg-slate-950/60 text-slate-400 px-3 py-1 rounded-full text-[8px] font-bold">
                ⚠️ احسب الكتلة: ك = ق / جـ
              </div>

              {/* منضدة المختبر */}
              <div className="flex-1 w-full relative pt-12">
                {/* طاولة مستوية */}
                <div className="w-full h-2.5 bg-slate-750 absolute top-24 left-0 rounded"></div>
                {/* بكرة في الطرف الأيسر */}
                <div className="w-5 h-5 rounded-full bg-indigo-500 border border-indigo-300 absolute top-21.5 left-20 flex items-center justify-center text-[8px] animate-spin font-black text-white">⚙️</div>

                {/* العربة الحركية */}
                <div 
                  style={{ left: `calc(100px + ${cartX * 0.7}%)` }}
                  className="absolute top-12 w-16 h-11 bg-indigo-600 rounded-lg border-2 border-indigo-400 shadow-xl flex flex-col items-center justify-center transition-all duration-75 text-[10px] font-black"
                >
                  <span className="text-xs text-white">🛒 العربة</span>
                  <span className="text-[8px] text-indigo-200">الكتلة: ؟ كجم</span>
                </div>

                {/* الحبل المتصل */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* خط حبل من العربة للبكرة */}
                  <line 
                    x1={`calc(100px + ${cartX * 0.7}% + 8px)`} 
                    y1="67" 
                    x2="110" 
                    y2="97" 
                    stroke="#fff" 
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  {/* خط حبل هابط من البكرة للسطل */}
                  <line 
                    x1="110" 
                    y1="97" 
                    x2="110" 
                    y2={`calc(100px + ${bucketY * 1.1}px)`} 
                    stroke="#fff" 
                    strokeWidth="1.5"
                  />
                </svg>

                {/* السطل المعلق */}
                <div 
                  style={{ top: `calc(100px + ${bucketY * 1.1}px)`, left: '100px' }}
                  className="absolute w-6 h-8 bg-amber-500 border-2 border-amber-400 rounded-b-md flex items-center justify-center text-xs shadow-xl transition-all duration-75"
                >
                  🪣
                </div>
              </div>

              <div className="h-4 bg-slate-950 text-slate-400 text-[8px] flex items-center justify-center rounded">
                منضدة نيوتن اللزجة المعمارية بطول 1.0 متر كامل
              </div>
            </div>
          </div>

          {/* محاولات الطالب لحساب كتلة العربة */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-slate-800 text-xs text-slate-800">📊 جدول محاولات العربة المرصودة:</h5>
            <div className="overflow-x-auto rounded-xl border border-slate-150">
              <table className="w-full text-xs text-right text-slate-650 min-w-[500px]">
                <thead className="bg-slate-550/5 text-slate-755 font-bold uppercase">
                  <tr>
                    <th className="px-4 py-2 border-l border-slate-200"># المحاولة</th>
                    <th className="px-4 py-2">قوة السحب (ق)</th>
                    <th className="px-4 py-2">العجلة المكتشفة (جـ)</th>
                    <th className="px-4 py-2">زمن المسار الحركي</th>
                    <th className="px-4 py-2">دليل الإرشاد والتحقيق من الكتلة (ك)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {cartAttempts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-slate-400 italic font-bold">
                        ابدأ بتسيير العربة لتسجيل أول حركة ورصد النتائج في الجدول فوراً.
                      </td>
                    </tr>
                  ) : (
                    cartAttempts.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50 font-semibold text-slate-850">
                        <td className="px-4 py-2 border-l border-slate-205">رصد {att.id}#</td>
                        <td className="px-4 py-2 font-mono text-indigo-700 font-black">{att.force} نيوتن</td>
                        <td className="px-4 py-2 font-mono text-teal-700 font-black">{att.acceleration} م/ث²</td>
                        <td className="px-4 py-2 font-mono">{att.time} ثانية</td>
                        <td className="px-4 py-2 text-indigo-900 bg-indigo-50/20 text-[10px]">{att.hint}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* التبويب الثاني: بمباردة ارتداد المدفع (نيوتن الثالث) */}
      {currentTab === 'cannon' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl space-y-2">
            <h5 className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-650" />
              <span>المحاكاة الثانية: قانون نيوتن الثالث (الفعل ورد الفعل)</span>
            </h5>
            <p className="text-[10px] text-emerald-850 leading-relaxed font-semibold">
              اضبط كتلة المدفع وكتلة القذيفة من شريط التمرير وشاهد كيف تؤثر قوة الانفجار الداخلية على كلاهما فترتد كتلة المدفع الثقيلة للوراء ببطء (رد الفعل) وتنطلق القذيفة الخفيفة للأمام بسرعة خاطفة تامة (الفعل).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-4">
              {/* كتلة المدفع */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">كتلة المدفع (كـ_مدفع):</span>
                  <span className="text-xs font-black font-mono text-emerald-755 bg-emerald-50 px-2.5 py-0.5 rounded-md">{cannonMass} كجم</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="255"
                  step="5"
                  value={cannonMass}
                  disabled={isFiring}
                  onChange={(e) => setCannonMass(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* كتلة القذيفة */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">كتلة القذيفة (كـ_مقذوف):</span>
                  <span className="text-xs font-black font-mono text-emerald-755 bg-emerald-50 px-2.5 py-0.5 rounded-md">{bulletMass} كجم</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={bulletMass}
                  disabled={isFiring}
                  onChange={(e) => setBulletMass(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* زر الإطلاق الأسطوري */}
              <button
                onClick={fireCannon}
                disabled={isFiring}
                className={`w-full py-3 text-xs font-black text-white rounded-xl shadow transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 ${
                  isFiring ? 'bg-emerald-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-650'
                }`}
              >
                {isFiring ? (
                  <span>💥 لحظة الإنفجار وارتداد الفعل...</span>
                ) : (
                  <>
                    <Flame size={14} className="animate-pulse" />
                    <span>فجّر المقذوف واكشف رد الفعل 💥</span>
                  </>
                )}
              </button>

              {/* سرعات الارتداد */}
              {recoilVelocity > 0 && (
                <div className="p-4 bg-rose-50 border border-rose-150 rounded-xl space-y-2 text-xs">
                  <span className="font-extrabold text-rose-950 block">📊 نتائج رد الفعل وميكانيكا السرعات:</span>
                  <div className="text-[10px] text-slate-700 font-semibold space-y-1">
                    <p>• سرعة انطلاق القذيفة للأمام: <strong className="text-emerald-700 font-mono font-black">{bulletVelocity} م/ث</strong></p>
                    <p>• سرعة ارتداد المدفع للخلف: <strong className="text-rose-700 font-mono font-black">{recoilVelocity} م/ث</strong></p>
                    <p className="text-[9px] text-slate-500 mt-2 bg-white/60 p-1.5 rounded-lg">قانون حفظ الزخم (كمية التحرك): ك₁ ع₁ = ك₂ ع₂ ويجعل السرعات متشاكسة.</p>
                  </div>
                </div>
              )}
            </div>

            {/* اللوح البصري للمدفع */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-5 relative overflow-hidden h-72 flex flex-col justify-end border border-slate-900">
              {/* متجهات القوة للفعل ورد الفعل */}
              {isFiring && (
                <>
                  <div className="absolute top-1/3 left-1/3 text-emerald-400 flex flex-col items-center">
                    <span className="text-[9px] font-black bg-emerald-950/85 px-2 py-0.5 rounded">قوة الفعل للأمام ➔</span>
                  </div>
                  <div className="absolute top-1/3 right-1/3 text-rose-400 flex flex-col items-center">
                    <span className="text-[9px] font-black bg-rose-955/85 px-2 py-0.5 rounded">← قوة رد الفعل للخلف</span>
                  </div>
                </>
              )}

              {/* الطاولة أو المسند */}
              <div className="w-full relative h-24 flex items-end">
                {/* المقذوف الطائر */}
                <div 
                  style={{ transform: `translateX(${bulletX}px)` }}
                  className="absolute bottom-5 left-1/2 w-4 h-4 rounded-full bg-red-500 border border-amber-400 shadow-md flex items-center justify-center text-[8px] transition-all duration-75"
                >
                  💣
                </div>

                {/* المدفع التفاعلي */}
                <div 
                  style={{ transform: `translateX(${-cannonRecoilX}px)` }}
                  className="absolute bottom-1 left-28 w-28 h-14 bg-gradient-to-t from-slate-800 to-slate-650 rounded-t-xl border-l-4 border-slate-500 transition-all duration-75 flex items-center justify-center text-xs font-bold text-white shadow"
                >
                  ⚙️ مدفع {cannonMass} كجم
                </div>
              </div>

              {/* عجلات المدفع الزخرفية */}
              <div className="w-full h-2.5 bg-gradient-to-r from-teal-900 to-emerald-900 rounded relative">
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-emerald-200">المرص المرتحل لنيوتن الثالث</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* التبويب الثالث: تجربة الكتلة والوزن (الجاذبية الكونية) */}
      {currentTab === 'massweight' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white p-4 rounded-2xl space-y-2 border border-indigo-850 shadow-md">
            <h5 className="font-extrabold text-amber-400 text-xs flex items-center gap-1.5">
              <Scale size={14} className="text-amber-400" />
              <span>المحاكاة الثالثة: استكشاف الفارق الدائم بين الكتلة (كجم) والوزن (نيوتن)</span>
            </h5>
            <p className="text-[10px] text-indigo-200 leading-relaxed font-semibold">
              اختر كتلة الجسم من المنزلق، ثم تنقّل بين الأجرام السماوية في المجموعة الشمسية لمشاهدة كيف تبدو الكتلة ثابتة ومستقلة بينما الوزن يجترع التغير طويلاً بتغير تسارع الجاذبية في الكواكب!
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">كتلة الجسم المختارة:</span>
                <span className="text-xs font-black font-mono text-indigo-755 bg-indigo-50 px-2.5 py-0.5 rounded-md">{selectedMass} كجم</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={selectedMass}
                onChange={(e) => setSelectedMass(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                <span>1 كجم</span>
                <span>50 كجم</span>
                <span>100 كجم</span>
              </div>
            </div>

            {/* الكواكب والاجرام السماوية */}
            <h5 className="font-bold text-xs text-slate-800">🪐 اختر موقعك الجغرافي بالكون الجوهري:</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
              {Object.entries(planetData).map(([key, planet]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlanet(key as any)}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedPlanet === key
                      ? 'bg-gradient-to-r ' + planet.bg + ' text-white shadow-lg scale-95 border-transparent'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-3xl block mb-1">{planet.emoji}</span>
                  <strong className="text-xs block">{planet.name}</strong>
                  <span className="text-[9px] font-mono opacity-80 block mt-1">د = {planet.g} م/ث²</span>
                </button>
              ))}
            </div>

            {/* بطاقتي المقارنة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* بطاقة الكتلة */}
              <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 text-center space-y-2 shadow-sm relative overflow-hidden">
                <div className="absolute top-1.5 left-2 bg-slate-800 px-2 py-0.5 rounded text-[8px] text-slate-400">كمية قِياسية</div>
                <span className="text-xs font-bold text-slate-400">🧊 كتلة المادة المقاسة</span>
                <strong className="text-3xl font-black font-mono text-amber-400 block">{selectedMass} كجم</strong>
                <p className="text-[9px] text-slate-350 leading-relaxed font-semibold">
                  قيمة ثابتة لا تتغير في أي كوكب بالكون لكونها تعبر عن مقدار ما يحتويه الجسم الحقيقي من ذرات المادة.
                </p>
              </div>

              {/* بطاقة الوزن */}
              <div className="p-5 bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-2xl border border-indigo-850 text-center space-y-2 shadow-sm relative overflow-hidden">
                <div className="absolute top-1.5 left-2 bg-indigo-800 px-2 py-0.5 rounded text-[8px] text-indigo-300">قوة مُتجهة</div>
                <span className="text-xs font-bold text-indigo-300">⚖️ الوزن المحسوب (ق_جذب)</span>
                <strong className="text-3xl font-black font-mono text-emerald-400 block">{calculatedWeight} نيوتن</strong>
                <p className="text-[9px] text-indigo-200 leading-relaxed font-semibold text-right">
                  الوزن = ... <br />
                  <b>التجربة الكونية:</b> يتضاعف وزنك على المشتري بـ 2.5 مرة مقارنة بالأرض بينما تنعدم تماماً في الفضاء!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. مختبر قوى الاحتكاك والفيزياء التجريبية (الدرس الثالث عشر)
// ==========================================
export function FrictionLab({ onComplete }: LabProps) {
  const [currentTab, setCurrentTab] = useState<'experiment' | 'calculator'>('experiment');
  const [isIframeFullscreen, setIsIframeFullscreen] = useState(false);

  // بيانات جدول تجربة الاحتكاك
  const [fapp2, setFapp2] = useState<string>('');
  const [ffric2, setFfric2] = useState<string>('');
  const [fnet2, setFnet2] = useState<string>('');
  const [acc2, setAcc2] = useState<string>('');
  const [state2, setState2] = useState<'pending' | 'correct' | 'wrong'>('pending');

  const [fapp3, setFapp3] = useState<string>('');
  const [ffric3, setFfric3] = useState<string>('');
  const [fnet3, setFnet3] = useState<string>('');
  const [acc3, setAcc3] = useState<string>('');
  const [state3, setState3] = useState<'pending' | 'correct' | 'wrong'>('pending');

  const [tableFeedback, setTableFeedback] = useState<string>('');
  const [tableFeedbackType, setTableFeedbackType] = useState<'success' | 'warning' | ''>('');

  // آلة حاسبة الاحتكاك الفورية
  const [calcMass, setCalcMass] = useState<number>(50);
  const [calcFapp, setCalcFapp] = useState<number>(200);
  const [calcMus, setCalcMus] = useState<number>(0.4);
  const [calcMuk, setCalcMuk] = useState<number>(0.3);

  // حساب القيم للآلة الحاسبة بشكل فوري
  const g = 9.8;
  const normalForce = calcMass * g;
  const maxStaticFriction = calcMus * normalForce;
  
  let actualFriction = 0;
  let netForce = 0;
  let acceleration = 0;
  let motionState = 'ساكن';

  if (calcFapp <= maxStaticFriction) {
    actualFriction = calcFapp;
    netForce = 0;
    acceleration = 0;
    motionState = 'ساكن 🛑 (القوة المطبقة لم تتغلب بعد على الاحتكاك السكوني الأقصى)';
  } else {
    actualFriction = calcMuk * normalForce;
    netForce = calcFapp - actualFriction;
    acceleration = netForce / calcMass;
    motionState = 'متحرك 🏃‍♂️ (تم التغلب على الاحتكاك السكوني، والجسم يتسارع حالياً)';
  }

  const checkTable = () => {
    const vFapp2 = parseFloat(fapp2);
    const vFfric2 = parseFloat(ffric2);
    const vFnet2 = parseFloat(fnet2);
    const vAcc2 = parseFloat(acc2);

    const isRow2Correct = 
      !isNaN(vFapp2) && Math.abs(vFapp2 - 200) < 5 &&
      !isNaN(vFfric2) && Math.abs(vFfric2 - 147) < 3 &&
      !isNaN(vFnet2) && Math.abs(vFnet2 - 53) < 4 &&
      !isNaN(vAcc2) && Math.abs(vAcc2 - 1.06) < 0.15;

    setState2(isRow2Correct ? 'correct' : 'wrong');

    const vFapp3 = parseFloat(fapp3);
    const vFfric3 = parseFloat(ffric3);
    const vFnet3 = parseFloat(fnet3);
    const vAcc3 = parseFloat(acc3);

    const isRow3Correct = 
      !isNaN(vFapp3) && Math.abs(vFapp3 - 250) < 5 &&
      !isNaN(vFfric3) && Math.abs(vFfric3 - 147) < 3 &&
      !isNaN(vFnet3) && Math.abs(vFnet3 - 103) < 4 &&
      !isNaN(vAcc3) && Math.abs(vAcc3 - 2.06) < 0.15;

    setState3(isRow3Correct ? 'correct' : 'wrong');

    if (isRow2Correct && isRow3Correct) {
      setTableFeedback('🎉 رائع جداً! جميع البيانات المسجلة بالجدول مطابقة لحسابات الاحتكاك الفيزيائية بنسبة 100%. تم احتساب التقدم بنجاح.');
      setTableFeedbackType('success');
      if (onComplete) {
        onComplete(25, 'friction_phet_experiment');
      }
    } else {
      setTableFeedback('⚠️ تنبيه: بعض القيم المدخلة غير متطابقة علمياً مع نواتج التجربة. يرجى مراجعة الحسابات أو الاستعانة بالآلة الحاسبة في تبويب المحاكاة الفوري.');
      setTableFeedbackType('warning');
    }
  };

  const resetTable = () => {
    setFapp2('');
    setFfric2('');
    setFnet2('');
    setAcc2('');
    setState2('pending');

    setFapp3('');
    setFfric3('');
    setFnet3('');
    setAcc3('');
    setState3('pending');

    setTableFeedback('');
    setTableFeedbackType('');
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-6 text-right w-full" dir="rtl">
      {/* هيدر المختبر */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-550 to-indigo-750 text-white rounded-2xl shadow-sm">
            <Scale size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs">🧪 مختبر قوى الاحتكاك والفيزياء التجريبية المتطور</h4>
            <p className="text-[10px] text-slate-500 font-medium font-semibold">استكشف السلوكيات والخصائص الفيزيائية لقوى الاحتكاك السكونية والحركية للأجسام.</p>
          </div>
        </div>
        <div className="flex border border-slate-150 p-1 bg-slate-50 rounded-xl gap-1 w-full sm:w-auto">
          <button
            onClick={() => setCurrentTab('experiment')}
            className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'experiment' ? 'bg-indigo-650 text-white shadow' : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            📊 تجربة PhET وجدول الأرصاد
          </button>
          <button
            onClick={() => setCurrentTab('calculator')}
            className={`flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'calculator' ? 'bg-indigo-650 text-white shadow' : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            🔢 آلة حاسبة الاحتكاك الفورية
          </button>
        </div>
      </div>

      {currentTab === 'experiment' && (
        <div className="space-y-6">
          {/* تأملات إيمانية ودليل العمل */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-2">
              <h5 className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-600" />
                <span>🕌 تأملات إيمانية في سنّة وقوة الاحتكاك</span>
              </h5>
              <p className="text-[10px] text-emerald-850 leading-relaxed font-semibold">
                📖 قال الله تعالى: <b>﴿وَجَعَلْنَا فِي الْأَرْضِ رَوَاسِيَ أَن تَمِيدَ بِهِمْ﴾</b> (الأنبياء: 31). <br />
                لولا نعمة الله تعالى بإيجاد الاحتكاك بين أقدامنا والتراب، وبين إطارات وسائل النقل والطرق، لما تيسر ثبات أو سير في أمن واستقرار. وهي سنّة مادية تماثل تجرع العقبات بالصبر الذي يزيد رسوخ المؤمن وثباته أمام عواصف الفتن!
              </p>
            </div>

            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl space-y-1.5">
              <h5 className="font-extrabold text-amber-950 text-xs">📋 دليل استقصاء تجارب الاحتكاك في PhET:</h5>
              <ol className="list-decimal list-inside space-y-1 text-[10px] text-amber-900 font-semibold leading-relaxed">
                <li>افتح محاكاة PhET التفاعلية الموجودة بالأسفل.</li>
                <li>اختر تبويب <b>"الاحتكاك"</b> وفعّل خياري <b>(القيم)</b> و<b>(مخطط القوة الحر)</b>.</li>
                <li>اختر الصندوق المعياري بوزن <b>50 كجم</b> واجعل معامل الاحتكاك متوسطاً.</li>
                <li>طبق قوة تدرجية ببطء ورصّد متى يتغلب جسمك على الاحتكاك الأقصى وباشر تعبئة الجدول.</li>
              </ol>
            </div>
          </div>

          {/* محاكاة PhET مدمجة */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 shadow-sm relative h-[450px]">
            <div className="absolute top-3 left-3 z-10">
              <button
                type="button"
                onClick={() => setIsIframeFullscreen(true)}
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-white text-[11px] font-bold py-1.5 px-3.5 rounded-xl shadow-lg border border-slate-700 transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Maximize2 size={13} className="text-indigo-400" />
                <span>ملء الشاشة 📺</span>
              </button>
            </div>
            <iframe 
              src="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=ar"
              className="w-full h-full border-0"
              title="PhET Friction Simulation"
              allowFullScreen
            ></iframe>
          </div>

          {/* محاكاة بملء الشاشة إذا تم الضغط على زر التكبير */}
          {isIframeFullscreen && (
            <div className="fixed inset-0 bg-slate-950/95 z-[9999] flex flex-col p-4 space-y-3 animate-in fade-in duration-200" dir="rtl">
              {/* شريط التحكم العلوي بوضع ملء الشاشة */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3.5 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-650 text-white rounded-xl">
                    <Scale size={16} />
                  </div>
                  <div className="text-right">
                    <h5 className="text-white text-xs font-black font-sans">مختبر PhET لقوى الاحتكاك التفاعلي (ملء الشاشة)</h5>
                    <p className="text-[10px] text-slate-400 font-medium">قم بإجراء التجربة ثم أغلق لتعبئة جدول النتائج بالأسفل</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsIframeFullscreen(false)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition hover:scale-105 active:scale-95 shadow cursor-pointer"
                >
                  <Minimize2 size={14} />
                  <span>إغلاق وملء جدول النتائج 🛑</span>
                </button>
              </div>

              {/* محاكاة الفضاء ب ملء الشاشة */}
              <div className="flex-1 rounded-2xl border border-slate-800 overflow-hidden bg-slate-900 relative">
                <iframe 
                  src="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=ar"
                  className="w-full h-full border-0"
                  title="PhET Friction Simulation Fullscreen"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* جدول رصد البيانات التفاعلي */}
          <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-extrabold text-slate-800 text-xs">📊 سجل رصد الأرصاد المعملية وقارنها علمياً:</h5>
              <button 
                onClick={resetTable}
                className="px-2.5 py-1 text-[9px] font-extrabold bg-slate-200 text-slate-700 hover:bg-slate-300 rounded cursor-pointer"
              >
                🔄 إعادة تصفير الجدول
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-xs text-right text-slate-650 min-w-[600px]">
                <thead className="bg-slate-100 text-[9px] text-slate-700 font-black">
                  <tr>
                    <th scope="col" className="px-3 py-2 border-l border-slate-200 text-center">التجربة</th>
                    <th scope="col" className="px-3 py-2 text-center">الكتلة (كجم)</th>
                    <th scope="col" className="px-3 py-2 text-center">معامل الاحتكاك (μ_ح)</th>
                    <th scope="col" className="px-3 py-2 text-center">القوة المطبقة (نيوتن)</th>
                    <th scope="col" className="px-3 py-2 text-center">قوة الاحتكاك (نيوتن)</th>
                    <th scope="col" className="px-3 py-2 text-center">القوة المحصلة (نيوتن)</th>
                    <th scope="col" className="px-3 py-2 text-center">العجلة (م/ث²)</th>
                    <th scope="col" className="px-3 py-2 text-center">حالة الحركة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-center font-semibold">
                  <tr className="bg-slate-50/50">
                    <td className="px-3 py-3 font-bold border-l border-slate-200 text-slate-800">1 (مثال مرجعي)</td>
                    <td className="px-3 py-3 font-mono">50 كجم</td>
                    <td className="px-3 py-3 font-mono">0.3</td>
                    <td className="px-3 py-3 font-mono text-slate-500">147 N</td>
                    <td className="px-3 py-3 font-mono text-slate-500">147 N</td>
                    <td className="px-3 py-3 font-mono text-slate-500">0 N</td>
                    <td className="px-3 py-3 font-mono text-slate-500">0.00</td>
                    <td className="px-3 py-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px]">ساكن 🛑</span></td>
                  </tr>

                  <tr>
                    <td className="px-3 py-3 font-bold border-l border-slate-200 text-slate-800">التجربة الثانية</td>
                    <td className="px-3 py-3 font-mono">50 كجم</td>
                    <td className="px-3 py-3 font-mono">0.3</td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={fapp2}
                        onChange={(e) => setFapp2(e.target.value)}
                        placeholder="أدخل مثلاً 200"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state2 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state2 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={ffric2}
                        onChange={(e) => setFfric2(e.target.value)}
                        placeholder="أدخل مثلاً 147"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state2 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state2 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={fnet2}
                        onChange={(e) => setFnet2(e.target.value)}
                        placeholder="أدخل مثلاً 53"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state2 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state2 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={acc2}
                        onChange={(e) => setAcc2(e.target.value)}
                        placeholder="أدخل مثلاً 1.06"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state2 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state2 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      {state2 === 'correct' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">متحرك 🏃‍♂️</span>
                      ) : state2 === 'wrong' ? (
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px]">خاطئ ❌</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px]">قيد الرصد ⏳</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-3 py-3 font-bold border-l border-slate-200 text-slate-800">التجربة الثالثة</td>
                    <td className="px-3 py-3 font-mono">50 كجم</td>
                    <td className="px-3 py-3 font-mono">0.3</td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={fapp3}
                        onChange={(e) => setFapp3(e.target.value)}
                        placeholder="أدخل مثلاً 250"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state3 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state3 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={ffric3}
                        onChange={(e) => setFfric3(e.target.value)}
                        placeholder="أدخل مثلاً 147"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state3 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state3 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={fnet3}
                        onChange={(e) => setFnet3(e.target.value)}
                        placeholder="أدخل مثلاً 103"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state3 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state3 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input 
                        type="number" 
                        value={acc3}
                        onChange={(e) => setAcc3(e.target.value)}
                        placeholder="أدخل مثلاً 2.06"
                        className={`w-24 p-1 rounded border text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          state3 === 'correct' ? 'border-emerald-500 bg-emerald-50' : state3 === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-3">
                      {state3 === 'correct' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">متحرك 🏃‍♂️</span>
                      ) : state3 === 'wrong' ? (
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px]">خاطئ ❌</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px]">قيد الرصد ⏳</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button 
              onClick={checkTable}
              className="w-full py-3 text-xs bg-indigo-600 text-white font-black hover:bg-indigo-500 rounded-xl transition-all cursor-pointer shadow active:scale-95"
            >
              📊 تحقق من صحة ومطابقة الأرصاد المدخلة علمياً
            </button>

            {tableFeedback && (
              <div className={`p-3.5 rounded-xl border text-xs font-bold ${
                tableFeedbackType === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-950' : 'bg-amber-50 border-amber-100 text-amber-950'
              }`}>
                {tableFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {currentTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl space-y-2">
            <h5 className="font-extrabold text-indigo-950 text-xs flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" />
              <span>الآلة الحاسبة الفورية لقوانين وطوابع الاحتكاك الفيزيائية</span>
            </h5>
            <p className="text-[10px] text-indigo-850 leading-relaxed font-semibold">
              أدخل كتلة الجسم والقوة الخارجية المطبقة عليه مع معاملي الاحتكاك السكوني والحركي لمشاهدة التحليل الديناميكي الفوري لحالة الأجسام وقوة الاحتكاك الفعالة المؤثرة بالواقع وقيمة التسارع الناتج.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* اللوحة التحكمية */}
            <div className="lg:col-span-4 space-y-4">
              {/* كتلة الجسم */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">كتلة الجسم (كجم):</span>
                  <span className="text-xs font-black font-mono text-indigo-750 bg-indigo-50 px-2.5 py-0.5 rounded-md">{calcMass} كجم</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={calcMass}
                  onChange={(e) => setCalcMass(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* القوة المطبقة */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">القوة المطبقة (نيوتن):</span>
                  <span className="text-xs font-black font-mono text-indigo-750 bg-indigo-50 px-2.5 py-0.5 rounded-md">{calcFapp} N</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={calcFapp}
                  onChange={(e) => setCalcFapp(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* معامل الاحتكاك السكوني */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">معامل الاحتكاك السكوني (μ_س):</span>
                  <span className="text-xs font-black font-mono text-indigo-750 bg-indigo-50 px-2.5 py-0.5 rounded-md">{calcMus.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={calcMus}
                  onChange={(e) => setCalcMus(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* معامل الاحتكاك الحركي */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">معامل الاحتكاك الحركي (μ_ح):</span>
                  <span className="text-xs font-black font-mono text-indigo-750 bg-indigo-50 px-2.5 py-0.5 rounded-md">{calcMuk.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.9"
                  step="0.05"
                  value={calcMuk}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCalcMuk(Math.min(val, calcMus)); // الحركي أقل من السكوني
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* اللوح المعملي للنتائج والتحليل */}
            <div className="lg:col-span-8 space-y-4">
              {/* الرسوم التخطيطية الهندسية */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-950 relative h-64 flex flex-col justify-between">
                <div className="absolute top-2.5 left-2.5 bg-slate-950/60 px-2.5 py-1 rounded text-[8px] text-slate-400 font-bold">
                  مخطط الجسم الحر في الهواء الطلق
                </div>

                <div className="flex-1 flex items-center justify-center relative py-6">
                  {/* الأرض */}
                  <div className="w-5/6 h-2 bg-slate-700 absolute bottom-10 rounded"></div>

                  {/* الصندوق */}
                  <div className="w-28 h-20 bg-indigo-600 border-2 border-indigo-400 rounded-lg flex flex-col items-center justify-center text-xs text-white z-15 absolute bottom-11 shadow-2xl">
                    <span className="font-bold">ك = {calcMass} كجم</span>
                    <span className="text-[8px] text-indigo-200">الوزن = {normalForce.toFixed(0)} نيوتن</span>
                  </div>

                  {/* الأسهم المتجهة بالقوة */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    {/* سهم القوة الخارجية (لليمين) */}
                    {calcFapp > 0 && (
                      <>
                        <line x1="100" y1="120" x2="35" y2="120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x="50" y="110" fill="#10b981" className="text-[10px] font-bold">القوة المطبقة (ق) = {calcFapp}N</text>
                      </>
                    )}
                    {/* سهم قوة الاحتكاك (لليسار) */}
                    {actualFriction > 0 && (
                      <>
                        <line x1="280" y1="120" x2="345" y2="120" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x="290" y="110" fill="#f43f5e" className="text-[10px] font-bold">قوة الاحتكاك = {actualFriction.toFixed(1)}N</text>
                      </>
                    )}
                  </svg>
                </div>

                <div className="h-4 bg-slate-950 text-slate-500 text-[8px] flex items-center justify-center rounded">
                  الجاذبية المعيارية بالمعادلة مستقرة بالقرب من سطح الأرض د = 9.8 م/ث²
                </div>
              </div>

              {/* بطاقات النتائج الفورية وتحليل القوى */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold block">القوة العمودية (ق_ر):</span>
                  <strong className="text-lg font-black font-mono text-slate-900">{normalForce.toFixed(1)} نيوتن</strong>
                </div>
                <div className="p-3.5 bg-amber-55/10 rounded-2xl border border-amber-100 text-center space-y-1">
                  <span className="text-[9px] text-amber-800 font-bold block">أقصى احتكاك سكوني:</span>
                  <strong className="text-lg font-black font-mono text-amber-900">{maxStaticFriction.toFixed(1)} نيوتن</strong>
                </div>
                <div className="p-3.5 bg-emerald-55/10 rounded-2xl border border-emerald-100 text-center space-y-1">
                  <span className="text-[9px] text-emerald-800 font-bold block">العجلة الناتجة (جـ):</span>
                  <strong className="text-lg font-black font-mono text-emerald-900">{acceleration.toFixed(2)} م/ث²</strong>
                </div>
              </div>

              {/* الحالة الحركية التفصيلية */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-150 rounded-2xl space-y-2 text-xs">
                <span className="font-extrabold text-indigo-950 block">🏷️ الحالة والتحليل الميكانيكي الراهن للجسم:</span>
                <p className="font-bold text-slate-800 leading-relaxed text-right">{motionState}</p>
                <div className="text-[10px] text-indigo-900 space-y-1 leading-relaxed">
                  <p>• القوة المطبقة: <strong className="font-mono">{calcFapp} N</strong> | قوة الاحتكاك السكونية اللحظية: <strong className="font-mono">{actualFriction.toFixed(1)} N</strong></p>
                  <p>• القوة المحصلة الناتجة خلف الفجوة: <strong className="font-mono text-indigo-950">{netForce.toFixed(1)} N</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// =======================================================
// 14. مختبر النظرية الحركية الجزيئية وحالات المادة (الدرس 14)
// =======================================================
export function KineticMolecularTheoryLab({ onComplete }: LabProps) {
  const [currentTab, setCurrentTab] = useState<'simulation' | 'activities' | 'calculator'>('simulation');
  const [activeElement, setActiveElement] = useState<'neon' | 'argon' | 'water'>('neon');
  const [activeState, setActiveState] = useState<'solid' | 'liquid' | 'gas'>('solid');
  
  // درجة الحرارة بالكلفن
  const [temp, setTemp] = useState<number>(24);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // ورقة الملاحظات وأسئلة المختبر
  const [obs1, setObs1] = useState<string>('');
  const [obs2, setObs2] = useState<string>('');
  const [obs3, setObs3] = useState<string>('');
  const [activityStatus, setActivityStatus] = useState<'pending' | 'correct' | 'wrong'>('pending');
  const [activityFeedback, setActivityFeedback] = useState<string>('');

  // آلة حاسبة مستقلة
  const [calcTemp, setCalcTemp] = useState<number>(300);

  // تحديث درجة الحرارة تلقائياً بناء على تحديد الحالة لتطابق المادة مجهرياً
  useEffect(() => {
    if (activeState === 'solid') {
      setTemp(activeElement === 'neon' ? 14 : activeElement === 'argon' ? 40 : 150);
    } else if (activeState === 'liquid') {
      setTemp(activeElement === 'neon' ? 26 : activeElement === 'argon' ? 85 : 320);
    } else {
      setTemp(activeElement === 'neon' ? 120 : activeElement === 'argon' ? 220 : 500);
    }
  }, [activeState, activeElement]);

  // محاكاة فيزياء الجسيمات على الكانفاس ثنائي الأبعاد
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    // تهيئة الجسيمات
    const particleCount = 48;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      gridX: number;
      gridY: number;
      radius: number;
    }> = [];

    // اختيار الألوان والخصائص
    const particleRadius = activeElement === 'neon' ? 6 : activeElement === 'argon' ? 8 : 7;
    const color = activeElement === 'neon' ? '#f43f5e' : activeElement === 'argon' ? '#a855f7' : '#0ea5e9';

    // توزيع الجسيمات في شبكة للحالة الصلبة
    const cols = 8;
    const rows = Math.ceil(particleCount / cols);
    const gridSpacing = particleRadius * 2.3;
    const startX = (width - cols * gridSpacing) / 2 + particleRadius;
    const startY = height - (rows * gridSpacing) - 15;

    for (let i = 0; i < particleCount; i++) {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const gx = startX + c * gridSpacing + (r % 2 === 0 ? gridSpacing / 3 : 0);
      const gy = startY + r * gridSpacing;

      particles.push({
        x: gx,
        y: gy,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        gridX: gx,
        gridY: gy,
        radius: particleRadius
      });
    }

    // حلقة الحركة التفاعلية
    const updatePhysics = () => {
      ctx.clearRect(0, 0, width, height);

      // رسم الحاوية
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, height);

      // معامل السرعة المتأثر بالحرارة الكلفنية
      const speedMultiplier = Math.sqrt(temp) * 0.25;

      particles.forEach((p, idx) => {
        if (activeState === 'solid') {
          // جزيئات الصلب تهتز فقط حول مواقعها الثابتة
          const vibrationAmp = Math.min(6, temp * 0.15);
          p.x = p.gridX + (Math.random() - 0.5) * vibrationAmp;
          p.y = p.gridY + (Math.random() - 0.5) * vibrationAmp;
        } else if (activeState === 'liquid') {
          // جزيئات السائل تتجمع وتنزلق في قاع الإناء
          p.vy += 0.25; // جاذبية ضعيفة لتكثيف الماء في الأسفل
          p.x += p.vx * speedMultiplier * 0.35;
          p.y += p.vy * speedMultiplier * 0.35;

          // احتكاك لتبديد الطاقة الزائدة
          p.vx *= 0.96;
          p.vy *= 0.96;

          // تصادم مع الجدران
          if (p.x < p.radius) { p.x = p.radius; p.vx *= -0.6; }
          if (p.x > width - p.radius) { p.x = width - p.radius; p.vx *= -0.6; }
          if (p.y < p.radius) { p.y = p.radius; p.vy *= -0.6; }
          if (p.y > height - p.radius) { p.y = height - p.radius; p.vy *= -0.6; }

          // تماسك جزيئي وجذب لتقريب جزيئات السائل
          particles.forEach((other, oIdx) => {
            if (idx === oIdx) return;
            const dx = other.x - p.x;
            const dy = other.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p.radius + other.radius + 1.2;
            if (dist < minDist) {
              const overlap = minDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);
              p.x -= nx * overlap * 0.5;
              p.y -= ny * overlap * 0.5;
              p.vx -= nx * 0.08 * speedMultiplier;
              p.vy -= ny * 0.08 * speedMultiplier;
            }
          });
        } else {
          // الغاز: حركة عشوائية تامة ومستمرة في كامل الوعاء
          p.x += p.vx * speedMultiplier * 0.45;
          p.y += p.vy * speedMultiplier * 0.45;

          // الحدود والجدران (ارتداد تام المرونة)
          if (p.x < p.radius) { p.x = p.radius; p.vx *= -1; }
          if (p.x > width - p.radius) { p.x = width - p.radius; p.vx *= -1; }
          if (p.y < p.radius) { p.y = p.radius; p.vy *= -1; }
          if (p.y > height - p.radius) { p.y = height - p.radius; p.vy *= -1; }

          // تصادم مرن بين الجزيئات
          particles.forEach((other, oIdx) => {
            if (idx === oIdx) return;
            const dx = other.x - p.x;
            const dy = other.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p.radius + other.radius;
            if (dist < minDist) {
              const overlap = minDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);
              p.x -= nx * overlap * 0.5;
              p.y -= ny * overlap * 0.5;

              // تبادل كمية الحركة
              const kx = p.vx - other.vx;
              const ky = p.vy - other.vy;
              const pX = nx * kx + ny * ky;
              p.vx -= nx * pX;
              p.vy -= ny * pX;
              other.vx += nx * pX;
              other.vy += ny * pX;
            }
          });
        }

        // رسم الجسيم وتأثيره البلوري
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#ffffffaa';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [temp, activeElement, activeState]);

  // حساب الضغط التقريبي بناء على معادلة الغاز المثالي PV = nRT مع تذبذب مجهري طفيف للواقعية
  const pressureBase = activeState === 'gas' ? (temp * 0.012) : activeState === 'liquid' ? (temp * 0.003) : 0;
  const pressureFluctuation = activeState === 'gas' ? (Math.random() - 0.5) * 0.04 : 0;
  const displayPressure = Math.max(0, pressureBase + pressureFluctuation);

  // التحقق من إجابات ورقة عمل التجربة
  const checkActivities = () => {
    if (obs1 === 'اهتزازية' && obs2 === 'تزيد' && obs3 === 'مسافات') {
      setActivityStatus('correct');
      setActivityFeedback('✅ رائع جداً! إجاباتك صحيحة ومطابقة تماماً لملاحظات التجربة العلمية. تم منحك 30 نقطة علمية مضافة لمحفظتك الاستقصائية!');
      if (onComplete) onComplete(30, 'kinetic_theory_experiment');
    } else {
      setActivityStatus('wrong');
      setActivityFeedback('❌ بعض الملاحظات غير دقيقة علمياً. أعد فحص سلوك وحركة الجسيمات في الكانفاس ثم صحح اختياراتك.');
    }
  };

  // ثوابت الحسابات الديناميكية الحرارية للآلة الحاسبة
  // R = 8.314, kB = 1.38e-23
  const molarMasses = { neon: 0.02018, argon: 0.03995, water: 0.018015 };
  const namesAr = { neon: 'غاز النيون', argon: 'غاز الأرجون', water: 'بخار الماء' };

  const calcSpeedRMS = (massKg: number, tK: number) => {
    return Math.sqrt((3 * 8.314 * tK) / massKg);
  };

  const calcAvgEnergy = (tK: number) => {
    // KE = 1.5 * kB * T
    return 1.5 * 1.38e-23 * tK;
  };

  return (
    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-5" id="kinetic-molecular-lab">
      <div className="flex flex-col md:flex-row justify-between items-center bg-indigo-900 text-white p-4 rounded-2xl gap-3">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-extrabold">مختبر النظرية الحركية الجزيئية وحالات المادة (محاكاة PhET المحلية)</h3>
          </div>
          <p className="text-[10px] text-indigo-200">صممت هذه الواجهة لدراسة العلاقات المجهرية وسلوك الذرات بدعم من الأستاذ سياف الشباطي</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setCurrentTab('simulation')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${currentTab === 'simulation' ? 'bg-amber-500 text-white shadow-md' : 'bg-indigo-800 text-indigo-150 hover:bg-indigo-700'}`}
          >
            🧪 المحاكاة التفاعلية
          </button>
          <button
            onClick={() => setCurrentTab('activities')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${currentTab === 'activities' ? 'bg-amber-500 text-white shadow-md' : 'bg-indigo-800 text-indigo-150 hover:bg-indigo-700'}`}
          >
            📝 كتاب الأرصاد والأنشطة
          </button>
          <button
            onClick={() => setCurrentTab('calculator')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${currentTab === 'calculator' ? 'bg-amber-500 text-white shadow-md' : 'bg-indigo-800 text-indigo-150 hover:bg-indigo-700'}`}
          >
            🧮 حاسبة السرعات الجزيئية
          </button>
        </div>
      </div>

      {/* 1. تبويب المحاكاة التفاعلية */}
      {currentTab === 'simulation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* لوحة الرسم */}
          <div className="lg:col-span-8 flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="w-full flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">مجهر تصوير حركة الذرات والجزيئات</span>
              <div className="flex gap-4">
                <span className="text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                  🌡️ الحرارة: {temp} كلفن ({ (temp - 273.15).toFixed(1) } °C)
                </span>
                <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  💨 الضغط التقريبي: {displayPressure.toFixed(2)} atm
                </span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={480}
              height={280}
              className="max-w-full bg-slate-950 rounded-xl shadow-inner border-2 border-slate-300"
            />

            {/* أداة التسخين والتبريد اللمسية */}
            <div className="w-full max-w-md bg-amber-50/50 border border-amber-100 rounded-2xl p-3 flex justify-between items-center gap-4">
              <span className="text-xs font-extrabold text-amber-900">🎛️ موقد الحرارة العام:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTemp(t => Math.max(5, t - 15))}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-sm flex items-center gap-1"
                >
                  ❄️ مبرد ثلج (-15K)
                </button>
                <button
                  onClick={() => setTemp(t => Math.min(1200, t + 20))}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-sm flex items-center gap-1"
                >
                  <Flame className="w-4 h-4" /> لهب نار (+20K)
                </button>
                <button
                  onClick={() => {
                    if (activeState === 'solid') setTemp(activeElement === 'neon' ? 14 : activeElement === 'argon' ? 40 : 150);
                    else if (activeState === 'liquid') setTemp(activeElement === 'neon' ? 26 : activeElement === 'argon' ? 85 : 320);
                    else setTemp(activeElement === 'neon' ? 120 : activeElement === 'argon' ? 220 : 500);
                  }}
                  className="p-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-700"
                  title="إعادة ضبط حرارة الحالة"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* لوحة التحكم الجانبية */}
          <div className="lg:col-span-4 space-y-4">
            {/* بطاقة اختيار نوع العنصر */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-extrabold text-xs text-indigo-950 block">🔵 اختر المادة / العنصر الكوني:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveElement('neon')}
                  className={`py-2 text-xs font-extrabold rounded-xl border transition-all ${activeElement === 'neon' ? 'bg-rose-50 border-rose-450 text-rose-700 font-black shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  نيون (Neon)<br /><span className="text-[9px] text-slate-500 block mt-0.5">20 g/mol</span>
                </button>
                <button
                  onClick={() => setActiveElement('argon')}
                  className={`py-2 text-xs font-extrabold rounded-xl border transition-all ${activeElement === 'argon' ? 'bg-purple-50 border-purple-450 text-purple-700 font-black shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  أرجون (Argon)<br /><span className="text-[9px] text-slate-500 block mt-0.5">40 g/mol</span>
                </button>
                <button
                  onClick={() => setActiveElement('water')}
                  className={`py-2 text-xs font-extrabold rounded-xl border transition-all ${activeElement === 'water' ? 'bg-sky-50 border-sky-450 text-sky-700 font-black shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  ماء (H₂O)<br /><span className="text-[9px] text-slate-500 block mt-0.5">18 g/mol</span>
                </button>
              </div>
            </div>

            {/* بطاقة اختيار حالة المادة */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-extrabold text-xs text-indigo-950 block">📦 اختر حالة المادة مجهرياً:</span>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveState('solid')}
                  className={`w-full py-2.5 px-3 rounded-xl border text-right text-xs font-bold transition-all flex justify-between items-center ${activeState === 'solid' ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-extrabold' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  <span>❄️ صلب (Solid)</span>
                  <span className="text-[10px] text-slate-500 font-sans">تراص منتظم بلوري وهتز موضعي</span>
                </button>
                <button
                  onClick={() => setActiveState('liquid')}
                  className={`w-full py-2.5 px-3 rounded-xl border text-right text-xs font-bold transition-all flex justify-between items-center ${activeState === 'liquid' ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-extrabold' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  <span>💧 سائل (Liquid)</span>
                  <span className="text-[10px] text-slate-500 font-sans">جريان منقاد وقريب مع انزلاق</span>
                </button>
                <button
                  onClick={() => setActiveState('gas')}
                  className={`w-full py-2.5 px-3 rounded-xl border text-right text-xs font-bold transition-all flex justify-between items-center ${activeState === 'gas' ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-extrabold' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  <span>💨 غاز (Gas)</span>
                  <span className="text-[10px] text-slate-500 font-sans">فوران منتشر حركي وتصادم تام</span>
                </button>
              </div>
            </div>

            {/* تلميح وتفسير مجهري فوري */}
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-150 rounded-2xl text-[11px] text-indigo-950 leading-relaxed font-semibold">
              <span className="block font-black text-xs text-indigo-950 mb-1">💡 تفسير الحالة الحالية:</span>
              {activeState === 'solid' && (
                <p>لاحظ ترابط ذرات وجزيئات <b>{activeElement === 'neon' ? 'النيون' : activeElement === 'argon' ? 'الأرجون' : 'الماء'}</b> بشكل رصين. إنها قريبة جداً وقوى التجالب تمنعها من الانفلات، فقط تملك اهتزازات موضعية بسيطة تشتد طردياً برفع الحرارة.</p>
              )}
              {activeState === 'liquid' && (
                <p>تحررت الجزيئات جزئياً بفعل الطاقة الحرارية وتنزلق وتتدحرج عشوائياً بأسفل الوعاء متخذة شكل قراره، مع بقائها في تماسك متقارب نسبي يمنعها من الانتشار المطلق.</p>
              )}
              {activeState === 'gas' && (
                <p>تطاير حر فائق! تلاشت قوى التماسك تماماً، والمسافات البينية شاسعة جداً. لاحظ كيف تنضغط جزيئات الغاز بالوعاء وتصطدم بالجدران لتعكس قانون الضغط الميكانيكي العام.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. كتاب الأرصاد والأنشطة (ورقة العمل التقييمية) */}
      {currentTab === 'activities' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-black text-indigo-900">📝 كتاب ومفرزة الأرصاد العملية - النظرية الحركية</h4>
            <p className="text-xs text-slate-500 leading-relaxed">أثبت قدرتك البحثية المجهرية وسجل أرصادك الدقيقة حول ما رصدته في لوحة المحاكاة لإرسال التقرير للمعلم وكسب 30 نقطة علمية.</p>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            {/* السؤال الأول */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <span className="block text-indigo-950">السؤال الأول 📝: ما هو السلوك الحركي والترتيبي العام للجزيئات في الحالة الصلبة (نيون عند 14 كلفن)؟</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs1" value="اهتزازية" checked={obs1 === 'اهتزازية'} onChange={(e) => setObs1(e.target.value)} />
                  <span>أ) اهتزازية مقيدة في مواضعها الثابتة</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs1" value="حرة" checked={obs1 === 'حرة'} onChange={(e) => setObs1(e.target.value)} />
                  <span>ب) حرة سريعة جداً تملأ الوعاء تلقائياً</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs1" value="منحلة" checked={obs1 === 'منحلة'} onChange={(e) => setObs1(e.target.value)} />
                  <span>ج) سريعة الانحلال ودائمة الانضغاط والتبخر</span>
                </label>
              </div>
            </div>

            {/* السؤال الثاني */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <span className="block text-indigo-950">السؤال الثاني 📝: كيف تؤثر عملية التسخين المستمر والتزويد بالطاقة الحرارية في سرعة جسيمات غاز الأرجون وضغط الإناء؟</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs2" value="تقلل" checked={obs2 === 'تقلل'} onChange={(e) => setObs2(e.target.value)} />
                  <span>أ) تقلل السرعة وتخفض وتيرة التصادم والضغط</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs2" value="تزيد" checked={obs2 === 'تزيد'} onChange={(e) => setObs2(e.target.value)} />
                  <span>ب) تزيد من متوسط سرعة جزيئاتها ووتيرة وقوة التصادم والضغط المولد</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs2" value="لا_تؤثر" checked={obs2 === 'لا_تؤثر'} onChange={(e) => setObs2(e.target.value)} />
                  <span>ج) تظل السرعة والاهتزازات والضغط ثوابت دون تأثر</span>
                </label>
              </div>
            </div>

            {/* السؤال الثالث */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <span className="block text-indigo-950">السؤال الثالث 📝: لِمَ تتميز المواد الغازية بقابلية كبرى وشديدة للانضغاط مقارنة بالصلبة والسوائل مجهرياً؟</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs3" value="تراص" checked={obs3 === 'تراص'} onChange={(e) => setObs3(e.target.value)} />
                  <span>أ) لأن ذراتها متراصة بلورياً وهندسياً بقوى شديدة</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs3" value="مسافات" checked={obs3 === 'مسافات'} onChange={(e) => setObs3(e.target.value)} />
                  <span>ب) لوجود مسافات بينية شاسعة جداً تفصل ذرات الغاز المبتعدة بملء الفراغ</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
                  <input type="radio" name="obs3" value="مرونة" checked={obs3 === 'مرونة'} onChange={(e) => setObs3(e.target.value)} />
                  <span>ج) لأن الجسيمات تملك أحجاماً لينة تتمدد وتنكمش بالحرارة</span>
                </label>
              </div>
            </div>

            {activityFeedback && (
              <div className={`p-4 rounded-xl text-xs font-bold leading-relaxed ${activityStatus === 'correct' ? 'bg-emerald-50 border border-emerald-150 text-emerald-800' : 'bg-rose-50 border border-rose-150 text-rose-800'}`}>
                {activityFeedback}
              </div>
            )}

            <button
              onClick={checkActivities}
              disabled={activityStatus === 'correct'}
              className={`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 text-xs text-white transition-all shadow-md ${activityStatus === 'correct' ? 'bg-emerald-600 cursor-not-allowed shadow-none' : 'bg-indigo-900 hover:bg-indigo-800 active:scale-95'}`}
            >
              <CheckCircle className="w-4 h-4" /> تسجيل الأرصاد ومطابقة التقرير العملي
            </button>
          </div>
        </div>
      )}

      {/* 3. آلة السرعات الجزيئية والديناميكا الحرارية كلكولتير */}
      {currentTab === 'calculator' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-black text-indigo-900">🧮 حاسبة متوسط السرعة الجزيئية RMS للغازات المثالية</h4>
            <p className="text-xs text-slate-500 leading-relaxed">توقع سرعة ترحال جسيمات غازات الكون واحسب طاقة حركتها علمياً بتبديل دراجات السخونة الكونية المطلقة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed text-xs">
            {/* اللوح الأيسر: الإعداد الفوري والمتحكم الفوري */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <span className="font-extrabold text-xs text-indigo-950 block">🎛️ متحكم تجربة الحاسبة الحرارية:</span>
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-[11px]">
                  <span>درجة الحرارة المستهدفة T:</span>
                  <span className="text-indigo-900">{calcTemp} كلفن ({(calcTemp - 273.15).toFixed(1)}°C)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  value={calcTemp}
                  onChange={(e) => setCalcTemp(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* القوانين المطبقة علمياً */}
              <div className="p-3.5 bg-indigo-50/50 rounded-xl space-y-2 text-[10px] text-slate-700 font-semibold">
                <p className="font-bold text-indigo-900">🔬 القوانين الفيزيائية المطبقة بالحاسبة:</p>
                <p>1. السرعة جذر متوسط التربيع (RMS Speed):<br />
                  <strong className="font-mono text-[11px] block mt-0.5 text-center bg-white p-1 rounded border">v_rms = √ ( 3 · R · T / M )</strong>
                </p>
                <p>2. متوسط طاقة الحركة للجسيم المنفرد (K.E avg):<br />
                  <strong className="font-mono text-[11px] block mt-0.5 text-center bg-white p-1 rounded border">K.E_avg = (3 / 2) · k_B · T</strong>
                </p>
                <div className="text-[9px] text-slate-500 space-y-0.5 mt-2">
                  <p>• R (ثابت الغازات العام) = 8.314 J/(mol·K)</p>
                  <p>• M (الكتلة المولية بالكجم)</p>
                  <p>• k_B (ثابت بولتزمان) = 1.38 × 10⁻²³ J/K</p>
                </div>
              </div>
            </div>

            {/* اللوح الأيمن: بطاقة النتائج الفورية لشتى الغازات */}
            <div className="space-y-3">
              <span className="font-extrabold text-xs text-slate-500 block">📊 جدول الرصد الميكانيكي المستنتج للغازات الثلاثة:</span>
              
              {Object.entries(molarMasses).map(([elemKey, massKg]) => {
                const vel = calcSpeedRMS(massKg, calcTemp);
                const isWater = elemKey === 'water';
                const isArgon = elemKey === 'argon';
                const elColor = isWater ? 'bg-sky-50 border-sky-200 text-sky-950' : isArgon ? 'bg-purple-50 border-purple-200 text-purple-950' : 'bg-rose-50 border-rose-200 text-rose-950';
                return (
                  <div key={elemKey} className={`p-4 rounded-xl border ${elColor} space-y-2`}>
                    <div className="flex justify-between items-center font-bold">
                      <span>🧪 {namesAr[elemKey as 'neon' | 'argon' | 'water']} ({elemKey.toUpperCase()})</span>
                      <span className="font-mono text-[10px] text-slate-500">M = {(massKg * 1000).toFixed(2)} g/mol</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="block text-slate-500">سرعة الجزيئات المقدرة (v_rms):</span>
                        <strong className="font-mono text-xs">{vel.toFixed(1)} م/ث</strong>
                      </div>
                      <div>
                        <span className="block text-slate-500">متوسط طاقة الحركة للهياكل:</span>
                        <strong className="font-mono text-xs">{(calcAvgEnergy(calcTemp) * 1e21).toFixed(3)} × 10⁻²¹ J</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




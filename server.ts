import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // ==================== 1. المساعد المنهجي الذكي للفيزياء (Gemini API Proxy) ====================
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "الرجاء إدخال نص الرسالة الاستفسارية." });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "تنبيه: مفتاح الـ Gemini API غير متوفر في المتصفح أو في ملفات الخادم الأمنية (.env). يرجى التأكد من تهيئته عبر لوحة الإعدادات (Settings > Secrets) بالمنصة ليعمل المساعد الذكي."
        });
      }

      // تهيئة العميل الموصى بها ميثودولوجياً للمنصة
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // توجيهات النظام الفيزيائية الدقيقة لدعم المنهج اليمني والعربي والتربوي الإيماني
      const systemInstruction = 
        "أنت 'المساعد الفيزيائي المنهجي الذكي' لمنصة المرجع المطور في الفيزياء، التي يشرف عليها الأستاذ القدير سياف الشباطي في اليمن.\n" +
        "مهمتك هي الإجابة عن أسئلة ومسائل طلاب الثانوية العامة (الصف الأول والثاني والثالث الثانوي) بشكل متميز ومطابق للمفاهيم المنهجية اليمنية والعربية.\n" +
        "اتبع دائماً الاستراتيجية التالية لتقديم الفائدة العظمى:\n" +
        "1. حدد بدقة القانون الفيزيائي المطلوب، واكتبه بترميز واضح ومعروف للطلاب العرب (مثل القوة F، الكتلة m، التسارع a، السرعة v، الطاقة E، ثابت الجذب العام G).\n" +
        "2. بسط الشرح على هيئة نقاط مرتبة متسلسلة لعدم تشتيت الطالب.\n" +
        "3. عند حل المسائل الفنية، وضح معطيات المسألة أولاً، ثم القانون، ثم خطوات التعويض الرياضي بالتفصيل، وأخيراً لا تنسَ كتابة وحدة القياس الأساسية (مثل m/s², Joule, Newton).\n" +
        "4. **مبدأ المرجعية الإيمانية**: اربط دائماً في نهاية كل تفسير فيزيائي هذا التناسق والانسجام بعظمة الله تعالى، وبديع صنعه في تسيير الكون وحكمته اللامحدودة (مثال: نرى في الجاذبية تماسك الأجرام لحكمة إجرائها في فلك محدد)، لترسيخ البعد العلمي العقدي المتميز للمنصة.\n" +
        "5. تحدث بلسان علمي عربي دافئ، وقور، ومعلم ناصح يدعم عقول الطلاب ويدفعهم للتفوق الدراسي والابتكار والتجارب المنزلية الآمنة.";

      // صياغة محادثات للشركة والـ SDK الحديثة
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((msg: any) => {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      // استدعاء النموذج الفلاشي الذكي للمهام النصية والأسئلة السريعة وعالية الكفاءة
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini Assistant Failure:", err);
      return res.status(500).json({
        error: `عذراً! واجه المساعد عائقاً تقنياً أثناء التفكير: ${err.message || err}`
      });
    }
  });

  // ==================== 2. تهيئة وتكامل خادم الـ Vite والبيئة المحيطة ====================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("⚡ Vite development middleware loaded successfully.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("📦 Serving production static folder from /dist");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Smart Physics Platform server initialized on: http://localhost:${PORT}`);
  });
}

startServer();

# 🧠 الذاكرة التأسيسية للمشروع (Project Mandates)

هذا الملف يحتوي على القواعد والاتفاقيات البرمجية التي تم تأسيسها للمشروع، ويجب الالتزام بها في أي تطوير مستقبلي.

## 🏛️ الهيكل البرمجي (Architecture)
- **Pattern**: Controller-Service-Model.
- **Services**: يجب وضع كل منطق العمل (Business Logic) في الـ Services لضمان قابلية الاختبار.
- **Controllers**: وظيفتها فقط استقبال الطلب وتمريره للـ Service وإرجاع الرد.

## 🛡️ معايير الأمان (Security Standards)
- **Validation**: استخدام Zod بشكل صارم (`.strict()`) مع تفعيل الـ `sanitizeString` لمنع XSS.
- **Rate Limiting**: استخدام نظام محددات المعدل الموزعة (`rateLimiter.ts`):
    - `authLimiter`: للمسارات الحساسة.
    - `generalLimiter`: للاستخدام العام.
    - `apiActionLimiter`: للعمليات الكثيفة.
- **Database**: تفعيل الـ `timestamps` و `select: false` للحقول الحساسة في الـ Models.

## 🌐 التدويل (Internationalization - i18n)
- **Namespaces**: يتم تقسيم الترجمات إلى ملفات منفصلة (`auth`, `admin`, `errors`, `common`).
- **Error Handling**: أي خطأ يتم إلقاؤه يجب أن يستخدم مفتاح الترجمة (Key) مع النطاق الخاص به (مثل: `auth:invalid_credentials`).

## 📝 السجلات والتوثيق (Logging & Docs)
- **Winston**: هو المسجل المعتمد. لا تستخدم `console.log` في الإنتاج؛ يتم حجبها تلقائياً وتوجيهها للملفات عبر `setupProductionSecurity`.
- **Swagger**: يجب توثيق أي مسار جديد فور إنشائه، مع إضافة معامل اللغة `LanguageHeader`.

## 🚀 النشر (Deployment)
- **Workflow**: يتم النشر عبر سكربت `fast-deploy.sh` لضمان عمل الـ Build قبل الرفع.
- **Environment**: يجب تحديث `.env.example` عند إضافة أي متغير بيئة جديد.

---
**المستندات التفصيلية المرجعية:**
- `MASTER_BLUEPRINT.md`: المخطط الشامل للمشروع.
- `DEPLOYMENT_GUIDE.md` & `RENDER_SETUP_FREE.md`: أدلة الرفع.
- `EMAIL_VERIFICATION_GUIDE.md`: دليل نظام التفعيل.

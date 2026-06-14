# 🚀 دليل نشر الـ API على Vercel (Vercel Deployment Guide)

يوضح هذا الدليل الخطوات التفصيلية لنشر مشروع الـ Backend (Express + TypeScript) الخاص بـ Crafts Platform كـ API نشط على منصة Vercel.

## 1. الملفات الأساسية المطلوبة
لضمان عمل المشروع، تأكد من وجود الملفات التالية في المجلد الرئيسي للـ `server`:
- **`vercel.json`**: (تم إنشاؤه) يخبر Vercel بكيفية التعامل مع كود Node.js وتوجيه المسارات.
- **`.npmrc`**: (تم إنشاؤه) يحتوي على `legacy-peer-deps=true` لتجنب مشاكل تعارض المكتبات.
- **`package.json`**: يجب أن يحتوي على أمر `build`.

---

## 2. إعدادات المشروع على Vercel (Project Settings)

عند إضافة المشروع لأول مرة على Vercel، تأكد من ضبط الإعدادات التالية في قسم **Build & Development Settings**:

| الإعداد | القيمة |
| :--- | :--- |
| **Framework Preset** | اختر **Other** |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

---

## 3. متغيرات البيئة (Environment Variables)

يجب إضافة كافة القيم الموجودة في ملف `.env` إلى إعدادات Vercel لتتمكن قاعدة البيانات والتوكنات من العمل. 
انتقل إلى **Settings > Environment Variables** وأضف الآتي:

1.  `MONGO_URI`: رابط قاعدة بيانات MongoDB (يفضل استخدام MongoDB Atlas).
2.  `JWT_SECRET`: كود التشفير الخاص بالتوكن.
3.  `SECRET_KEY`: مفتاح التشفير الإضافي.
4.  `ADMIN_ROLE` / `BUYER_ROLE` / `ARTISAN_ROLE`: مفاتيح الأدوار السرية.
5.  `SMTP_HOST` / `SMTP_PORT` ... إلخ: إعدادات البريد الإلكتروني.
6.  `NODE_ENV`: قم بتعيينها كـ `production`.
7.  `SWAGGER_SERVER_URL`: رابط المشروع على Vercel (مثلاً: `https://your-app.vercel.app`).

---

## 4. خطوات النشر (Deployment Steps)

1.  قم بعمل **Push** لجميع التعديلات إلى مستودع GitHub الخاص بك.
2.  ادخل إلى حسابك في [Vercel](https://vercel.com).
3.  اضغط على **Add New > Project**.
4.  اختر المستودع (Repository) الخاص بك.
5.  قم بضبط الإعدادات المذكورة في الخطوة (2) وإضافة المتغيرات في الخطوة (3).
6.  اضغط على **Deploy**.

---

## 5. حل المشكلات الشائعة (Troubleshooting)

### أ- ظهور خطأ 404 عند طلب المسارات:
- **السبب**: Vercel يتعامل مع المشروع كموقع ثابت.
- **الحل**: تأكد من وجود ملف `vercel.json` في المجلد الرئيسي للـ server وقم بعمل Push له.

### ب- فشل عملية Build (Module not found):
- **السبب**: تعارض في إصدارات المكتبات أو عدم وجود حزم أساسية.
- **الحل**: تأكد من وجود ملف `.npmrc` وتأكد من أن إصدار `eslint` في `package.json` هو الإصدار 9.

### ج- خطأ في الاتصال بقاعدة البيانات:
- **السبب**: لم يتم السماح لـ Vercel بالوصول إلى MongoDB Atlas.
- **الحل**: اذهب إلى MongoDB Atlas واضف `0.0.0.0/0` في الـ **Network Access** (للسماح بالاتصال من أي مكان).

---

## 💡 ملاحظات هامة:
*   Vercel يعمل بنظام **Serverless Functions**، لذا قد تلاحظ تأخراً بسيطاً (Cold Start) عند أول طلب بعد فترة خمول.
*   تأكد دائماً من تحديث الـ `SWAGGER_SERVER_URL` ليكون متوافقاً مع رابط Vercel الجديد لكي يعمل التوثيق بشكل صحيح.

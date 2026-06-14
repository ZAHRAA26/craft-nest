# دليل رفع وتشغيل المشروع (Deployment Guide)

يوضح هذا الدليل كيفية رفع المشروع على منصات مجانية وضمان تحديثه تلقائياً.

## 1. المتطلبات الأساسية
- حساب على [GitHub](https://github.com).
- حساب على [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (لقاعدة البيانات).
- حساب على [Render](https://render.com) أو [Railway](https://railway.app) (لاستضافة الكود).

## 2. إعداد قاعدة البيانات (MongoDB Atlas)
1. قم بإنشاء Cluster مجاني.
2. في قسم **Database Access**، قم بإنشاء مستخدم بكلمة مرور قوية.
3. في قسم **Network Access**، أضف العنوان `0.0.0.0/0` (للسماح بالاتصال من أي مكان مؤقتاً).
4. انسخ رابط الاتصال (Connection String) لاستخدامه في متغيرات البيئة.

## 3. رفع الكود على GitHub
1. قم بإنشاء مستودع (Repository) جديد.
2. ارفع الكود الخاص بك:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [YOUR_REPO_URL]
   git push -u origin main
   ```

## 4. الربط مع منصة الاستضافة (Render كمثال)
1. قم بتسجيل الدخول إلى **Render** واربط حسابك بـ GitHub.
2. اختر **New > Web Service**.
3. اختر المستودع الخاص بالمشروع.
4. الإعدادات المطلوبة:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. أضف متغيرات البيئة (Advanced > Environment Variables) من ملف `.env.example`:
   - `MONGO_URI`: (رابط MongoDB Atlas)
   - `JWT_SECRET`: (سلسلة نصية عشوائية قوية)
   - `PORT`: 10000 (أو القيمة الافتراضية للمنصة)
   - إعدادات الـ SMTP (للبريد الإلكتروني).

## 5. التحديث التلقائي (Continuous Deployment)
بمجرد ربط Render بـ GitHub، سيقوم Render تلقائياً بإعادة بناء (Build) ورفع (Deploy) المشروع في كل مرة تقوم فيها بعمل `git push` لفرع `main`.

## 6. نصائح للمستقبل
- استخدم خدمة مثل [UptimeRobot](https://uptimerobot.com) لإبقاء الخدمة المجانية مستيقظة (بما أن المنصات المجانية قد تدخل في وضع النوم عند عدم الاستخدام).
- تأكد من عدم رفع ملف `.env` أبداً إلى GitHub (موجود بالفعل في `.gitignore`).

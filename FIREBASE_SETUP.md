# 🔥 دليل إعداد Firebase

دليل شامل لإعداد Firebase مع تطبيق مشتل

## لماذا Firebase؟

Firebase يوفر:
- 🔐 نظام مصادقة آمن
- 💾 قاعدة بيانات في الوقت الفعلي
- 📁 تخزين الصور والملفات
- 🔔 إشعارات فورية
- 📊 تحليلات الاستخدام

## الخطوة 1: إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اضغط على "إضافة مشروع" (Add Project)
3. أدخل اسم المشروع: `mashtl-app`
4. (اختياري) فعّل Google Analytics
5. اضغط على "إنشاء المشروع"

## الخطوة 2: إضافة تطبيق ويب

1. في صفحة المشروع، اضغط على أيقونة الويب `</>`
2. أدخل اسم التطبيق: `Mashtl Web App`
3. (اختياري) فعّل Firebase Hosting
4. اضغط على "تسجيل التطبيق"
5. **انسخ معلومات الاتصال** (API Keys)

## الخطوة 3: نسخ معلومات الاتصال

ستحصل على كود مشابه لهذا:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "mashtl-app.firebaseapp.com",
  projectId: "mashtl-app",
  storageBucket: "mashtl-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## الخطوة 4: إضافة البيانات إلى .env

1. انسخ ملف `.env.example` إلى `.env`:
```bash
cp .env.example .env
```

2. افتح ملف `.env` وأضف بياناتك:
```env
FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FIREBASE_AUTH_DOMAIN=mashtl-app.firebaseapp.com
FIREBASE_PROJECT_ID=mashtl-app
FIREBASE_STORAGE_BUCKET=mashtl-app.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

## الخطوة 5: إعداد Authentication

1. في Firebase Console، اذهب إلى **Authentication**
2. اضغط على "البدء" (Get Started)
3. في تبويب "Sign-in method":
   - اضغط على "Email/Password"
   - فعّل "Enable"
   - احفظ التغييرات

## الخطوة 6: إعداد Firestore Database

1. في Firebase Console، اذهب إلى **Firestore Database**
2. اضغط على "إنشاء قاعدة بيانات" (Create Database)
3. اختر موقع القاعدة: `europe-west1` (أو الأقرب)
4. اختر وضع **Production mode** (أكثر أماناً)
5. اضغط على "إنشاء"

### إعداد القواعد (Rules)

في تبويب "Rules"، أضف هذه القواعد:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة للجميع
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // السماح للمستخدم بقراءة وكتابة بياناته فقط
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // السماح بالمحادثات للمستخدمين المصرح لهم
    match /chats/{chatId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## الخطوة 7: إعداد Storage

1. في Firebase Console، اذهب إلى **Storage**
2. اضغط على "البدء" (Get Started)
3. اقبل القواعد الافتراضية
4. اضغط على "تم"

### إعداد قواعد Storage

في تبويب "Rules"، أضف:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024  // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## الخطوة 8: (اختياري) إعداد Google Maps

لعرض الخرائط في التطبيق:

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو اختر مشروع Firebase
3. فعّل **Maps SDK for Android** و **Maps SDK for iOS**
4. أنشئ API Key
5. أضف القيد (Restriction) للـ API Key:
   - Application restrictions: Android apps / iOS apps
   - API restrictions: Maps SDK
6. أضف الـ API Key في ملف `.env`:
```env
GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## الخطوة 9: إنشاء هيكل البيانات

### إنشاء Collection للمنتجات

في Firestore Database:
1. اضغط على "Start collection"
2. اسم الـ Collection: `products`
3. أضف Document تجريبي:
   - Document ID: Auto-ID
   - Fields:
     ```
     title: "شجرة زيتون"
     description: "شجرة زيتون عمرها 3 سنوات"
     price: 150
     category: "trees"
     sellerId: "demo-user-id"
     sellerName: "أحمد محمود"
     sellerRating: 4.5
     images: ["https://example.com/image.jpg"]
     createdAt: timestamp (now)
     ```

### إنشاء Collection للمستخدمين

1. اضغط على "Start collection"
2. اسم الـ Collection: `users`
3. سيتم إنشاء المستخدمين تلقائياً عند التسجيل

## الخطوة 10: اختبار الاتصال

1. أعد تشغيل التطبيق:
```bash
npm start -- --clear
```

2. حاول التسجيل بحساب جديد
3. تحقق من Firebase Console:
   - Authentication → Users (يجب أن ترى المستخدم الجديد)
   - Firestore → users (يجب أن ترى بيانات المستخدم)

## المشاكل الشائعة

### خطأ: "Firebase is not defined"
**الحل**: تأكد من تثبيت Firebase:
```bash
npm install firebase
```

### خطأ: "Permission denied"
**الحل**: تحقق من قواعد Firestore وتأكد من تسجيل الدخول

### خطأ: "API key not valid"
**الحل**: تحقق من صحة API Key في ملف `.env`

### خطأ: "Network request failed"
**الحل**: تأكد من الاتصال بالإنترنت

## الأمان

⚠️ **مهم جداً**:

1. **لا تشارك ملف `.env`** في Git
2. **لا تنشر API Keys** علناً
3. **استخدم قواعد Firestore** لحماية البيانات
4. **فعّل App Check** لحماية من الهجمات
5. **راقب الاستخدام** في Firebase Console

## الترقية إلى خطة مدفوعة

الخطة المجانية (Spark) تشمل:
- ✅ 50,000 قراءة/يوم
- ✅ 20,000 كتابة/يوم
- ✅ 1 GB تخزين
- ✅ 10 GB نقل بيانات/شهر

للتطبيقات الكبيرة، قد تحتاج إلى خطة Blaze (الدفع حسب الاستخدام)

## الموارد المفيدة

- 📖 [Firebase Documentation](https://firebase.google.com/docs)
- 🎓 [Firebase for React Native](https://rnfirebase.io/)
- 💬 [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
- 🐛 [Firebase Support](https://firebase.google.com/support)

---

**نصيحة**: احتفظ بنسخة احتياطية من بيانات Firebase بانتظام!

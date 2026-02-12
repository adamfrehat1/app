# 🔧 دليل حل المشاكل

دليل شامل لحل المشاكل الشائعة في تطبيق مشتل

## مشاكل التثبيت

### ❌ خطأ: `npm install` فشل

**الأعراض:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**الحلول:**
1. احذف مجلد `node_modules` و `package-lock.json`:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. استخدم `--legacy-peer-deps`:
```bash
npm install --legacy-peer-deps
```

3. تحديث npm:
```bash
npm install -g npm@latest
```

### ❌ خطأ: Node.js version غير متوافق

**الحل:**
تثبيت Node.js 16 أو أحدث:
```bash
# للتحقق من النسخة الحالية
node --version

# تثبيت nvm لإدارة نسخ Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 16
nvm use 16
```

## مشاكل Expo

### ❌ خطأ: `expo command not found`

**الحل:**
```bash
npm install -g expo-cli
```

أو استخدم npx:
```bash
npx expo start
```

### ❌ خطأ: QR code لا يظهر

**الحلول:**
1. تأكد من تشغيل الأمر في مجلد المشروع
2. جرب استخدام tunnel mode:
```bash
expo start --tunnel
```

3. أعد تشغيل مع مسح الذاكرة:
```bash
expo start --clear
```

### ❌ خطأ: لا يمكن الاتصال بالتطبيق من الهاتف

**الحلول:**
1. تأكد من أن الهاتف والكمبيوتر على نفس الشبكة
2. استخدم tunnel mode:
```bash
expo start --tunnel
```

3. تحقق من جدار الحماية (Firewall)
4. أعد تشغيل Metro bundler:
```bash
expo start -c
```

## مشاكل Firebase

### ❌ خطأ: `Firebase is not defined`

**الحل:**
تأكد من تثبيت Firebase:
```bash
npm install firebase
```

### ❌ خطأ: `API key not valid`

**الأسباب والحلول:**

1. **API Key خاطئ في `.env`**
   - تحقق من Firebase Console
   - انسخ API Key بشكل صحيح

2. **ملف `.env` غير موجود**
   ```bash
   cp .env.example .env
   # ثم عدّل القيم
   ```

3. **Firebase Project غير مفعّل**
   - تحقق من Firebase Console
   - تأكد من تفعيل المشروع

### ❌ خطأ: `Permission denied` في Firestore

**الحل:**
عدّل قواعد Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // للتطوير فقط!
    }
  }
}
```

**⚠️ تحذير**: لا تستخدم هذه القواعد في الإنتاج!

### ❌ خطأ: `Network request failed`

**الحلول:**
1. تحقق من الاتصال بالإنترنت
2. تحقق من Firebase Project ID
3. تأكد من تفعيل Firestore في Firebase Console

## مشاكل RTL

### ❌ النصوص العربية تظهر من اليسار

**الحل:**
أضف هذا الكود في بداية App.js:
```javascript
import { I18nManager } from 'react-native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
```

ثم أعد تشغيل التطبيق:
```bash
expo start -c
```

### ❌ الأيقونات في المكان الخطأ

**الحل:**
استخدم `flexDirection: 'row-reverse'` في styles

## مشاكل الصور

### ❌ الصور لا تظهر

**الأسباب والحلول:**

1. **URL خاطئ**
   - تحقق من رابط الصورة
   - استخدم HTTPS فقط

2. **أذونات الصور**
   ```javascript
   // في AddProductScreen.js
   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
   if (status !== 'granted') {
     Alert.alert('نحتاج إلى إذن للوصول إلى الصور');
   }
   ```

3. **حجم الصورة كبير جداً**
   - ضغط الصور قبل الرفع
   - استخدم quality parameter:
   ```javascript
   launchImageLibraryAsync({
     quality: 0.8
   })
   ```

### ❌ خطأ: `Image upload failed`

**الحل:**
تحقق من Firebase Storage rules:
```javascript
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## مشاكل الموقع والخرائط

### ❌ الخريطة لا تظهر

**الحلول:**

1. **أضف Google Maps API Key**:
   في `.env`:
   ```env
   GOOGLE_MAPS_API_KEY=your_key_here
   ```

2. **فعّل Maps SDK**:
   - اذهب إلى Google Cloud Console
   - فعّل Maps SDK for Android
   - فعّل Maps SDK for iOS

3. **للـ iOS**:
   أضف في `Info.plist`:
   ```xml
   <key>NSLocationWhenInUseUsageDescription</key>
   <string>نحتاج موقعك لعرض المنتجات القريبة</string>
   ```

### ❌ خطأ: `Location permissions denied`

**الحل:**
اطلب الأذونات بشكل صحيح:
```javascript
const { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('نحتاج إلى إذن للوصول إلى الموقع');
}
```

## مشاكل الأداء

### ❌ التطبيق بطيء

**الحلول:**

1. **استخدم FlatList بدلاً من ScrollView**:
```javascript
<FlatList
  data={products}
  renderItem={renderProduct}
  keyExtractor={item => item.id}
/>
```

2. **قلل حجم الصور**:
```javascript
<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  resizeMode="cover"
/>
```

3. **استخدم useMemo**:
```javascript
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === selectedCategory);
}, [products, selectedCategory]);
```

### ❌ استهلاك الذاكرة عالي

**الحلول:**
1. نظف المستمعين (listeners) في useEffect:
```javascript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    // ...
  });
  return unsubscribe; // مهم!
}, []);
```

2. استخدم pagination للمنتجات

## مشاكل Build

### ❌ خطأ: `Build failed` على Android

**الحلول:**
1. نظف build cache:
```bash
cd android
./gradlew clean
cd ..
expo start -c
```

2. تحقق من Android SDK:
```bash
echo $ANDROID_HOME
```

### ❌ خطأ: `Build failed` على iOS

**الحلول:**
1. تثبيت pods:
```bash
cd ios
pod install
cd ..
```

2. تنظيف Xcode build:
```bash
rm -rf ios/build
```

## مشاكل المصادقة

### ❌ لا يمكن تسجيل الدخول

**الحلول:**

1. **تحقق من Firebase Auth**:
   - افتح Firebase Console
   - Authentication → Sign-in methods
   - تأكد من تفعيل Email/Password

2. **تحقق من البيانات المدخلة**:
   - Email صحيح؟
   - كلمة المرور 6 أحرف على الأقل؟

3. **تحقق من الشبكة**:
   - هل الإنترنت متصل؟
   - هل Firebase accessible؟

### ❌ خطأ: `User not found`

**الحل:**
المستخدم غير مسجل. استخدم شاشة التسجيل أولاً.

## مشاكل عامة

### ❌ Red screen of death

**الحل:**
اقرأ رسالة الخطأ بعناية:
1. اسم الملف
2. رقم السطر
3. نوع الخطأ

ثم صحح الخطأ وأعد التشغيل.

### ❌ Yellow warnings

**للتجاهل (مؤقتاً)**:
```javascript
console.disableYellowBox = true; // في App.js
```

**للحل**:
عالج كل warning على حدة

### ❌ التطبيق يتجمد (Freeze)

**الحلول:**
1. تحقق من console للأخطاء
2. أعد تشغيل Metro bundler
3. أعد تشغيل Expo Go
4. أعد تشغيل الجهاز

## الحصول على المساعدة

### سجلات الأخطاء (Logs)

**React Native Debugger**:
```bash
# في Chrome DevTools
chrome://inspect
```

**Expo Logs**:
```bash
expo start
# ثم اضغط 'd' لفتح developer menu
```

### الإبلاغ عن الأخطاء

عند طلب المساعدة، قدم:
1. **وصف المشكلة**
2. **خطوات إعادة الإنتاج**
3. **رسالة الخطأ كاملة**
4. **لقطة شاشة**
5. **نوع الجهاز**:
   - Android / iOS
   - نسخة النظام
   - نسخة التطبيق

### موارد مفيدة

- 📖 [Expo Documentation](https://docs.expo.dev/)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- 🐛 [GitHub Issues](https://github.com/adamfrehat1/app/issues)
- 💡 [React Native Community](https://www.reactnative.dev/community/overview)

## نصائح عامة

1. ✅ **اقرأ رسائل الخطأ بعناية**
2. ✅ **استخدم Google للبحث عن الحلول**
3. ✅ **جرب الحلول واحداً تلو الآخر**
4. ✅ **احتفظ بنسخة احتياطية قبل التغييرات الكبيرة**
5. ✅ **استخدم Git لتتبع التغييرات**

---

**ملاحظة**: إذا لم تجد حلاً لمشكلتك، لا تتردد في فتح Issue على GitHub!

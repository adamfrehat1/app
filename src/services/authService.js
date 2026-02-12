import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const authService = {
  // تسجيل مستخدم جديد
  register: async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // تحديث الاسم في الملف الشخصي
      await updateProfile(user, {
        displayName: userData.name
      });
      
      // حفظ بيانات المستخدم في Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        email: email,
        phone: userData.phone || '',
        location: userData.location || '',
        createdAt: new Date().toISOString(),
        rating: 0,
        totalRatings: 0,
        isExpert: false
      });
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // تسجيل الدخول
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // تسجيل الخروج
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // الحصول على بيانات المستخدم
  getUserData: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      }
      return { success: false, error: 'المستخدم غير موجود' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

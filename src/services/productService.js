import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  query, 
  where, 
  orderBy,
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

export const productService = {
  // إضافة منتج جديد
  addProduct: async (productData, images) => {
    try {
      // رفع الصور
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const response = await fetch(images[i].uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `products/${Date.now()}_${i}.jpg`);
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }

      // حفظ بيانات المنتج
      const product = {
        ...productData,
        images: imageUrls,
        createdAt: new Date().toISOString(),
        views: 0,
        favorites: 0
      };

      const docRef = await addDoc(collection(db, 'products'), product);
      return { success: true, productId: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // الحصول على جميع المنتجات
  getAllProducts: async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'products'), orderBy('createdAt', 'desc'))
      );
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // الحصول على منتجات حسب الفئة
  getProductsByCategory: async (category) => {
    try {
      const q = query(
        collection(db, 'products'), 
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // الحصول على منتج واحد
  getProduct: async (productId) => {
    try {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // زيادة عدد المشاهدات
        await updateDoc(docRef, {
          views: (docSnap.data().views || 0) + 1
        });
        return { success: true, product: { id: docSnap.id, ...docSnap.data() } };
      }
      return { success: false, error: 'المنتج غير موجود' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // البحث في المنتجات
  searchProducts: async (searchTerm) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.description?.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          products.push({ id: doc.id, ...data });
        }
      });
      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

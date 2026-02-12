// فئات المنتجات
export const CATEGORIES = [
  {
    id: 'trees',
    name: 'أشجار ونباتات',
    icon: 'tree',
    emoji: '🌳'
  },
  {
    id: 'seeds',
    name: 'بذور',
    icon: 'sprout',
    emoji: '🌾'
  },
  {
    id: 'medicine',
    name: 'أدوية وأسمدة',
    icon: 'bottle-tonic-plus',
    emoji: '💊'
  },
  {
    id: 'tools',
    name: 'أدوات زراعية',
    icon: 'tools',
    emoji: '🔧'
  }
];

// نموذج بيانات وهمية للاختبار
export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    title: 'شجرة زيتون',
    description: 'شجرة زيتون عمرها 3 سنوات، صحية وقوية',
    price: 150,
    category: 'trees',
    location: { latitude: 31.9522, longitude: 35.9389, address: 'عمان، الأردن' },
    images: ['https://images.unsplash.com/photo-1584493291085-e894b3ba87e5?w=500'],
    sellerId: 'user1',
    sellerName: 'أحمد محمود',
    sellerRating: 4.5,
    createdAt: new Date().toISOString(),
    views: 45,
    favorites: 12
  },
  {
    id: '2',
    title: 'بذور طماطم',
    description: 'بذور طماطم عضوية عالية الجودة، إنتاج محلي',
    price: 25,
    category: 'seeds',
    location: { latitude: 31.9539, longitude: 35.9106, address: 'عمان، الأردن' },
    images: ['https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500'],
    sellerId: 'user2',
    sellerName: 'فاطمة علي',
    sellerRating: 5.0,
    createdAt: new Date().toISOString(),
    views: 67,
    favorites: 23
  },
  {
    id: '3',
    title: 'سماد عضوي',
    description: 'سماد عضوي طبيعي 100%، مناسب لجميع أنواع النباتات',
    price: 40,
    category: 'medicine',
    location: { latitude: 32.0151, longitude: 35.8729, address: 'الزرقاء، الأردن' },
    images: ['https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500'],
    sellerId: 'user3',
    sellerName: 'محمد حسن',
    sellerRating: 4.2,
    createdAt: new Date().toISOString(),
    views: 34,
    favorites: 8
  },
  {
    id: '4',
    title: 'مجرفة زراعية',
    description: 'مجرفة يدوية للحديقة، متينة وعملية',
    price: 15,
    category: 'tools',
    location: { latitude: 31.9454, longitude: 35.9284, address: 'عمان، الأردن' },
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'],
    sellerId: 'user1',
    sellerName: 'أحمد محمود',
    sellerRating: 4.5,
    createdAt: new Date().toISOString(),
    views: 28,
    favorites: 5
  }
];

// خبراء زراعيون نموذجيون
export const SAMPLE_EXPERTS = [
  {
    id: 'expert1',
    name: 'د. خالد الزراعي',
    specialty: 'أشجار مثمرة',
    rating: 4.8,
    experience: '15 سنة',
    price: 50,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    available: true
  },
  {
    id: 'expert2',
    name: 'م. سارة النبات',
    specialty: 'نباتات الزينة',
    rating: 4.9,
    experience: '10 سنوات',
    price: 45,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    available: true
  }
];

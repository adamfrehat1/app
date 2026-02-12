# 🌳 Mashtl - Agricultural Marketplace Mobile App

A modern React Native + Expo mobile application for buying and selling agricultural products, built with **Expo SDK 54**.

## 📱 Overview

Mashtl is an electronic marketplace that allows users to easily buy and sell agricultural products. The app includes:
- **Trees and Plants** 🌳
- **Seeds** 🌾
- **Medicines and Fertilizers** 💊
- **Agricultural Tools** 🔧

## ✨ Main Features

### For Users
- ✅ Secure login and registration
- ✅ Display all products on the home page
- ✅ Add new products with multiple images
- ✅ Search and filter by category
- ✅ View complete product details
- ✅ Rate sellers with stars ⭐
- ✅ Live chat between buyer and seller
- ✅ Book appointments with agricultural experts
- ✅ Feedback and complaints system
- ✅ View location on map
- ✅ Shopping cart functionality
- ✅ Order tracking and management
- ✅ Full Arabic interface with RTL support
- ✅ Dark mode support

### Technologies Used
- **Frontend**: React Native + Expo SDK 54
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Framework**: React Native Paper
- **Navigation**: React Navigation v7
- **Maps**: React Native Maps
- **Images**: Expo Image Picker
- **Location**: Expo Location
- **State Management**: React Context API

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** (version 16 or newer)
   ```bash
   node --version
   ```

2. **npm** or **yarn**
   ```bash
   npm --version
   ```

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Expo Go app** on your mobile device
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

## 🚀 Installation and Setup

### 1. Clone the project
```bash
git clone https://github.com/adamfrehat1/app.git
cd app
```

### 2. Install packages
```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app
4. Copy the credentials (API Keys)
5. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

6. Edit the `.env` file and add your Firebase credentials:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Console Setup

#### Authentication
1. In Firebase Console, go to **Authentication**
2. Enable **Email/Password** in Sign-in methods

#### Firestore Database
1. Go to **Firestore Database**
2. Create a new database
3. Choose Test mode for development

#### Storage
1. Go to **Storage**
2. Start setup
3. Modify rules to allow read and write (for development only)

### 5. Run the app

```bash
npm start
```

Or:

```bash
npx expo start
```

### 6. Open the app on your phone

1. Open **Expo Go** app on your phone
2. Scan the QR code shown in Terminal
3. Wait for the app to load

## 📱 Run on Emulator

### Android
```bash
npm run android
```
Make sure Android Studio is installed and emulator is configured

### iOS (Mac only)
```bash
npm run ios
```
Make sure Xcode is installed

## 🗂️ Project Structure

```
app/
├── src/
│   ├── config/
│   │   └── firebase.js          # Firebase configuration
│   ├── services/
│   │   ├── authService.js       # Authentication services
│   │   └── productService.js    # Product services
│   ├── screens/
│   │   ├── LoginScreen.js       # Login screen
│   │   ├── RegisterScreen.js    # Registration screen
│   │   ├── HomeScreen.js        # Home screen
│   │   ├── ProductListScreen.js # Product list screen
│   │   ├── ProductDetailsScreen.js # Product details screen
│   │   ├── AddProductScreen.js  # Add product screen
│   │   ├── CartScreen.js        # Shopping cart screen
│   │   ├── OrdersScreen.js      # Orders screen
│   │   ├── ChatScreen.js        # Chat screen
│   │   ├── ExpertBookingScreen.js # Expert booking screen
│   │   ├── FeedbackScreen.js    # Feedback screen
│   │   └── ProfileScreen.js     # Profile screen
│   ├── navigation/
│   │   └── AppNavigator.js      # Navigation configuration
│   ├── contexts/
│   │   ├── AuthContext.js       # Authentication state
│   │   └── CartContext.js       # Cart state
│   ├── components/
│   │   ├── ProductCard.js       # Reusable product card
│   │   └── LoadingScreen.js     # Loading component
│   └── utils/
│       ├── theme.js             # App colors and themes
│       └── constants.js         # Constants and demo data
├── assets/                      # Images and icons
├── App.js                       # Main entry point
├── app.json                     # Expo configuration
├── package.json                 # Packages and dependencies
├── .env.example                 # Environment file template
└── README.md                    # This file

```

## 🎨 Main Screens

### 1. Login / Registration Screen
- Secure login using email and password
- Create new account with data validation

### 2. Home Screen
- Display all products in grid
- Search bar to find products
- Filter by categories (trees, seeds, medicines, tools)
- Floating button to add new product

### 3. Product List Screen
- Filterable product list
- Sort options (price, date, rating)
- Product cards with images
- Add to cart button

### 4. Add Product Screen
- Add product title and description
- Set price and category
- Upload multiple images
- Set geographic location

### 5. Product Details Screen
- Display product images (multiple)
- Seller information and rating
- Location on map
- Buttons to contact seller

### 6. Cart Screen
- Cart items list
- Quantity adjusters
- Total price calculation
- Checkout button

### 7. Orders Screen
- Order history
- Order status tracking
- Order details view
- Reorder functionality

### 8. Chat Screen
- Live chat between buyer and seller
- Send and receive messages

### 9. Expert Booking Screen
- List of agricultural experts
- Select date and time
- Book consultation appointment

### 10. Feedback Screen
- Send feedback or complaints
- Choose message type
- Complete contact form

### 11. Profile Screen
- User information display
- Published products
- Favorites
- Settings (dark mode, notifications)

## 🔧 Demo Data

The app comes with demo data for testing in `src/utils/constants.js`:
- Sample products (4 products)
- Agricultural experts (2 experts)
- Product categories (4 categories)

## 🌍 Arabic Language Support (RTL)

The app fully supports Arabic language:
- Arabic user interface
- RTL (Right-to-Left) support
- All text in Arabic

## 🎨 Colors and Design

The app uses natural colors suitable for agricultural theme:
- **Primary Color**: Green (#4CAF50)
- **Secondary Color**: Brown (#8D6E63)
- **Light Background**: (#F5F5F5)
- Dark mode support

## 📝 Important Notes

### For Production
1. **Firebase Rules**: Modify Firestore and Storage rules to be more secure
2. **Images**: Replace placeholder images in `assets` folder with real images
3. **Data**: Replace demo data with real data from Firebase
4. **Keys**: Don't share `.env` file in Git

### For Development
- You can run the app without Firebase for initial testing
- Demo data is available in `constants.js`
- All screens work in demo mode

## 🐛 Troubleshooting

### Issue: RTL doesn't work correctly
```bash
# Restart the app
npx expo start --clear
```

### Issue: Firebase error
- Make sure `.env` data is correct
- Make sure Authentication and Firestore are enabled in Firebase Console

### Issue: Maps don't show
- Make sure Google Maps API Key is added in `.env`
- Make sure Maps API is enabled in Google Cloud Console

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available for free use.

## 📞 Contact

If you have any questions or inquiries, you can contact via:
- GitHub Issues
- Email

---

## Tech Stack Summary

- **Expo SDK**: ~54.0.0
- **React**: 19.1.0
- **React Native**: 0.81.5
- **React Navigation**: ^7.0.0
- **Firebase**: ^11.0.0
- **React Native Paper**: ^5.11.3

---

**Developed with ❤️ for the Arab agricultural community**

🌳 Mashtl - Plant the Future
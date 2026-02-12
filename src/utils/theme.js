import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// ألوان طبيعية للطابع الزراعي
const colors = {
  primary: '#4CAF50',      // أخضر
  secondary: '#8D6E63',    // بني
  tertiary: '#81C784',     // أخضر فاتح
  background: '#F5F5F5',   // رمادي فاتح
  surface: '#FFFFFF',      // أبيض
  error: '#D32F2F',        // أحمر
  success: '#4CAF50',      // أخضر
  warning: '#FFA726',      // برتقالي
  info: '#29B6F6',         // أزرق
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
  },
  roundness: 8,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.tertiary,
    secondary: colors.secondary,
    tertiary: colors.primary,
  },
  roundness: 8,
};

export default { lightTheme, darkTheme };

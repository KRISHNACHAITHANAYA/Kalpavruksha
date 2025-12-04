export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PredictionResult {
  id: string;
  isHealthy: boolean;
  diseaseType: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'N/A';
  confidence: number;
  treatment?: string;
  coordinates?: { latitude: number; longitude: number };
  placeName?: string;
  userId?: string;
  imageUrl: string;
  timestamp: string;
}

export interface Expert {
  name: string;
  address: string;
  phone: string;
  website?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app, never store plain text passwords
}

export enum View {
  GET_STARTED = 'get-started',
  HOME = 'home',
  RESULT = 'result',
  DASHBOARD = 'dashboard',
  FARMER_PORTAL = 'farmer-portal',
  EXPERT_FINDER = 'expert-finder',
  PRODUCTS = 'products',
  AI_ASSISTANT = 'ai_assistant',
  ABOUT = 'about',
  CONTACT = 'contact',
  ADMIN_LOGIN = 'admin_login',
  ADMIN_DASHBOARD = 'admin_dashboard',
  PRODUCT_MANAGEMENT = 'product_management',
  USER_LOGIN = 'user_login',
  USER_SIGNUP = 'user_signup',
}

export enum ModelSource {
  GEMINI = 'gemini',
  CUSTOM = 'custom',
}

export enum Language {
  ENGLISH = 'en',
  KANNADA = 'kn',
  TAMIL = 'ta',
  TELUGU = 'te',
  MALAYALAM = 'ml',
}
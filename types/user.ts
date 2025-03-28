export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  location: string;
  role: string;
  favoriteCount: number;
  viewedCount: number;
  notifications: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
  verifiedAccount: boolean;
  cookies: {
    name: string;
    purpose: string;
    expires: string;
    essential: boolean;
  }[];
} 
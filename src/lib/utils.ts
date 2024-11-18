import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {jwtDecode} from 'jwt-decode';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface JwtPayload {
  userId: string;
  exp: number;
  iat: number;
  [key: string]: any; // Add this to handle custom properties in your token
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid JWT token:', error);
    return null;
  }
};

export const getToken = () => {
  const cookies = document.cookie.split(';').reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  return decodeToken(cookies.authToken)
}
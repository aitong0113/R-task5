import axios from 'axios';

// 從環境變數讀取 API 基底位址
const baseURL = import.meta.env.VITE_API_BASE || '';

// 建立 axios 實例
export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 提供 PATH 方便組裝路徑
export const API_PATH = import.meta.env.VITE_API_PATH || '';

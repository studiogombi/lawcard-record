import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정 (3단계에서 복사한 내용)
const firebaseConfig = {
  apiKey: "AIzaSyAaUPsqDazMxsyeRo-5ZLq66GCxUkjvpHE",
  authDomain: "lawcard-record.firebaseapp.com",
  projectId: "lawcard-record",
  storageBucket: "lawcard-record.firebasestorage.app",
  messagingSenderId: "715179883488",
  appId: "1:715179883488:web:d6f43e1a763065559b0985"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyCelyM8acDJlo-NznaUW9f-aKaL6J8HizQ",
  authDomain: "fitbattle-app.firebaseapp.com",
  databaseURL: "https://fitbattle-app-default-rtdb.firebaseio.com",
  projectId: "fitbattle-app",
  storageBucket: "fitbattle-app.firebasestorage.app",
  messagingSenderId: "1018167906387",
  appId: "1:1018167906387:web:3a9559b771b2eefed8f6a6",
  measurementId: "G-S1FQ75GTSJ"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

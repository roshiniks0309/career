// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, update, serverTimestamp } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyCdd2tb8-4Jk0XD057ACuLrWiRNp90N8sc",
  authDomain: "my-app-5a87a.firebaseapp.com",
  databaseURL: "https://my-app-5a87a-default-rtdb.firebaseio.com",
  projectId: "my-app-5a87a",
  storageBucket: "my-app-5a87a.firebasestorage.app",
  messagingSenderId: "812827327347",
  appId: "1:812827327347:web:d1c827babe026726eb2306",
  measurementId: "G-WQYY649M9S",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Auth + Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// show chooser each time (optional)
provider.setCustomParameters({ prompt: 'select_account' });

// POPUP-ONLY Google Sign-in, then save to Realtime DB
export async function signInWithGoogleAndSave() {
  const result = await signInWithPopup(auth, provider); // <- popup only
  const user = result.user;

  const db = getDatabase(app);
  await update(ref(db, `users/${user.uid}`), {
    uid: user.uid,
    email: user.email ?? '',
    name: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    provider: 'google',
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });

  return user;
}

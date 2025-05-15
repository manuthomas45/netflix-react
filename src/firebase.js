// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUnWZN-hqQJbr_5C-Wia3o_4Ceh6ytS6y",
  authDomain: "netflixclone-e8a71.firebaseapp.com",
  projectId: "netflixclone-e8a71",
  storageBucket: "netflixclone-e8a71.firebasestorage.app",
  messagingSenderId: "1012721927798",
  appId: "1:1012721927798:web:3eec3cec4ef5d17aa3c157",
  measurementId: "G-73MNEFLDP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const db=getFirestore(app);
const signup=async(name,email,password)=>{
    try{
      const res=await createUserWithEmailAndPassword(auth,email,password)
      const user=res.user; 
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
      })
    }catch(error){
        console.log(error);
        // alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        

    }
}
const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch (error){
        console.log(error);
        // alert(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}

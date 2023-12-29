"use client";
import { useRouter } from "next/navigation";
import { auth } from "../core/services";
import { useState, useEffect } from "react";
import { Users } from "../models/users";


export default function Page(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setErrorMessage('');
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validatePassword = (password) => {
    return password.length >= 3 && !/\s/.test(password);
  }

  const isValidUser = (enteredEmail, enteredPassword) => {
    return Users.some(
      (user) => user.email === enteredEmail && user.password === enteredPassword
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    const enteredEmail = email.value;
    const enteredPassword = password.value;

    const emailIsValid = validateEmail(enteredEmail);
    const passwordIsValid = validatePassword(enteredPassword);
    
    if (!emailIsValid) {
      setErrorMessage('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (!passwordIsValid) {
      setErrorMessage('Şifre en az 3 karakterden oluşmalı ve boşluk içermemelidir.');
      return;
    }

    if (!isValidUser(enteredEmail, enteredPassword)) {
      setErrorMessage('Kullanıcı bulunamadı. Lütfen doğru bilgileri giriniz.');
      return;
    }

    const credentials = {
      email: enteredEmail,
      password: enteredPassword
    };

    const { data } = await auth(credentials);

    if (data.error) {
      setErrorMessage(data.error);
      return;
    }

    window.localStorage.setItem('user', JSON.stringify(data));

    router.push(data?.redirectUrl || '/');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-emerald-500 px-5 py-4 rounded-md max-w-96 w-full  flex-col justify-center items-center shadow-md">
        <h1 className="text-xl font-medium text-white">Login</h1>
        <form className="mt-4 flex gap-4 flex-col" autoComplete="false" noValidate={true} onSubmit={onSubmit}>
          <div className="flex-col flex">
            <label className="text-white text-sm">Email</label>
            <input className="bg-transparent py-1 outline-none border-b text-white" autoComplete="false" type="email" name="email" />
          </div>
          <div className="flex-col flex">
            <label className="text-white text-sm">Password</label>
            <input className="bg-transparent py-1 outline-none border-b text-white" autoComplete="false" type="password" name="password" />
          </div>
          <div className="text-white text-center bg-black p-2 rounded-md">
            <button className="w-full">Login</button>
          </div>
          {errorMessage ? <div className="text-red-500">{errorMessage}</div> : ''}
        </form>
      </div>
    </div>
  )
}

"use client";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

    interface GoogleBtnProps{
      onSuccessMessage?: (msg:string) => void;
       onErrorMessage?: (msg:string) => void;

    }

export default function GoogleButton({
  onSuccessMessage, onErrorMessage
}:GoogleBtnProps) {


  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;



    const res = await fetch("/api/auth/oauth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });

    if (res.ok) {
      onSuccessMessage?.("Login successful, redirecting...")
      window.location.href = "/"; 
      
    } else {
      const data = await res.json();
      onErrorMessage?.("Email is not registered or try again later")
    }
  };


  
  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Google Login Failed");
      }}
        
    />
  );
}
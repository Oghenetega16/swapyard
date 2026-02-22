"use client";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleButton() {
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
      window.location.href = "/"; // your dashboard
    } else {
      const data = await res.json();
      alert(data.message);
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
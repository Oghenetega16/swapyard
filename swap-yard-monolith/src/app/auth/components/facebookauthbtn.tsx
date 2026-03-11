"use client";

import { FaFacebook } from "react-icons/fa";

type Props = {
  onSuccessMessage?: (msg: string) => void;
  onErrorMessage?: (msg: string) => void;
};

export default function FacebookButton({
  onSuccessMessage,
  onErrorMessage,
}: Props) {
  const handleLogin = () => {
    if (!window.FB) {
      onErrorMessage?.("Facebook SDK not loaded");
      return;
    }

    window.FB.login(
      async (response: any) => {
        if (!response.authResponse) {
          onErrorMessage?.("Facebook login cancelled");
          return;
        }

        const accessToken = response.authResponse.accessToken;

        try {
          const res = await fetch("/api/auth/oauth/facebook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ accessToken }),
          });

          const data = await res.json().catch(() => ({}));

          if (!res.ok) {
            onErrorMessage?.(data.message || "Facebook login failed");
            return;
          }

          onSuccessMessage?.("Login successful");
          setTimeout(() => (window.location.href = "/page"), 500);
        } catch {
          onErrorMessage?.("Something went wrong");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  return (

  <button
    type="button"
    onClick={handleLogin}
    className="p-2 cursor-pointer border border-gray-300 text-sm rounded-sm flex items-center hover:bg-blue-50 transition "
  >
   <span className="pr-2 text-lg text-blue-500"><FaFacebook/></span> Continue with Facebook
  </button>

  );
}
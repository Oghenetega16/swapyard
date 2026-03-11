"use client";

import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";

type Props = {
  onSuccessMessage?: (msg: string) => void;
  onErrorMessage?: (msg: string) => void;
};

export default function FacebookButton({
  onSuccessMessage,
  onErrorMessage,
}: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      FB?: any;
      __fbReady?: boolean;
    };

    const checkReady = () => {
      if (w.FB && w.__fbReady) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (checkReady()) return;

    const interval = setInterval(() => {
      if (checkReady()) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const sendTokenToBackend = async (accessToken: string) => {
    const res = await fetch("/api/auth/oauth/facebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ accessToken }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "Facebook login failed");
    }

    return data;
  };

  const handleLogin = () => {
    const w = window as Window & {
      FB?: any;
      __fbReady?: boolean;
    };

    if (!w.FB || !w.__fbReady) {
      onErrorMessage?.("Facebook SDK still initializing");
      return;
    }

    w.FB.login(
      (response: any) => {
        if (!response?.authResponse) {
          onErrorMessage?.("Facebook login cancelled");
          return;
        }

        const accessToken = response.authResponse.accessToken;

        void (async () => {
          try {
            await sendTokenToBackend(accessToken);
            onSuccessMessage?.("Login successful");
            setTimeout(() => {
              window.location.href = "/page";
            }, 500);
          } catch (error) {
            onErrorMessage?.(
              error instanceof Error ? error.message : "Something went wrong"
            );
          }
        })();
      },
      { scope: "email,public_profile" }
    );
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={!isReady}
      className="p-2 cursor-pointer border border-gray-300 text-sm rounded-sm flex items-center hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="pr-2 text-lg text-blue-500">
        <FaFacebook />
      </span>
      {isReady ? "Continue with Facebook" : "Loading Facebook..."}
    </button>
  );
}
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
  function sendTokenToBackend(accessToken: string) {
    return fetch("/api/auth/oauth/facebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ accessToken }),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Facebook login failed");
      }

      return data;
    });
  }

  function handleLogin() {
    const FB = (window as any).FB;

    if (!FB) {
      onErrorMessage?.("Facebook SDK not ready");
      return;
    }

    FB.login(
      function (response: any) {
        if (!response?.authResponse) {
          onErrorMessage?.("Facebook login cancelled");
          return;
        }

        const accessToken = response.authResponse.accessToken;

        sendTokenToBackend(accessToken)
          .then(() => {
            onSuccessMessage?.("Login successful");
            setTimeout(function () {
              window.location.href = "/";
            }, 500);
          })
          .catch((error: unknown) => {
            onErrorMessage?.(
              error instanceof Error ? error.message : "Something went wrong"
            );
          });
      },
      { scope: "public_profile,email" }
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="p-2 cursor-pointer border border-gray-300 text-sm rounded-sm flex items-center hover:bg-blue-50 transition"
    >
      <span className="pr-2 text-lg text-blue-500">
        <FaFacebook />
      </span>
      Continue with Facebook
    </button>
  );
}
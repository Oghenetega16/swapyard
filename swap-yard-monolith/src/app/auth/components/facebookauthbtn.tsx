"use client";

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
      className="p-3 rounded-full border shadow-sm hover:bg-gray-50"
    >
        <FacebookButton/>
    </button>
  );
}
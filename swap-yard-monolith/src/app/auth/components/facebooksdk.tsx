"use client";

import { useEffect } from "react";

export default function FacebookProvider() {
  useEffect(() => {
    if ((window as any).FB) return;

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;

    script.onload = () => {
      (window as any).FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: "v19.0",
      });
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
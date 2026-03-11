"use client";

import { useEffect } from "react";

export default function FacebookProvider() {
  useEffect(() => {
    const w = window as Window & {
      fbAsyncInit?: () => void;
      FB?: any;
      __fbReady?: boolean;
    };

    if (w.__fbReady) return;

    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

    if (!appId) {
      console.error("Missing FACEBOOK APP ID");
      return;
    }

    const existingScript = document.getElementById("facebook-jssdk");
    if (existingScript) return;

    w.fbAsyncInit = function () {
      if (!w.FB) return;

      w.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: "v19.0",
      });

      w.__fbReady = true;
      console.log("Facebook SDK initialized");
    };

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
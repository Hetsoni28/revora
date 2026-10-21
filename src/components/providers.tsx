"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster, toast } from "sonner";
import { ReactLenis } from "lenis/react";
import { CookieConsent } from "@/components/consent/cookie-consent";

/** Tells the visitor when the connection drops and comes back, so failed actions aren't a mystery. */
function NetworkStatus() {
  React.useEffect(() => {
    const offline = () => toast.warning("You’re offline", { id: "network", description: "Some pages and forms won’t work until you reconnect.", duration: Infinity });
    const online = () => toast.success("Back online", { id: "network", description: "Your connection is working again.", duration: 3000 });
    window.addEventListener("offline", offline);
    window.addEventListener("online", online);
    return () => {
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", online);
    };
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
        {children}
        {/* on phones, sit above the product page's sticky "Request samples" bar */}
        <Toaster richColors position="bottom-right" closeButton mobileOffset={{ bottom: 96 }} />
        <NetworkStatus />
        <CookieConsent />
      </ReactLenis>
    </NextThemesProvider>
  );
}

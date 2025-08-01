import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
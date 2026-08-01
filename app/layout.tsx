import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Girl Power | Custom Bracelets, Bookmarks & Art",
  description: "Design a one-of-a-kind bracelet, bookmark, drawing, or painting in your favorite colors and size.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

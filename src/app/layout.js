import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Rupom Prosad Badhan | Frontend Developer",
  description:
    "Frontend Developer focused on React and Next.js — building thoughtful digital experiences with modern web technologies.",
  keywords: ["Frontend Developer", "React", "Next.js", "JavaScript", "Web Development", "Portfolio"],
  authors: [{ name: "Rupom Prosad Badhan" }],
  openGraph: {
    title: "Rupom Prosad Badhan | Frontend Developer",
    description: "Frontend Developer focused on React and Next.js — building thoughtful digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('portfolio-theme');
                if (t === 'light' || t === 'dark') {
                  document.documentElement.dataset.theme = t;
                } else {
                  document.documentElement.dataset.theme = 'dark';
                }
              } catch(e) {
                document.documentElement.dataset.theme = 'dark';
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

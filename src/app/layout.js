export const metadata = {
  title: "GGE — Guide, Grow, Earn",
  description:
    "Every Indian deserves guidance, growth and earning opportunity regardless of money, location or background. By GKFXL — Gokul Official.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0c0c0c" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Nunito:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f8f8f6" }}>
        {children}
      </body>
    </html>
  );
}

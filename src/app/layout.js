export const metadata = {
  title: "SRWP — Solving Real World Problems",
  description: "A community platform to identify, discuss, and solve real-world problems using AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f8f8f6" }}>
        {children}
      </body>
    </html>
  );
}

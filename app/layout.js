export const metadata = {
  title: 'Kitchen Help',
  description: 'Kitchen Help App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

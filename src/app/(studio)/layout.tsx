export const metadata = {
  title: "GRL PWR – Studio",
  robots: { index: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

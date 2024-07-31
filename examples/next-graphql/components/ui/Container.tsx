export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-6 pb-12 antialiased bg-white">{children}</div>
  );
}

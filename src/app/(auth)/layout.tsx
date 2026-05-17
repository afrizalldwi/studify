import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        {children}
      </div>
      <Toaster richColors position="top-center" />
    </>
  );
}

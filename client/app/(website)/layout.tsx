import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({
  children,
}: WebsiteLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <div className="container mx-auto px-4 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}

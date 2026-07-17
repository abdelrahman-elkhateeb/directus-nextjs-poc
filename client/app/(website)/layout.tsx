import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({
  children,
}: WebsiteLayoutProps) {
  return (
    <body className="flex flex-col min-h-dvh" suppressHydrationWarning>
      <Navbar />
      <div className="container mx-auto px-4 flex-1">
        {children}
      </div>
      <Footer />
    </body>
  );
}
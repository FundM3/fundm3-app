import { headers } from "next/headers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
export default function RootLayout({
    children,
}: Readonly<{
children: React.ReactNode;
}>) {
    const cookie = headers().get("cookie");
  
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main> 
        <Footer />
      </div>
    );
}

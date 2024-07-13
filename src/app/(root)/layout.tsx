import { headers } from "next/headers";
import Providers from "../providers";

export default function RootLayout({
    children,
}: Readonly<{
children: React.ReactNode;
}>) {
    const cookie = headers().get("cookie");
  
    return (
      <div>
        <main className="flex-1">{children}</main> 
      </div>
    );
}

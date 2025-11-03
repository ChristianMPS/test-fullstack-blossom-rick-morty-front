import "@/app/globals.css";
import CharacterSidebar from "@/components/CharacterSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex min-h-screen">
        <SidebarProvider>
          <CharacterSidebar />
          <main className="flex-1 bg-white p-8">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}

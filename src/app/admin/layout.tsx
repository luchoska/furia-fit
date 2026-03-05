"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LogOut, Package, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "unauthenticated" && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [status, pathname, router]);

    if (status === "loading") {
        return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Cargando...</div>;
    }

    if (pathname === "/admin/login") {
        return <div className="min-h-screen bg-neutral-950 text-white">{children}</div>;
    }

    if (!session) return null;

    return (
        <div className="flex min-h-screen bg-neutral-950 text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-800 bg-neutral-900 flex flex-col">
                <div className="p-6 border-b border-neutral-800">
                    <h2 className="text-xl font-black tracking-wider text-red-500">FURIA FIT</h2>
                    <span className="text-xs text-neutral-400">Admin Panel</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === "/admin" ? "bg-red-500/10 text-red-500 font-medium" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname.startsWith("/admin/products") ? "bg-red-500/10 text-red-500 font-medium" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}>
                        <Package size={20} />
                        Productos
                    </Link>
                </nav>
                <div className="p-4 border-t border-neutral-800">
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex w-full items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

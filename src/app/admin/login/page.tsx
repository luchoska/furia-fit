"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push("/admin");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="max-w-md w-full p-8 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <Activity size={48} className="text-red-500 mb-4" />
                    <h1 className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">FURIA FIT</h1>
                    <p className="text-neutral-500 mt-2 tracking-widest text-xs uppercase">Admin Portal</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-950/50 border border-red-900 text-red-500 text-sm rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-md px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Contraseña</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-md px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-md transition-all flex justify-center mt-6 disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar al Panel"}
                    </button>
                </form>
            </div>
        </div>
    );
}

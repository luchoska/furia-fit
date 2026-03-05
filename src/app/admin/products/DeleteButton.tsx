"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("¿Seguro que querés borrar este producto? (Esta acción no se puede deshacer)")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Error al eliminar el producto");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-neutral-500 hover:text-red-500 transition-colors disabled:opacity-50"
            title="Eliminar producto"
        >
            <Trash2 size={18} className={loading ? "animate-pulse" : ""} />
        </button>
    );
}

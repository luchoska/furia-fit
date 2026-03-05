import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2 } from "lucide-react";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
                <h1 className="text-3xl font-black tracking-wide text-white">
                    PRODUCTOS
                </h1>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 font-bold rounded-md transition-colors"
                >
                    <Plus size={20} />
                    Nuevo Producto
                </Link>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-800 text-neutral-300 uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Foto</th>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Categoría</th>
                            <th className="px-6 py-4">Precio</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-neutral-500 italic">
                                    No hay productos cargados todavía.
                                </td>
                            </tr>
                        ) : (
                            products.map((product: any) => (
                                <tr key={product.id} className="hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-neutral-800 rounded flex items-center justify-center overflow-hidden">
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs">No img</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                                    <td className="px-6 py-4 text-neutral-400">{product.category}</td>
                                    <td className="px-6 py-4 text-emerald-400 font-bold">${product.price.toLocaleString("es-AR")}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${product.isAvailable ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {product.isAvailable ? "Disponible" : "Agotado"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <Link href={`/admin/products/${product.id}/edit`} className="inline-block text-neutral-500 hover:text-white transition-colors" title="Editar producto">
                                            <Edit2 size={18} />
                                        </Link>
                                        <DeleteButton id={product.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        isAvailable: true,
        sizes: "S, M, L",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData((prev) => ({ ...prev, [e.target.name]: value }));
    };

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = formData.imageUrl;

            // Si hay archivo, subimos a la API route propia de cloudinary primero
            if (imageFile) {
                const fileForm = new FormData();
                fileForm.append("file", imageFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: fileForm,
                });

                if (!uploadRes.ok) {
                    const errorText = await uploadRes.text();
                    throw new Error(`Error subiendo imagen: ${uploadRes.status} ${errorText}`);
                }

                const uploadData = await uploadRes.json();
                if (uploadData.url) {
                    finalImageUrl = uploadData.url;
                } else {
                    throw new Error("No se obtuvo URL de la imagen de Cloudinary");
                }
            }

            // Procesar talles (string a json)
            const sizesArray = formData.sizes.split(",").map((s) => s.trim()).filter(Boolean);

            // Crear producto
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    imageUrl: finalImageUrl,
                    sizes: JSON.stringify(sizesArray),
                }),
            });

            if (res.ok) {
                router.push("/admin/products");
                router.refresh();
            } else {
                const errorData = await res.text();
                throw new Error(`Error API Producto: ${res.status} ${errorData}`);
            }
        } catch (error: any) {
            console.error(error);
            alert(`Error inesperado: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-4">
                <Link href="/admin/products" className="text-neutral-500 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-black tracking-wide text-white">NUEVO PRODUCTO</h1>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Nombre del Producto</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-md px-4 py-3 focus:ring-1 focus:ring-red-500 transition-all focus:outline-none"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Remera Pump Oversize"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Precio (ARS)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    className="w-full pl-8 bg-neutral-950 border border-neutral-800 text-white rounded-md px-4 py-3 focus:ring-1 focus:ring-red-500 transition-all focus:outline-none"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="25000"
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Talles Separados por Coma</label>
                            <input
                                type="text"
                                name="sizes"
                                required
                                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-md px-4 py-3 focus:ring-1 focus:ring-red-500 transition-all focus:outline-none"
                                value={formData.sizes}
                                onChange={handleChange}
                                placeholder="S, M, L, XL"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Descripción</label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-md px-4 py-3 focus:ring-1 focus:ring-red-500 transition-all focus:outline-none"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detalle de tela, calce, y por qué está zarpada."
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Foto del Producto (Sube un archivo)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-800 border-dashed rounded-md hover:border-red-500/50 transition-colors w-full cursor-pointer relative bg-neutral-950">
                                <div className="space-y-2 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-neutral-500" />
                                    <div className="flex text-sm text-neutral-400">
                                        <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-red-500 hover:text-red-400 focus-within:outline-none">
                                            <span>{imageFile ? imageFile.name : "Subir archivo"}</span>
                                            <input name="file" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                    </div>
                                    <p className="text-xs text-neutral-500">PNG, JPG, GIF hasta 5MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex items-center gap-3 mt-2 bg-neutral-950 p-4 rounded-md border border-neutral-800">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                id="isAvailable"
                                className="w-5 h-5 accent-red-500 bg-neutral-900 border-neutral-700 rounded"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                            />
                            <label htmlFor="isAvailable" className="text-base font-medium text-neutral-300">
                                El producto está disponible y visible en el sitio
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-3 font-bold rounded-md transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    GUARDANDO...
                                </>
                            ) : (
                                "GUARDAR PRODUCTO"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

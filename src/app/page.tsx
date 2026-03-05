import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" },
  });

  // Reemplazar con el número del cliente
  const whastAppNumber = "5493430000000";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500 selection:text-white pb-32">

      {/* Header Fijo */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-neutral-900 border-red-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
            FURIA FIT
          </h1>
          <nav>
            <a href="#cat" className="text-sm font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
              Catálogo
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section Agresivo */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 bg-red-500/10 text-red-500 font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-red-500/20">
            Envíos a Paraná y Entre Ríos 🚀
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Desatá tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 italic">Verdadera Fuerza</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-medium">
            Ropa deportiva de alto rendimiento y streetwear agresivo. Entrená duro, vestite mejor. Exclusivo con MercadoPago.
          </p>
          <a href="#cat" className="inline-flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest px-8 py-4 rounded transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(220,38,38,0.4)]">
            VER EQUIPAMIENTO
          </a>
        </div>
      </section>

      {/* Catálogo */}
      <section id="cat" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wide">NUESTRO STOCK 🔥</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-red-900 to-transparent" />
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 rounded-xl bg-neutral-900/50">
            <p className="text-xl text-neutral-500 font-medium tracking-wide">
              No hay productos disponibles por ahora. ¡Volvé pronto! 🐺
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => {
              const sizes = JSON.parse(product.sizes);
              const message = `¡Hola Furia Fit! 🔥 Quiero comprar: *${product.name}* a $${product.price.toLocaleString("es-AR")}. ¿Tienen stock en qué talle?`;
              const wpLink = `https://wa.me/${whastAppNumber}?text=${encodeURIComponent(message)}`;

              return (
                <div key={product.id} className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors shadow-xl">
                  {/* Imagen */}
                  <div className="relative aspect-[4/5] bg-neutral-800 overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-950 font-black text-neutral-700 uppercase tracking-widest text-4xl transform -rotate-45">
                        FURIA
                      </div>
                    )}

                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-black uppercase px-3 py-1 tracking-widest shadow-lg">
                      🔥 HOT
                    </div>
                  </div>

                  {/* Detalles */}
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-2xl font-black mb-2 uppercase hover:text-red-500 transition-colors">{product.name}</h4>
                    <p className="text-red-500 text-3xl font-black tracking-tight mb-4">
                      ${product.price.toLocaleString("es-AR")}
                    </p>

                    {/* Talles */}
                    <div className="mb-6">
                      <p className="text-xs uppercase text-neutral-500 tracking-widest font-bold mb-2">Talles Disponibles</p>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((s: string) => (
                          <span key={s} className="px-3 py-1 bg-neutral-950 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-md uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-neutral-400 mb-8 flex-1 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Botón WhatsApp */}
                    <a
                      href={wpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full group relative flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-4 rounded transition-all active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                    >
                      <MessageCircle className="filter group-hover:animate-pulse" size={24} />
                      <span className="uppercase tracking-widest text-sm">Comprar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-center text-neutral-600 text-xs tracking-widest uppercase">
        <p className="mb-4">© 2026 FURIA FIT - PARANÁ, ENTRE RÍOS.</p>
        <p>Potenciado con MercadoPago.</p>
      </footer>
    </div>
  );
}

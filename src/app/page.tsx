import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home(props: any) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams?.category || "Todas";

  const whereClause: any = { isAvailable: true };
  if (categoryFilter !== "Todas") {
    whereClause.category = categoryFilter;
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  const categories = ["Todas", "Botines de fútbol 11", "Botines fútbol 5", "Botines infantiles", "Zapatillas deportivas", "Ropa Deportiva", "Accesorios"];

  // Reemplazar con el número del cliente
  const whastAppNumber = "5493430000000";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-white pb-32">

      {/* Header Fijo */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-neutral-900 border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400">
            GSPORTS
          </h1>
          <nav className="flex items-center gap-6">
            <a href="#cat" className="text-sm font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors">
              Catálogo
            </a>
            <span className="text-neutral-700">⚽</span>
          </nav>
        </div>
      </header>

      {/* Hero Section Futbolero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />
        {/* Patrón de cancha sutil */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-emerald-500/20">
            ⚽ Envíos a Paraná y Entre Ríos
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Equipate como <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400 italic">un Profesional</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-medium">
            Los mejores botines, zapatillas y ropa deportiva al mejor precio. Entrá a la cancha con todo. Pagá con MercadoPago.
          </p>
          <a href="#cat" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest px-8 py-4 rounded transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
            ⚽ VER EQUIPAMIENTO
          </a>
        </div>
      </section>

      {/* Catálogo */}
      <section id="cat" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wide">NUESTRO STOCK ⚽</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-900 to-transparent" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((c) => (
            <a
              key={c}
              href={c === "Todas" ? "/#cat" : `/?category=${encodeURIComponent(c)}#cat`}
              className={`px-5 py-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 ${categoryFilter === c
                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800"
                }`}
            >
              {c}
            </a>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 rounded-xl bg-neutral-900/50">
            <p className="text-xl text-neutral-500 font-medium tracking-wide">
              No hay productos disponibles por ahora. ¡Volvé pronto! ⚽
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => {
              const sizes = JSON.parse(product.sizes);
              const message = `¡Hola Gsports! ⚽ Quiero comprar: *${product.name}* a $${product.price.toLocaleString("es-AR")}. ¿Tienen stock en qué talle?`;
              const wpLink = `https://wa.me/${whastAppNumber}?text=${encodeURIComponent(message)}`;

              return (
                <div key={product.id} className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors shadow-xl">
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
                        GSPORTS
                      </div>
                    )}

                    <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-black uppercase px-3 py-1 tracking-widest shadow-lg rounded">
                      ⚽ NEW
                    </div>
                  </div>

                  {/* Detalles */}
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-2xl font-black mb-2 uppercase hover:text-emerald-400 transition-colors">{product.name}</h4>
                    <p className="text-emerald-400 text-3xl font-black tracking-tight mb-4">
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
        <p className="mb-4">© 2026 GSPORTS - PARANÁ, ENTRE RÍOS. ⚽</p>
        <p>Potenciado con MercadoPago.</p>
      </footer>
    </div>
  );
}

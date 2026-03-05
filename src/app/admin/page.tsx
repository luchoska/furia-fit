export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-black tracking-wide text-white mb-8 border-b border-neutral-800 pb-4">
                DASHBOARD
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-neutral-400 text-sm mb-2 uppercase tracking-wide font-semibold">Productos Activos</h3>
                    <p className="text-4xl font-black text-red-500">0</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-neutral-400 text-sm mb-2 uppercase tracking-wide font-semibold">Vistas de Hoy</h3>
                    <p className="text-4xl font-black text-white">0</p>
                </div>
            </div>
        </div>
    );
}

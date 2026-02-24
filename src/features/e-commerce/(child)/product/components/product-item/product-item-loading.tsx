export default function ProductItemLoading() {
    return (
        <div className="animate-pulse">
            <div className="rounded-md overflow-hidden bg-slate-700/40 h-40 w-full mb-3" />
            <div className="h-4 bg-slate-700/40 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-700/30 rounded w-1/2 mb-4" />
            <div className="flex items-center justify-between">
                <div className="h-8 w-28 bg-slate-700/40 rounded" />
                <div className="h-8 w-20 bg-slate-700/40 rounded" />
            </div>
        </div>
    )
}
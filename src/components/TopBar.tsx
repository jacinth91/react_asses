type Props = {
    search: string;
    onSearchChange: (v: string) => void;
  };
  
  export default function TopBar({ search, onSearchChange }: Props) {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Today</h1>
            <span className="text-zinc-400">▾</span>
          </div>
  
          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="flex items-center gap-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2">
              <span className="text-zinc-400">🔎</span>
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            <button className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10" title="Filter">
              ☰
            </button>
          </div>
        </div>
  
        <label className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" className="accent-white" />
          <span>Enjoy All</span>
        </label>
      </div>
    );
  }
  
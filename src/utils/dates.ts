export function formatRelative(iso: string | null): string {
    if (!iso) return "";
    const due = new Date(iso).getTime();
    const diff = due - Date.now();
    const abs = Math.abs(diff);
  
    const mins = Math.round(abs / 60000);
    const hrs = Math.round(abs / 3600000);
    const days = Math.round(abs / 86400000);
  
    const suffix = diff >= 0 ? "from now" : "ago";
    if (mins < 60) return `${mins} min ${suffix}`;
    if (hrs < 24) return `${hrs} hr ${suffix}`;
    return `${days} day ${suffix}`;
  }
  
  export function isOverdue(iso: string | null): boolean {
    if (!iso) return false;
    return new Date(iso).getTime() < Date.now();
  }
  
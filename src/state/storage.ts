import type { AppData } from "../types/model";

const KEY = "todo_dashboard_v1";

export function loadAppData(): AppData | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AppData) : null;
  } catch {
    return null;
  }
}

export function saveAppData(data: AppData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /// pleaseignore this
  }
}

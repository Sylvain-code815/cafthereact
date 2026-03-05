const STORAGE_KEY = "cafthe_saved_address";

export function getSavedAddress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAddress(address) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(address));
  } catch {
    // silently ignore quota errors
  }
}

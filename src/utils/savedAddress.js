const STORAGE_KEY = "cafthe_saved_address";
const ADDRESSES_KEY = "cafthe_saved_addresses";

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

export function getSavedAddresses() {
  try {
    const raw = localStorage.getItem(ADDRESSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAddresses(addresses) {
  try {
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  } catch {
    // silently ignore quota errors
  }
}

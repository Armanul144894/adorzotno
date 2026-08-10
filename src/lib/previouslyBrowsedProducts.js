const STORAGE_PREFIX = "adorzotno_previously_browsed";
const HISTORY_UPDATED_EVENT = "adorzotno:previously-browsed-updated";
const MAX_HISTORY_ITEMS = 10;

export const getPreviouslyBrowsedStorageKey = (userId = null) =>
  userId ? `${STORAGE_PREFIX}_user_${userId}` : `${STORAGE_PREFIX}_guest`;

export const getPreviouslyBrowsedSnapshot = (storageKey) => {
  if (typeof window === "undefined" || !storageKey) return "[]";

  try {
    return window.localStorage.getItem(storageKey) || "[]";
  } catch {
    return "[]";
  }
};

export const parsePreviouslyBrowsedSnapshot = (snapshot) => {
  try {
    const parsed = JSON.parse(snapshot);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((slug) => typeof slug === "string" && slug.trim())
      .map((slug) => slug.trim())
      .filter((slug, index, slugs) => slugs.indexOf(slug) === index)
      .slice(0, MAX_HISTORY_ITEMS);
  } catch {
    return [];
  }
};

export const addPreviouslyBrowsedProduct = (storageKey, productSlug) => {
  if (typeof window === "undefined" || !storageKey || !productSlug) return;

  const normalizedSlug = String(productSlug).trim();
  if (!normalizedSlug) return;

  const existingSlugs = parsePreviouslyBrowsedSnapshot(
    getPreviouslyBrowsedSnapshot(storageKey),
  );
  const nextSlugs = [
    normalizedSlug,
    ...existingSlugs.filter((slug) => slug !== normalizedSlug),
  ].slice(0, MAX_HISTORY_ITEMS);

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(nextSlugs));
    window.dispatchEvent(
      new CustomEvent(HISTORY_UPDATED_EVENT, { detail: { storageKey } }),
    );
  } catch {
    // Browsing history is optional when storage is unavailable.
  }
};

export const subscribeToPreviouslyBrowsed = (onStoreChange) => {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event) => {
    if (!event.key || event.key.startsWith(STORAGE_PREFIX)) {
      onStoreChange();
    }
  };
  const handleHistoryUpdate = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(HISTORY_UPDATED_EVENT, handleHistoryUpdate);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(HISTORY_UPDATED_EVENT, handleHistoryUpdate);
  };
};
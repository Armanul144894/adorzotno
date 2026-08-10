"use client";

import { useMemo, useSyncExternalStore } from "react";

export const SHIPMENT_ZONE_STORAGE_KEY = "adorzotno_shipment_zone_id";
const SHIPMENT_ZONE_EVENT = "adorzotno:shipment-zone-change";

const getWindowObject = () =>
  typeof window === "undefined" ? null : window;

export const getStoredShipmentZoneId = () => {
  const windowObject = getWindowObject();
  if (!windowObject) return null;

  try {
    const storedValue = windowObject.localStorage.getItem(
      SHIPMENT_ZONE_STORAGE_KEY,
    );
    if (!storedValue) return null;

    const parsedValue = Number(storedValue);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
};

export const setStoredShipmentZoneId = (shipmentZoneId) => {
  const windowObject = getWindowObject();
  if (!windowObject) return;

  const normalizedId = Number(shipmentZoneId);
  if (!Number.isFinite(normalizedId)) return;

  try {
    windowObject.localStorage.setItem(
      SHIPMENT_ZONE_STORAGE_KEY,
      String(normalizedId),
    );
  } catch {
    return;
  }

  windowObject.dispatchEvent(
    new CustomEvent(SHIPMENT_ZONE_EVENT, {
      detail: { shipmentZoneId: normalizedId },
    }),
  );
};

const subscribeToShipmentZone = (onStoreChange) => {
  const windowObject = getWindowObject();
  if (!windowObject) return () => {};

  const handleShipmentZoneChange = () => onStoreChange();
  const handleStorage = (event) => {
    if (event.key === SHIPMENT_ZONE_STORAGE_KEY) onStoreChange();
  };

  windowObject.addEventListener(SHIPMENT_ZONE_EVENT, handleShipmentZoneChange);
  windowObject.addEventListener("storage", handleStorage);

  return () => {
    windowObject.removeEventListener(
      SHIPMENT_ZONE_EVENT,
      handleShipmentZoneChange,
    );
    windowObject.removeEventListener("storage", handleStorage);
  };
};

export const useSelectedShipmentZone = (locations = []) => {
  const storedShipmentZoneId = useSyncExternalStore(
    subscribeToShipmentZone,
    getStoredShipmentZoneId,
    () => null,
  );

  const selectedShipmentZone = useMemo(
    () =>
      locations.find(
        (location) => Number(location.id) === Number(storedShipmentZoneId),
      ) || locations[0] || null,
    [locations, storedShipmentZoneId],
  );

  return {
    selectedShipmentZoneId: selectedShipmentZone?.id || null,
    selectedShipmentZone,
    setSelectedShipmentZoneId: setStoredShipmentZoneId,
  };
};

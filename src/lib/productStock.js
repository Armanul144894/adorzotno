const toFiniteNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return null;
};

export const getProductStockInfo = (product = {}) => {
  const primarySku = product?.sku?.[0] || {};
  const explicitStockValues = [
    product?.inStock,
    product?.in_stock,
    product?.stock?.in_stock,
    primarySku?.inStock,
    primarySku?.in_stock,
    primarySku?.stock?.in_stock,
  ];
  const quantityValues = [
    product?.stockCount,
    product?.availableStock,
    product?.available_stock,
    product?.stock?.available_quantity,
    primarySku?.stockCount,
    primarySku?.availableStock,
    primarySku?.available_stock,
    primarySku?.stock?.available_quantity,
  ];

  const explicitInStock = explicitStockValues
    .map(toBoolean)
    .find((value) => value !== null);
  const availableStock = quantityValues
    .map(toFiniteNumber)
    .find((value) => value !== null);

  return {
    availableStock,
    inStock:
      explicitInStock ?? (availableStock !== null ? availableStock > 0 : true),
  };
};

export const getImageUrl = (path) => {
    if (!path || path === "null") {
        return "/images/no-image-available.png";
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/admin/${path}`;
};
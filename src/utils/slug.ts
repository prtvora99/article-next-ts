const slugify = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except dashes
    .replace(/\-\-+/g, "-") // Replace multiple dashes with single dash
    .replace(/^-+/, "") // Trim leading dashes
    .replace(/-+$/, ""); // Trim trailing dashes
};

const deslugify = (input: string): string => {
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export { slugify, deslugify };

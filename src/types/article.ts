type sortField = "title" | "id" | "default";
type sortOrder = "asc" | "dsc";

type articleType = { id: string; title: string; body: string };
type pageProps = { page: number; limit: number };

export type { articleType, sortField, sortOrder, pageProps };

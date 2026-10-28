// Prefixes files from public/ with the deploy sub-path. next/image does not add basePath to
// string srcs, so GitHub Pages (served under /olpex-web) needs it explicitly. Empty elsewhere.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;

export const getDomain = (): string | null => {
    const host = window.location.hostname
    const parts = host.split('.')
        
    if (parts.length >= 2) {
        return parts[0]; // "duckit"
    }

    return null;
}


export function toSubdomain(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")       // alleen DNS-veilige chars
    .replace(/^-+|-+$/g, "")          // trim koppeltekens
    .slice(0, 63);                    // max 63 chars per label
}

export function getBaseDomain() {
  const { hostname, port } = window.location;
  // Dev: localhost en *.localhost
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    return `localhost${port ? `:${port}` : ""}`;
  }
  // Prod: pak registrable domain (grove benadering)
  const parts = hostname.split(".");
  const base = parts.length <= 2 ? hostname : parts.slice(-2).join(".");
  return base; // geen poort in prod
}

export function makeTenantUrl(tenantName: string) {
  const proto = window.location.protocol; // behoud http/https
  const base = import.meta.env.VITE_BASE_DOMAIN ?? getBaseDomain();
  const sub = toSubdomain(tenantName);
  return `${proto}//${sub}.${base}`;
}
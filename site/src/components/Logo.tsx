import Image from "next/image";

// Official OLPEX logo, recolored for the dark canvas: wordmark in chalk, gear in brand blue.
export function Logo({ className = "h-12", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo-olpex.webp"
      alt="OLPEX Engineering Solutions"
      width={256}
      height={192}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}

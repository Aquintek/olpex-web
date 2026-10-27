import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-svh flex-col items-start justify-center gap-6 py-24">
      <Logo />
      <p className="eyebrow flex items-center gap-2">
        <span className="status-dot" />
        Error 404
      </p>
      <h1 className="display text-5xl sm:text-6xl">Esta página no existe</h1>
      <p className="max-w-md text-mute">Puede que el enlace esté incompleto o que la página se haya movido.</p>
      <Link href="/" className="btn btn-light">
        Volver al inicio
      </Link>
    </main>
  );
}

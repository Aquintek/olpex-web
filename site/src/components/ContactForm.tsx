"use client";

import { useState, type FormEvent, type FocusEvent, type InputHTMLAttributes } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { BASE_PATH } from "@/lib/asset";
import { SERVICES, WHATSAPP_URL } from "@/lib/content";

// Served by contacto.php on the PHP host (olpex.net). On a static-only host the
// request fails and the error message points to email and WhatsApp instead.
const FORM_ACTION = `${BASE_PATH}/contacto.php`;

const AREAS = [...SERVICES.map((s) => s.title), "Suministro de equipos", "Otro"];

type Field = "nombre" | "correo" | "mensaje";
type Status = { kind: "idle" | "sending" | "ok" | "error"; text?: string };

function validate(name: Field, value: string): string {
  const v = value.trim();
  if (name === "nombre" && !v) return "Escriba su nombre.";
  if (name === "correo") {
    if (!v) return "Escriba su correo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Revise el correo, parece incompleto.";
  }
  if (name === "mensaje" && !v) return "Cuéntenos qué necesita.";
  return "";
}

export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Validate when the user leaves a field, not on every keystroke.
  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setErrors((prev) => ({ ...prev, [name]: validate(name, e.target.value) }));
  };

  // Once a field shows an error, clear it as soon as the input becomes valid.
  const onInput = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    const name = el.name as Field;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, el.value) }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Partial<Record<Field, string>> = {};
    for (const f of ["nombre", "correo", "mensaje"] as Field[]) {
      const msg = validate(f, String(data.get(f) ?? ""));
      if (msg) next[f] = msg;
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(FORM_ACTION, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      // Trust only contacto.php's JSON reply. A host that can't run PHP may answer
      // 200 with the raw file, which must not read as "sent".
      const reply = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || reply?.ok !== true) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus({ kind: "ok", text: "Mensaje enviado. Le responderemos con una propuesta." });
    } catch {
      setStatus({
        kind: "error",
        text: "No se pudo enviar el mensaje. Escríbanos a asesortecnico1@olpex.net o por WhatsApp.",
      });
    }
  };

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
      <TextField label="Nombre" name="nombre" autoComplete="name" maxLength={100} required error={errors.nombre} onBlur={onBlur} onInput={onInput} />
      <TextField label="Empresa" name="empresa" autoComplete="organization" maxLength={120} optional />
      <TextField label="Correo electrónico" name="correo" type="email" autoComplete="email" maxLength={150} required error={errors.correo} onBlur={onBlur} onInput={onInput} />
      <TextField label="Teléfono" name="telefono" type="tel" autoComplete="tel" maxLength={40} optional />

      <div className="sm:col-span-2">
        <label htmlFor="f-area" className="form-label">
          Área de servicio
        </label>
        <select id="f-area" name="area" className="form-input" defaultValue="">
          <option value="">Seleccione un área</option>
          {AREAS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="f-mensaje" className="form-label">
          Mensaje
        </label>
        <textarea
          id="f-mensaje"
          name="mensaje"
          rows={5}
          maxLength={3000}
          required
          aria-invalid={!!errors.mensaje || undefined}
          aria-describedby={errors.mensaje ? "e-mensaje" : undefined}
          onBlur={onBlur}
          onInput={onInput}
          className="form-input resize-y"
        />
        <FieldError id="e-mensaje" text={errors.mensaje} />
      </div>

      {/* Honeypot: people never see it; contacto.php drops anything that fills it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="f-web">No llenar este campo</label>
        <input id="f-web" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2">
        <button type="submit" disabled={sending} className="btn h-12 w-full bg-navy text-chalk hover:bg-navy-hover disabled:opacity-70">
          {sending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
          {sending ? "Enviando…" : "Enviar mensaje"}
        </button>
        <p role="status" aria-live="polite" className="min-h-5 text-sm">
          {status.kind === "ok" && (
            <span className="flex items-start gap-2 text-success">
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {status.text}
            </span>
          )}
          {status.kind === "error" && (
            <span className="flex items-start gap-2 text-danger">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {status.text}{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
                  Abrir WhatsApp
                </a>
              </span>
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

function TextField({
  label,
  name,
  type = "text",
  optional,
  error,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type">) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {optional && <span className="font-normal text-paper-mute"> (opcional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `e-${name}` : undefined}
        className="form-input"
        {...rest}
      />
      <FieldError id={`e-${name}`} text={error} />
    </div>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] text-danger">
      {text}
    </p>
  );
}

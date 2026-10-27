// Site copy and contact data, kept in one place so it can be edited without touching layout.

export const WHATSAPP_NUMBER = "50237419090";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola OLPEX, quisiera información sobre sus servicios.",
)}`;

export const QUOTE_MAILTO = `mailto:asesortecnico1@olpex.net?subject=${encodeURIComponent(
  "Solicitud de cotización",
)}`;

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export const EMAILS = [
  { address: "asesortecnico1@olpex.net", label: "Asesoría técnica" },
  { address: "asesortecnico2@olpex.net", label: "Asesoría técnica" },
  { address: "compras@olpex.net", label: "Compras y suministro" },
];

export const PHONES = [
  { display: "(502) 5412-3688", tel: "+50254123688" },
  { display: "(502) 3567-2990", tel: "+50235672990" },
  { display: "(502) 3741-9090", tel: "+50237419090" },
  { display: "(502) 5227-6751", tel: "+50252276751" },
  { display: "+1 (573) 836-3439", tel: "+15738363439" },
];

export const PILLARS = [
  {
    label: "Experiencia",
    value: "+10 años",
    text: "Como proveedores de servicios industriales en Guatemala, Estados Unidos, México y el Caribe.",
  },
  {
    label: "Seguridad",
    value: "Primero",
    text: "La seguridad del personal y de la planta va antes que el cronograma, en cada proyecto.",
  },
  {
    label: "Tecnología",
    value: "De vanguardia",
    text: "Equipos y métodos actuales para entregar servicios eficientes y de alta calidad.",
  },
  {
    label: "Innovación",
    value: "EE.UU. → GT",
    text: "Llevamos a los procesos productivos de Guatemala lo que hemos aplicado en plantas de Estados Unidos.",
  },
];

export type Service = {
  id: string;
  title: string;
  photo: string;
  alt: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    id: "electricos",
    title: "Servicios eléctricos",
    photo: "/fotos/tablero-electrico.webp",
    alt: "Tablero eléctrico industrial con variadores y protecciones",
    items: [
      "Mantenimiento de paneles eléctricos",
      "Mantenimiento de transformadores",
      "Estudios de termografía",
      "Instalaciones de circuitos de iluminación y fuerza",
      "Diseño de proyectos",
      "Sistemas de tierras físicas: planificación y ejecución",
    ],
  },
  {
    id: "mecanicos",
    title: "Servicios mecánicos",
    photo: "/fotos/mantenimiento-preventivo.webp",
    alt: "Técnico con casco realizando mantenimiento preventivo en una máquina",
    items: [
      "Inspección periódica de motores y bombas",
      "Mantenimiento preventivo de llenadoras, etiquetadoras, empacadoras y paletizadoras",
      "Reparaciones y reacondicionamientos",
      "Instalaciones y comisionamientos",
    ],
  },
  {
    id: "neumaticos",
    title: "Servicios neumáticos",
    photo: "/fotos/servicios-mecanicos.webp",
    alt: "Técnico conectando mangueras neumáticas en un actuador",
    items: [
      "Diseño de sistemas neumáticos",
      "Confección de paneles",
      "Reacondicionamientos neumáticos",
      "Detección de fugas por ultrasonido",
      "Entrenamiento para personal técnico y operativo",
    ],
  },
  {
    id: "estructuras",
    title: "Ensamblajes y estructuras",
    photo: "/fotos/transportador-tornillo.webp",
    alt: "Transportador de tornillo de acero inoxidable en fabricación",
    items: [
      "Cintas transportadoras",
      "Mezcladores",
      "Molinos de martillos",
      "Elevadores de cangilones",
      "Transportadores de tornillo",
      "Estructuras metálicas",
    ],
  },
  {
    id: "automatizacion",
    title: "Automatización industrial",
    photo: "/fotos/programacion-plcs.webp",
    alt: "Laptop programando un PLC conectado a un tablero de control",
    items: [
      "Diseño de procesos con automatización industrial",
      "Programación de PLC y HMI",
      "Integración y mantenimiento de variadores de frecuencia",
      "Implementación de sistemas SCADA",
      "Industria 4.0",
      "Entrenamientos técnicos",
    ],
  },
];

export const SUPPLY_ITEMS = [
  "Asesoría técnica para seleccionar equipos de aplicaciones industriales",
  "Equipos eléctricos y componentes electrónicos",
  "Equipos neumáticos",
  "Motores y variadores de frecuencia",
  "Sensores",
];

export const CLIENTS = [
  { name: "Colgate-Palmolive", logo: "/logos/colgate-palmolive.svg" },
  { name: "Krones", logo: "/logos/krones.svg" },
  { name: "Pan American Silver", logo: "/logos/pan-american-silver.svg" },
  { name: "EEGSA", logo: "/logos/eegsa.webp" },
  { name: "Cemix", logo: "/logos/cemix.webp" },
  { name: "Universidad Rafael Landívar", logo: "/logos/universidad-rafael-landivar.webp" },
  { name: "Gourmet", logo: "/logos/gourmet.webp" },
  { name: "Bottling Maintenance Corporation", logo: "/logos/bmc.webp" },
  { name: "Tortiamigos", logo: "/logos/tortiamigos.webp" },
  { name: "Quilubrisa", logo: "/logos/quilubrisa.webp" },
  { name: "Sensa Automation", logo: "/logos/sensa.webp" },
  { name: "IASA", logo: "/logos/iasa.webp" },
  { name: "ESINSA", logo: "/logos/esinsa.webp" },
  { name: "MPI S.A.", logo: "/logos/mpi.webp" },
  { name: "Isertec", logo: "/logos/isertec.webp" },
  { name: "Ompro Electric", logo: "/logos/ompro-electric.webp" },
  { name: "Prosain", logo: "/logos/prosain.webp" },
  { name: "Imperial Textile", logo: "/logos/imperial-textile.webp" },
];

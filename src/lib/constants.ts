export const COMPANY = {
  name: 'Bauelemente Kasten',
  fullName: 'Olaf Kasten Bauelemente',
  owner: 'Olaf Kasten',
  address: {
    street: 'Schillerstraße 19',
    zip: '19258',
    city: 'Boizenburg',
  },
  phone: '038847 54362',
  mobile: '0172 305 99 21',
  email: 'info@bauelemente-kasten.de',
  taxId: '087/237/00109',
  clearanceCert: '72304158',
} as const;

export const NAV_ITEMS = [
  { label: 'Startseite', href: '/' },
  {
    label: 'Produkte',
    href: '#',
    children: [
      { label: 'Rollläden', href: '/rolllaeden' },
      { label: 'Terrassendächer', href: '/terrassendaecher' },
      { label: 'Fenster & Türen', href: '/fenster-tueren' },
      { label: 'Reparaturservice', href: '/reparatur' },
    ],
  },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Produktvorschau', href: '/visualizer' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;

export const PRODUCTS = {
  rolllaeden: {
    title: 'Rollläden & Sonnenschutz',
    slug: 'rolllaeden',
    shortDescription: 'Rollläden, Markisen, Raffstore und Insektenschutz für Ihr Zuhause.',
    description: 'Schützen Sie Ihr Zuhause mit unseren erstklassigen Sonnenschutzlösungen. Von Rollläden über Markisen bis hin zu Raffstore-Systemen — wir bieten individuelle Lösungen für jeden Bedarf.',
    features: [
      { title: 'Rollläden', description: 'Schutz vor Sonne, Kälte und Einbruch. In verschiedenen Materialien und Farben.' },
      { title: 'Markisen', description: 'Sonnenschutz für Terrasse und Balkon in allen Größen und Designs.' },
      { title: 'Raffstore', description: 'Außenliegender Sonnenschutz mit verstellbaren Lamellen für optimale Lichtsteuerung.' },
      { title: 'Insektenschutz', description: 'Fliegengitter und Insektenschutzrollos für Fenster und Türen.' },
      { title: 'Rollos', description: 'Innenrollos für Sicht- und Sonnenschutz in vielfältigen Designs.' },
    ],
    image: '/images/products/rolllaeden/rollladen-haus.png',
    gallery: ['/images/products/rolllaeden/rollladen-haus.png'],
  },
  terrassendaecher: {
    title: 'Terrassendächer',
    slug: 'terrassendaecher',
    shortDescription: 'Erweitern Sie Ihren Außenbereich mit einem hochwertigen Terrassendach.',
    description: 'Ein Terrassendach ist eine großartige Möglichkeit, Ihren Außenbereich das ganze Jahr über zu nutzen. Wir bieten verschiedene Ausführungen, Größen und Farben — passend zu Ihrem Haus.',
    features: [
      { title: 'Aluminium-Konstruktion', description: 'Robust, langlebig und wartungsarm in verschiedenen Farben.' },
      { title: 'Verschiedene Glasarten', description: 'Klarglas, getöntes Glas oder Opalglas — je nach Wunsch.' },
      { title: 'Maßanfertigung', description: 'Jedes Terrassendach wird individuell für Ihre Terrasse gefertigt.' },
      { title: 'Optionale Seitenwände', description: 'Wind- und Wetterschutz durch Glas-Schiebewände.' },
    ],
    image: '/images/products/terrassendaecher/terrassendach-monteur.png',
    gallery: ['/images/products/terrassendaecher/terrassendach-familie.png', '/images/products/terrassendaecher/terrassendach-innen.png', '/images/hero/terrassendach-bau.png'],
  },
  'fenster-tueren': {
    title: 'Fenster & Haustüren',
    slug: 'fenster-tueren',
    shortDescription: 'Moderne Fenster und Haustüren für Sicherheit und Energieeffizienz.',
    description: 'Investieren Sie in Sicherheit und Energieeffizienz mit unseren hochwertigen Fenstern und Haustüren. Wir beraten, liefern und montieren — alles aus einer Hand.',
    features: [
      { title: 'Einbruchschutz', description: 'Zertifizierte Sicherheitsfenster und -türen für Ihr Zuhause.' },
      { title: 'Wärmedämmung', description: 'Moderne Mehrkammer-Profile für beste Energieeffizienz.' },
      { title: 'Materialvielfalt', description: 'PVC, Aluminium oder Holz-Aluminium — wir beraten Sie.' },
      { title: 'Fachgerechte Montage', description: 'Professionelle Installation durch unser erfahrenes Team.' },
    ],
    image: '/images/products/fenster-tueren/fenster-montage.png',
    gallery: ['/images/products/fenster-tueren/fenster-einbau.png', '/images/products/fenster-tueren/fenster-aussen.png'],
  },
  reparatur: {
    title: 'Reparaturservice',
    slug: 'reparatur',
    shortDescription: 'Fachmännische Reparaturen an Rollläden, Fenstern und Türen.',
    description: 'Defekte Rollläden, klemmende Fenster oder undichte Türen? Unser Reparaturservice hilft schnell und zuverlässig. Wir identifizieren das Problem und finden die beste Lösung.',
    features: [
      { title: 'Schnelle Hilfe', description: 'Zeitnahe Terminvergabe für dringende Reparaturen.' },
      { title: 'Alle Marken', description: 'Reparatur von Produkten aller gängigen Hersteller.' },
      { title: 'Ersatzteile', description: 'Zugang zu Original-Ersatzteilen für langlebige Reparaturen.' },
      { title: 'Festpreise', description: 'Transparente Preisgestaltung ohne versteckte Kosten.' },
    ],
    image: '/images/products/rolllaeden/rollladen-haus.png',
    gallery: ['/images/gallery/montage-van.png'],
  },
} as const;

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:4000/api/v1';

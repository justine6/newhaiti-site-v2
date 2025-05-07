"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Facebook,
  Youtube,
  Menu,
  X,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Send,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

// Language translations
const translations = {
  en: {
    language: "English",
    nav: {
      home: "Home",
      vision: "Vision",
      map: "Haiti Map",
      appeal: "Appeal",
      projects: "Projects",
      // team: "Our Team",
      // join: "Join Us",
      contact: "Contact",
    },
    hero: {
      title: "New Haiti Team 2075",
      subtitle: "Restoring Dignity. Rebuilding Hope.",
      joinButton: "Join the Movement",
      visionButton: "Read the Vision",
    },
    visionary: {
      heading: "A Message from Dr. Frantz Lamour",
      paragraph:
        "This is not about politics. It's about peace, healing, and giving our children a better tomorrow. We don't seek power — we're restoring it to the people.",
    },
    map: {
      title: "Haiti United",
      paragraph1:
        "Our vision encompasses all of Haiti, from north to south, east to west. We are working to restore peace and prosperity across the entire nation, bringing communities together in a shared vision of a better future.",
      paragraph2:
        "The New Haiti Team 2075 is committed to projects that benefit all Haitians, regardless of location, background, or political affiliation.",
    },
    appeal: {
      title: "Lay Down Your Weapons",
      quote:
        "We call on all armed groups to join us in rebuilding our communities. Together, we can create a Haiti where our children can grow up in safety and prosperity.",
    },
    projects: {
      title: "Peace Restoration Projects",
      items: [
        {
          title: "Community Cleaning & Sanitation",
          summary: "Improving public health through clean environments",
        },
        {
          title: "Youth Education Programs",
          summary: "Investing in the future through knowledge",
        },
        {
          title: "Infrastructure Rebuilding",
          summary: "Restoring essential services and structures",
        },
        {
          title: "Healthcare Access",
          summary: "Bringing medical care to all communities",
        },
        {
          title: "Agricultural Development",
          summary: "Ensuring food security and sustainability",
        },
        {
          title: "Vocational Training",
          summary: "Building skills for economic independence",
        },
        {
          title: "Cultural Preservation",
          summary: "Celebrating and protecting Haitian heritage",
        },
        {
          title: "Conflict Resolution",
          summary: "Creating peaceful dialogue between communities",
        },
        {
          title: "Women's Empowerment",
          summary: "Supporting gender equality and opportunity",
        },
        {
          title: "Environmental Protection",
          summary: "Safeguarding Haiti's natural resources",
        },
        {
          title: "Digital Inclusion",
          summary: "Bridging the technology gap for all Haitians",
        },
      ],
    },
    team: {
      title: "Meet Our Core Team",
      subtitle:
        "Dedicated individuals working together to build a better Haiti",
      members: [
        {
          name: "Dr. Frantz Lamour",
          role: "Founder & Visionary",
          bio: "Dr. Frantz Lamour is a respected community leader with over 20 years of experience in social development and peace-building initiatives. His vision for a united Haiti drives our mission.",
          social: {
            twitter: "#",
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Marie Joseph",
          role: "Community Outreach Director",
          bio: "Marie has dedicated her career to grassroots organizing and community development. She leads our efforts to engage with local communities and build sustainable partnerships.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
        {
          name: "Jean-Michel Baptiste",
          role: "Education Programs Lead",
          bio: "With a background in educational policy and curriculum development, Jean-Michel oversees our youth education initiatives and vocational training programs.",
          social: {
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Claudette Toussaint",
          role: "Healthcare Coordinator",
          bio: "Dr. Toussaint brings her medical expertise to our healthcare access programs, ensuring that essential medical services reach underserved communities.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
      ],
    },
    cta: {
      heading: "Let's Build the Future Together",
      quote: "Put down your weapons and pick up your tools.",
      volunteerButton: "Volunteer",
      shareButton: "Share This Vision",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have questions or want to get involved? Reach out to us.",
      name: "Your Name",
      email: "Your Email",
      subject: "Subject",
      message: "Your Message",
      submit: "Send Message",
      success: "Message sent successfully! We'll get back to you soon.",
      error: "There was an error sending your message. Please try again.",
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      contactInfo: "Contact Information",
      address: "Port-au-Prince, Haiti",
      phone: "+509 43607248",
      phone2: "918-640-8249",
      emailAddress: "nouvoayiti2075@gmail.com",
    },
    footer: {
      tagline:
        "New Haiti Team 2075 | For a Peaceful, Prosperous, and United Haiti",
      legal: "This is a non-political, peace-driven citizen initiative.",
      backToTop: "Back to top",
    },
  },
  ht: {
    language: "Kreyòl Ayisyen",
    nav: {
      home: "Akèy",
      vision: "Vizyon",
      map: "Kat Ayiti",
      appeal: "Apèl",
      projects: "Pwojè",
      team: "Ekip Nou",
      join: "Rejwenn Nou",
      contact: "Kontakte",
    },
    hero: {
      title: "Nouvo Ekip Ayiti 2075",
      subtitle: "Restore Diyite. Rebati Espwa.",
      joinButton: "Rejwenn Mouvman an",
      visionButton: "Li Vizyon an",
    },
    visionary: {
      heading: "Yon Mesaj de Dr. Frantz Lamour",
      paragraph:
        "Sa pa gen anyen pou wè ak politik. Se pou lapè, gerizon, ak bay timoun nou yo yon demen ki pi bon. Nou pa chèche pouvwa — n ap restore li bay pèp la.",
    },
    map: {
      title: "Ayiti Ini",
      paragraph1:
        "Vizyon nou anbrasse tout Ayiti, soti nan nò rive nan sid, lès rive nan lwès. N ap travay pou restore lapè ak pwosperite nan tout peyi a, rasanble kominote yo nan yon vizyon pataje pou yon pi bon avni.",
      paragraph2:
        "Nouvo Ekip Ayiti 2075 angaje nan pwojè ki benefisye tout Ayisyen, kèlkeswa kote yo ye, orijin yo, oswa afilyasyon politik yo.",
    },
    appeal: {
      title: "Depoze Zam Ou Yo",
      quote:
        "Nou mande tout gwoup ame yo pou yo vin jwenn nou nan rebati kominote nou yo. Ansanm, nou ka kreye yon Ayiti kote timoun nou yo ka grandi nan sekirite ak pwosperite.",
    },
    projects: {
      title: "Pwojè Restorasyon Lapè",
      items: [
        {
          title: "Netwayaj ak Sanitasyon Kominotè",
          summary: "Amelyore sante piblik atravè anviwònman pwòp",
        },
        {
          title: "Pwogram Edikasyon Jèn",
          summary: "Envesti nan lavni atravè konesans",
        },
        {
          title: "Rekonstriksyon Enfrastrikti",
          summary: "Restore sèvis esansyèl ak estrikti",
        },
        {
          title: "Aksè a Swen Sante",
          summary: "Pote swen medikal nan tout kominote yo",
        },
        {
          title: "Devlopman Agrikòl",
          summary: "Asire sekirite alimantè ak dirab",
        },
        {
          title: "Fòmasyon Pwofesyonèl",
          summary: "Bati konpetans pou endepandans ekonomik",
        },
        {
          title: "Prezèvasyon Kiltirèl",
          summary: "Selebre ak pwoteje eritaj ayisyen",
        },
        {
          title: "Rezolisyon Konfli",
          summary: "Kreye dyalòg pasifik ant kominote yo",
        },
        { title: "Pouvwa Fanm", summary: "Sipòte egalite sèks ak opòtinite" },
        {
          title: "Pwoteksyon Anviwònman",
          summary: "Pwoteje resous natirèl Ayiti",
        },
        {
          title: "Enklizyon Dijital",
          summary: "Konble eka teknolojik pou tout Ayisyen",
        },
      ],
    },
    team: {
      title: "Rankontre Ekip Santral Nou",
      subtitle: "Moun devwe k ap travay ansanm pou bati yon Ayiti ki pi bon",
      members: [
        {
          name: "Dr. Frantz Lamour",
          role: "Fondatè & Vizyonè",
          bio: "Dr. Frantz Lamour se yon lidè kominotè respekte ki gen plis pase 20 lane eksperyans nan devlopman sosyal ak inisyativ pou bati lapè. Vizyon li pou yon Ayiti ini kondwi misyon nou.",
          social: {
            twitter: "#",
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Marie Joseph",
          role: "Direktris Sansibilizasyon Kominotè",
          bio: "Marie te dedye karyè li nan òganizasyon popilè ak devlopman kominotè. Li dirije efò nou yo pou angaje ak kominote lokal yo epi bati patenarya dirab.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
        {
          name: "Jean-Michel Baptiste",
          role: "Responsab Pwogram Edikasyon",
          bio: "Avèk yon background nan politik edikasyonèl ak devlopman kourikoulòm, Jean-Michel sipèvize inisyativ edikasyon jèn nou yo ak pwogram fòmasyon pwofesyonèl yo.",
          social: {
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Claudette Toussaint",
          role: "Kowòdonatris Swen Sante",
          bio: "Dr. Toussaint pote ekspètiz medikal li nan pwogram aksè swen sante nou yo, asire ke sèvis medikal esansyèl yo rive nan kominote ki pa byen desèvi yo.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
      ],
    },
    cta: {
      heading: "Ann Bati Lavni Ansanm",
      quote: "Depoze zam ou epi pran zouti ou.",
      volunteerButton: "Volontè",
      shareButton: "Pataje Vizyon Sa a",
    },
    contact: {
      title: "Kontakte Nou",
      subtitle: "Ou gen kesyon oswa ou vle patisipe? Kontakte nou.",
      name: "Non Ou",
      email: "Imèl Ou",
      subject: "Sijè",
      message: "Mesaj Ou",
      submit: "Voye Mesaj",
      success: "Mesaj la voye avèk siksè! N ap retounen jwenn ou byento.",
      error: "Te gen yon erè lè n ap voye mesaj ou a. Tanpri eseye ankò.",
      required: "Chan sa a obligatwa",
      invalidEmail: "Tanpri antre yon adrès imèl ki valid",
      contactInfo: "Enfòmasyon Kontak",
      address: "Pòtoprens, Ayiti",
      phone: "+509 xxxx xxxx",
      emailAddress: "contact@newhaititeam2075.org",
    },
    footer: {
      tagline: "Nouvo Ekip Ayiti 2075 | Pou yon Ayiti Pasifik, Pwospè, ak Ini",
      legal: "Sa a se yon inisyativ sitwayen ki pa politik, ki chache lapè.",
      backToTop: "Retounen anlè",
    },
  },
  fr: {
    language: "Français",
    nav: {
      home: "Accueil",
      vision: "Vision",
      map: "Carte d'Haïti",
      appeal: "Appel",
      projects: "Projets",
      team: "Notre Équipe",
      join: "Rejoignez-nous",
      contact: "Contact",
    },
    hero: {
      title: "Nouvelle Équipe Haïti 2075",
      subtitle: "Restaurer la Dignité. Reconstruire l'Espoir.",
      joinButton: "Rejoindre le Mouvement",
      visionButton: "Lire la Vision",
    },
    visionary: {
      heading: "Un Message du Dr. Frantz Lamour",
      paragraph:
        "Il ne s'agit pas de politique. Il s'agit de paix, de guérison et d'offrir à nos enfants un avenir meilleur. Nous ne cherchons pas le pouvoir — nous le rendons au peuple.",
    },
    map: {
      title: "Haïti Unie",
      paragraph1:
        "Notre vision englobe tout Haïti, du nord au sud, de l'est à l'ouest. Nous travaillons à restaurer la paix et la prospérité dans tout le pays, en rassemblant les communautés autour d'une vision partagée d'un avenir meilleur.",
      paragraph2:
        "La Nouvelle Équipe Haïti 2075 s'engage dans des projets qui bénéficient à tous les Haïtiens, indépendamment de leur lieu, de leur origine ou de leur affiliation politique.",
    },
    appeal: {
      title: "Déposez Vos Armes",
      quote:
        "Nous appelons tous les groupes armés à nous rejoindre pour reconstruire nos communautés. Ensemble, nous pouvons créer une Haïti où nos enfants peuvent grandir en sécurité et prospérité.",
    },
    projects: {
      title: "Projets de Restauration de la Paix",
      items: [
        {
          title: "Nettoyage et Assainissement Communautaire",
          summary: "Améliorer la santé publique par des environnements propres",
        },
        {
          title: "Programmes d'Éducation des Jeunes",
          summary: "Investir dans l'avenir par la connaissance",
        },
        {
          title: "Reconstruction des Infrastructures",
          summary: "Restaurer les services et structures essentiels",
        },
        {
          title: "Accès aux Soins de Santé",
          summary: "Apporter des soins médicaux à toutes les communautés",
        },
        {
          title: "Développement Agricole",
          summary: "Assurer la sécurité alimentaire et la durabilité",
        },
        {
          title: "Formation Professionnelle",
          summary: "Développer des compétences pour l'indépendance économique",
        },
        {
          title: "Préservation Culturelle",
          summary: "Célébrer et protéger le patrimoine haïtien",
        },
        {
          title: "Résolution des Conflits",
          summary: "Créer un dialogue pacifique entre les communautés",
        },
        {
          title: "Autonomisation des Femmes",
          summary: "Soutenir l'égalité des sexes et les opportunités",
        },
        {
          title: "Protection de l'Environnement",
          summary: "Sauvegarder les ressources naturelles d'Haïti",
        },
        {
          title: "Inclusion Numérique",
          summary: "Combler le fossé technologique pour tous les Haïtiens",
        },
      ],
    },
    team: {
      title: "Rencontrez Notre Équipe Principale",
      subtitle:
        "Des personnes dévouées travaillant ensemble pour construire un Haïti meilleur",
      members: [
        {
          name: "Dr. Frantz Lamour",
          role: "Fondateur & Visionnaire",
          bio: "Dr. Frantz Lamour est un leader communautaire respecté avec plus de 20 ans d'expérience dans le développement social et les initiatives de consolidation de la paix. Sa vision d'un Haïti uni guide notre mission.",
          social: {
            twitter: "#",
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Marie Joseph",
          role: "Directrice de Sensibilisation Communautaire",
          bio: "Marie a consacré sa carrière à l'organisation communautaire et au développement local. Elle dirige nos efforts pour engager les communautés locales et construire des partenariats durables.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
        {
          name: "Jean-Michel Baptiste",
          role: "Responsable des Programmes Éducatifs",
          bio: "Avec une formation en politique éducative et en développement de programmes, Jean-Michel supervise nos initiatives d'éducation des jeunes et nos programmes de formation professionnelle.",
          social: {
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Claudette Toussaint",
          role: "Coordinatrice des Soins de Santé",
          bio: "Dr. Toussaint apporte son expertise médicale à nos programmes d'accès aux soins de santé, en veillant à ce que les services médicaux essentiels atteignent les communautés mal desservies.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
      ],
    },
    cta: {
      heading: "Construisons l'Avenir Ensemble",
      quote: "Déposez vos armes et prenez vos outils.",
      volunteerButton: "Devenir Bénévole",
      shareButton: "Partager Cette Vision",
    },
    contact: {
      title: "Contactez-nous",
      subtitle:
        "Vous avez des questions ou souhaitez vous impliquer? Contactez-nous.",
      name: "Votre Nom",
      email: "Votre Email",
      subject: "Sujet",
      message: "Votre Message",
      submit: "Envoyer le Message",
      success: "Message envoyé avec succès! Nous vous répondrons bientôt.",
      error:
        "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
      required: "Ce champ est obligatoire",
      invalidEmail: "Veuillez entrer une adresse email valide",
      contactInfo: "Informations de Contact",
      address: "Port-au-Prince, Haïti",
      phone: "+509 xxxx xxxx",
      emailAddress: "contact@newhaititeam2075.org",
    },
    footer: {
      tagline:
        "Nouvelle Équipe Haïti 2075 | Pour une Haïti Pacifique, Prospère et Unie",
      legal:
        "Ceci est une initiative citoyenne non politique, axée sur la paix.",
      backToTop: "Retour en haut",
    },
  },
  es: {
    language: "Español",
    nav: {
      home: "Inicio",
      vision: "Visión",
      map: "Mapa de Haití",
      appeal: "Llamamiento",
      projects: "Proyectos",
      team: "Nuestro Equipo",
      join: "Únete",
      contact: "Contacto",
    },
    hero: {
      title: "Nuevo Equipo Haití 2075",
      subtitle: "Restaurando la Dignidad. Reconstruyendo la Esperanza.",
      joinButton: "Únete al Movimiento",
      visionButton: "Lee la Visión",
    },
    visionary: {
      heading: "Un Mensaje del Dr. Frantz Lamour",
      paragraph:
        "Esto no se trata de política. Se trata de paz, sanación y dar a nuestros hijos un mañana mejor. No buscamos el poder — lo estamos devolviendo al pueblo.",
    },
    map: {
      title: "Haití Unido",
      paragraph1:
        "Nuestra visión abarca todo Haití, de norte a sur, de este a oeste. Estamos trabajando para restaurar la paz y la prosperidad en toda la nación, uniendo a las comunidades en una visión compartida de un futuro mejor.",
      paragraph2:
        "El Nuevo Equipo Haití 2075 está comprometido con proyectos que beneficien a todos los haitianos, independientemente de su ubicación, origen o afiliación política.",
    },
    appeal: {
      title: "Depongan Sus Armas",
      quote:
        "Hacemos un llamado a todos los grupos armados para que se unan a nosotros en la reconstrucción de nuestras comunidades. Juntos, podemos crear un Haití donde nuestros hijos puedan crecer en seguridad y prosperidad.",
    },
    projects: {
      title: "Proyectos de Restauración de la Paz",
      items: [
        {
          title: "Limpieza y Saneamiento Comunitario",
          summary: "Mejorando la salud pública a través de ambientes limpios",
        },
        {
          title: "Programas de Educación Juvenil",
          summary: "Invirtiendo en el futuro a través del conocimiento",
        },
        {
          title: "Reconstrucción de Infraestructura",
          summary: "Restaurando servicios y estructuras esenciales",
        },
        {
          title: "Acceso a la Atención Médica",
          summary: "Llevando atención médica a todas las comunidades",
        },
        {
          title: "Desarrollo Agrícola",
          summary: "Asegurando la seguridad alimentaria y la sostenibilidad",
        },
        {
          title: "Formación Profesional",
          summary: "Desarrollando habilidades para la independencia económica",
        },
        {
          title: "Preservación Cultural",
          summary: "Celebrando y protegiendo el patrimonio haitiano",
        },
        {
          title: "Resolución de Conflictos",
          summary: "Creando diálogo pacífico entre comunidades",
        },
        {
          title: "Empoderamiento de la Mujer",
          summary: "Apoyando la igualdad de género y las oportunidades",
        },
        {
          title: "Protección Ambiental",
          summary: "Salvaguardando los recursos naturales de Haití",
        },
        {
          title: "Inclusión Digital",
          summary: "Cerrando la brecha tecnológica para todos los haitianos",
        },
      ],
    },
    team: {
      title: "Conozca a Nuestro Equipo Principal",
      subtitle:
        "Personas dedicadas trabajando juntas para construir un Haití mejor",
      members: [
        {
          name: "Dr. Frantz Lamour",
          role: "Fundador y Visionario",
          bio: "El Dr. Frantz Lamour es un respetado líder comunitario con más de 20 años de experiencia en desarrollo social e iniciativas de construcción de paz. Su visión de un Haití unido impulsa nuestra misión.",
          social: {
            twitter: "#",
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Marie Joseph",
          role: "Directora de Alcance Comunitario",
          bio: "Marie ha dedicado su carrera a la organización de base y al desarrollo comunitario. Ella lidera nuestros esfuerzos para interactuar con las comunidades locales y construir asociaciones sostenibles.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
        {
          name: "Jean-Michel Baptiste",
          role: "Líder de Programas Educativos",
          bio: "Con experiencia en política educativa y desarrollo curricular, Jean-Michel supervisa nuestras iniciativas de educación juvenil y programas de formación profesional.",
          social: {
            linkedin: "#",
            website: "#",
          },
        },
        {
          name: "Claudette Toussaint",
          role: "Coordinadora de Atención Médica",
          bio: "La Dra. Toussaint aporta su experiencia médica a nuestros programas de acceso a la atención médica, asegurando que los servicios médicos esenciales lleguen a las comunidades desatendidas.",
          social: {
            twitter: "#",
            linkedin: "#",
          },
        },
      ],
    },
    cta: {
      heading: "Construyamos el Futuro Juntos",
      quote: "Depongan sus armas y tomen sus herramientas.",
      volunteerButton: "Voluntariado",
      shareButton: "Compartir Esta Visión",
    },
    contact: {
      title: "Contáctenos",
      subtitle:
        "¿Tiene preguntas o desea involucrarse? Póngase en contacto con nosotros.",
      name: "Su Nombre",
      email: "Su Email",
      subject: "Asunto",
      message: "Su Mensaje",
      submit: "Enviar Mensaje",
      success: "¡Mensaje enviado con éxito! Le responderemos pronto.",
      error:
        "Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo.",
      required: "Este campo es obligatorio",
      invalidEmail: "Por favor, introduzca una dirección de email válida",
      contactInfo: "Información de Contacto",
      address: "Puerto Príncipe, Haití",
      phone: "+509 xxxx xxxx",
      emailAddress: "contact@newhaititeam2075.org",
    },
    footer: {
      tagline:
        "Nuevo Equipo Haití 2075 | Por un Haití Pacífico, Próspero y Unido",
      legal:
        "Esta es una iniciativa ciudadana no política, impulsada por la paz.",
      backToTop: "Volver arriba",
    },
  },
};

// Form validation types
type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

// Form data type
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ht" | "fr" | "es">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const t = translations[language];

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // References to section elements
  const homeRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const appealRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const joinRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Function to handle navigation click and close mobile menu
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionRef: React.RefObject<HTMLElement>
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Scroll to the section
    if (sectionRef.current) {
      const headerHeight = 80; // Adjust based on your header height
      const sectionTop = sectionRef.current.offsetTop - headerHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.contact.invalidEmail;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.contact.required;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast({
        title: "Success",
        description: t.contact.success,
        variant: "default",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // Show error message
      toast({
        title: "Error",
        description: t.contact.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Try again">{t.contact.submit}</ToastAction>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with language switcher and navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/images/newhaitilogo-1.JPG"
              alt="Lion Logo"
              width={80}
              height={180}
              className="rounded-full"
            />
            <div className="font-bold text-[#00209F]">New Haiti Team 2075</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, homeRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.home}
            </a>
            <a
              href="#vision"
              onClick={(e) => handleNavClick(e, visionRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.vision}
            </a>
            <a
              href="#map"
              onClick={(e) => handleNavClick(e, mapRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.map}
            </a>
            <a
              href="#appeal"
              onClick={(e) => handleNavClick(e, appealRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.appeal}
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, projectsRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.projects}
            </a>
            <a
              href="#team"
              onClick={(e) => handleNavClick(e, teamRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.team}
            </a>
            <a
              href="#join"
              onClick={(e) => handleNavClick(e, joinRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.join}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, contactRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.contact}
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 ml-4 hover:bg-gray-100 transition-colors"
                >
                  {t.language} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ht")}>
                  Kreyòl Ayisyen
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("fr")}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("es")}>
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 hover:bg-gray-100 transition-colors"
                >
                  {t.language} <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ht")}>
                  Kreyòl Ayisyen
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("fr")}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("es")}>
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t py-4 px-4 flex flex-col gap-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, homeRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.home}
            </a>
            <a
              href="#vision"
              onClick={(e) => handleNavClick(e, visionRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.vision}
            </a>
            <a
              href="#map"
              onClick={(e) => handleNavClick(e, mapRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.map}
            </a>
            <a
              href="#appeal"
              onClick={(e) => handleNavClick(e, appealRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.appeal}
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, projectsRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.projects}
            </a>
            <a
              href="#team"
              onClick={(e) => handleNavClick(e, teamRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.team}
            </a>
            <a
              href="#join"
              onClick={(e) => handleNavClick(e, joinRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.join}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, contactRef)}
              className="text-sm font-medium hover:text-[#00209F] transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          ref={homeRef}
          id="home"
          className="relative h-[50vh] flex items-center"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/haiti-map.png"
              alt="Haiti Map"
              fill
              className="object-contain md:object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
                <Image
                  src="images/newhaitilogo-1.JPG"
                  alt="Lion Logo"
                  width={150}
                  height={150}
                  className="rounded-full shadow-lg"
                />
              </div>
              <div className="md:w-3/4">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center md:text-left">
                  {t.hero.title}
                </h1>
                <p className="text-lg md:text-xl mb-4 text-center md:text-left">
                  {t.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button
                    className="bg-[#D21034] hover:bg-[#D21034]/80 text-white w-full sm:w-auto transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (joinRef.current) {
                        const headerHeight = 80;
                        const sectionTop =
                          joinRef.current.offsetTop - headerHeight;
                        window.scrollTo({
                          top: sectionTop,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    {t.hero.joinButton}
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/10 w-full sm:w-auto transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (visionRef.current) {
                        const headerHeight = 80;
                        const sectionTop =
                          visionRef.current.offsetTop - headerHeight;
                        window.scrollTo({
                          top: sectionTop,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    {t.hero.visionButton}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section - Positioned right after hero but still in first fold */}
        <section className="py-4 bg-gradient-to-b from-black/90 to-[#00209F]/90 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Prezidan Kiyawel
                </h2>
                <p className="text-lg mb-4">
                  Dr. Frantz Lamour discusses the important questions
                  surrounding Prezidan Kiyawel and the future of Haiti's
                  leadership.
                </p>
                <p className="text-sm opacity-75 mb-4">
                  Video by Ayiti Avèk Doktè Lamour: Exploring Haitian politics,
                  security, and sustainable solutions for Haiti's future.
                </p>
                <Button
                  className="bg-[#D21034] hover:bg-[#D21034]/80 text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    if (visionRef.current) {
                      const headerHeight = 80;
                      const sectionTop =
                        visionRef.current.offsetTop - headerHeight;
                      window.scrollTo({
                        top: sectionTop,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  Read Our Vision
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/3n29GsJmx-Q"
                    title="Where is Kiawel? What is he doing? Why isn't he talking?"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visionary Statement */}
        <section ref={visionRef} id="vision" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <p className="text-xl max-w-3xl mx-auto text-center">
              {t.visionary.paragraph}
            </p>
          </div>
        </section>

        {/* Haiti Map Section */}
        <section ref={mapRef} id="map" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-[#00209F]">
                  {t.map.title}
                </h2>
                <p className="text-lg mb-4">{t.map.paragraph1}</p>
                <p className="text-lg">{t.map.paragraph2}</p>
              </div>
              <div className="md:w-1/2 relative">
                <div className="aspect-video relative overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src="/images/haiti-map.png"
                    alt="Map of Haiti"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appeal to Armed Groups */}
        <section
          ref={appealRef}
          id="appeal"
          className="py-16 bg-[#00209F] text-white"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <Image
                src="/images/newhaitilogo-1.JPG"
                alt="Lion Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <h2 className="text-3xl font-bold">{t.appeal.title}</h2>
            </div>
            <blockquote className="text-2xl max-w-3xl mx-auto italic">
              "{t.appeal.quote}"
            </blockquote>
          </div>
        </section>

        {/* Peace Restoration Projects */}
        <section ref={projectsRef} id="projects" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#00209F]">
              {t.projects.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.projects.items.map((project, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#00209F] rounded-full mb-4 flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section
        <section ref={teamRef} id="team" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-[#00209F]">
              {t.team.title}
            </h2>
            <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
              {t.team.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.team.members.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-[#00209F]/80 to-[#D21034]/80 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-[#00209F]">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-[#D21034] font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 mb-6">{member.bio}</p>
                    <div className="flex gap-3">
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="text-gray-500 hover:text-[#00209F] transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Twitter</span>
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="text-gray-500 hover:text-[#00209F] transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      )}
                      {member.social.website && (
                        <a
                          href={member.social.website}
                          className="text-gray-500 hover:text-[#00209F] transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                          <span className="sr-only">Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Call to Action */}
        <section
          ref={joinRef}
          id="join"
          className="py-16 bg-[#D21034] text-white"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t.cta.heading}</h2>
            <p className="text-2xl mb-8 italic">"{t.cta.quote}"</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-[#D21034] hover:bg-white/90 transition-colors">
                {t.cta.volunteerButton}
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10 transition-colors"
              >
                {t.cta.shareButton}
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section ref={contactRef} id="contact" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-[#00209F]">
              {t.contact.title}
            </h2>
            <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6 text-[#00209F]">
                  {t.contact.contactInfo}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-[#D21034] mt-1" />
                    <div>
                      <p className="font-medium">{t.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-[#D21034] mt-1" />
                    <div>
                      <p className="font-medium">{t.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-[#D21034] mt-1" />
                    <div>
                      <p className="font-medium">{t.contact.emailAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <div className="flex justify-center gap-6">
                    <a
                      href="#"
                      className="text-[#00209F] hover:text-[#D21034] transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="text-[#00209F] hover:text-[#D21034] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                        <path d="M3 7l9 6l9 -6"></path>
                      </svg>
                      <span className="sr-only">Email</span>
                    </a>
                    <a
                      href="#"
                      className="text-[#00209F] hover:text-[#D21034] transition-colors"
                    >
                      <Youtube className="h-6 w-6" />
                      <span className="sr-only">YouTube</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="name" className="block mb-2">
                        {t.contact.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="block mb-2">
                        {t.contact.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="subject" className="block mb-2">
                      {t.contact.subject}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="message" className="block mb-2">
                      {t.contact.message}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#00209F] hover:bg-[#00209F]/80 text-white transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{t.contact.submit}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          <span>{t.contact.submit}</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#00209F] text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image
                src="/images/newhaitilogo-1.JPG"
                alt="Lion Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-center md:text-left">{t.footer.tagline}</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                  <path d="M3 7l9 6l9 -6"></path>
                </svg>
                <span className="sr-only">WhatsApp</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div className="text-center text-sm mt-6">{t.footer.legal}</div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-[#00209F] text-white rounded-full shadow-lg hover:bg-[#00209F]/80 transition-all z-50"
          aria-label={t.footer.backToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

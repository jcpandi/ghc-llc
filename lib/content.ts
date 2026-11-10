// All copy is taken from herocleaninggroup.com.
// Images are free-license Unsplash photos — swap for your own shots anytime.

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const brand = {
  name: "Hero Cleaning Group",
  legal: "Hero Cleaning Group LLC",
  phone: "682-281-2498",
  phoneHref: "tel:+16822812498",
  smsHref: "sms:+16822812498",
  email: "herocleaninggroup.llc@gmail.com",
  serviceArea: "Dallas-Fort Worth Metroplex",
  /** Booking calendar (opens in the popup; also the no-JS fallback link) */
  bookingUrl: "https://link.herocleaninggroup.com/widget/bookings/hero-cleaning-walkthroughs",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Commercial Cleaning · Dallas-Fort Worth",
  title: ["Premium Commercial", "Cleaning in DFW"],
  body: "Reliable, responsive, and experienced. We specialize in apartment turnovers, office cleaning, and post-construction for property managers and investors.",
  primary: "Schedule Free Walkthrough",
  secondary: "Explore Services",
  image: "/images/hero-team.png",
};

export const statement =
  "From high-volume apartment turns to detailed office janitorial work, we deliver consistent quality you can count on.";

export const services = {
  title: "Comprehensive Cleaning Services",
  items: [
    {
      title: "Apartment Turnover",
      body: "Fast, reliable cleaning for multifamily units to minimize vacancy days.",
      image: u("1682184805271-11671b7ecf4c"),
    },
    {
      title: "Office Cleaning",
      body: "Daily or weekly janitorial services for a spotless, professional workspace.",
      image: u("1577412647305-991150c7d163"),
    },
    {
      title: "Multifamily Common Areas",
      body: "Keep lobbies, gyms, and hallways pristine for your residents.",
      image: u("1758448721149-aa0ce8e1b2c9"),
    },
    {
      title: "Post-Construction",
      body: "Detailed dust removal and deep cleaning after renovations or new builds.",
      image: u("1698889670677-caac664cfce0"),
    },
  ],
  also: ["STR & Airbnb Turnover", "Model Unit Cleaning", "Move-in/Move-out Cleaning"],
};

export const why = {
  title: "Why Property Managers Trust Hero Cleaning Group",
  body: "We understand the demands of property management and real estate investing. You need a partner who shows up on time, does the job right, and communicates clearly.",
  points: [
    "Dedicated Account Managers for clear communication",
    "Rigorous quality assurance checklists",
    "Fully insured and bonded crews",
    "Flexible scheduling for tight turnaround times",
  ],
  image: u("1627905646269-7f034dcc5738"),
};

export const schedule = {
  title: "Schedule Your Free Call or Walkthrough",
  body: "Choose a convenient time to discuss your cleaning needs, assess your property, and schedule an on-site walkthrough.",
  steps: [
    { title: "Discuss your cleaning needs", body: "Pick a convenient time for a quick call." },
    { title: "Assess your property", body: "We review your units, spaces, and turnaround goals." },
    { title: "On-site walkthrough", body: "We walk the property with you before any work begins." },
  ],
  note: "Questions? Call or text us directly at 682-281-2498.",
};

export const contact = {
  title: "Contact Us",
  body: "Have questions before scheduling? Call or text us directly at 682-281-2498, and our team will be happy to help.",
  cities: ["Dallas, TX", "Fort Worth, TX", "Arlington, TX", "Plano, TX", "Frisco, TX"],
};

export const finalCta = {
  title: "Ready for a Cleaner Property?",
  body: "Let Hero Cleaning Group take the hassle out of your turns and maintenance. Get started today.",
  cta: "Schedule Free Walkthrough",
  image: u("1497366754035-f200968a6e72"),
};

export const footer = {
  blurb:
    "Professional commercial cleaning services in Dallas-Fort Worth, specializing in multifamily, office, and hospitality.",
  services: ["Apartment Turns", "Office Cleaning", "Post-Construction", "STR / Airbnb Turnover"],
  company: [
    { label: "About Us", href: "#why" },
    { label: "Why Choose Us", href: "#why" },
    { label: "Contact", href: "#contact" },
  ],
};

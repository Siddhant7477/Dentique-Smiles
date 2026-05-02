import { useEffect, useState } from "react";
import { HashRouter, Link, Navigate, Route, Routes } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Toaster } from "sonner";
import BookAppointment from "./BookAppointment";
import Dashboard from "./Dashboard";

const services = [
  {
    icon: "\uD83E\uDDB7",
    bg: "bg-mint",
    title: "Teeth Cleaning",
    text: "Professional cleaning for a brighter, healthier smile",
  },
  {
    icon: "\u2728",
    bg: "bg-blush",
    title: "Teeth Whitening",
    text: "Safe, effective whitening for stunning results",
  },
  {
    icon: "\uD83D\uDE0A",
    bg: "bg-lavender",
    title: "Orthodontics",
    text: "Straighten your teeth with modern solutions",
  },
  {
    icon: "\uD83C\uDF3F",
    bg: "bg-mint",
    title: "Root Canal",
    text: "Gentle, pain-free treatment to save your tooth",
  },
  {
    icon: "\u2B50",
    bg: "bg-blush",
    title: "Dental Implants",
    text: "Permanent solution for missing teeth",
  },
  {
    icon: "\uD83C\uDF88",
    bg: "bg-lavender",
    title: "Kids Dentistry",
    text: "Making dental visits fun for little smiles",
  },
];

const highlights = [
  {
    icon: "\uD83C\uDF3F",
    bg: "bg-mint",
    title: "Stress-Free Environment",
    text: "Our calming clinic is designed to ease anxiety and make you feel comfortable from the moment you walk in.",
  },
  {
    icon: "\uD83E\uDDB7",
    bg: "bg-blush",
    title: "Advanced Technology",
    text: "We use the latest dental technology and techniques to ensure precise, efficient, and painless treatments every time.",
  },
  {
    icon: "\u2764\uFE0F",
    bg: "bg-lavender",
    title: "Personalized Care",
    text: "Every patient is unique. We take time to understand your needs and create a treatment plan that's right for you.",
  },
];

const socialLinks = [
  { label: "f", href: "", ariaLabel: "Facebook" },
  { label: "in", href: "", ariaLabel: "LinkedIn" },
  {
    label: "ig",
    href: "https://www.instagram.com/dentique.smiles?igsh=OWNzOHdocjRmZWZo&utm_source=qr",
    ariaLabel: "Instagram dentique.smiles",
  },
];

function scrollToContact(event) {
  event.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToSection(id) {
  return (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    const fallback = window.setTimeout(() => {
      elements.forEach((element) => element.classList.add("visible"));
    }, 700);

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      window.clearTimeout(fallback);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);
}

function Brand({ compact = false, stacked = true }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-mint text-white ${
          compact ? "h-7 w-7 text-sm" : "h-8 w-8 text-base"
        }`}
      >
        {"\uD83E\uDDB7"}
      </span>
      <span className="font-serif text-2xl leading-tight text-ink sm:text-3xl">
        Dentique
        {stacked ? <br /> : " "}
        Smiles
      </span>
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card reveal rounded-card border border-black/5 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
      <div className={`grid h-14 w-14 place-items-center rounded-card ${service.bg} text-2xl`}>
        {service.icon}
      </div>
      <h3 className="mt-7 font-serif text-2xl leading-tight text-ink">{service.title}</h3>
      <p className="mt-4 max-w-[26ch] text-base leading-7 text-slate">{service.text}</p>
      <a
        className="mt-5 inline-flex text-base font-medium text-teal transition hover:text-teal-dark"
        href="#contact"
        onClick={scrollToContact}
      >
        Learn More &rarr;
      </a>
    </article>
  );
}

function Highlight({ item }) {
  return (
    <article className="reveal mx-auto flex max-w-xl flex-col items-center text-center">
      <div className={`grid h-[72px] w-[72px] place-items-center rounded-full ${item.bg} text-3xl`}>
        {item.icon}
      </div>
      <h2 className="mt-7 font-serif text-3xl leading-tight text-ink sm:text-4xl">{item.title}</h2>
      <p className="mt-5 text-base leading-8 text-slate sm:text-lg">{item.text}</p>
    </article>
  );
}

function Home() {
  const [scrolled, setScrolled] = useState(false);

  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-page font-sans text-slate">
      <header className={`glass-nav px-5 py-4 sm:px-8 ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Brand compact />
          <nav className="nav-links flex flex-wrap items-center gap-4 sm:gap-8 text-sm font-semibold text-forest">
            <Link
              className="premium-cta px-7 py-4 text-center text-base font-bold leading-5 sm:px-10"
              to="/book"
            >
              Book
              <br />
              Appointment
            </Link>
            <Link className="transition hover:text-sage" to="/dashboard">
              Doctor Access
            </Link>
            <a className="transition hover:text-sage" href="#services" onClick={scrollToSection("services")}>
              Services
            </a>
            <a className="transition hover:text-sage" href="#contact" onClick={scrollToContact}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-[104px]">
        <section id="services" className="px-5 py-8 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-6xl rounded-card bg-warm-white p-5 sm:p-8 lg:p-10">
            <h1 className="reveal mb-8 text-4xl leading-tight text-forest sm:text-5xl">Dental Services</h1>
            <div className="services-grid">
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-warm-white px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="reveal mb-12 text-center text-4xl leading-tight text-forest sm:text-5xl">
              Why Patients Feel at Home
            </h2>
          </div>
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-3 lg:gap-8">
            {highlights.map((item) => (
              <Highlight key={item.title} item={item} />
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-forest px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="[&_.font-serif]:text-white">
                <Brand compact stacked={false} />
              </div>
              <p className="mt-6 text-base font-semibold leading-7 text-white/90">
                Dentique Smiles - Family Dental Studio
              </p>
              <p className="mt-1 text-base leading-7 text-white/70">
                Dr. Sayali Khedkar | Dental Surgeon
              </p>
              <p className="mt-5 text-sm leading-7 text-white/70">Mon - Sun 10:00 AM - 9:00 PM</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">Services</h2>
              <div className="mt-5 space-y-2 leading-7 text-white/72">
                {services.map((service) => (
                  <p key={service.title}>{service.title}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">Specialties</h2>
              <div className="mt-5 space-y-2 leading-7 text-white/72">
                <p>Painless Dentistry</p>
                <p>Topical Anaesthesia</p>
                <p>Advanced Equipment</p>
                <p>Safe, Hygienic and Reliable Care</p>
                <p>Patient Comfort</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">Contact</h2>
              <div className="mt-5 space-y-3 leading-7 text-white/72">
                <p className="flex gap-3">
                  <MapPin className="mt-1 shrink-0 text-sage" size={18} />
                  <span>Shop 31, 1st Floor, The Vista by Majestique, near Kapila Resort, Upper Kharadi Road, Pune.</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="shrink-0 text-sage" size={18} />
                  <span>9960003362</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="shrink-0 text-sage" size={18} />
                  <a className="transition hover:text-white" href="mailto:dentiquesmiles32@gmail.com">
                    dentiquesmiles32@gmail.com
                  </a>
                </p>
              </div>

              <h2 className="mt-8 text-lg font-bold text-white">Follow Us</h2>
              <div className="mt-5 flex gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    className="social-square grid place-items-center font-bold"
                    href={item.href || "#contact"}
                    onClick={item.href ? undefined : scrollToContact}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={item.ariaLabel}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/70">dentique.smiles</p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              className="inline-flex text-sm font-semibold text-white/80 transition hover:text-white"
              to="/dashboard"
            >
              Doctor Access
            </Link>
            <Link
              className="inline-flex text-sm font-semibold text-white/80 transition hover:text-white"
              to="/book"
            >
              Book Appointment
            </Link>
          </div>

          <p className="mt-10 border-t border-white/15 pt-7 text-center text-sm text-white/65">
            &copy; 2026 Dentique Smiles. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

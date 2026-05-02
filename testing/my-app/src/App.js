import { HashRouter, Link, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import BookAppointment from "./BookAppointment";
import Dashboard from "./Dashboard";

const services = [
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
    text: "Our calming, spa-like clinic is designed to ease anxiety and make you feel comfortable from the moment you walk in.",
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
  { label: "f", href: "#contact", ariaLabel: "Facebook" },
  { label: "in", href: "#contact", ariaLabel: "LinkedIn" },
  {
    label: "ig",
    href: "https://www.instagram.com/dentique.smiles",
    ariaLabel: "Instagram dentique.smiles",
  },
];

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
    <article className="rounded-card border border-black/5 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
      <div className={`grid h-14 w-14 place-items-center rounded-card ${service.bg} text-2xl`}>
        {service.icon}
      </div>
      <h3 className="mt-7 font-serif text-2xl leading-tight text-ink">{service.title}</h3>
      <p className="mt-4 max-w-[26ch] text-base leading-7 text-slate">{service.text}</p>
      <a
        className="mt-5 inline-flex text-base font-medium text-teal transition hover:text-teal-dark"
        href="#contact"
      >
        Learn More &rarr;
      </a>
    </article>
  );
}

function Highlight({ item }) {
  return (
    <article className="mx-auto flex max-w-xl flex-col items-center text-center">
      <div className={`grid h-[72px] w-[72px] place-items-center rounded-full ${item.bg} text-3xl`}>
        {item.icon}
      </div>
      <h2 className="mt-7 font-serif text-3xl leading-tight text-ink sm:text-4xl">{item.title}</h2>
      <p className="mt-5 text-base leading-8 text-slate sm:text-lg">{item.text}</p>
    </article>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-page font-sans text-slate">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-warm-white/90 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Brand compact />
          <Link
            className="rounded-card bg-mint px-7 py-4 text-center text-base font-bold leading-5 text-charcoal transition hover:bg-mint-strong sm:px-10"
            to="/book"
          >
            Book
            <br />
            Appointment
          </Link>
        </div>
      </header>

      <main>
        <section id="services" className="px-5 py-8 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-6xl rounded-card bg-warm-white p-5 sm:p-8 lg:p-10">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-warm-white px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-3 lg:gap-8">
            {highlights.map((item) => (
              <Highlight key={item.title} item={item} />
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-mint px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Brand compact stacked={false} />
          <p className="mt-6 max-w-xl text-base leading-7 text-slate">
            Your trusted partner in dental health and beautiful smiles.
          </p>

          <div className="mt-9 grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="text-lg font-bold text-ink">Contact</h2>
              <div className="mt-5 space-y-2 leading-7">
                <p>Shop 31, 1st Floor, The Vista by Majestique, near Kapila Resort, Upper Kharadi Road, Pune.</p>
                <p>9960003362</p>
                <p>hello@dentiquesmiles.com</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">Hours</h2>
              <div className="mt-5 space-y-2 leading-7">
                <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">Specialties</h2>
              <p className="mt-5 leading-7">Painless dentistry, cosmetic dentistry, and pediatric care.</p>

              <h2 className="mt-8 text-lg font-bold text-ink">Follow Us</h2>
              <div className="mt-5 flex gap-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white font-bold text-teal transition hover:text-teal-dark"
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={item.ariaLabel}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate">dentique.smiles</p>
            </div>
          </div>

          <Link
            className="mt-9 inline-flex text-sm font-semibold text-teal transition hover:text-teal-dark"
            to="/dashboard"
          >
            Doctor Access
          </Link>

          <p className="mt-10 border-t border-teal/15 pt-7 text-center text-sm">
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
      </Routes>
    </HashRouter>
  );
}

export default App;

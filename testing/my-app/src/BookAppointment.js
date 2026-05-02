import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, Mail, MapPin, MessageSquare, Phone, User } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  appointmentsEndpoint,
  hasSupabaseConfig,
  publicAnonKey,
} from "./utils/supabase/info";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  concern: "",
};

function authHeaders() {
  return {
    Authorization: `Bearer ${publicAnonKey}`,
    apikey: publicAnonKey,
  };
}

async function parseError(response) {
  try {
    const data = await response.json();
    return data?.error || data?.message || response.statusText;
  } catch {
    return response.statusText;
  }
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

function Field({ children, icon }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2C2C2C]">
        {icon}
        {children}
      </div>
    </label>
  );
}

export default function BookAppointment() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitToast, setShowSubmitToast] = useState(false);

  useReveal();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSupabaseConfig) {
      toast.error("Supabase connection details are missing");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(appointmentsEndpoint(), {
        method: "POST",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error(await parseError(response));
      }

      toast.success("Appointment request submitted successfully");
      setShowSubmitToast(true);
      setForm(initialForm);
    } catch (error) {
      toast.error(error.message || "Failed to submit appointment request");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!showSubmitToast) return undefined;

    const timeout = window.setTimeout(() => setShowSubmitToast(false), 2800);
    return () => window.clearTimeout(timeout);
  }, [showSubmitToast]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-6 md:p-12">
      <div className={`booking-toast ${showSubmitToast ? "show" : ""}`}>
        Appointment request submitted successfully
      </div>

      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link to="/" className="text-sm font-medium text-[#4A9B7F] hover:underline">
            &larr; Back to Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-[#5A5A5A] hover:text-[#4A9B7F]">
            Doctor Access
          </Link>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-xl lg:grid-cols-[0.85fr_1.15fr]"
        >
          <section className="bg-[#E8F5F0] p-8 sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl">
              {"\uD83E\uDDB7"}
            </div>
            <h1 className="reveal mt-8 font-serif text-4xl leading-tight text-[#2C2C2C] sm:text-5xl">
              Book Appointment
            </h1>
            <p className="reveal mt-5 text-base leading-8 text-[#34445B]">
              Share your details and dental concern. Our clinic team will review your request and contact you soon.
            </p>
            <div className="reveal mt-8 space-y-3 rounded-[24px] bg-white/70 p-5 text-sm leading-7 text-[#34445B]">
              <p className="font-semibold text-[#2C2C2C]">Dentique Smiles - Family Dental Studio</p>
              <p>Dr. Sayali Khedkar | Dental Surgeon</p>
              <p className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-[#4A9B7F]" size={16} />
                <span>Shop 31, 1st Floor, The Vista by Majestique, near Kapila Resort, Upper Kharadi Road, Pune.</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="shrink-0 text-[#4A9B7F]" size={16} />
                <span>9960003362</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="shrink-0 text-[#4A9B7F]" size={16} />
                <a className="hover:text-[#4A9B7F]" href="mailto:dentiquesmiles32@gmail.com">
                  dentiquesmiles32@gmail.com
                </a>
              </p>
              <div>
                <p className="font-semibold text-[#2C2C2C]">Hours</p>
                <p>Mon - Sun 10:00 AM - 9:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-[#2C2C2C]">Specialties</p>
                <p>Painless Dentistry</p>
                <p>Topical Anaesthesia</p>
                <p>Advanced Equipment</p>
                <p>Safe, Hygienic and Reliable Care</p>
                <p>Patient Comfort</p>
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="reveal space-y-5 p-8 sm:p-10">
            <div className="booking-fields grid gap-5 md:grid-cols-2">
              <div className="reveal">
                <Field icon={<User size={16} className="text-[#4A9B7F]" />}>Full Name</Field>
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="form-field"
                  placeholder="Enter your name"
                />
              </div>

              <div className="reveal">
                <Field icon={<Phone size={16} className="text-[#4A9B7F]" />}>Phone Number</Field>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="form-field"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="reveal">
              <Field icon={<Mail size={16} className="text-[#4A9B7F]" />}>Email</Field>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="form-field"
                placeholder="Enter your email"
              />
            </div>

            <div className="booking-fields grid gap-5 md:grid-cols-2">
              <div className="reveal">
                <Field icon={<Calendar size={16} className="text-[#4A9B7F]" />}>Preferred Date</Field>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="form-field"
                />
              </div>

              <div className="reveal">
                <Field icon={<Clock size={16} className="text-[#4A9B7F]" />}>Preferred Time</Field>
                <input
                  required
                  type="time"
                  value={form.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="form-field"
                />
              </div>
            </div>

            <div className="reveal">
              <Field icon={<MessageSquare size={16} className="text-[#4A9B7F]" />}>
                Your Problem
              </Field>
              <textarea
                required
                rows={5}
                value={form.concern}
                onChange={(e) => updateField("concern", e.target.value)}
                className="form-field resize-none"
                placeholder="Tell us what dental problem you are facing"
              />
            </div>

            <button
              disabled={submitting}
              className="premium-cta w-full cursor-pointer py-4 font-semibold disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Book Now"}
            </button>
            <p className="text-center text-sm text-[#6F8377]">
              {"\uD83D\uDD12"} Your information is safe and will never be shared
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

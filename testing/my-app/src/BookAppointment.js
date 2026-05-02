import { useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, Mail, MessageSquare, Phone, User } from "lucide-react";
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
      setForm(initialForm);
    } catch (error) {
      toast.error(error.message || "Failed to submit appointment request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-6 md:p-12">
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
            <h1 className="mt-8 font-serif text-4xl leading-tight text-[#2C2C2C] sm:text-5xl">
              Book Appointment
            </h1>
            <p className="mt-5 text-base leading-8 text-[#34445B]">
              Share your details and dental concern. Our clinic team will review your request and contact you soon.
            </p>
            <div className="mt-8 rounded-[24px] bg-white/70 p-5 text-sm leading-7 text-[#34445B]">
              <p className="font-semibold text-[#2C2C2C]">Dentique Smiles</p>
              <p>Shop 31, 1st Floor, The Vista by Majestique, near Kapila Resort, Upper Kharadi Road, Pune.</p>
              <p>9960003362</p>
              <p>Painless dentistry, cosmetic dentistry, and pediatric care.</p>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="space-y-5 p-8 sm:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Field icon={<User size={16} className="text-[#4A9B7F]" />}>Full Name</Field>
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-2xl border border-black/5 bg-[#FAFAF8] px-5 py-4 outline-none transition focus:ring-2 focus:ring-[#E8F5F0]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Field icon={<Phone size={16} className="text-[#4A9B7F]" />}>Phone Number</Field>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-2xl border border-black/5 bg-[#FAFAF8] px-5 py-4 outline-none transition focus:ring-2 focus:ring-[#E8F5F0]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <Field icon={<Mail size={16} className="text-[#4A9B7F]" />}>Email</Field>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-2xl border border-black/5 bg-[#FAFAF8] px-5 py-4 outline-none transition focus:ring-2 focus:ring-[#E8F5F0]"
                placeholder="Enter your email"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Field icon={<Calendar size={16} className="text-[#4A9B7F]" />}>Preferred Date</Field>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full rounded-2xl border border-black/5 bg-[#FAFAF8] px-5 py-4 outline-none transition focus:ring-2 focus:ring-[#E8F5F0]"
                />
              </div>

              <div>
                <Field icon={<Clock size={16} className="text-[#4A9B7F]" />}>Preferred Time</Field>
                <input
                  required
                  type="time"
                  value={form.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="w-full rounded-2xl border border-black/5 bg-[#FAFAF8] px-5 py-4 outline-none transition focus:ring-2 focus:ring-[#E8F5F0]"
                />
              </div>
            </div>

            <div>
              <Field icon={<MessageSquare size={16} className="text-[#4A9B7F]" />}>
                Your Problem
              </Field>
              <textarea
                required
                rows={5}
                value={form.concern}
                onChange={(e) => updateField("concern", e.target.value)}
                className="w-full resize-none rounded-2xl border border-black/5 bg-[#FAFAF8] px-5 py-4 outline-none transition focus:ring-2 focus:ring-[#E8F5F0]"
                placeholder="Tell us what dental problem you are facing"
              />
            </div>

            <button
              disabled={submitting}
              className="w-full cursor-pointer rounded-2xl bg-[#E8F5F0] py-4 font-semibold text-[#2C2C2C] shadow-md transition-all hover:bg-[#d4eae0] disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Book Now"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

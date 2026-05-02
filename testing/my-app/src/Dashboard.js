import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  appointmentsEndpoint,
  hasSupabaseConfig,
  publicAnonKey,
} from "./utils/supabase/info";

const filters = ["all", "pending", "confirmed", "cancelled"];

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

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (accessCode === "S@y@li77") {
      setIsAuthorized(true);
      return;
    }

    toast.error("Invalid access code");
  };

  const fetchAppointments = async () => {
    if (!hasSupabaseConfig) {
      toast.error("Supabase environment variables are missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(appointmentsEndpoint(), {
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error(await parseError(response));
      }

      const data = await response.json();
      setAppointments(Array.isArray(data) ? data : data.appointments || []);
    } catch (error) {
      toast.error(error.message || "Error loading appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);

    const request = async (method) =>
      fetch(appointmentsEndpoint(id), {
        method,
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

    try {
      let response = await request("PATCH");

      if (response.status === 404 || response.status === 405) {
        response = await request("PUT");
      }

      if (!response.ok) {
        throw new Error(await parseError(response));
      }

      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
      toast.success(`Appointment ${status} successfully`);
    } catch (error) {
      toast.error(error.message || "Failed to update appointment status");
    } finally {
      setUpdatingId("");
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchAppointments();
    }
  }, [isAuthorized]);

  const filteredAppointments = appointments.filter((app) =>
    filter === "all" ? true : app.status === filter
  );

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-xl sm:p-12"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5F0] text-3xl">
            {"\uD83D\uDD10"}
          </div>
          <h1 className="mb-2 font-serif text-3xl text-[#2C2C2C]">Doctor Access</h1>
          <p className="mb-8 text-[#5A5A5A]">
            Please enter your access code to view appointments.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full rounded-2xl border border-black/5 bg-[#FAFAF8] px-6 py-4 text-center text-2xl tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-[#E8F5F0]"
              autoFocus
            />
            <button className="w-full cursor-pointer rounded-2xl bg-[#E8F5F0] py-4 font-medium text-[#2C2C2C] shadow-md transition-all hover:bg-[#d4eae0]">
              Login to Dashboard
            </button>
          </form>
          <Link to="/" className="mt-8 inline-block text-sm text-[#5A5A5A] hover:text-[#4A9B7F]">
            &larr; Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8F5F0] border-t-[#4A9B7F]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 font-serif text-4xl text-[#2C2C2C]">Doctor's Dashboard</h1>
            <p className="text-[#5A5A5A]">
              Welcome back, Dr. Sayali Khedkar. Manage your appointments here.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <Link to="/" className="text-sm font-medium text-[#4A9B7F] hover:underline">
              &larr; Back to Website
            </Link>
            <div className="flex overflow-x-auto rounded-2xl border border-black/5 bg-white p-1 shadow-sm">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition-all sm:px-6 ${
                    filter === f
                      ? "bg-[#E8F5F0] text-[#2C2C2C] shadow-sm"
                      : "cursor-pointer text-[#5A5A5A] hover:bg-gray-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.length === 0 ? (
            <div className="col-span-full rounded-[32px] border border-dashed border-black/10 bg-white py-20 text-center">
              <Calendar className="mx-auto mb-4 text-gray-300" size={48} />
              <p className="text-[#5A5A5A]">No appointments found for this category.</p>
            </div>
          ) : (
            filteredAppointments.map((app) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={app.id}
                className="flex flex-col rounded-[32px] border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDE8F5] text-lg font-semibold">
                      {app.name?.charAt(0) || "?"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-[#2C2C2C]">{app.name}</h3>
                      <p className="text-xs text-[#5A5A5A]">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      app.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : app.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="mb-6 flex-grow space-y-3">
                  <div className="flex items-center gap-2 text-sm text-[#5A5A5A]">
                    <Mail size={14} className="shrink-0 text-[#4A9B7F]" /> {app.email || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5A5A5A]">
                    <Phone size={14} className="shrink-0 text-[#4A9B7F]" /> {app.phone || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5A5A5A]">
                    <Calendar size={14} className="shrink-0 text-[#4A9B7F]" /> {app.date || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5A5A5A]">
                    <Clock size={14} className="shrink-0 text-[#4A9B7F]" /> {app.time || "N/A"}
                  </div>
                  <div className="mt-4 rounded-2xl border border-black/5 bg-[#FAFAF8] p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#2C2C2C]">
                      <MessageSquare size={12} className="text-[#4A9B7F]" /> CONCERN
                    </div>
                    <p className="text-sm leading-relaxed text-[#5A5A5A]">{app.concern || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-black/5 pt-4">
                  {app.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(app.id, "confirmed")}
                      disabled={updatingId === app.id}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E8F5F0] py-2 text-xs font-medium text-[#2C2C2C] transition-colors hover:bg-[#d4eae0] disabled:cursor-wait disabled:opacity-60"
                    >
                      <CheckCircle size={14} /> Confirm
                    </button>
                  )}
                  {app.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(app.id, "cancelled")}
                      disabled={updatingId === app.id}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#FDE8EC] py-2 text-xs font-medium text-[#2C2C2C] transition-colors hover:bg-[#FDE8EC] disabled:cursor-wait disabled:opacity-60"
                    >
                      <XCircle size={14} /> Cancel
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

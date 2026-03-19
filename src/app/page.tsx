"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error);
        return;
      }

      setStatus("success");
      setMessage("You're on the list! We'll be in touch soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0a0a0a" }}>
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(201, 169, 110, 0.1)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          </div>
          <span className="text-xl font-semibold" style={{ color: "#e8e4de" }}>StoicMind</span>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c9a96e" }}>
            Early Access
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "#e8e4de" }}>
            Master Your Mind.{" "}
            <span style={{ color: "#c9a96e" }}>Join the Waitlist.</span>
          </h1>
          <p className="text-base sm:text-lg font-light leading-relaxed" style={{ color: "#6b6560" }}>
            Daily Stoic philosophy, guided reflection, and powerful teachings — designed to build unshakeable discipline and inner peace.
          </p>
        </div>

        {/* Form or Success */}
        {status === "success" ? (
          <div className="rounded-xl p-6 border" style={{ background: "rgba(201, 169, 110, 0.08)", borderColor: "rgba(201, 169, 110, 0.2)" }}>
            <p className="text-lg font-medium" style={{ color: "#c9a96e" }}>{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition"
              style={{
                background: "#141414",
                border: "1px solid #2a2a2a",
                color: "#e8e4de",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#c9a96e",
                color: "#0a0a0a",
              }}
            >
              {status === "loading" ? "Joining..." : "Join the Waitlist"}
            </button>

            {status === "error" && (
              <p className="text-sm" style={{ color: "#ef4444" }}>{message}</p>
            )}
          </form>
        )}

        <p className="text-xs" style={{ color: "#6b6560" }}>
          No spam. We&#39;ll only email you when we launch.
        </p>
      </div>
    </div>
  );
}

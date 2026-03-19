"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
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
      setName("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Join the Waitlist
          </h1>
          <p className="text-lg text-zinc-400">
            Be the first to know when we launch. Sign up below to get early access.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
            <p className="text-emerald-400 text-lg font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-sm">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

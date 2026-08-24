"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ReservationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      date: String(data.get("date") || ""),
      party: String(data.get("party") || "2"),
      note: String(data.get("note") || ""),
      company: String(data.get("company") || ""),
    };

    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      setMsg("Warm — we got your request. We'll remember your name.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Could not send — try hello@cozy.coffee");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-espresso">Name</label>
          <Input name="name" required placeholder="Your name" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-espresso">Email (optional)</label>
          <Input name="email" type="email" placeholder="you@email.com" className="mt-1" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-espresso">When</label>
          <Input name="date" required placeholder="e.g., Fri 7pm, Aug 30" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-espresso">Party size</label>
          <Input name="party" type="number" min={1} max={12} defaultValue={2} required className="mt-1" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-espresso">Note</label>
        <textarea
          name="note"
          placeholder="Window, slow table, high chair?"
          rows={3}
          className="mt-1 flex w-full rounded-[16px] border bg-white px-4 py-3 text-sm placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-clay"
        />
      </div>

      {/* honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <Button type="submit" disabled={status === "loading"} className="w-full md:w-auto">
        {status === "loading" ? "Sending…" : "Reserve — we'll remember"}
      </Button>

      {msg && (
        <p className={`text-sm ${status === "success" ? "text-moss" : "text-clay"}`}>{msg}</p>
      )}
      <p className="text-xs text-espresso/40">Friendly reminder: For 1–4, you can just come. We save tables for you anyway.</p>
    </form>
  );
}

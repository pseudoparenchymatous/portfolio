"use client";

export default function Contact() {
  return (
    <section id="contact" className="mt-12 rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
      <h4 className="font-semibold">Contact</h4>
      <p className="mt-2 text-sm opacity-80">Want to work together? Send me a message.</p>
      <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input className="w-full rounded-md px-3 py-2 bg-white/60 dark:bg-black/20 border" placeholder="Your name" />
        <input className="w-full rounded-md px-3 py-2 bg-white/60 dark:bg-black/20 border" placeholder="you@example.com" />
        <textarea className="w-full rounded-md px-3 py-2 bg-white/60 dark:bg-black/20 border" rows={4} placeholder="Brief message" />
        <button type="button" onClick={() => window.open('mailto:your.email@example.com?subject=Portfolio%20Inquiry')} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Email me</button>
      </form>
    </section>
  );
}

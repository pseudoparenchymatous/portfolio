export default function Footer() {
  return (
    <footer className="mt-12 py-8 text-center text-sm opacity-80">
      <div>Made with ♥ • Built using Next.js + Tailwind</div>
      <div className="mt-2">© {new Date().getFullYear()} Georey Saliente</div>
    </footer>
  );
}

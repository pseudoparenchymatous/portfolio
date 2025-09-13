import Link from "next/link";

const links = [ 
  {
    label: "Résumé",
    link: "https://linkedin.com"
  },
  {
    label: "Video Introduction",
    link: "https://youtube.com"
  },
  {
    label: "Email",
    link: "mailto:georesaliente@gmail.com"
  }
];

export default function About() {
  return (
    <section id="about" className="mt-12 w-[600px] mx-auto">
      <h3 className="text-xl">About Me</h3>
      <p className="mt-5 text-6xl opacity-90">
        I enjoy solving real-world problems with technology and aim to become
        a <span className="text-green-700 dark:text-green-500">full-stack developer</span> contributing to impactful projects.
      </p>
      <div className="mt-10 flex justify-center gap-3">
        {links.map((item, i) => (
          <Link href={item.link} key={i} target="_blank" className="border px-3 py-1 text-sm rounded border-gray-400 dark:border-gray-700 hover:border-green-600">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

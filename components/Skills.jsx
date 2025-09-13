"use client";

const skills = [
  "Laravel",
  "Next.js",
  "Spring",
  "React",
  "HTML",
  "CSS",
  "Tailwind",
  "JavaScript",
  "TypeScript",
  "Java",
  "Python",
  "REST APIs",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "MySQL",
  "SQLite",
  "Axure RP",
  "Agile / Scrum",
  "Linux",
];

export default function Skills() {
  return (
    <section className="mt-12 mx-auto w-[600px]">
      <h4 className="text-2xl">Skills</h4>
      <div className="mt-5 p-4 flex flex-wrap gap-3 justify-center">
        {skills.map((s) => (
          <span key={s} className="text-sm px-4 py-1 rounded-full bg-white/50 dark:bg-black/30 border hover:border-green-500">{s}</span>
        ))}
      </div>
    </section>
  );
}

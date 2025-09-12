"use client";

const skills = [
  "Laravel",
  "React",
  "MySQL",
  "JavaScript",
  "Java",
  "Python",
  "REST APIs",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "Agile / Scrum",
];

export default function Skills() {
  return (
    <section className="mt-12 grid md:grid-cols-3 gap-6 items-start">
      <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
        <h4 className="font-semibold">Skills</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="text-sm px-3 py-1 rounded-full bg-white/50 dark:bg-black/30 border">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

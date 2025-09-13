"use client";

const education = [
  {
    degree: "Applied Degree in Software Engineering",
    institution: "Lithan Academy",
    years: "2024 – Present",
  },
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "University of Cebu",
    years: "2024 – Present",
  },
];

export default function Education() {
  return (
    <section id="education" className="mt-12 mx-auto w-[600px]">
      <h3 className="text-2xl">Education</h3>

      <div className="flex flex-col gap-2 justify-center mt-4">
        {education.map((item, index) => (
          <div key={index} className={`p-5 rounded-lg border border-transparent hover:border-green-500 ${index == 0 && 'text-right'}`}>
            <h4 className={`text-lg font-bold`}>{item.degree}</h4>
            <p className="text-sm opacity-80">{item.institution}</p>
            <p className="text-xs opacity-75 mt-1">{item.years}</p>
          </div>
        ))}
      </div>

    </section>
  );
}

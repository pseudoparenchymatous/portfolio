"use client";

import Link from "next/link";

const contacts = [
  {
    label: "GitHub",
    link: "https://github.com/pseudoparenchymatous",
  },
  {
    label: "LinkedIn",
    link: "https://linkedin.com/in/georey-saliente",
  },
  {
    label: "Email",
    link: "mailto:georeysaliente@gmail.com",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="mt-12 mx-auto w-[600px]">
      <h4 className="text-2xl">Contact</h4>
      <div className="mt-10 flex justify-center gap-10">
        {contacts.map((contact, index) => (
          <Link 
            key={index}
            href={contact.link}
            className="text-sm border rounded-md py-1 px-6 dark:border-gray-500 hover:border-green-600"
          >
            {contact.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

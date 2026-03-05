interface ServicesData {
  title: string;
  description: string;
  items: { title: string; description: string }[];
}

interface Projects {
  id: number;
  name: string;
  description: string;
  href: string;
  image: string;
  bgImage: string;
  frameworks: { id: number; name: string }[];
}

interface Socials {
  name: string;
  href: string;
}

export const servicesData: ServicesData[] = [
  {
    title: "Frontend Development",
    description:
      "I build interactive, responsive, and scalable web apps using modern frameworks. I focus on clean architecture, reusable components, and smooth user experiences.",
    items: [
      {
        title: "React & Next.js",
        description:
          "(React, Next.js 15/16, React Router, Shadcn/UI, Radix UI, Lucide)",
      },
      {
        title: "TypeScript & UI/UX",
        description:
          "(TypeScript, Tailwind CSS, Form-Hook, Zod, Figma, Responsive Design)",
      },
      {
        title: "Project Architecture",
        description:
          "(Component-based, Modular, Feature-based, Scalable Structures)",
      },
    ],
  },
  {
    title: "Backend & Databases",
    description:
      "I integrate frontends with databases and backend services efficiently, ensuring data flows securely and smoothly.",
    items: [
      {
        title: "APIs & Integration",
        description: "(REST APIs, Fetch, Axios, Authentication Flows)",
      },
      {
        title: "Databases",
        description:
          "(MongoDB, Mongoose, CRUD Operations, Scalable Data Structures)",
      },
      {
        title: "Performance & Optimization",
        description:
          "(Optimized Queries, Caching, Minimizing Re-renders in React)",
      },
    ],
  },
  {
    title: "Version Control & Collaboration",
    description:
      "I maintain clean codebases and collaborate effectively using modern version control practices and team workflows.",
    items: [
      {
        title: "Git & GitHub",
        description: "(Branching, Pull Requests, Code Reviews, Collaboration)",
      },
      {
        title: "Teamwork & Communication",
        description:
          "(Agile Practices, Problem Solving, Attention to Detail, Adaptability)",
      },
      {
        title: "Project Delivery",
        description:
          "(Deployment via Vercel, Testing, Ensuring Cross-Browser Compatibility)",
      },
    ],
  },
  {
    title: "UI/UX & Animations",
    description:
      "I enhance the visual experience using motion graphics and intuitive interfaces to keep users engaged.",
    items: [
      {
        title: "Motion Graphics",
        description: "(After Effects, GSAP, Photoshop, Illustrator)",
      },
      {
        title: "Responsive & Interactive UI",
        description:
          "(Figma Prototyping, Tailwind, Shadcn/UI, React Animations)",
      },
      {
        title: "Edge Cases Handling",
        description:
          "(Empty States, Form Validations, Error Handling, Accessibility)",
      },
    ],
  },
];

export const projects: Projects[] = [
  {
    id: 1,
    name: "MedReminder",
    description:
      "A Next.js app for scheduling and tracking medication reminders with Redux Toolkit state management.",
    href: "",
    image: "/assets/projects/medreminder.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Next.js 15" },
      { id: 2, name: "React" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Redux Toolkit" },
      { id: 5, name: "Tailwind CSS" },
      { id: 6, name: "Shadcn/UI" },
      { id: 7, name: "Radix UI" },
      { id: 8, name: "Lucide" },
    ],
  },
  {
    id: 2,
    name: "Crypto Dasher",
    description:
      "A web app for tracking cryptocurrency data in real-time with interactive dashboards and responsive UI.",
    href: "",
    image: "/assets/projects/crypto-dashr.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "React Router" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Contact Form App",
    description:
      "A fullstack Next.js 16 app with MongoDB backend for storing form submissions, featuring responsive design and reusable UI components.",
    href: "",
    image: "/assets/projects/contact-form.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js 16" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Mongoose" },
      { id: 5, name: "Tailwind CSS" },
      { id: 6, name: "Shadcn/UI" },
      { id: 7, name: "Radix UI" },
      { id: 8, name: "Lucide" },
    ],
  },
];

export const socials: Socials[] = [
  // { name: "Instagram", href: "https://www.instagram.com/" },
  // {
  //   name: "Youtube",
  //   href: "https://www.youtube.com/",
  // },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamedahmedelmahalawy/",
  },
  {
    name: "GitHub",
    href: "https://github.com/mohamedahmedelmahalawy?tab=repositories",
  },
  {
    name: "CV",
    href: "https://drive.google.com/file/d/1dRwnCaLCeVf1ZDZciAbxHht6x8_w8MhC/view?usp=sharing",
  },
];

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Terminal,
  Menu,
  Video,
  Stethoscope,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MatrixGridBackground = dynamic(
  () =>
    import("@/components/matrix-grid-background").then(
      (mod) => mod.MatrixGridBackground,
    ),
  {
    ssr: false,
  },
);

const ResumeViewer = dynamic(() => import("@/components/resume-viewer"), {
  loading: () => <p>Loading...</p>,
});

const SocialButton = React.memo(
  ({
    href,
    icon: Icon,
    label,
    hoverClass,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
    hoverClass: string;
  }) => (
    <Button
      asChild
      variant="outline"
      size="icon"
      className={`hover:${hoverClass}`}
    >
      <Link
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="h-5 w-5" />
      </Link>
    </Button>
  ),
);
SocialButton.displayName = "SocialButton";

const Section = React.memo(
  ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <section
      id={id}
      className="relative py-16 md:py-24"
      role="region"
      aria-labelledby={`${id}-heading`}
    >
      <div className="container px-4 md:px-6">
        <motion.h2
          id={`${id}-heading`}
          className="mb-8 text-center text-2xl md:text-3xl font-bold tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  ),
);
Section.displayName = "Section";

const ProjectCard = React.memo(
  ({
    title,
    description,
    icon: Icon,
    link,
    index,
  }: {
    title: string;
    description: string;
    icon: React.ElementType;
    link: string;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg border bg-black/40 p-6 backdrop-blur-md cursor-pointer"
      onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Icon className="mb-4 h-8 w-8 text-[#4ff0c1]" />
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex items-center text-[#4ff0c1] hover:underline">
        <span>View on GitHub</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </motion.div>
  ),
);
ProjectCard.displayName = "ProjectCard";

const SkillItem = React.memo(
  ({ skill, index }: { skill: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center space-x-2 rounded-lg border bg-black/40 p-4 backdrop-blur-md h-full"
    >
      <div className="h-2 w-2 rounded-full bg-[#4ff0c1]" />
      <span>{skill}</span>
    </motion.div>
  ),
);
SkillItem.displayName = "SkillItem";

const skills = [
  "Docker",
  "Kubernetes",
  "Jenkins",
  "AWS",
  "Terraform",
  "C++",
  "PyTorch",
  "Scikit-learn",
  "Apache Spark",
  "CI/CD",
  "Ansible",
  "Git",
  "Python",
  "Linux",
  "Backend",
];

const Footer = () => (
  <footer className="py-6 text-center text-sm text-gray-500">
    <p>
      &copy; {new Date().getFullYear()} Gurunath Gorule. All rights reserved.
    </p>
  </footer>
);
Footer.displayName = "Footer";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <MatrixGridBackground />

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold flex items-center"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="sr-only">Gurunath Gorule</span>
            <span className="text-2xl font-bold text-primary mr-2">GG</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/20 backdrop-blur-sm text-primary hover:bg-background/30 hover:text-primary-foreground transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-background/95 backdrop-blur-sm border border-primary/20 rounded-md shadow-lg"
              align="end"
            >
              <DropdownMenuItem
                asChild
                className="focus:bg-primary/20 focus:text-primary-foreground hover:bg-primary/10 transition-colors"
              >
                <Link
                  href="#projects"
                  className="w-full p-3 text-base font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Projects
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="focus:bg-primary/20 focus:text-primary-foreground hover:bg-primary/10 transition-colors"
              >
                <Link
                  href="#skills"
                  className="w-full p-3 text-base font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("skills")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Skills
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="focus:bg-primary/20 focus:text-primary-foreground hover:bg-primary/10 transition-colors"
              >
                <Link
                  href="#contact"
                  className="w-full p-3 text-base font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center justify-center pt-16">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-transparent">
                Gurunath Gorule
              </h1>
              <motion.div
                className="absolute -inset-x-6 -inset-y-4 z-[-1] rounded-lg bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
            </motion.div>
            <motion.p
              className="mx-auto max-w-[700px] text-gray-400 text-lg md:text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Software Engineer specializing in building exceptional digital
              experiences
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <SocialButton
                href="https://github.com/gurugorule"
                icon={Github}
                label="GitHub Profile"
                hoverClass="bg-pink-500/10 hover:text-pink-500"
              />
              <SocialButton
                href="https://www.linkedin.com/in/gurunath-gorule"
                icon={Linkedin}
                label="LinkedIn Profile"
                hoverClass="bg-blue-500/10 hover:text-blue-500"
              />
              <SocialButton
                href="mailto:goruleguru@gmail.com"
                icon={Mail}
                label="Email"
                hoverClass="bg-green-500/10 hover:text-green-500"
              />
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-yellow-500/10 hover:text-yellow-500"
                onClick={() => setIsResumeOpen(true)}
              >
                <FileText className="h-5 w-5" />
                <span className="sr-only">View Resume</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section id="projects" title="Featured Projects">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="Seedling"
            description="An AI video generation platform that allows you to create videos effortlessly."
            icon={Video}
            link="https://github.com/gurugorule/seedling"
            index={0}
          />
          <ProjectCard
            title="Medi-Chat"
            description="A healthcare communication platform designed to improve patient-doctor interactions."
            icon={Stethoscope}
            link="https://github.com/gurugorule/medi-chat"
            index={1}
          />
          <ProjectCard
            title="Portfolio Website"
            description="A responsive and interactive portfolio showcasing my skills and projects."
            icon={Briefcase}
            link="https://github.com/gurugorule/portfolio"
            index={2}
          />
        </div>
      </Section>

      <Section id="skills" title="Skills & Technologies">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill, i) => (
            <SkillItem key={skill} skill={skill} index={i} />
          ))}
        </div>
      </Section>

      <Section id="contact" title="Get In Touch">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-gray-400">
            I&apos;m currently looking for new opportunities. Whether you have a
            question or just want to say hi, feel free to reach out!
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/contact">Say Hello</Link>
          </Button>
        </motion.div>
      </Section>

      <Footer />

      {isResumeOpen && <ResumeViewer onClose={() => setIsResumeOpen(false)} />}
    </main>
  );
}

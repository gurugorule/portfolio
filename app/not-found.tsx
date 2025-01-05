"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/particle-background"),
  {
    ssr: false,
  },
);

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <div className="z-10 text-center">
        <motion.h1
          className="text-6xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            asChild
            className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
          >
            <Link href="/">Go back home</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

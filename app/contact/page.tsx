"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Home } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/particle-background"),
  {
    ssr: false,
  },
);

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic form validation
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent. I'll get back to you soon!",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <ParticleBackground />
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="bg-black/40 backdrop-blur-md border-gray-700 text-white hover:bg-white/10 hover:text-cyan-400 transition-colors"
            aria-label="Go back to home"
          >
            <Home className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Get in Touch
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-black/40 backdrop-blur-md border-gray-700 text-white placeholder-gray-400"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black/40 backdrop-blur-md border-gray-700 text-white placeholder-gray-400"
          />
          <Textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="min-h-[150px] bg-black/40 backdrop-blur-md border-gray-700 text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </motion.div>
      <Toaster />
    </div>
  );
}

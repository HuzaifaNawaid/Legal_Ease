"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MoveRight, ShieldCheck, FileSearch, Zap, Building2, Briefcase, UserCheck, HelpCircle } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CustomCursor } from "@/components/ui/CustomCursor";

const FAQS = [
  {
    question: "Do you store my contracts?",
    answer: "No. LegalEase runs statelessly. Your contracts are analyzed in real-time and then discarded. We do not train on your data."
  },
  {
    question: "Is this legal advice?",
    answer: "LegalEase is an AI tool for information purposes only. It flags potential risks but does not replace a licensed attorney."
  },
  {
    question: "How accurate is the AI?",
    answer: "We use Meta Llama 3.3 70B, one of the most capable open models. It is highly accurate at spotting standard clauses but always verify critical details."
  },
  {
    question: "Can I edit the contract?",
    answer: "Yes! Use our Safe-Swap™ feature to copy revised clauses and paste them into your original document."
  }
];

const DOMAINS = [
  { icon: Building2, title: "Real Estate", desc: "Navigate every Lease and Purchase Agreement with certainty." },
  { icon: Briefcase, title: "Startups/Businesses", desc: "Structure every Co-founder and Employment Agreement for success." },
  { icon: UserCheck, title: "Freelancers/Content Creators", desc: "Turn every Service Contract and NDA to your advantage." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col selection:bg-indigo-500/30">
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[100]"
        style={{ scaleX: scaleProgress }}
      />

      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto text-center relative z-10 max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              AI Auditor V1.0 Live
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Don't Sign What You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                Don't Understand.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              LegalEase is your personal AI legal counsel. We scan contracts for hidden risks,
              detect missing clauses, and protect your privacy while doing it.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-lg transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 group"
              >
                Scan A Contract Free
                <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Why Choose / Features Grid */}
        <section id="features" className="py-24 bg-zinc-900/30 border-t border-zinc-800/50 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose LegalEase?</h2>
              <p className="text-zinc-400">State-of-the-art protection for modern creators.</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <SpotlightCard className="p-6 rounded-2xl border-zinc-800">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                  <FileSearch className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Deep Clause Scanning</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Our scanning beam technology reads every line to detect liability traps,
                  termination loopholes, and payment risks.
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-6 rounded-2xl border-zinc-800">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Privacy Shield</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Concerned about data? Our "Anonymizer" redacts sensitive names,
                  amounts, and dates BEFORE they leave your browser.
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-6 rounded-2xl border-zinc-800">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Missing Clause Detective</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Most auditors only see what's written. We see what isn't.
                  Identify missing Force Majeure or Confidentiality clauses instantly.
                </p>
              </SpotlightCard>
            </motion.div>
          </div>
        </section>

        {/* Domains Section - Who Uses LegalEase? */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Who Uses LegalEase?</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                From freelancers to founders, protect yourself in every transaction.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {DOMAINS.map((domain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800"
                >
                  <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                    <domain.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{domain.title}</h3>
                    <p className="text-sm text-zinc-500">{domain.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About & FAQ Grid */}
        <section className="py-24 bg-zinc-950 border-t border-zinc-800/50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
            {/* How It Works / About */}
            <div>
              <h2 className="text-3xl font-bold mb-8">About LegalEase</h2>
              <div className="space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  LegalEase was born from a simple belief: <strong>Legal protection should not be a luxury.</strong>
                  Traditional legal review is slow, expensive, and inaccessible to most freelancers and creators.
                </p>
                <p>
                  We built an AI Agent that "thinks" like a lawyer but works at the speed of software.
                  It parses complex legalese, identifies traps, and explains them in plain English.
                </p>
                <p>
                  Our mission is to democratize legal safety. Whether you're signing a lease or an NDA,
                  LegalEase ensures you never sign blindly again.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Common Questions</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left font-medium text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                    >
                      {faq.question}
                      <HelpCircle className={cn("w-5 h-5 text-zinc-500 transition-transform", openFaq === i ? "rotate-180" : "")} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Utility for class merging locally if not imported
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

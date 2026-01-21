"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    question: "How secure is my data?",
    answer: "We utilize industry-leading AES-256 encryption for data at rest and TLS for data in transit. Your documents are processed in isolated environments and are never used for general model training without explicit permission."
  },
  {
    question: "Can I customize the AI's focus?",
    answer: "Yes, our advanced scanning parameters allow you to prioritize specific risk categories such as liability, payment terms, or termination clauses."
  },
  {
    question: "What document formats are supported?",
    answer: "LegalEase currently supports DOCX and PDF formats, ensuring compatibility with standard legal documentation."
  },
  {
    question: "Is there a free trial available?",
    answer: "Absolutely! You can scan your first few contracts for free to experience the power of LegalEase AI."
  }
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-[#df2531]/30">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] pt-32 pb-20 flex flex-col items-center justify-center bg-mesh overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#df2531]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 space-y-8 text-center lg:text-left"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#df2531]/10 border border-[#df2531]/20 text-[#df2531] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#df2531] animate-pulse"></span>
                AI Legal Intelligence
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white mb-6">
                Analyze <br />
                Contracts <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df2531] to-rose-400">Instantly.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-lg leading-relaxed mb-8">
                Identify risks, compliance gaps, and critical clauses in seconds with our advanced neural scanning engine. Precise legal audit at the speed of light.
              </motion.p>

              <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start">
                <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-[#df2531] text-white font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                  Start Free Audit
                  <span className="material-icons-round text-sm">arrow_forward</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-6 lg:col-start-7 relative flex items-center justify-center scale-90 lg:scale-100"
            >
              <div className="relative w-full max-w-lg group">
                <div className="relative aspect-[16/10] bg-[#111] rounded-[2rem] border-8 border-[#1a1a1a] shadow-2xl overflow-hidden p-4">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                  <div className="w-full h-full bg-[#1a1a1a] rounded-xl overflow-hidden relative shadow-inner">
                    {/* Mock Document Content */}
                    <div className="p-8 space-y-4 opacity-20 pointer-events-none">
                      <div className="h-4 w-1/3 bg-gray-700 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-800 rounded"></div>
                        <div className="h-3 w-full bg-gray-800 rounded"></div>
                        <div className="h-3 w-3/4 bg-gray-800 rounded"></div>
                      </div>
                      <div className="h-4 w-1/4 bg-gray-700 rounded pt-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-800 rounded"></div>
                        <div className="h-3 w-5/6 bg-gray-800 rounded"></div>
                        <div className="h-3 w-full bg-gray-800 rounded"></div>
                      </div>
                    </div>

                    {/* Scanning Overlay */}
                    <div className="absolute inset-0 z-10">
                      <div className="absolute left-0 right-0 h-0.5 bg-[#df2531]/80 shadow-[0_0_15px_#df2531] animate-scan-v"></div>
                      <div className="absolute top-0 bottom-0 w-0.5 bg-[#df2531]/80 shadow-[0_0_15px_#df2531] animate-scan-h"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl flex flex-col items-center gap-3 border border-[#df2531]/30">
                        <div className="flex items-center gap-3">
                          <span className="flex gap-1">
                            <span className="w-1.5 h-6 bg-[#df2531]/40 rounded-full animate-pulse"></span>
                            <span className="w-1.5 h-8 bg-[#df2531]/70 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                            <span className="w-1.5 h-10 bg-[#df2531] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                          </span>
                          <div className="text-sm font-bold tracking-widest uppercase">Scanning...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative -mt-1 mx-auto w-[105%] h-3 bg-[#0a0a0a] rounded-b-2xl shadow-xl"></div>

                {/* Floating Cards */}
                <div className="absolute -right-8 top-0 bg-white/5 backdrop-blur-xl p-4 rounded-2xl w-40 shadow-2xl z-20 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Risk Level</span>
                  </div>
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-white/10" cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6"></circle>
                      <circle className="text-[#df2531] drop-shadow-[0_0_8px_rgba(223,37,49,0.5)]" cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeDasharray="213.5" strokeDashoffset="117" strokeWidth="6"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">45%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold text-white">Moderate Risk</p>
                  </div>
                </div>

                <div className="absolute -right-16 -bottom-6 bg-white/5 backdrop-blur-xl p-4 rounded-2xl w-48 shadow-2xl z-20 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Compliance</span>
                  </div>
                  <div className="flex items-end justify-between h-12 gap-1 mb-3 px-2">
                    <div className="flex-1 bg-[#df2531]/20 rounded-t-sm h-[40%]"></div>
                    <div className="flex-1 bg-[#df2531]/40 rounded-t-sm h-[60%]"></div>
                    <div className="flex-1 bg-[#df2531]/60 rounded-t-sm h-[85%]"></div>
                    <div className="flex-1 bg-[#df2531] rounded-t-sm h-[65%]"></div>
                    <div className="flex-1 bg-[#df2531]/50 rounded-t-sm h-[50%]"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold text-white">65% Compliant</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="features" className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose LegalEase</h2>
            <div className="w-24 h-1 bg-[#df2531] mx-auto rounded-full"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-[#df2531] hover:translate-y-[-5px] transition-transform group">
              <span className="material-symbols-outlined text-[#df2531] text-4xl mb-4">visibility</span>
              <h3 className="text-xl font-bold mb-3">Deep Clause Scanning:</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Uncover hidden risks with precision. Our AI identifies problematic language in seconds.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-[#df2531] hover:translate-y-[-5px] transition-transform">
              <span className="material-symbols-outlined text-[#df2531] text-4xl mb-4">admin_panel_settings</span>
              <h3 className="text-xl font-bold mb-3">Privacy Shield:</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Securely analyze sensitive documents. Your data remains encrypted and private.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-[#df2531] hover:translate-y-[-5px] transition-transform">
              <span className="material-symbols-outlined text-[#df2531] text-4xl mb-4">edit_note</span>
              <h3 className="text-xl font-bold mb-3">Instant Redlining:</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Accelerate your review process with automated drafting and versioning suggestions.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-[#df2531] hover:translate-y-[-5px] transition-transform">
              <span className="material-symbols-outlined text-[#df2531] text-4xl mb-4">query_stats</span>
              <h3 className="text-xl font-bold mb-3">Smart Risk Assessment:</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Data-driven legal intelligence provides a comprehensive overview of liability exposure.</p>
            </div>
          </div>
        </section>

        {/* Who Uses Section */}
        <section id="solutions" className="py-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Who Uses LegalEase</h2>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#df2531]/10 to-transparent p-10 rounded-3xl border border-[#df2531]/20 text-center hover:border-[#df2531] transition-all">
              <div className="w-16 h-16 bg-[#df2531]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#df2531] text-3xl">business</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Real Estate:</h3>
              <p className="text-gray-400">Streamline property agreements and lease reviews effortlessly.</p>
            </div>
            <div className="bg-gradient-to-br from-[#df2531]/10 to-transparent p-10 rounded-3xl border border-[#df2531]/20 text-center hover:border-[#df2531] transition-all">
              <div className="w-16 h-16 bg-[#df2531]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#df2531] text-3xl">rocket_launch</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Startups & Businesses:</h3>
              <p className="text-gray-400">Automate vendor agreements and compliance to accelerate growth.</p>
            </div>
            <div className="bg-gradient-to-br from-[#df2531]/10 to-transparent p-10 rounded-3xl border border-[#df2531]/20 text-center hover:border-[#df2531] transition-all">
              <div className="w-16 h-16 bg-[#df2531]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#df2531] text-3xl">person</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Freelancers:</h3>
              <p className="text-gray-400">Negotiate contracts with confidence and focus on your work.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About LegalEase:</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Empowering legal professionals through Innovation. We combine advanced AI with human expertise to simplify complex legal processes. 
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Traditional legal review is slow, expensive, and inaccessible. We built an AI Agent that "thinks" like a lawyer but works at the speed of software.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Our mission is to make high-quality legal review accessible and instantaneous for everyone.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-white/10 pb-4">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex items-center justify-between w-full py-4 text-left font-semibold text-lg hover:text-[#df2531] transition-colors"
                    >
                      <span className="text-base">{faq.question}</span>
                      <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>
                        expand_more
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {faq.answer}
                          </p>
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

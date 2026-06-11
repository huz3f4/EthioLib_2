import { motion } from 'motion/react';
import { ShieldCheck, FileText, AlertCircle, Info } from 'lucide-react';

export default function Terms() {
  return (
    <div className="bg-surface min-h-screen pb-20">
      {/* Header */}
      <header className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck size={14} />
            <span>Legal Documentation</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Terms of Service</h1>
          <p className="text-on-primary/70">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-bright rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-outline-variant space-y-10"
        >
          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <FileText size={24} />
              <h2 className="text-2xl font-black">1. Acceptance of Terms</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              By accessing or using EthioLib, you agree to be bound by these Terms of Service. If you are under the age of 18, you represent that you have the consent of a parent or guardian to use this platform.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <Info size={24} />
              <h2 className="text-2xl font-black">2. Educational & Fair Use</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              EthioLib is an educational initiative. All curriculum materials, including textbooks and teacher guides, remain the intellectual property of the <strong>Ministry of Education of Ethiopia</strong>. These materials are provided for personal, non-commercial educational use only.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <AlertCircle size={24} />
              <h2 className="text-2xl font-black">3. Prohibited Conduct</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
              <li>You may not use automated scripts or bots to download the library database.</li>
              <li>You may not attempt to resell, modify, or commercially exploit any content downloaded from EthioLib.</li>
              <li>You may not attempt to bypass any security features or Supabase Row Level Security (RLS) policies.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <ShieldCheck size={24} />
              <h2 className="text-2xl font-black">4. External Content</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Some files are hosted on third-party servers (e.g., Kehulum, Typical Ethiopian). EthioLib acts as a discovery layer and is not responsible for the availability, accuracy, or safety of files hosted on external domains.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black">5. User Accounts</h2>
            <p className="text-on-surface-variant leading-relaxed">
              You are responsible for maintaining the confidentiality of your Supabase account credentials. We reserve the right to terminate accounts that violate these terms or participate in malicious activity.
            </p>
          </section>

          <div className="pt-10 border-t border-outline-variant">
            <div className="bg-surface-container p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm font-medium text-on-surface-variant mb-4 md:mb-0">
                Have questions about these terms?
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dim transition-all text-sm">
                Contact Legal Team
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
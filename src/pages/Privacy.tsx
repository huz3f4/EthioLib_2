import { motion } from 'motion/react';
import { Shield, Eye, Database, Share2, UserCheck, Mail } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="bg-surface min-h-screen pb-20">
      <header className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Shield size={14} />
            <span>Data Protection</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-on-primary/70">Protecting the data of Ethiopian students and educators.</p>
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
              <Eye size={24} />
              <h2 className="text-2xl font-black">1. Information We Collect</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              When you register for an account, we collect your email address and full name. This data is securely managed by Supabase and is required to provide personalized features like your "My Library" collection.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <Database size={24} />
              <h2 className="text-2xl font-black">2. Use of Data</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Your information is used solely to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
              <li>Identify you and maintain your personal book favorites.</li>
              <li>Provide secure access to your account.</li>
              <li>Send essential service updates (e.g., password resets).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <Share2 size={24} />
              <h2 className="text-2xl font-black">3. Third-Party Services</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              EthioLib utilizes <strong>Supabase</strong> for database and authentication services. While we do not sell your data, your information is processed by Supabase in accordance with their privacy standards. Additionally, book downloads may redirect to external sites like Kehulum, which have their own privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <UserCheck size={24} />
              <h2 className="text-2xl font-black">4. Your Rights</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              You have the right to access, correct, or delete your personal information at any time. You can manage your profile details through your account settings or contact us for full account deletion.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-primary mb-2">
              <Mail size={24} />
              <h2 className="text-2xl font-black">5. Contact Information</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              If you have any questions regarding your privacy on EthioLib, please reach out to our team via the contact options in the footer.
            </p>
          </section>

          <div className="pt-10 border-t border-outline-variant">
            <div className="bg-surface-container p-6 rounded-2xl">
              <p className="text-xs text-on-surface-variant text-center">
                By using EthioLib, you consent to our collection and use of information as outlined in this policy. 
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
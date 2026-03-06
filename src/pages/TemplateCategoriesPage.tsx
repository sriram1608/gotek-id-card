import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Stethoscope, Ticket, ShieldCheck, School, ArrowRight, Layers } from 'lucide-react';

const categories = [
  {
    id: "school",
    title: "School ID Cards",
    subtitle: "Educational Institutions",
    icon: School,
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20",
    delay: 0
  },
  {
    id: "corporate",
    title: "Corporate ID Cards",
    subtitle: "Enterprise Staff & Access",
    icon: Building2,
    gradient: "from-indigo-600 to-purple-500",
    shadow: "shadow-indigo-500/20",
    delay: 0.1
  },
  {
    id: "hospital",
    title: "Hospital ID Cards",
    subtitle: "Medical & Healthcare",
    icon: Stethoscope,
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
    delay: 0.2
  },
  {
    id: "event",
    title: "Event Passes",
    subtitle: "Conferences & Expos",
    icon: Ticket,
    gradient: "from-pink-600 to-rose-500",
    shadow: "shadow-pink-500/20",
    delay: 0.3
  },
  {
    id: "government",
    title: "Government ID",
    subtitle: "Official Secure Docs",
    icon: ShieldCheck,
    gradient: "from-slate-700 to-slate-500",
    shadow: "shadow-slate-500/20",
    delay: 0.4
  },
  {
    id: "college",
    title: "College ID",
    subtitle: "University Campus Cards",
    icon: GraduationCap,
    gradient: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
    delay: 0.5
  }
];

export function TemplateCategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Light Tech Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border-[60px] border-blue-100/50 blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-50/80 blur-3xl opacity-80"></div>

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400/20 rounded-full blur-xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Premium Template Library</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-slate-900"
          >
            Choose Your Identity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Select a category to explore our enterprise-grade, secure ID card templates.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {categories.map((category) => (
            <Link to={`/templates/${category.id}`} key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: category.delay, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.02, rotateX: 5 }}
                className={cn(
                  "group relative h-80 rounded-3xl p-1 transition-all duration-500",
                  "hover:shadow-2xl hover:shadow-blue-500/10",
                  category.shadow
                )}
              >
                {/* Gradient Border & Glow */}
                <div className={cn(
                  "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md",
                  category.gradient
                )} />

                {/* Card Content */}
                <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-[22px] border border-slate-200 overflow-hidden flex flex-col p-8 shadow-sm">

                  {/* Background Gradient Blob */}
                  <div className={cn(
                    "absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-2xl transition-transform duration-700 group-hover:scale-150 group-hover:opacity-20",
                    "bg-gradient-to-br",
                    category.gradient
                  )} />

                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md border border-white",
                    "bg-gradient-to-br text-white",
                    category.gradient
                  )}>
                    <category.icon className="w-7 h-7" />
                  </div>

                  {/* Text */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm tracking-wide uppercase opacity-90">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Mockup Preview (Abstract) */}
                  <div className="mt-auto relative h-24 w-full">
                    <div className={cn(
                      "absolute bottom-[-40px] right-[-20px] w-32 h-48 rounded-lg border border-slate-200 bg-slate-50/50 backdrop-blur-md transform rotate-[-12deg] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:translate-y-[-10px]",
                      "shadow-lg"
                    )}>
                      <div className="p-3 space-y-2 opacity-60">
                        <div className="w-8 h-8 rounded-full bg-slate-300" />
                        <div className="h-2 w-16 bg-slate-300 rounded" />
                        <div className="h-2 w-10 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute bottom-8 left-8 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="flex items-center gap-2 text-sm font-bold text-blue-600">
                      View Templates <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

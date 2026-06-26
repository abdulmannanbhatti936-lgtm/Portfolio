'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiBookOpen, FiZap, FiAward, FiSmartphone, FiCheckCircle, FiCalendar } from 'react-icons/fi'
import SectionLabel from '../../components/SectionLabel'
import BackButton from '../../components/BackButton'

const tools = ['VS Code', 'Visual Studio', 'Android Studio', 'Cursor', 'Antigravity IDE', 'Git', 'GitHub', 'Netbeans','XAMPP','MySQL Workbench','Cisco Packet Tracer','penpot','Adobe Illustrator','Canva','Adobe Photoshop','Figma']

const timeline = [
  { 
    year: '2023', 
    title: 'Started BS Computer Science', 
    desc: 'Began academic journey at NUML University, Islamabad. Focus on Algorithms & Core OOP.', 
    status: 'completed',
    tags: ['C++', 'OOP', 'Data Structures']
  },
  { 
    year: '2024', 
    title: 'Full Stack Development', 
    desc: 'Built first major projects and custom backend engines with PHP & MySQL.', 
    status: 'completed',
    tags: ['PHP', 'MySQL', 'Bootstrap 5', 'E-commerce']
  },
  { 
    year: '2025', 
    title: 'Advanced Systems', 
    desc: 'Developed Property Platforms & Hotel Management Systems.', 
    status: 'completed',
    tags: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  },
  { 
    year: '2026', 
    title: 'AI & Freelancing', 
    desc: 'Integrated AI Chatbots and started professional freelancing journey.', 
    status: 'in-progress',
    tags: ['AI Integration', 'REST APIs', 'Fiverr']
  },
  { 
    year: '2027', 
    title: 'Professional Growth', 
    desc: 'Building enterprise-grade systems with microservices architecture, Docker, and cloud deployment. Targeting senior developer roles and high-value international freelance clients.',
    status: 'upcoming',
    tags: ['Microservices', 'Enterprise Stacks']
  },
]

// 3D Tilt Card Component
function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full will-change-transform"
      >
        <div style={{ transform: "translateZ(40px)" }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="subpage-container px-6 sm:px-12 md:px-20 lg:px-32 py-32 bg-background min-h-screen overflow-x-hidden">
      <BackButton />
      
      <div className="max-w-6xl mx-auto">
        {/* --- 1. HERO SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-32"
        >
          <div className="flex justify-center mb-8">
            <SectionLabel instant>ABOUT MANNAN</SectionLabel>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-space font-black text-heading leading-[1.1] tracking-tighter mb-12">
            Building digital <br /> <span className="text-primary">experiences.</span>
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-subtle text-xl sm:text-2xl font-inter leading-relaxed">
            <p>
              I am a results-driven Full Stack Developer from Islamabad, Pakistan. 
              Currently in my 6th semester of BS Computer Science at NUML University.
            </p>
            <p>
              I specialize in building and deploying real-world web applications 
              with a focus on clean code, scalability, and exceptional user experience.
            </p>
          </div>
        </motion.div>

        {/* --- 2. TRAITS GRID --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40"
        >
          {[
            { icon: FiZap, label: 'Problem Solver', desc: 'I break down complex requirements into robust technical solutions.' },
            { icon: FiSmartphone, label: 'Fast Learner', desc: 'Continuously adapting to modern stacks and architectural patterns.' },
            { icon: FiAward, label: 'Client-Focused', desc: 'Delivering production-ready products that solve actual business needs.' },
          ].map((item, i) => (
            <TiltCard key={i} className="h-full">
              <div className="h-full p-10 bg-sidebar/5 border border-border/50 rounded-3xl group hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="text-subtle group-hover:text-primary transition-colors" size={32} />
                </div>
                <h3 className="text-2xl font-space font-bold text-heading mb-4">{item.label}</h3>
                <p className="text-subtle font-inter leading-relaxed">{item.desc}</p>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* --- 3. INFINITE TOOLS MARQUEE --- */}
        <div className="mb-40">
          <h2 className="text-center text-sm font-space font-bold text-subtle uppercase tracking-[0.3em] mb-12">
            The Engine Room (Tools I Use)
          </h2>
          {/* We use a wide container and let Framer Motion pan it endlessly */}
          <div className="relative w-full overflow-hidden flex items-center py-4 mask-edges">
            <motion.div
              className="flex gap-6 whitespace-nowrap px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {/* Render the tools array twice to create a seamless infinite loop */}
              {[...tools, ...tools].map((tool, i) => (
                <div 
                  key={i} 
                  className="px-8 py-4 bg-sidebar/5 border border-border/50 rounded-full flex items-center justify-center shadow-sm"
                >
                  <span className="text-heading font-space font-bold text-sm tracking-wider uppercase">
                    {tool}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* --- 4. EDUCATION --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <div className="flex items-center gap-4 mb-12">
            <FiBookOpen size={32} className="text-primary" />
            <h2 className="text-4xl font-space font-black text-heading">Education</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TiltCard>
              <div className="p-10 bg-sidebar border border-border/50 rounded-3xl text-white h-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                <h3 className="text-2xl font-space font-bold mb-2 relative z-10 text-white">NUML University, Islamabad</h3>
                <p className="text-white/70 font-inter mb-8 relative z-10">BS Computer Science (2023 — Present)</p>
                <div className="inline-block bg-white text-sidebar px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest relative z-10">
                  CGPA: 3.0 / 4.0
                </div>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="p-10 bg-white border border-border/50 rounded-3xl h-full shadow-xl">
                <h3 className="text-2xl font-space font-bold text-heading mb-2">IMCB F-11/1 College</h3>
                <p className="text-subtle font-inter mb-8">Intermediate — ICS (Completed)</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-subtle font-medium">
                    <FiCheckCircle className="text-primary" /> Top 5% in regional competition
                  </li>
                  <li className="flex items-center gap-3 text-sm text-subtle font-medium">
                    <FiCheckCircle className="text-primary" /> Grade A+ in Programming Fundamentals
                  </li>
                </ul>
              </div>
            </TiltCard>
          </div>
        </motion.div>

        {/* --- 5. THE JOURNEY (TIMELINE) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-4xl font-space font-black text-heading mb-16 text-center">The Journey</h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Center Line for desktop */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border/50 md:-translate-x-1/2 rounded-full" />
            
            <div className="space-y-12">
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    key={i} 
                    className={`flex flex-col md:flex-row gap-8 relative items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Ghost spacer for centering in grid */}
                    <div className="hidden md:block md:w-1/2" />
                    
                    {/* Glowing Node */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-[6px] md:-translate-x-1/2 mt-1.5 flex flex-col items-center z-10 shrink-0">
                      <div className={`w-14 h-14 rounded-full border-[6px] border-background shadow-xl flex items-center justify-center transition-all duration-300 ${
                        item.status === 'completed' ? 'bg-sidebar text-white' : 
                        item.status === 'in-progress' ? 'bg-sidebar text-white shadow-[0_0_30px_rgba(45,55,72,0.4)] animate-[pulse_3s_ease-in-out_infinite]' : 
                        'bg-border text-subtle'
                      }`}>
                        {item.status === 'completed' ? (
                          <FiCheckCircle size={20} className="text-white" />
                        ) : item.status === 'in-progress' ? (
                          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-subtle" />
                        )}
                      </div>
                    </div>

                    {/* Timeline Card */}
                    <div className="w-full md:w-1/2 pl-20 md:pl-0">
                      <TiltCard>
                        <div className={`p-8 bg-sidebar/5 backdrop-blur-md rounded-3xl border border-border/50 shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 h-full ${
                          isEven ? 'md:mr-16' : 'md:ml-16'
                        }`}>
                          <div className="flex items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center">
                                <FiCalendar className="text-primary" size={16} />
                              </div>
                              <span className="text-sm font-black text-heading font-space tracking-widest">{item.year}</span>
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                              item.status === 'completed' ? 'bg-green-50 border-green-200 text-green-700' :
                              item.status === 'in-progress' ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.3)]' :
                              'bg-neutral-50 border-neutral-200 text-neutral-500'
                            }`}>
                              {item.status === 'completed' ? 'Completed' :
                               item.status === 'in-progress' ? 'Active' : 'Upcoming'}
                            </span>
                          </div>
                          
                          <h4 className="text-2xl font-space font-bold text-heading mb-3">{item.title}</h4>
                          <p className="text-subtle text-base leading-relaxed mb-6">{item.desc}</p>
                          
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                            {item.tags.map((tag) => (
                              <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-subtle px-3 py-1.5 bg-white border border-border/50 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      <style jsx global>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  )
}

import { Github, Server, Code2, Terminal, Cpu, BarChart3 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800">
      <main className="w-full max-w-2xl px-6 py-20 flex flex-col gap-16">
        
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              김동국
            </h1>
            <p className="text-lg font-medium text-zinc-400">
              Software Engineer
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <a
              href="https://github.com/kdd0419"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
              title="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.acmicpc.net/user/kdd0419"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
              title="Baekjoon"
            >
              <Terminal size={24} />
            </a>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b border-zinc-800 pb-2 text-zinc-200">
            <Cpu size={20} /> Technical Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-sm backdrop-blur-sm">
              <h3 className="font-bold flex items-center gap-2 mb-3 text-zinc-100">
                <Server size={18} className="text-zinc-500" /> Backend
              </h3>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  Kotlin / Spring Boot
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  Python / Flask
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-sm backdrop-blur-sm">
              <h3 className="font-bold flex items-center gap-2 mb-3 text-zinc-100">
                <BarChart3 size={18} className="text-zinc-500" /> Data Science
              </h3>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  BeautifulSoup / Selenium
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  Pandas / Data Analysis
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Problem Solving */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b border-zinc-800 pb-2 text-zinc-200">
            <Code2 size={20} /> Problem Solving
          </h2>
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">Competitive Programming</h3>
                  <p className="text-sm text-zinc-500 font-medium">Baekjoon Online Judge</p>
                </div>
                <div className="px-3 py-1 bg-zinc-800 rounded-lg text-xs font-mono text-zinc-400 border border-zinc-700">
                  @kdd0419
                </div>
              </div>

              {/* Solved.ac Badge */}
              <div className="flex justify-center -my-2 overflow-hidden">
                <a 
                  href="https://solved.ac/profile/kdd0419" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-[1.02] duration-200"
                >
                  <Image 
                    src="https://mazassumnida.wtf/api/v2/generate_badge?boj=kdd0419" 
                    alt="Solved.ac 프로필"
                    width={500}
                    height={150}
                    className="max-w-full h-auto"
                    unoptimized
                  />
                </a>
              </div>

              {/* Tags Section */}
              <div className="flex flex-wrap gap-2">
                {["정수론", "다이나믹 프로그래밍", "수학", "구현", "그리디 알고리즘"].map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full bg-zinc-800 text-[11px] font-semibold text-zinc-300 border border-zinc-700/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <a 
                  href="https://www.acmicpc.net/user/kdd0419" 
                  target="_blank" 
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-bold hover:bg-white transition-all shadow-lg"
                >
                  Baekjoon Stats View
                  <Terminal size={16} className="text-zinc-500 group-hover:text-zinc-950 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-zinc-600 text-[11px] pt-10 tracking-widest uppercase font-medium">
          <p>© {new Date().getFullYear()} 김동국 • Crafted with Next.js</p>
        </footer>
      </main>
    </div>
  );
}

import { Server, Terminal, Cpu, BarChart3, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 lg:p-24 font-noto">
      <main className="max-w-4xl mx-auto flex flex-col gap-20 md:gap-32">

        {/* Profile Header */}
        <header className="flex flex-col gap-10 bg-black neo-border neo-shadow-xl p-10 md:p-14 lg:p-20">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 w-full">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
              <div className="bg-neo-purple neo-border neo-shadow-black px-5 py-2 inline-block">
                <span className="text-sm md:text-base font-black uppercase tracking-widest text-black">Software Engineer</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-tight tracking-tighter text-white whitespace-nowrap">
                김동국
              </h1>
              </div>
              <div className="hidden md:flex w-48 h-48 bg-neo-green neo-border neo-shadow-black-lg items-center justify-center overflow-hidden rotate-3 flex-shrink-0 mb-2">
              <Cpu size={100} strokeWidth={2.5} className="text-black" />
              </div>
              </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-10 w-full">
            <p className="text-xl md:text-2xl font-bold text-zinc-300 leading-relaxed w-full">
              Backend 개발과 데이터 분석을 즐기는 엔지니어입니다. <br className="hidden md:block" /><span className="text-neo-yellow underline decoration-4 underline-offset-8">문제 해결의 즐거움</span>을 알고 코드로 실현합니다.
            </p>

            <div className="flex gap-6">
              <a
                href="https://github.com/kdd0419"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neo-pink neo-border neo-shadow-black p-4 neo-hover neo-active flex items-center justify-center transition-all group"
                title="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-9 h-9 fill-current text-black transition-transform group-hover:rotate-12"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.acmicpc.net/user/kdd0419"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neo-blue neo-border neo-shadow-black p-4 neo-hover neo-active flex items-center justify-center transition-all group"
                title="Baekjoon"
              >
                <Terminal size={36} className="text-black transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </header>

        {/* Technical Stack */}
        <section className="flex flex-col gap-12">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase bg-white text-black px-6 py-2 inline-block">
              Technical Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-black p-10 md:p-14 neo-border neo-shadow-lg flex flex-col gap-8 group hover:bg-zinc-900 transition-colors">
              <h3 className="text-3xl font-black flex items-center gap-4 uppercase border-b-4 border-neo-pink pb-3 text-neo-pink">
                <Server size={32} strokeWidth={3} /> Backend
              </h3>
              <ul className="text-xl font-bold space-y-5">
                <li className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-neo-pink flex-shrink-0" />
                  Kotlin / Spring Boot
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-neo-pink flex-shrink-0" />
                  Python / Flask
                </li>
              </ul>
            </div>
            <div className="bg-black p-10 md:p-14 neo-border neo-shadow-lg flex flex-col gap-8 group hover:bg-zinc-900 transition-colors">
              <h3 className="text-3xl font-black flex items-center gap-4 uppercase border-b-4 border-neo-blue pb-3 text-neo-blue">
                <BarChart3 size={32} strokeWidth={3} /> Data Science
              </h3>
              <ul className="text-xl font-bold space-y-5">
                <li className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-neo-blue flex-shrink-0" />
                  BeautifulSoup / Selenium
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-neo-blue flex-shrink-0" />
                  Pandas / Data Analysis
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Problem Solving */}
        <section className="flex flex-col gap-12">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase bg-white text-black px-6 py-2 inline-block">
              Problem Solving
            </h2>
          </div>
          <div className="bg-black p-10 md:p-16 lg:p-20 neo-border neo-shadow-xl flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-neo-yellow leading-none">Competitive Programming</h3>
                <p className="text-lg md:text-xl font-bold text-zinc-400 mt-4 uppercase">Baekjoon Online Judge</p>
              </div>
              <div className="bg-neo-green neo-border neo-shadow-black px-6 py-3 md:px-8 md:py-4 text-xl md:text-2xl font-black text-black whitespace-nowrap">
                @kdd0419
              </div>
            </div>

            {/* Solved.ac Badge Wrapper */}
            <div className="flex justify-center items-center">
              <a
                href="https://solved.ac/profile/kdd0419"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border-4 border-transparent hover:border-white neo-hover transition-all duration-300 group flex justify-center items-center"
              >
                <Image
                  src="https://mazassumnida.wtf/api/v2/generate_badge?boj=kdd0419"
                  alt="Solved.ac 프로필"
                  width={500}
                  height={150}
                  className="max-w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                  unoptimized
                />
              </a>
            </div>
            {/* Tags Section */}
            <div className="flex flex-wrap gap-5">
              {["정수론", "다이나믹 프로그래밍", "수학", "구현", "그리디 알고리즘"].map((tag, idx) => {
                const borderColors = ['border-neo-pink', 'border-neo-blue', 'border-neo-purple', 'border-neo-green', 'border-neo-yellow'];
                const textColors = ['text-neo-pink', 'text-neo-blue', 'text-neo-purple', 'text-neo-green', 'text-neo-yellow'];
                return (
                  <span
                    key={tag}
                    className={`px-5 py-3 border-4 ${borderColors[idx % borderColors.length]} ${textColors[idx % textColors.length]} text-base md:text-lg font-black uppercase tracking-tight bg-black`}
                  >
                    #{tag}
                  </span>
                )
              })}
            </div>

            <div className="mt-8">
              <a
                href="https://www.acmicpc.net/user/kdd0419"
                target="_blank"
                className="group flex items-center justify-center gap-5 px-12 py-8 bg-white text-black text-2xl font-black uppercase neo-hover neo-active transition-all w-full md:w-auto md:inline-flex"
              >
                Baekjoon Stats
                <ExternalLink size={32} strokeWidth={3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-20">
          <div className="bg-white text-black neo-border px-10 py-6 inline-block rotate-1">
            <p className="text-base font-black uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} 김동국 • Built with Dark Neobrutalism
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

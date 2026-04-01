import { Header } from "@/components/header"
import { TrustedBy } from "@/components/trusted-by"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060609]">
      <Header />
      <TrustedBy />

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#060609]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">IEEE</span>
              </div>
              <div>
                <p className="font-semibold text-white/90 text-sm">IEEE Technical Societies</p>
                <p className="text-[11px] text-white/40">Advancing Technology for Humanity</p>
              </div>
            </div>
            <p className="text-xs text-white/30">
              © 2026 IEEE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { Header } from "@/components/header"
import { BentoGrid } from "@/components/bento-grid"
import { SectionHeader } from "@/components/section-header"
import { TrustedBy } from "@/components/trusted-by"
import { branches } from "@/lib/branches-data"
import { ArrowRight, Users, Globe2, Lightbulb } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              17 Technical Societies
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              IEEE Technical Societies & Branches
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Explore the diverse technical communities driving innovation in engineering, 
              technology, and science. Connect with experts and advance your career.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#branches" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Explore Branches
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#about" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section (Premium Animated Logo Grid) */}
      <TrustedBy />

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">400K+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Globe2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">160+</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">39</p>
                <p className="text-sm text-muted-foreground">Technical Societies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches - Bento Glassmorphism Grid */}
      <section id="branches" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Colorful gradient blobs background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary blob - top left */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          
          {/* Secondary blob - top right */}
          <div className="absolute top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/25 via-violet-600/20 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
          
          {/* Accent blob - center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-emerald-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
          
          {/* Pink blob - bottom left */}
          <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-pink-500/25 via-rose-500/20 to-transparent rounded-full blur-[90px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }} />
          
          {/* Orange blob - bottom right */}
          <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-gradient-to-tl from-orange-500/20 via-amber-500/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '11s', animationDelay: '4s' }} />
          
          {/* Small accent blobs */}
          <div className="absolute top-1/4 right-1/3 w-[200px] h-[200px] bg-indigo-500/20 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] bg-fuchsia-500/15 rounded-full blur-[70px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <SectionHeader
            badge="Our Communities"
            title="Technical Societies"
            description="Each society focuses on a specific technical discipline, providing resources, conferences, publications, and networking opportunities for professionals."
          />
          
          {/* Bento Grid */}
          <BentoGrid branches={branches} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
                Advancing Technology for Humanity
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                IEEE is the world&apos;s largest technical professional organization dedicated to 
                advancing technology for the benefit of humanity. Our technical societies bring 
                together professionals, academics, and students who share common interests in 
                various fields of engineering and technology.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through conferences, publications, educational programs, and local chapters, 
                IEEE societies provide unparalleled opportunities for learning, networking, 
                and career advancement.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-card rounded-xl border border-border">
                <p className="text-3xl font-bold text-primary mb-2">2000+</p>
                <p className="text-sm text-muted-foreground">Annual Conferences</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <p className="text-3xl font-bold text-accent mb-2">200+</p>
                <p className="text-sm text-muted-foreground">Journals & Magazines</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <p className="text-3xl font-bold text-primary mb-2">5M+</p>
                <p className="text-sm text-muted-foreground">Technical Documents</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <p className="text-3xl font-bold text-accent mb-2">100+</p>
                <p className="text-sm text-muted-foreground">Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IEEE</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">IEEE Technical Societies</p>
                <p className="text-xs text-muted-foreground">Advancing Technology for Humanity</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 IEEE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { Header } from './components/header'
import { Hero } from './components/hero'
import { Contests } from './components/contests'
import { Prizes } from './components/prizes'
import { HowItWorks } from './components/how-it-works'
import { Testimonials } from './components/testimonials'
import { Footer } from './components/footer'
import Pricingn from './components/pricing'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />
      <main>
        <Hero />
        <Contests />
        <Pricingn />
        <Prizes />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

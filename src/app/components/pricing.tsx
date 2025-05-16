import { pricingPlans } from '../data/pricing-plans'
import { PricingCard } from './pricing-card'

export default function Pricingn() {
  return (
    <section id="pricingn" className="w-full py-12 bg-black text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Planes para Creadores</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Elige el plan perfecto para organizar tus concursos de programación,
            desde un único evento hasta concursos ilimitados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            ¿Necesitas un plan personalizado para tu organización?
          </p>
          <button className="bg-transparent border border-purple-500 hover:bg-purple-900/20 text-white font-medium py-2 px-6 rounded-md transition-colors">
            Contacta con Ventas
          </button>
        </div>
      </div>
    </section>
  )
}

import { Check } from 'lucide-react'

// Define the interface for the pricing card props
interface PricingCardProps {
  title: string
  description: string
  price: number
  period: string
  features: string[]
  buttonText: string
  isPopular?: boolean
  variant?: 'default' | 'featured'
}

export function PricingCard({
  title,
  description,
  price,
  period,
  features,
  buttonText,
  isPopular = false,
  variant = 'default',
}: PricingCardProps) {
  const isDefaultVariant = variant === 'default'

  return (
    <div
      className={`${
        isDefaultVariant
          ? 'bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-gray-800 hover:border-gray-700'
          : 'border border-purple-500 bg-purple-900/20'
      } rounded-xl p-8 transition-all duration-300 group relative overflow-hidden flex flex-col`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-purple-500 text-xs font-bold px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-400">/{period}</span>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-purple-500 mr-2 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`${
          isDefaultVariant
            ? 'bg-purple-700 hover:bg-purple-600'
            : 'bg-purple-600 hover:bg-purple-500'
        } text-white font-medium py-2 px-4 rounded-md transition-colors w-full`}
      >
        {buttonText}
      </button>
    </div>
  )
}

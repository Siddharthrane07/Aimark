import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small businesses starting their branding journey",
    features: [
      "AI Branding Assistant (Basic)",
      "Logo Suggestions",
      "Color Palette Generator",
      "Basic Analytics",
      "Email Support"
    ]
  },
  {
    name: "Professional",
    price: "99",
    description: "Ideal for growing businesses needing comprehensive branding",
    features: [
      "Everything in Starter",
      "Advanced AI Suggestions",
      "Social Media Management",
      "Content Calendar",
      "Priority Support",
      "Brand Guidelines",
      "Monthly Strategy Call"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "199",
    description: "Full-scale solution for established brands",
    features: [
      "Everything in Professional",
      "Custom AI Models",
      "Dedicated Account Manager",
      "Advanced Analytics",
      "API Access",
      "White-label Solutions",
      "24/7 Support"
    ]
  }
];

const PricingPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-secondary rounded-2xl p-8 ${
                plan.popular ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-400 text-background px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm">$</span>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
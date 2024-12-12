import React from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Check, Star, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Essential health tracking features',
      features: [
        'Basic health metrics tracking',
        'Daily activity monitoring',
        'Basic AI insights',
        'Local data storage',
        'Standard support'
      ]
    },
    {
      name: 'Pro',
      price: '$9.99',
      description: 'Advanced features for health enthusiasts',
      popular: true,
      features: [
        'All Basic features',
        'Advanced health analytics',
        'Personalized AI recommendations',
        'Wearable device integration',
        'Priority support',
        'Cloud backup',
        'Export health data'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Custom solutions for organizations',
      features: [
        'All Pro features',
        'Custom integration options',
        'Dedicated support team',
        'Advanced security features',
        'Custom analytics',
        'API access',
        'Team management'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You will continue to have access to your plan features until the end of your billing period.'
    },
    {
      question: 'Is my health data secure?',
      answer: 'Absolutely. We use end-to-end encryption and store your data locally on your device. Your privacy and security are our top priorities.'
    },
    {
      question: 'Can I switch between plans?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you are not satisfied, contact our support team.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that best fits your needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-2 border-blue-500/20'
                    : 'bg-white/10 border border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}
                    {plan.price !== 'Custom' && <span className="text-lg">/month</span>}
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-2">
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
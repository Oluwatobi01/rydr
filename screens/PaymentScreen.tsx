
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../App';
import { PaymentMethod } from '../types';
import { getStripe } from '../stripe';

const availableMethods: PaymentMethod[] = [
    { 
        id: 'apple_pay', 
        type: 'apple_pay', 
        label: 'Apple Pay', 
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMIutYodIw0y8kivG3SRJcj7xiyL1U2gSD7h-AKm6XSJZMYJjWafzAfQ7c8NxEErpLh3fQe-qPBQIyoyLKFZi8MZHquQUDK2ND2yn-BQ4NmXRtCjvG5bAPkc3AT_olbpaXQuZ3acSvi9sU4-y4DkYILqOvhMUTV90ef8QD7FKugU8HSwEGbTwUJDk_lhI3TyNoCub4jlf9N3DLt7MZh7X1GP9iDfGq-5KT9fY91RVKondDEOR7ErxY8bAg0rPm7Izx1tYtL6D2Vzg' 
    },
    { 
        id: 'visa_1234', 
        type: 'card', 
        label: 'Visa', 
        last4: '1234',
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ0ciUDpHDJGJbgaC0X80OTEc4UQGCefk-pUMJUxBirMFvZ9Ik8k2jkH8UOTTe-qCpN9ZPNKqwkmUSmbCoxZjoIUmbTowwcmPBLiHmJXDCtAdkKdsLHtGGrBFurkpELF00u__6K221Dgg8Kyp-ryx38VnrjTYOQC3tRJAlC32tdKmYArBHr0jYyP0JqRruy_M9gXOSlr4OYEIgVl8kLQRgFfURom6FydGAY49NNM6CAJWKZngN9Z2il9Vm4GY8nCK-mNm6X3r1HIE' 
    },
    { 
        id: 'mc_9876', 
        type: 'card', 
        label: 'Mastercard', 
        last4: '9876',
        default: true,
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQXsjNivicroWzyjGX0T8qRyGS4Mi-o-WCQwbfZfM16theAuQfCIWdfL0nmvezxAlOt1WL_r5D2Y___BxEcrqi2uaJAjftWSgNp3YjuTP60X9yBcMt7uibmwlemZUH4b_yfxEf5UW6zRCTQ4Cq8VPyeNkz8zNGhHJf1S0CaMw7uBw62UVTuunMoBahV_FmPF8xtHZ_Ho9-Ft3K-A8Ds0vzPBzFzygshK2KQ25liXaeoSGW9xzaoZCcLBCAzafcrAQh7ghRb8LjHtg' 
    }
];

const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ride, setPaymentMethod } = useRide();
  const [addingCard, setAddingCard] = useState(false);
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [cardError, setCardError] = useState('');

  const handleSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const initStripe = async () => {
    setAddingCard(true);
    const stripeInstance = await getStripe();
    if (stripeInstance) {
        setStripe(stripeInstance);
        const elementsInstance = stripeInstance.elements();
        const cardElement = elementsInstance.create('card', {
            style: {
                base: {
                    color: '#ffffff',
                    fontSize: '16px',
                    '::placeholder': { color: '#aab7c4' },
                },
            },
        });
        setElements(elementsInstance);
        // Wait for DOM
        setTimeout(() => cardElement.mount('#card-element'), 100);
    }
  };

  const handleSaveCard = async () => {
      if (!stripe || !elements) return;
      
      const cardElement = elements.getElement('card');
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
          setCardError(error.message);
      } else {
          // In a real app, send token.id to backend. Here we mock it.
          const newMethod: PaymentMethod = {
              id: token.id,
              type: 'card',
              label: token.card.brand.toUpperCase(),
              last4: token.card.last4,
              icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ0ciUDpHDJGJbgaC0X80OTEc4UQGCefk-pUMJUxBirMFvZ9Ik8k2jkH8UOTTe-qCpN9ZPNKqwkmUSmbCoxZjoIUmbTowwcmPBLiHmJXDCtAdkKdsLHtGGrBFurkpELF00u__6K221Dgg8Kyp-ryx38VnrjTYOQC3tRJAlC32tdKmYArBHr0jYyP0JqRruy_M9gXOSlr4OYEIgVl8kLQRgFfURom6FydGAY49NNM6CAJWKZngN9Z2il9Vm4GY8nCK-mNm6X3r1HIE'
          };
          availableMethods.push(newMethod);
          setPaymentMethod(newMethod);
          setAddingCard(false);
          setCardError('');
      }
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark text-white">
      <header className="flex items-center p-4 sticky top-0 bg-background-dark z-10">
         <button onClick={() => navigate(-1)} className="p-2"><span className="material-symbols-outlined text-2xl">arrow_back</span></button>
         <h1 className="flex-1 text-center text-lg font-bold mr-10">Payment</h1>
      </header>

      <div className="p-4 flex-1">
         {/* Method List */}
         {!addingCard ? (
             <div className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col gap-4">
                {availableMethods.map((method, index) => (
                    <label 
                        key={method.id} 
                        className={`flex items-center gap-4 cursor-pointer ${index > 0 ? 'py-2 border-t border-white/5' : ''}`}
                    >
                        <div className={`w-12 h-10 ${method.type === 'apple_pay' ? 'bg-black' : 'bg-white'} rounded-lg flex items-center justify-center p-1`}>
                            {method.type === 'apple_pay' ? (
                                <>
                                    <span className="material-symbols-outlined text-white">logo_dev</span> 
                                    <span className="text-white font-bold text-xs">PAY</span>
                                </>
                            ) : (
                                <img src={method.icon} alt={method.label} className="h-4 object-contain" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">{method.label}</p>
                                {method.default && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">Default</span>}
                            </div>
                            {method.last4 && <p className="text-sm text-gray-500">•••• {method.last4}</p>}
                        </div>
                        <input 
                            type="radio" 
                            name="payment" 
                            checked={ride.paymentMethod?.id === method.id}
                            onChange={() => handleSelect(method)}
                            className="accent-primary w-5 h-5 bg-transparent border-gray-600" 
                        />
                    </label>
                ))}
             </div>
         ) : (
             <div className="bg-[#1E1E1E] rounded-xl p-4">
                 <h3 className="font-bold mb-4">Enter Card Details</h3>
                 <div id="card-element" className="p-4 bg-gray-800 rounded-lg mb-4"></div>
                 {cardError && <p className="text-red-500 text-sm mb-4">{cardError}</p>}
                 <div className="flex gap-3">
                     <button onClick={handleSaveCard} className="flex-1 bg-primary text-black font-bold h-12 rounded-lg">Save Card</button>
                     <button onClick={() => setAddingCard(false)} className="px-4 text-gray-400 font-bold h-12 rounded-lg">Cancel</button>
                 </div>
             </div>
         )}

         {!addingCard && (
            <div className="flex justify-center items-center gap-2 mt-6 text-gray-500">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="text-sm">Your payment info is stored securely.</span>
            </div>
         )}
      </div>

      {!addingCard && (
        <div className="p-4 pb-8">
            <button 
                onClick={initStripe}
                className="w-full h-14 rounded-full bg-primary text-black font-bold flex items-center justify-center gap-2 hover:bg-yellow-400"
            >
                <span className="material-symbols-outlined">add</span>
                Add Payment Method
            </button>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;

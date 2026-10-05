'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { kenyanCounties, getDeliveryFee, formatPrice } from '@/data';
import { CheckCircle2, ShoppingBag, Shield, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart } = useCart();
  
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: 'Nairobi',
    location: '',
    instructions: '',
    paymentMethod: 'mpesa'
  });

  const deliveryFee = getDeliveryFee(formData.county);
  const total = subtotal + deliveryFee;

  // Redirect if cart is empty and not on confirmation
  useEffect(() => {
    if (items.length === 0 && step !== 'confirmation') {
      router.push('/cart');
    }
  }, [items.length, step, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newOrderNumber = `ILL-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const orderId = crypto.randomUUID();

    const orderData = {
      id: orderId,
      order_number: newOrderNumber,
      subtotal: subtotal,
      delivery_fee: deliveryFee,
      total: total,
      payment_method: formData.paymentMethod,
      customer_full_name: formData.fullName,
      customer_phone: formData.phone,
      customer_email: formData.email,
      delivery_county: formData.county,
      delivery_location: formData.location,
      delivery_instructions: formData.instructions
    };

    const { error: orderError } = await supabase.from('orders').insert([orderData]);

    if (orderError) {
      console.error('Failed to create order:', orderError);
      alert('Failed to place order. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const orderItemsData = items.map(item => ({
      order_id: orderId,
      product_id: item.product.id,
      product_name: item.product.name,
      product_image: item.product.images?.[0] || '',
      variation: item.selectedVariation ? `${item.selectedVariation.type}: ${item.selectedVariation.value}` : null,
      quantity: item.quantity,
      unit_price: item.product.price,
      total: item.product.price * item.quantity
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItemsData);

    if (itemsError) {
      console.error('Failed to create order items:', itemsError);
    }

    setOrderNumber(newOrderNumber);
    setIsSubmitting(false);
    setStep('confirmation');
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (items.length === 0 && step !== 'confirmation') {
    return null; // Will redirect via useEffect
  }

  if (step === 'confirmation') {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream flex items-center justify-center py-12">
        <div className="max-w-xl w-full mx-auto px-4">
          <div className="bg-white border border-neutral-200 p-8 md:p-12 text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <CheckCircle2 size={40} />
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl text-brand-dark mb-4">
              Thank you for your order!
            </h1>
            
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Your Illharlee order <strong className="text-brand-dark">#{orderNumber}</strong> is officially on its way to becoming your new obsession. ♡ We've sent a confirmation to your email and WhatsApp.
            </p>
            
            <div className="bg-neutral-50 border border-neutral-100 p-6 text-left mb-8 space-y-4 text-sm">
              <h3 className="font-semibold text-brand-dark uppercase tracking-wider text-xs border-b border-neutral-200 pb-2">Order Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-500 mb-1">Status</p>
                  <p className="font-medium text-brand-dark flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" /> Processing
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 mb-1">Expected Delivery</p>
                  <p className="font-medium text-brand-dark">3-7 Days</p>
                </div>
                <div className="col-span-2">
                  <p className="text-neutral-500 mb-1">Delivery Address</p>
                  <p className="font-medium text-brand-dark">{formData.location}, {formData.county}</p>
                </div>
              </div>
            </div>
            
            <Link href="/shop" className="btn-primary w-full justify-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Checkout Progress */}
        <div className="flex items-center justify-center gap-4 mb-12 max-w-md mx-auto">
          <div className={`flex flex-col items-center gap-2 ${step === 'details' ? 'text-brand-dark' : 'text-neutral-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${step === 'details' ? 'border-brand-dark bg-white' : 'border-neutral-300'}`}>1</div>
            <span className="text-xs uppercase tracking-wider font-semibold">Delivery</span>
          </div>
          <div className="w-16 h-px bg-neutral-300" />
          <div className={`flex flex-col items-center gap-2 ${step === 'payment' ? 'text-brand-dark' : 'text-neutral-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${step === 'payment' ? 'border-brand-dark bg-white' : 'border-neutral-300'}`}>2</div>
            <span className="text-xs uppercase tracking-wider font-semibold">Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-col-reverse lg:flex-row">
          
          {/* Main Form Area */}
          <div className="flex-1">
            {step === 'details' && (
              <form onSubmit={handleProceedToPayment} className="bg-white border border-neutral-200 p-6 md:p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-6 border-b border-neutral-100 pb-4">
                  <h2 className="font-heading text-2xl text-brand-dark">Delivery Details</h2>
                  <Link href="/cart" className="text-sm text-neutral-500 flex items-center gap-1 hover:text-brand-dark">
                    <ArrowLeft size={16} /> Back to Bag
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {/* Contact */}
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-brand-dark">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label htmlFor="fullName" className="block text-sm text-neutral-600 mb-1">Full Name *</label>
                        <input required type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm" placeholder="e.g. Amara Wanjiku" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-neutral-600 mb-1">Email Address *</label>
                        <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm" placeholder="For order updates" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm text-neutral-600 mb-1">Phone Number *</label>
                        <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm" placeholder="e.g. 0712345678" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="pt-4">
                    <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-brand-dark">Shipping Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="county" className="block text-sm text-neutral-600 mb-1">County *</label>
                        <select required id="county" name="county" value={formData.county} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm cursor-pointer">
                          {kenyanCounties.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm text-neutral-600 mb-1">Specific Location / Estate / Building *</label>
                        <input required type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm" placeholder="e.g. Westlands, ABC Place, Apt 4" />
                      </div>
                      <div>
                        <label htmlFor="instructions" className="block text-sm text-neutral-600 mb-1">Delivery Instructions (Optional)</label>
                        <textarea id="instructions" name="instructions" value={formData.instructions} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm resize-none" placeholder="e.g. Call on arrival, leave with security..." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-100">
                    <button type="submit" className="btn-primary w-full justify-center py-4 text-sm">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePlaceOrder} className="bg-white border border-neutral-200 p-6 md:p-8 animate-fade-in">
                 <div className="flex items-center justify-between mb-6 border-b border-neutral-100 pb-4">
                  <h2 className="font-heading text-2xl text-brand-dark">Payment</h2>
                  <button type="button" onClick={() => setStep('details')} className="text-sm text-neutral-500 flex items-center gap-1 hover:text-brand-dark">
                    <ArrowLeft size={16} /> Edit Details
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Payment Methods */}
                  <div className="space-y-4">
                    {/* M-PESA */}
                    <label className={`block border ${formData.paymentMethod === 'mpesa' ? 'border-brand-gold bg-brand-gold/5' : 'border-neutral-200'} p-4 cursor-pointer transition-colors relative`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="mpesa" 
                            checked={formData.paymentMethod === 'mpesa'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-brand-gold accent-brand-gold" 
                          />
                          <span className="font-semibold text-brand-dark tracking-wide">M-PESA Express</span>
                        </div>
                        <span className="text-xl">📱</span>
                      </div>
                      
                      {formData.paymentMethod === 'mpesa' && (
                        <div className="mt-4 pt-4 border-t border-brand-gold/20 pl-7 animate-slide-down">
                          <p className="text-sm text-neutral-600 mb-3">
                            A prompt will be sent to your phone to enter your PIN.
                          </p>
                          <div>
                            <label htmlFor="mpesaPhone" className="block text-xs text-neutral-500 mb-1">M-PESA Phone Number</label>
                            <input type="tel" id="mpesaPhone" defaultValue={formData.phone} className="w-full px-3 py-2 border border-brand-gold/30 bg-white focus:outline-none focus:border-brand-gold text-sm" />
                          </div>
                        </div>
                      )}
                    </label>

                    {/* Card */}
                    <label className={`block border ${formData.paymentMethod === 'card' ? 'border-brand-gold bg-brand-gold/5' : 'border-neutral-200'} p-4 cursor-pointer transition-colors opacity-50`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            disabled
                            type="radio" 
                            name="paymentMethod" 
                            value="card" 
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="w-4 h-4" 
                          />
                          <span className="font-semibold text-brand-dark tracking-wide">Credit / Debit Card</span>
                        </div>
                        <span className="text-xl">💳</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2 pl-7">Card payments coming soon.</p>
                    </label>
                  </div>

                  {/* Summary recap before pay */}
                  <div className="bg-neutral-50 p-4 border border-neutral-100 text-sm">
                    <p className="flex justify-between mb-2 text-neutral-600"><span>Total to pay:</span> <span className="font-semibold text-brand-dark text-base">{formatPrice(total)}</span></p>
                    <p className="text-xs text-neutral-500 flex items-center gap-1"><Shield size={12} className="text-brand-gold" /> Secure encrypted payment processing.</p>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-gold w-full justify-center py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>Pay {formatPrice(total)} Now</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96">
            <div className="bg-white border border-neutral-200 sticky top-24">
              <div className="p-6 border-b border-neutral-100">
                <h2 className="font-heading text-xl flex items-center gap-2">
                  <ShoppingBag size={20} className="text-brand-gold" /> Order Summary
                </h2>
              </div>
              
              <div className="p-6">
                {/* Items preview */}
                <div className="space-y-4 mb-6">
                  {items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-16 h-16 bg-neutral-100 flex-shrink-0 border border-neutral-100 relative overflow-hidden">
                        <img src={item.product.images[0]} alt={item.product.name} className="absolute inset-0 w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-black text-white rounded-full text-[10px] flex items-center justify-center font-bold z-10">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brand-dark truncate">{item.product.name}</p>
                        {item.selectedVariation && (
                          <p className="text-xs text-neutral-500">{item.selectedVariation.name}</p>
                        )}
                        <p className="text-sm text-brand-gold font-medium mt-1">
                          {formatPrice((item.product.price + (item.selectedVariation?.priceModifier||0)) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-100 pt-4 space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery ({formData.county})</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-neutral-50 border-t border-neutral-200">
                 <div className="flex justify-between font-semibold text-lg text-brand-dark">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1 text-right">Including taxes</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

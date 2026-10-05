import { createClient } from '@supabase/supabase-js';
import { products, sampleOrders } from './src/data/index.ts';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwhsbliytvssspvwyyzg.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('Missing Supabase Key. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding products...');
  for (const product of products) {
    const { id, slug, name, price, compareAtPrice, description, shortDescription, images, category, collections, materials, careInstructions, stock, isBestseller } = product;
    
    // Map the camelCase dummy data to snake_case schema
    const { error: pError } = await supabase.from('products').upsert({
      id,
      slug,
      name,
      price,
      compare_at_price: compareAtPrice || null,
      description,
      short_description: shortDescription,
      images,
      category,
      collections,
      materials,
      care_instructions: careInstructions,
      stock,
      is_bestseller: isBestseller || false,
      sku: `SKU-${id.toUpperCase()}`
    });

    if (pError) console.error('Error inserting product:', pError);

    // Insert variations
    if (product.variations) {
      for (const v of product.variations) {
        const { error: vError } = await supabase.from('product_variations').upsert({
          id: `${id}-${v.id}`,
          product_id: id,
          name: v.name,
          type: v.type,
          value: v.value,
          stock: v.stock
        });
        if (vError) console.error('Error inserting variation:', vError);
      }
    }
  }
  
  console.log('Seeding orders...');
  for (const order of sampleOrders) {
    const { error: oError } = await supabase.from('orders').upsert({
      id: order.id,
      order_number: order.orderNumber,
      subtotal: order.subtotal,
      delivery_fee: order.deliveryFee,
      total: order.total,
      status: ['pending', 'paid'].includes(order.status) ? 'processing' : order.status,
      payment_status: order.paymentStatus,
      payment_method: order.paymentMethod,
      customer_full_name: order.customer.fullName,
      customer_phone: order.customer.phone,
      customer_email: order.customer.email,
      delivery_county: order.delivery.county || 'Nairobi',
      delivery_location: order.delivery.location || 'Nairobi',
      delivery_instructions: order.delivery.instructions,
      is_pickup: order.delivery.isPickup || false
    });
    
    if (oError) {
      console.error('Error inserting order:', oError);
      continue;
    }

    if (order.items) {
      for (const item of order.items) {
        const { error: iError } = await supabase.from('order_items').upsert({
          order_id: order.id,
          product_id: item.productId,
          product_name: item.productName,
          product_image: item.productImage,
          variation: item.variation,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          total: item.total
        });
        if (iError) console.error('Error inserting order item:', iError);
      }
    }
  }
  
  console.log('Seeding complete!');
}

seed();

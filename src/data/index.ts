import { Product, Collection, Testimonial, Order } from '@/types';

// ============================================
// PRODUCTS DATA
// ============================================
export const products: Product[] = [
  // === NECKLACES ===
  {
    id: 'prod-001',
    slug: 'y2k-heart-necklace',
    name: 'Y2K Heart Necklace',
    price: 850,
    compareAtPrice: 1200,
    description: 'A playful Y2K-inspired heart pendant on a delicate chain. This piece brings that nostalgic 2000s energy to any outfit. Layer it or let it stand alone — either way, it\'s giving main character vibes.',
    shortDescription: 'Playful Y2K heart pendant necklace',
    images: ['https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],
    category: 'necklaces',
    collections: ['y2k'],
    materials: ['Alloy', 'Rhinestone'],
    careInstructions: 'Avoid water and perfume contact. Store in a dry place. Clean gently with a soft cloth.',
    variations: [
      { id: 'v1', name: 'Gold', type: 'color', value: '#D4AF37', stock: 15 },
      { id: 'v2', name: 'Silver', type: 'color', value: '#C0C0C0', stock: 8 },
    ],
    stock: 23,
    lowStockThreshold: 5,
    sku: 'ILL-NCK-001',
    isBestseller: true,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['y2k', 'heart', 'pendant', 'layering'],
    style: ['Y2K', 'Playful'],
    createdAt: '2026-08-15T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
  },
  {
    id: 'prod-002',
    slug: 'afrofusion-cowrie-choker',
    name: 'Afrofusion Cowrie Choker',
    price: 1200,
    description: 'A stunning choker featuring cowrie shells arranged in a contemporary pattern. Inspired by traditional African adornment reimagined for the modern Kenyan woman.',
    shortDescription: 'Contemporary cowrie shell choker',
    images: ['https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'],
    category: 'necklaces',
    collections: ['afrofusion'],
    materials: ['Cowrie Shells', 'Waxed Cord', 'Gold-plated Clasp'],
    careInstructions: 'Handle with care. Avoid moisture. Store flat in a jewellery box.',
    variations: [
      { id: 'v3', name: 'Natural', type: 'style', value: 'natural', stock: 10 },
      { id: 'v4', name: 'Gold Accent', type: 'style', value: 'gold-accent', stock: 6 },
    ],
    stock: 16,
    lowStockThreshold: 5,
    sku: 'ILL-NCK-002',
    isBestseller: true,
    isNewArrival: true,
    isLimited: false,
    isComingSoon: false,
    tags: ['afrofusion', 'cowrie', 'choker', 'african'],
    style: ['Afrofusion', 'Bold'],
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z',
  },
  {
    id: 'prod-003',
    slug: 'midnight-cross-pendant',
    name: 'Midnight Cross Pendant',
    price: 950,
    description: 'An edgy gothic-inspired cross pendant with dark gemstone accents. Perfect for those who like their jewellery with a little bit of attitude.',
    shortDescription: 'Gothic cross pendant with dark gems',
    images: ['https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800'],
    category: 'necklaces',
    collections: ['midnight-muse'],
    materials: ['Stainless Steel', 'Black Crystal'],
    careInstructions: 'Wipe with a dry cloth. Avoid harsh chemicals.',
    variations: [
      { id: 'v5', name: 'Black', type: 'color', value: '#1a1a1a', stock: 12 },
      { id: 'v6', name: 'Gunmetal', type: 'color', value: '#4a4a4a', stock: 7 },
    ],
    stock: 19,
    lowStockThreshold: 5,
    sku: 'ILL-NCK-003',
    isBestseller: false,
    isNewArrival: true,
    isLimited: false,
    isComingSoon: false,
    tags: ['gothic', 'cross', 'pendant', 'edgy'],
    style: ['Gothic', 'Edgy'],
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-28T10:00:00Z',
  },
  {
    id: 'prod-004',
    slug: 'delicate-pearl-chain',
    name: 'Delicate Pearl Chain',
    price: 750,
    description: 'A minimal and delicate pearl chain for everyday elegance. This piece is soft, feminine and perfect for layering with your other favourites.',
    shortDescription: 'Minimal pearl chain necklace',
    images: ['https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
    category: 'necklaces',
    collections: ['clean-style', 'soft-style'],
    materials: ['Faux Pearl', 'Gold-plated Chain'],
    careInstructions: 'Remove before showering. Store separately to avoid tangling.',
    variations: [
      { id: 'v7', name: 'Gold Chain', type: 'style', value: 'gold', stock: 20 },
      { id: 'v8', name: 'Rose Gold Chain', type: 'style', value: 'rose-gold', stock: 14 },
    ],
    stock: 34,
    lowStockThreshold: 10,
    sku: 'ILL-NCK-004',
    isBestseller: true,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['pearl', 'delicate', 'layering', 'minimal'],
    style: ['Clean', 'Feminine'],
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z',
  },

  // === EARRINGS ===
  {
    id: 'prod-005',
    slug: 'butterfly-drop-earrings',
    name: 'Butterfly Drop Earrings',
    price: 650,
    description: 'Delicate butterfly drop earrings that catch the light beautifully. A Y2K favourite that adds playful movement to your look.',
    shortDescription: 'Y2K butterfly drop earrings',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800'],
    category: 'earrings',
    collections: ['y2k'],
    materials: ['Alloy', 'Crystal'],
    careInstructions: 'Handle with care. Clean with soft cloth.',
    variations: [
      { id: 'v9', name: 'Gold', type: 'color', value: '#D4AF37', stock: 25 },
      { id: 'v10', name: 'Silver', type: 'color', value: '#C0C0C0', stock: 18 },
      { id: 'v11', name: 'Rose Gold', type: 'color', value: '#B76E79', stock: 12 },
    ],
    stock: 55,
    lowStockThreshold: 10,
    sku: 'ILL-EAR-001',
    isBestseller: true,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['butterfly', 'drop', 'y2k', 'playful'],
    style: ['Y2K', 'Playful'],
    createdAt: '2026-06-10T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
  },
  {
    id: 'prod-006',
    slug: 'maasai-beaded-hoops',
    name: 'Maasai-Inspired Beaded Hoops',
    price: 1100,
    description: 'Bold beaded hoop earrings inspired by Maasai beadwork patterns. Each pair features vibrant colour combinations that celebrate African artistry.',
    shortDescription: 'Vibrant beaded hoop earrings',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800'],
    category: 'earrings',
    collections: ['afrofusion'],
    materials: ['Glass Beads', 'Brass Wire', 'Sterling Silver Hooks'],
    careInstructions: 'Avoid water. Store in a padded box to protect beadwork.',
    variations: [
      { id: 'v12', name: 'Sunset (Red/Orange)', type: 'color', value: '#E74C3C', stock: 8 },
      { id: 'v13', name: 'Ocean (Blue/Green)', type: 'color', value: '#2980B9', stock: 6 },
      { id: 'v14', name: 'Earth (Brown/Gold)', type: 'color', value: '#8B6914', stock: 10 },
    ],
    stock: 24,
    lowStockThreshold: 5,
    sku: 'ILL-EAR-002',
    isBestseller: false,
    isNewArrival: true,
    isLimited: true,
    isComingSoon: false,
    tags: ['maasai', 'beaded', 'hoops', 'african', 'colourful'],
    style: ['Afrofusion', 'Bold', 'Statement'],
    createdAt: '2026-09-05T10:00:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
  },
  {
    id: 'prod-007',
    slug: 'gothic-spike-studs',
    name: 'Gothic Spike Studs',
    price: 500,
    description: 'Edgy spike stud earrings that add instant attitude to any outfit. Lightweight and comfortable for all-day wear.',
    shortDescription: 'Edgy black spike stud earrings',
    images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800'],
    category: 'earrings',
    collections: ['midnight-muse'],
    materials: ['Stainless Steel', 'Black Enamel'],
    careInstructions: 'Wipe clean. Avoid exposing to moisture.',
    variations: [
      { id: 'v15', name: 'Matte Black', type: 'color', value: '#1a1a1a', stock: 30 },
      { id: 'v16', name: 'Gunmetal', type: 'color', value: '#4a4a4a', stock: 20 },
    ],
    stock: 50,
    lowStockThreshold: 10,
    sku: 'ILL-EAR-003',
    isBestseller: false,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['gothic', 'spike', 'studs', 'edgy', 'punk'],
    style: ['Gothic', 'Edgy'],
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-09-10T10:00:00Z',
  },
  {
    id: 'prod-008',
    slug: 'rose-petal-drops',
    name: 'Rose Petal Drop Earrings',
    price: 700,
    description: 'Romantic rose petal-shaped drops in soft pink tones. Feminine, delicate and absolutely gorgeous for a date or brunch with the girls.',
    shortDescription: 'Romantic rose petal earrings',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
    category: 'earrings',
    collections: ['soft-style'],
    materials: ['Resin', 'Gold-plated Hooks'],
    careInstructions: 'Handle delicately. Avoid drops and impacts.',
    variations: [
      { id: 'v17', name: 'Blush Pink', type: 'color', value: '#F4C2C2', stock: 15 },
      { id: 'v18', name: 'Dusty Rose', type: 'color', value: '#DCAE96', stock: 12 },
    ],
    stock: 27,
    lowStockThreshold: 5,
    sku: 'ILL-EAR-004',
    isBestseller: false,
    isNewArrival: true,
    isLimited: false,
    isComingSoon: false,
    tags: ['rose', 'feminine', 'romantic', 'drops'],
    style: ['Soft', 'Romantic', 'Feminine'],
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-09-28T10:00:00Z',
  },

  // === RINGS ===
  {
    id: 'prod-009',
    slug: 'stackable-star-rings',
    name: 'Stackable Star Rings Set',
    price: 900,
    description: 'A set of three stackable rings featuring tiny star details. Mix, match and stack them your way for a personalised look.',
    shortDescription: 'Set of 3 stackable star rings',
    images: ['https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'],
    category: 'rings',
    collections: ['y2k', 'clean-style'],
    materials: ['Gold-plated Alloy'],
    careInstructions: 'Remove before washing hands. Avoid perfume.',
    variations: [
      { id: 'v19', name: 'Gold Set', type: 'color', value: '#D4AF37', stock: 18 },
      { id: 'v20', name: 'Silver Set', type: 'color', value: '#C0C0C0', stock: 15 },
    ],
    stock: 33,
    lowStockThreshold: 8,
    sku: 'ILL-RNG-001',
    isBestseller: true,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['stackable', 'star', 'set', 'layering'],
    style: ['Y2K', 'Clean'],
    createdAt: '2026-07-05T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z',
  },
  {
    id: 'prod-010',
    slug: 'serpent-wrap-ring',
    name: 'Serpent Wrap Ring',
    price: 800,
    description: 'A bold serpent-shaped wrap ring with intricate scale details. This statement piece wraps elegantly around your finger for an unforgettable look.',
    shortDescription: 'Gothic serpent wrap ring',
    images: ['https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800'],
    category: 'rings',
    collections: ['midnight-muse'],
    materials: ['Stainless Steel', 'Crystal Eyes'],
    careInstructions: 'Polish with a soft cloth. Avoid bending.',
    variations: [
      { id: 'v21', name: 'Antique Gold', type: 'color', value: '#B8860B', stock: 10 },
      { id: 'v22', name: 'Dark Silver', type: 'color', value: '#696969', stock: 8 },
    ],
    stock: 18,
    lowStockThreshold: 5,
    sku: 'ILL-RNG-002',
    isBestseller: false,
    isNewArrival: true,
    isLimited: true,
    isComingSoon: false,
    tags: ['serpent', 'snake', 'gothic', 'statement', 'wrap'],
    style: ['Gothic', 'Edgy', 'Statement'],
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
  },

  // === BRACELETS ===
  {
    id: 'prod-011',
    slug: 'charm-chain-bracelet',
    name: 'Y2K Charm Chain Bracelet',
    price: 750,
    description: 'A playful chain bracelet with assorted Y2K charms — hearts, stars, butterflies and more. The ultimate nostalgia accessory.',
    shortDescription: 'Playful Y2K charm bracelet',
    images: ['https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],
    category: 'bracelets',
    collections: ['y2k'],
    materials: ['Gold-plated Alloy', 'Enamel Charms'],
    careInstructions: 'Avoid pulling on charms. Store flat.',
    variations: [
      { id: 'v23', name: 'Gold', type: 'color', value: '#D4AF37', stock: 22 },
      { id: 'v24', name: 'Silver', type: 'color', value: '#C0C0C0', stock: 16 },
    ],
    stock: 38,
    lowStockThreshold: 8,
    sku: 'ILL-BRC-001',
    isBestseller: true,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['charm', 'chain', 'y2k', 'playful'],
    style: ['Y2K', 'Playful'],
    createdAt: '2026-06-20T10:00:00Z',
    updatedAt: '2026-09-18T10:00:00Z',
  },
  {
    id: 'prod-012',
    slug: 'beaded-ankh-bracelet',
    name: 'Beaded Ankh Bracelet',
    price: 650,
    description: 'A beautiful beaded bracelet featuring an ankh symbol charm. Celebrates African heritage with contemporary style.',
    shortDescription: 'African-inspired beaded bracelet',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800'],
    category: 'bracelets',
    collections: ['afrofusion'],
    materials: ['Natural Beads', 'Gold-plated Ankh Charm'],
    careInstructions: 'Avoid water. Handle elastic with care.',
    variations: [
      { id: 'v25', name: 'Earth Tones', type: 'color', value: '#8B4513', stock: 14 },
      { id: 'v26', name: 'Royal (Purple/Gold)', type: 'color', value: '#6B3FA0', stock: 10 },
    ],
    stock: 24,
    lowStockThreshold: 5,
    sku: 'ILL-BRC-002',
    isBestseller: false,
    isNewArrival: true,
    isLimited: false,
    isComingSoon: false,
    tags: ['ankh', 'beaded', 'african', 'symbol'],
    style: ['Afrofusion', 'Cultural'],
    createdAt: '2026-09-02T10:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z',
  },

  // === ANKLETS ===
  {
    id: 'prod-013',
    slug: 'dainty-butterfly-anklet',
    name: 'Dainty Butterfly Anklet',
    price: 550,
    description: 'A delicate ankle chain with tiny butterfly charms that move with every step. Perfect for showing off during sandal season.',
    shortDescription: 'Delicate butterfly ankle chain',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800'],
    category: 'anklets',
    collections: ['y2k', 'soft-style'],
    materials: ['Gold-plated Chain', 'Alloy Charms'],
    careInstructions: 'Remove before swimming or bathing.',
    variations: [
      { id: 'v27', name: 'Gold', type: 'color', value: '#D4AF37', stock: 20 },
      { id: 'v28', name: 'Rose Gold', type: 'color', value: '#B76E79', stock: 15 },
    ],
    stock: 35,
    lowStockThreshold: 8,
    sku: 'ILL-ANK-001',
    isBestseller: false,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['butterfly', 'anklet', 'dainty', 'delicate'],
    style: ['Y2K', 'Soft', 'Feminine'],
    createdAt: '2026-07-15T10:00:00Z',
    updatedAt: '2026-09-10T10:00:00Z',
  },

  // === JEWELLERY SETS ===
  {
    id: 'prod-014',
    slug: 'y2k-starter-set',
    name: 'Y2K Starter Set',
    price: 1800,
    compareAtPrice: 2400,
    description: 'Everything you need to nail the Y2K look — includes a heart necklace, butterfly earrings and a charm bracelet. The perfect gift or self-treat.',
    shortDescription: 'Complete Y2K jewellery set',
    images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],
    category: 'jewellery-sets',
    collections: ['y2k'],
    materials: ['Gold-plated Alloy', 'Crystal', 'Enamel'],
    careInstructions: 'Store each piece separately. Avoid moisture.',
    variations: [
      { id: 'v29', name: 'Gold Set', type: 'color', value: '#D4AF37', stock: 8 },
      { id: 'v30', name: 'Silver Set', type: 'color', value: '#C0C0C0', stock: 5 },
    ],
    stock: 13,
    lowStockThreshold: 3,
    sku: 'ILL-SET-001',
    isBestseller: true,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['set', 'y2k', 'starter', 'gift', 'bundle'],
    style: ['Y2K', 'Playful'],
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-09-22T10:00:00Z',
  },
  {
    id: 'prod-015',
    slug: 'soft-girl-essentials',
    name: 'Soft Girl Essentials Set',
    price: 1500,
    compareAtPrice: 1950,
    description: 'The softest, most feminine set for the romantics. Includes pearl chain necklace, rose petal earrings and a dainty bracelet.',
    shortDescription: 'Feminine essentials jewellery set',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800'],
    category: 'jewellery-sets',
    collections: ['soft-style'],
    materials: ['Faux Pearl', 'Resin', 'Gold-plated Alloy'],
    careInstructions: 'Handle with love. Store in individual pouches.',
    variations: [
      { id: 'v31', name: 'Rose Gold', type: 'style', value: 'rose-gold', stock: 10 },
      { id: 'v32', name: 'Gold', type: 'style', value: 'gold', stock: 7 },
    ],
    stock: 17,
    lowStockThreshold: 4,
    sku: 'ILL-SET-002',
    isBestseller: false,
    isNewArrival: true,
    isLimited: false,
    isComingSoon: false,
    tags: ['set', 'soft', 'feminine', 'gift', 'essentials'],
    style: ['Soft', 'Romantic', 'Feminine'],
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
  },

  // === BODY JEWELLERY ===
  {
    id: 'prod-016',
    slug: 'waist-chain-gold',
    name: 'Golden Goddess Waist Chain',
    price: 1300,
    description: 'A stunning gold waist chain that drapes beautifully over your hips. Add it over a dress, crop top or bikini for instant goddess energy.',
    shortDescription: 'Gold-plated body waist chain',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800'],
    category: 'body-jewellery',
    collections: ['afrofusion'],
    materials: ['Gold-plated Alloy', 'Adjustable Chain'],
    careInstructions: 'Handle gently. Avoid pulling or stretching.',
    variations: [
      { id: 'v33', name: 'Gold', type: 'color', value: '#D4AF37', stock: 6 },
      { id: 'v34', name: 'Rose Gold', type: 'color', value: '#B76E79', stock: 4 },
    ],
    stock: 10,
    lowStockThreshold: 3,
    sku: 'ILL-BDY-001',
    isBestseller: false,
    isNewArrival: true,
    isLimited: true,
    isComingSoon: false,
    tags: ['waist-chain', 'body', 'goddess', 'bold'],
    style: ['Afrofusion', 'Bold', 'Goddess'],
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
  },

  // === STATEMENT PIECES ===
  {
    id: 'prod-017',
    slug: 'layered-coin-necklace',
    name: 'Layered Coin Statement Necklace',
    price: 1400,
    description: 'A dramatic multi-layered necklace with coin pendants at varying lengths. This is THE piece that completes a look. Bold, luxe and unforgettable.',
    shortDescription: 'Multi-layer coin statement necklace',
    images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800'],
    category: 'statement-pieces',
    collections: ['afrofusion', 'clean-style'],
    materials: ['Gold-plated Alloy', 'Coin Pendants'],
    careInstructions: 'Store hanging to prevent tangling. Avoid water.',
    variations: [
      { id: 'v35', name: 'Antique Gold', type: 'color', value: '#B8860B', stock: 5 },
      { id: 'v36', name: 'Bright Gold', type: 'color', value: '#FFD700', stock: 7 },
    ],
    stock: 12,
    lowStockThreshold: 3,
    sku: 'ILL-STP-001',
    isBestseller: false,
    isNewArrival: true,
    isLimited: false,
    isComingSoon: false,
    tags: ['layered', 'coin', 'statement', 'bold', 'luxe'],
    style: ['Statement', 'Bold', 'Luxe'],
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
  },
  {
    id: 'prod-018',
    slug: 'crystal-ear-cuff-set',
    name: 'Crystal Ear Cuff Set',
    price: 600,
    description: 'A set of crystal-encrusted ear cuffs for when you want to sparkle without the commitment of piercings. Three different styles included.',
    shortDescription: 'No-pierce crystal ear cuffs',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
    category: 'statement-pieces',
    collections: ['y2k', 'midnight-muse'],
    materials: ['Alloy', 'Crystal'],
    careInstructions: 'Handle delicately. Wipe with soft cloth.',
    variations: [
      { id: 'v37', name: 'Clear Crystal', type: 'color', value: '#F0F0F0', stock: 20 },
      { id: 'v38', name: 'Black Crystal', type: 'color', value: '#1a1a1a', stock: 15 },
    ],
    stock: 35,
    lowStockThreshold: 8,
    sku: 'ILL-STP-002',
    isBestseller: false,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: false,
    tags: ['ear-cuff', 'crystal', 'no-pierce', 'sparkle'],
    style: ['Y2K', 'Edgy'],
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
  },

  // === COMING SOON ===
  {
    id: 'prod-019',
    slug: 'zodiac-pendant-collection',
    name: 'Zodiac Pendant Necklace',
    price: 850,
    description: 'Coming soon — personalised zodiac sign pendants. Choose your sign and wear your stars. Pre-orders opening soon.',
    shortDescription: 'Personalised zodiac pendants',
    images: ['https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800'],
    category: 'necklaces',
    collections: ['clean-style'],
    materials: ['Stainless Steel', 'Cubic Zirconia'],
    careInstructions: 'TBA',
    variations: [],
    stock: 0,
    lowStockThreshold: 5,
    sku: 'ILL-NCK-005',
    isBestseller: false,
    isNewArrival: false,
    isLimited: false,
    isComingSoon: true,
    tags: ['zodiac', 'personal', 'pendant', 'astrology'],
    style: ['Clean', 'Personal'],
    createdAt: '2026-09-28T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
  },
  {
    id: 'prod-020',
    slug: 'tribal-fusion-cuff',
    name: 'Tribal Fusion Cuff Bracelet',
    price: 1100,
    description: 'A bold cuff bracelet blending traditional African tribal patterns with modern metalwork. A wearable piece of art.',
    shortDescription: 'African-inspired statement cuff',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'],
    category: 'bracelets',
    collections: ['afrofusion'],
    materials: ['Brass', 'Enamel'],
    careInstructions: 'TBA',
    variations: [],
    stock: 0,
    lowStockThreshold: 5,
    sku: 'ILL-BRC-003',
    isBestseller: false,
    isNewArrival: false,
    isLimited: true,
    isComingSoon: true,
    tags: ['tribal', 'cuff', 'african', 'statement'],
    style: ['Afrofusion', 'Bold', 'Statement'],
    createdAt: '2026-09-30T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
  },
];

// ============================================
// COLLECTIONS DATA
// ============================================
export const collections: Collection[] = [
  {
    id: 'col-001',
    slug: 'y2k',
    name: 'Y2K',
    tagline: 'Nostalgia never looked this good ✨',
    description: 'Playful, nostalgic and colourful jewellery inspired by the 2000s. Think butterflies, hearts, stars and all things glitter. Because everything old is new again.',
    image: 'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    accentColor: '#FF69B4',
    products: ['prod-001', 'prod-005', 'prod-009', 'prod-011', 'prod-013', 'prod-014', 'prod-018'],
  },
  {
    id: 'col-002',
    slug: 'afrofusion',
    name: 'Afrofusion',
    tagline: 'Where heritage meets now 🌍',
    description: 'Contemporary jewellery influenced by African aesthetics, patterns and materials. Pieces that celebrate where we come from while defining where we\'re going.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800',
    accentColor: '#D4AF37',
    products: ['prod-002', 'prod-006', 'prod-012', 'prod-016', 'prod-017', 'prod-020'],
  },
  {
    id: 'col-003',
    slug: 'clean-style',
    name: 'Clean Style',
    tagline: 'Less is always more 🤍',
    description: 'Minimal and delicate everyday jewellery for those who believe in the power of simplicity. Clean lines, subtle details and effortless elegance.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800',
    accentColor: '#F5F0E8',
    products: ['prod-004', 'prod-009', 'prod-017', 'prod-019'],
  },
  {
    id: 'col-004',
    slug: 'midnight-muse',
    name: 'Midnight Muse',
    tagline: 'Embrace the dark side 🖤',
    description: 'Dark, gothic and edgy pieces for those who find beauty in the shadows. Bold, dramatic and unapologetically intense.',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800',
    accentColor: '#2D1B4E',
    products: ['prod-003', 'prod-007', 'prod-010', 'prod-018'],
  },
  {
    id: 'col-005',
    slug: 'soft-style',
    name: 'Soft Style',
    tagline: 'Softness is strength 🌸',
    description: 'Feminine, romantic and delicate jewellery for your softest moments. Pieces that whisper rather than shout — and say everything.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    accentColor: '#F4C2C2',
    products: ['prod-004', 'prod-008', 'prod-013', 'prod-015'],
  },
];

// ============================================
// CATEGORIES DATA
// ============================================
export const categories = [
  { slug: 'necklaces', name: 'Necklaces', icon: '✨', count: 5 },
  { slug: 'earrings', name: 'Earrings', icon: '💎', count: 4 },
  { slug: 'rings', name: 'Rings', icon: '💍', count: 2 },
  { slug: 'bracelets', name: 'Bracelets', icon: '📿', count: 3 },
  { slug: 'anklets', name: 'Anklets', icon: '🦶', count: 1 },
  { slug: 'jewellery-sets', name: 'Jewellery Sets', icon: '🎁', count: 2 },
  { slug: 'body-jewellery', name: 'Body Jewellery', icon: '👑', count: 1 },
  { slug: 'statement-pieces', name: 'Statement Pieces', icon: '⭐', count: 2 },
];

// ============================================
// TESTIMONIALS DATA
// ============================================
export const testimonials: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Amara W.',
    text: 'The Y2K Heart Necklace is everything! I literally wear it every day. So many compliments 💖',
    rating: 5,
    product: 'Y2K Heart Necklace',
  },
  {
    id: 'test-002',
    name: 'Nyambura K.',
    text: 'Ordered the Afrofusion Cowrie Choker and I\'m obsessed. The quality is amazing for the price. Will definitely be back!',
    rating: 5,
    product: 'Afrofusion Cowrie Choker',
  },
  {
    id: 'test-003',
    name: 'Wanjiku M.',
    text: 'Delivery was so fast! And the Butterfly Drop Earrings are even prettier in person. 10/10 recommend 🦋',
    rating: 5,
    product: 'Butterfly Drop Earrings',
  },
  {
    id: 'test-004',
    name: 'Achieng O.',
    text: 'Got the Y2K Starter Set as a gift for my bestie. She screamed! The packaging was also super cute.',
    rating: 5,
    product: 'Y2K Starter Set',
  },
  {
    id: 'test-005',
    name: 'Zuri N.',
    text: 'Illharlee understands the assignment every single time. The Stackable Star Rings are my go-to for any outfit.',
    rating: 5,
    product: 'Stackable Star Rings Set',
  },
  {
    id: 'test-006',
    name: 'Fatima H.',
    text: 'The Serpent Wrap Ring is giving dark academia vibes and I am HERE for it 🖤',
    rating: 5,
    product: 'Serpent Wrap Ring',
  },
];

// ============================================
// SAMPLE ORDERS DATA (for admin dashboard)
// ============================================
export const sampleOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'ILL-20261001-001',
    items: [
      { productId: 'prod-001', productName: 'Y2K Heart Necklace', productImage: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800', variation: 'Gold', quantity: 1, unitPrice: 850, total: 850 },
      { productId: 'prod-005', productName: 'Butterfly Drop Earrings', productImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', variation: 'Gold', quantity: 2, unitPrice: 650, total: 1300 },
    ],
    subtotal: 2150,
    deliveryFee: 300,
    total: 2450,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'mpesa',
    customer: { fullName: 'Amara Wanjiku', phone: '+254712345678', email: 'amara@email.com' },
    delivery: { county: 'Nairobi', location: 'Westlands, ABC Place', instructions: 'Call on arrival', isPickup: false },
    createdAt: '2026-10-01T14:30:00Z',
    updatedAt: '2026-10-01T15:00:00Z',
  },
  {
    id: 'ord-002',
    orderNumber: 'ILL-20261001-002',
    items: [
      { productId: 'prod-014', productName: 'Y2K Starter Set', productImage: 'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800', variation: 'Gold Set', quantity: 1, unitPrice: 1800, total: 1800 },
    ],
    subtotal: 1800,
    deliveryFee: 350,
    total: 2150,
    status: 'paid',
    paymentStatus: 'paid',
    paymentMethod: 'mpesa',
    customer: { fullName: 'Nyambura Kamau', phone: '+254723456789', email: 'nyambura@email.com' },
    delivery: { county: 'Kiambu', location: 'Thika Road, Garden Estate', isPickup: false },
    createdAt: '2026-10-01T16:00:00Z',
    updatedAt: '2026-10-01T16:30:00Z',
  },
  {
    id: 'ord-003',
    orderNumber: 'ILL-20260930-001',
    items: [
      { productId: 'prod-009', productName: 'Stackable Star Rings Set', productImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800', variation: 'Silver Set', quantity: 1, unitPrice: 900, total: 900 },
      { productId: 'prod-004', productName: 'Delicate Pearl Chain', productImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', variation: 'Rose Gold Chain', quantity: 1, unitPrice: 750, total: 750 },
    ],
    subtotal: 1650,
    deliveryFee: 300,
    total: 1950,
    status: 'dispatched',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    customer: { fullName: 'Wanjiku Muthoni', phone: '+254734567890', email: 'wanjiku@email.com' },
    delivery: { county: 'Nairobi', location: 'Kilimani, Argwings Kodhek', isPickup: false },
    createdAt: '2026-09-30T10:00:00Z',
    updatedAt: '2026-10-01T09:00:00Z',
  },
  {
    id: 'ord-004',
    orderNumber: 'ILL-20260929-001',
    items: [
      { productId: 'prod-002', productName: 'Afrofusion Cowrie Choker', productImage: 'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800', variation: 'Gold Accent', quantity: 1, unitPrice: 1200, total: 1200 },
    ],
    subtotal: 1200,
    deliveryFee: 450,
    total: 1650,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'mpesa',
    customer: { fullName: 'Achieng Ouma', phone: '+254745678901', email: 'achieng@email.com' },
    delivery: { county: 'Kisumu', location: 'Milimani Estate', isPickup: false },
    createdAt: '2026-09-29T11:00:00Z',
    updatedAt: '2026-10-02T14:00:00Z',
  },
  {
    id: 'ord-005',
    orderNumber: 'ILL-20261002-001',
    items: [
      { productId: 'prod-010', productName: 'Serpent Wrap Ring', productImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800', variation: 'Antique Gold', quantity: 1, unitPrice: 800, total: 800 },
      { productId: 'prod-003', productName: 'Midnight Cross Pendant', productImage: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800', variation: 'Black', quantity: 1, unitPrice: 950, total: 950 },
      { productId: 'prod-007', productName: 'Gothic Spike Studs', productImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', variation: 'Matte Black', quantity: 1, unitPrice: 500, total: 500 },
    ],
    subtotal: 2250,
    deliveryFee: 300,
    total: 2550,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'mpesa',
    customer: { fullName: 'Fatima Hassan', phone: '+254756789012', email: 'fatima@email.com' },
    delivery: { county: 'Mombasa', location: 'Nyali Beach', instructions: 'Deliver to security guard', isPickup: false },
    createdAt: '2026-10-02T09:00:00Z',
    updatedAt: '2026-10-02T09:00:00Z',
  },
];

// ============================================
// KENYAN COUNTIES
// ============================================
export const kenyanCounties = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu',
  'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho',
  'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui',
  'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
  'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi',
  'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
  'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi',
  'Trans-Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir',
  'West Pokot',
];

// ============================================
// DELIVERY FEES (by county grouping)
// ============================================
export const deliveryFees: Record<string, number> = {
  'Nairobi': 300,
  'Kiambu': 350,
  'Machakos': 350,
  'Kajiado': 350,
  'Nakuru': 400,
  'Mombasa': 450,
  'Kisumu': 450,
  'default': 500,
};

export function getDeliveryFee(county: string): number {
  return deliveryFees[county] || deliveryFees['default'];
}

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  const collection = getCollectionBySlug(collectionSlug);
  if (!collection) return [];
  return products.filter(p => collection.products.includes(p.id));
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getBestsellers(): Product[] {
  return products.filter(p => p.isBestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.isNewArrival);
}

export function getComingSoon(): Product[] {
  return products.filter(p => p.isComingSoon);
}

export function getLimitedPieces(): Product[] {
  return products.filter(p => p.isLimited && !p.isComingSoon);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q) ||
    p.collections.some(c => c.toLowerCase().includes(q)) ||
    p.style.some(s => s.toLowerCase().includes(q))
  );
}

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`;
}

export function getInventoryStatus(product: Product): 'in-stock' | 'low-stock' | 'sold-out' {
  if (product.stock === 0) return 'sold-out';
  if (product.stock <= product.lowStockThreshold) return 'low-stock';
  return 'in-stock';
}

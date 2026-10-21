/**
 * Products shown on the Innovation page (beyond the ophthalmic range).
 * To add a product: drop its image in /public/images/innovation and add an entry below.
 * Every feature, use and FAQ answer must match what is printed on the pack.
 */
export type FeatureIcon =
  | 'heat' | 'time' | 'safe' | 'easy' | 'instant' | 'nonElectric' | 'snow' | 'leaf'
  | 'feather' | 'water' | 'bowl' | 'reuse' | 'squeeze' | 'shake' | 'apply' | 'portable';
export type UseIcon = 'defence' | 'outdoor' | 'industrial' | 'expedition' | 'hot' | 'coldOps';

export interface InnovationProduct {
  id: string;
  /** Range the product belongs to; used for grouping and the card label. */
  category: 'Warmers' | 'Cooling' | 'Field kits' | 'Field food';
  name: string;
  /** Word(s) of the name shown in the accent colour. */
  accent?: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Square pack shots are shown 1:1 so nothing is cropped. */
  square?: boolean;
  pack: string;
  /** Short badge printed on the pack, e.g. "Specially made for Indian Army". */
  badge?: string;
  includes?: string[];
  features: { icon: FeatureIcon; label: string; value: string }[];
  uses: { icon: UseIcon; label: string }[];
  highlight?: string;
  faqs: { q: string; a: string }[];
}

export const INNOVATION_PRODUCTS: InnovationProduct[] = [
  {
    id: 'hand-warmer',
    category: 'Warmers',
    name: 'Hand',
    accent: 'Warmer',
    tagline: 'Self-heating warmer pad',
    description: 'Instant, long-lasting warmth in a single-use pad — open the sachet and it heats up on its own.',
    image: '/images/innovation/hand-warmer.webp',
    imageAlt: 'Revora Hand Warmer box of 10 self-heating pads, with a sachet and a pad',
    pack: '10 single-use warmer pads',
    features: [
      { icon: 'heat', label: 'Heats up to', value: '36°C – 42°C' },
      { icon: 'time', label: 'Lasts up to', value: '6 hours' },
      { icon: 'safe', label: 'Safe &', value: 'Odourless' },
      { icon: 'easy', label: 'Simple', value: 'Easy to use' },
    ],
    uses: [
      { icon: 'defence', label: 'Defence personnel' },
      { icon: 'outdoor', label: 'Trekking & outdoor activities' },
      { icon: 'industrial', label: 'Industrial & workforce' },
    ],
    highlight: 'Ideal for extreme cold conditions',
    faqs: [
      { q: 'How warm does it get?', a: 'Revora Hand Warmer heats up to 36°C – 42°C.' },
      { q: 'How long does the warmth last?', a: 'Up to 6 hours from a single pad.' },
      { q: 'Do I need batteries or charging?', a: 'No. It is a self-heating pad — open the sachet and it warms up on its own.' },
      { q: 'Can I reuse a pad?', a: 'No, each pad is single-use. A box contains 10 pads.' },
    ],
  },
  {
    id: 'sleeping-bag-warmer',
    category: 'Warmers',
    name: 'Sleeping Bag',
    accent: 'Warmer',
    tagline: 'Self-heating warmer pad',
    description: 'Slip a pad into your sleeping bag for hours of steady warmth on cold nights.',
    image: '/images/innovation/sleeping-bag-warmer.webp',
    imageAlt: 'Revora Sleeping Bag Warmer box of 5 self-heating pads, with a sachet and a pad',
    pack: '5 single-use warmer pads',
    features: [
      { icon: 'heat', label: 'Heats up to', value: '36°C – 42°C' },
      { icon: 'time', label: 'Lasts up to', value: '6 hours' },
      { icon: 'safe', label: 'Safe &', value: 'Odourless' },
      { icon: 'feather', label: 'Lightweight &', value: 'Easy to use' },
    ],
    uses: [
      { icon: 'expedition', label: 'Expeditions & high altitude' },
      { icon: 'defence', label: 'Defence personnel' },
      { icon: 'outdoor', label: 'Trekking & outdoor activities' },
      { icon: 'coldOps', label: 'Cold weather operations' },
    ],
    highlight: 'Ideal for extreme cold conditions',
    faqs: [
      { q: 'How warm does it get?', a: 'It heats up to 36°C – 42°C.' },
      { q: 'How long does it last?', a: 'Up to 6 hours per pad.' },
      { q: 'How many pads are in a box?', a: 'Five single-use warmer pads.' },
    ],
  },
  {
    id: 'hypothermia-kit',
    category: 'Field kits',
    name: 'Hypothermia Prevention &',
    accent: 'Management Kit',
    tagline: 'Full-body warming kit',
    description: 'A complete, non-electric warming kit for preventing and managing hypothermia in the field.',
    image: '/images/innovation/hypothermia-kit.webp',
    imageAlt: 'Revora Hypothermia Prevention and Management Kit box',
    square: true,
    pack: 'Complete warming kit',
    badge: 'Specially made for Indian Army · Made in India',
    includes: ['Torso vest (1 pc)', 'Foot warmers (2 pcs)', 'Forearm sleeves (2 pcs)', 'Hand warmers (2 pcs)'],
    features: [
      { icon: 'easy', label: 'Simple', value: 'Easy to use' },
      { icon: 'instant', label: 'Warming', value: 'Instant' },
      { icon: 'nonElectric', label: 'No power', value: 'Non-electric' },
      { icon: 'portable', label: 'Lightweight &', value: 'Portable' },
    ],
    uses: [
      { icon: 'defence', label: 'Defence personnel' },
      { icon: 'coldOps', label: 'Cold weather operations' },
    ],
    highlight: 'Safe & effective',
    faqs: [
      { q: 'What is in the kit?', a: 'A torso vest, two foot warmers, two forearm sleeves and two hand warmers.' },
      { q: 'Does it need electricity?', a: 'No. The kit is non-electric and warms instantly.' },
      { q: 'Who is it made for?', a: 'It is specially made for the Indian Army, and made in India.' },
    ],
  },
  {
    id: 'instahot-bowl',
    category: 'Field food',
    name: 'InstaHot®',
    accent: 'Cooking Bowl',
    tagline: 'Hot food anywhere, anytime',
    description: 'Pour water, heat your food, eat — a self-heating cooking bowl for when there is no stove.',
    image: '/images/innovation/instahot-bowl.webp',
    imageAlt: 'Revora InstaHot Cooking Bowl box with an orange bowl of hot noodles',
    square: true,
    pack: 'Cooking bowl · insulated bag included',
    badge: 'Specially made for Indian Army',
    features: [
      { icon: 'water', label: 'Step 1', value: 'Pour water' },
      { icon: 'heat', label: 'Step 2', value: 'Heat food' },
      { icon: 'bowl', label: 'Step 3', value: 'Eat delicious' },
      { icon: 'leaf', label: 'Safe &', value: 'Convenient' },
    ],
    uses: [
      { icon: 'defence', label: 'Defence personnel' },
      { icon: 'outdoor', label: 'Trekking & outdoor activities' },
    ],
    highlight: 'Hot food anywhere, anytime',
    faqs: [
      { q: 'How does it work?', a: 'Pour water, heat your food, and eat — three simple steps.' },
      { q: 'What comes in the box?', a: 'The InstaHot cooking bowl with an insulated bag.' },
    ],
  },
  {
    id: 'cooling-vest',
    category: 'Cooling',
    name: 'Instant',
    accent: 'Cooling Vest',
    tagline: 'Rapid cooling · Lightweight · Reusable',
    description: 'A lightweight vest with cooling pads that keeps the body cool in high-temperature conditions.',
    image: '/images/innovation/cooling-vest.webp',
    imageAlt: 'Revora Instant Cooling Vest box with its storage case',
    pack: 'Cooling vest + cooling pads',
    badge: 'Specially made for Indian Army',
    includes: ['Cooling vest (1 pc)', 'Cooling pads (as required)'],
    features: [
      { icon: 'snow', label: 'Quick donning', value: 'Under 30 seconds' },
      { icon: 'time', label: 'Cooling lasts', value: '1 hour+' },
      { icon: 'leaf', label: 'Pads', value: 'Freeze-free' },
      { icon: 'feather', label: 'Lightweight &', value: 'Comfortable' },
    ],
    uses: [
      { icon: 'defence', label: 'Defence personnel' },
      { icon: 'industrial', label: 'Industrial workforce' },
      { icon: 'hot', label: 'High temperature conditions' },
    ],
    highlight: 'Rapid cooling, reusable',
    faqs: [
      { q: 'How long does the cooling last?', a: 'Cooling lasts more than 1 hour.' },
      { q: 'How quick is it to put on?', a: 'Donning time is under 30 seconds.' },
      { q: 'Is it reusable?', a: 'Yes, the vest is reusable.' },
    ],
  },
  {
    id: 'quiqool-cool-pack',
    category: 'Cooling',
    name: 'QuiQool™',
    accent: 'Cool Pack',
    tagline: 'Multipurpose cool pack · Instant & reusable',
    description: 'Squeeze, shake and apply for instant cold — then freeze it and use it again.',
    image: '/images/innovation/quiqool-cool-pack.webp',
    imageAlt: 'Revora QuiQool multipurpose cool pack box and gel pack',
    pack: 'Multipurpose cool pack',
    features: [
      { icon: 'squeeze', label: 'Step 1', value: 'Squeeze' },
      { icon: 'shake', label: 'Step 2', value: 'Shake' },
      { icon: 'apply', label: 'Step 3', value: 'Apply' },
      { icon: 'reuse', label: 'Freeze &', value: 'Reuse' },
    ],
    uses: [],
    highlight: 'No refrigeration needed for first use',
    faqs: [
      { q: 'How do I use it?', a: 'Squeeze with gentle pressure, shake to mix the gel, and apply to the desired area.' },
      { q: 'Do I need to refrigerate it first?', a: 'No. Refrigeration is not required for first use.' },
      { q: 'Can I reuse it?', a: 'Yes — keep it in the freezer and reuse as needed.' },
    ],
  },
];

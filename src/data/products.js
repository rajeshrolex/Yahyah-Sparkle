import redCleaner from '../assets/red-cleaner.jpg';
import blueCleaner from '../assets/blue-cleaner.jpg';
import comboPack from '../assets/combo-pack.png';
import bannerRed from '../assets/banner-red.png';
import bannerBlue from '../assets/banner-blue.png';

import mahashivratriOffer from '../assets/mahashivratri-offer.jpg';
import ramzanHoliOffer from '../assets/ramzan-holi-offer.jpg';


export const products = [
    {
        id: 'ramzan-holi-offer',
        name: '🌙 Ramzan & Holi 🎨 Super Dhamaka Sale!',
        subtitle: '8 Litres Special Combo - Limited Time!',
        description: 'Celebrate the festivals of colors and blessings with our Super Dhamaka Sale! Get 4 Red Liquids + 4 Blue Liquids (Total 8 Litres) at a special festive price.',
        price: '₹1500',
        unit: '8 Litres',
        image: ramzanHoliOffer,
        color: 'from-purple-600 to-pink-500',
        bgColor: 'from-purple-50 to-pink-50',
        isBestValue: true,
        isSpecialOffer: true,
        offerPeriod: '16/02/2026 - 31/03/2026',
        features: [
            '4 Bottles of YahYah Sparkle Red (4 Litres)',
            '4 Bottles of YahYah Sparkle Blue (4 Litres)',
            'Total 8 Litres of cleaning power',
            'Perfect for festive deep cleaning',
            'Super Dhamaka Savings'
        ],
        useCases: [
            'Full House Cleaning',
            'Pre-Festival Deep Clean',
            'Stain Removal',
            'Floor & Bathroom Cleaning'
        ],
        instructions: [
            'Use Red liquid for hard stains and marble',
            'Use Blue liquid for tiles and general bathroom cleaning',
            'Follow individual bottle instructions'
        ],
        precautions: [
            'Wear gloves during use',
            'Keep out of reach of children',
            'Store in a cool, dry place'
        ]
    },
    {
        id: 'mahashivratri-offer',
        name: '🕉️ Mahashivratri Dhamaka Offer!',
        subtitle: 'Special 6 Litres Combo - Limited Time!',
        description: 'Celebrate Mahashivratri with our special cleaning combo! Get 3 Red Liquids + 3 Blue Liquids (Total 6 Litres) at a special price of just ₹1300.',
        price: '₹1300',
        unit: '6 Litres',
        image: mahashivratriOffer,
        color: 'from-orange-600 to-red-600',
        bgColor: 'from-orange-50 to-red-50',
        isBestValue: true,
        isSpecialOffer: true,
        offerPeriod: '10/02/2026 - 16/02/2026',
        features: [
            '3 Bottles of YahYah Sparkle Red (3 Litres)',
            '3 Bottles of YahYah Sparkle Blue (3 Litres)',
            'Total 6 Litres of cleaning power',
            'Perfect for festive deep cleaning',
            'Advanced stain removal formula'
        ],
        useCases: [
            'Full House Cleaning',
            'Bathroom & Tiles Deep Cleaning',
            'Festive Preparation',
            'Stain Removal for Marble & Tiles'
        ],
        instructions: [
            'Use Red liquid for hard stains and marble',
            'Use Blue liquid for tiles and general bathroom cleaning',
            'Follow individual bottle instructions for best results'
        ],
        precautions: [
            'Wear gloves during use',
            'Keep out of reach of children',
            'Store in a cool, dry place'
        ]
    },

    {
        id: 'red-cleaner',
        name: 'YahYah Sparkle Red',
        subtitle: 'Advanced Multi Cleaner for Deep Clean',
        description: 'Advanced Red Multi Cleaner for deep clean. Specially formulated for white marble, tiles, toilets, and removing hard cement marks.',
        price: '₹350',
        unit: '1 Litre',
        image: redCleaner,
        banner: bannerRed,
        color: 'from-red-500 to-orange-500',
        bgColor: 'from-red-50 to-orange-50',
        features: [
            'Remove hard cement marks',
            'Strong on dirt, safe on skin',
            'The commode stain specialist'
        ],
        useCases: [
            'White Marble Cleaning',
            'Buckets & Doors Cleaning',
            'Tiles & Floor Cleaning',
            'Toilet Cleaning',
            'Hard Cement Cleaning'
        ],
        instructions: [
            'Use green scrubber while cleaning',
            'Use steel scrubber',
            'Use sand paper (after pouring liquid into commode to remove black stains)',
            'Use cloth cleaning brush',
            'Use after cleaning spray room freshner'
        ],
        precautions: [
            'Wear gloves',
            'Use footwear avoid slips',
            'Wear a mask if needed',
            'Keep out of reach of children'
        ]
    },
    {
        id: 'blue-cleaner',
        name: 'YahYah Sparkle Blue',
        subtitle: 'Advanced Salt Cleaner for Stubborn Stains',
        description: 'Advanced Blue Salt Cleaner for stubborn stains. Ideal for removing hard salt stains from bathroom tiles, buckets, and floors.',
        price: '₹250',
        unit: '1 Litre',
        image: blueCleaner,
        banner: bannerBlue,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'from-blue-50 to-cyan-50',
        features: [
            'Remove hard cement marks',
            'Strong on dirt, safe on skin',
            'Smell free cleaning'
        ],
        useCases: [
            'Hard Salt Stains Cleaning',
            'Buckets & Doors Cleaning',
            'Tiles & Floor Cleaning',
            'Toilet Cleaning'
        ],
        instructions: [
            'Use green scrubber while cleaning',
            'Use steel scrubber',
            'Use sand paper (after pouring liquid into commode to remove black stains)',
            'Use cloth cleaning brush',
            'Use after cleaning spray room freshner'
        ],
        precautions: [
            'Wear gloves',
            'Use footwear avoid slips',
            'Wear a mask if needed',
            'Keep out of reach of children'
        ]
    },
    {
        id: 'combo-pack',
        name: 'Combo Pack - Best Value!',
        subtitle: 'Complete Cleaning Kit',
        description: 'Get the complete cleaning power with our combo pack including both Red and Blue cleaners plus professional accessories.',
        price: '₹1500',
        unit: '6 Litres',
        image: comboPack,
        color: 'from-purple-500 to-pink-500',
        bgColor: 'from-purple-50 to-pink-50',
        isBestValue: true,
        features: [
            'Complete home cleaning solution',
            'Includes both Red & Blue cleaners',
            'Professional grade accessories included',
            'Maximum savings'
        ],
        useCases: [
            'Whole House Deep Cleaning',
            'Kitchen & Bathroom Specialization',
            'Stain Removal Experts'
        ],
        instructions: [
            'Follow individual product instructions',
            'Use provided scrubbers for best results',
            'Store in a cool, dry place'
        ],
        precautions: [
            'Wear gloves',
            'Keep out of reach of children',
            'Read labels carefully'
        ]
    }
];

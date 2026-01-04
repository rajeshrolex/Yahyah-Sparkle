import redCleaner from '../assets/red-cleaner.jpg';
import blueCleaner from '../assets/blue-cleaner.jpg';
import comboPack from '../assets/combo-pack.png';
import bannerRed from '../assets/banner-red.png';
import bannerBlue from '../assets/banner-blue.png';
import bumperOffer from '../assets/bumper-offer.jpg';
import specialDhamakaOffer from '../assets/special-dhamaka-offer.jpg';

export const products = [
    {
        id: 'special-dhamaka-offer',
        name: '🎉 Special Dhamaka Offer - 15 Litres Mega Pack!',
        subtitle: 'Limited Stock - Only 30 Combos Available!',
        description: 'MEGA SAVINGS! Get 7 Red Liquids + 7 Blue Liquids + 1 Phenyl Compound (Total 15 Litres) at an unbeatable price. FREE Delivery within 25km of Hyderabad, and FREE RTC Cargo delivery to all of Telangana & Andhra Pradesh!',
        price: '₹3500',
        unit: '15 Litres',
        image: specialDhamakaOffer,
        color: 'from-yellow-500 to-orange-600',
        bgColor: 'from-yellow-50 to-orange-50',
        isBestValue: true,
        isSpecialOffer: true,
        offerPeriod: '04/01/2026 - 16/01/2026',
        stockLimit: '30 Combos Only!',
        features: [
            '7 Bottles of YahYah Sparkle Red (7 Litres)',
            '7 Bottles of YahYah Sparkle Blue (7 Litres)',
            '1 Phenyl Compound (1 Litre)',
            'Total 15 Litres of cleaning power',
            'Best value ever offered!'
        ],
        deliveryInfo: [
            '🚚 FREE Delivery within 25km of Hyderabad',
            '🚌 FREE RTC Cargo delivery to Telangana',
            '🚌 FREE RTC Cargo delivery to Andhra Pradesh',
            '📦 Safe & Secure Packaging'
        ],
        useCases: [
            'Bulk Home Cleaning',
            'Commercial Cleaning',
            'Office & Workspace Cleaning',
            'Hostel & PG Cleaning',
            'Professional Cleaning Services'
        ],
        instructions: [
            'Use Red liquid for hard stains and marble',
            'Use Blue liquid for tiles and general bathroom cleaning',
            'Use Phenyl for floor mopping and disinfection',
            'Wear gloves during usage'
        ],
        precautions: [
            'Wear gloves during use',
            'Keep out of reach of children',
            'Store in a cool, dry place',
            'Avoid mixing different cleaning liquids'
        ]
    },
    {
        id: 'bumper-offer',
        name: 'Merry Christmas & Happy New Year Bumper Dhamaka Offer!',
        subtitle: '8 Litres Mega Savings - Limited Time Only!',
        description: 'Bumper Dhamaka Offer: Get 4 Red Liquids + 4 Blue Liquids (Total 8 Litres). Valid from 23/12/2025 to 16/01/2026. Includes free cleaning accessories for the ultimate cleaning experience.',
        price: '₹1700',
        unit: '8 Litres',
        image: bumperOffer,
        color: 'from-green-600 to-red-600',
        bgColor: 'from-green-50 to-red-50',
        isBestValue: true,
        isBumperOffer: true,
        offerPeriod: '23/12/2025 - 16/01/2026',
        features: [
            '4 Bottles of YahYah Sparkle Red',
            '4 Bottles of YahYah Sparkle Blue',
            'Total 8 Litres of cleaning power',
            'Best value for holiday cleaning'
        ],
        freebies: [
            '1 Pair Industrial Hand Gloves',
            '1 Green Scrubber',
            '1 Steel Scrubber'
        ],
        useCases: [
            'Full House Cleaning',
            'Bulk Storage',
            'Professional Cleaning Tasks'
        ],
        instructions: [
            'Use Red liquid for hard stains and marble',
            'Use Blue liquid for tiles and general bathroom cleaning',
            'Wear provided gloves during usage'
        ],
        precautions: [
            'Wear gloves (provided)',
            'Keep out of reach of children',
            'Avoid mixing red and blue liquids'
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

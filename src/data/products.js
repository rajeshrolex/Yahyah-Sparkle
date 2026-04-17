import redCleaner from '../assets/red-cleaner.jpg';
import blueCleaner from '../assets/blue-cleaner.jpg';
import comboPack from '../assets/combo-pack.png';
import bulkOffer from '../assets/bulk-offer.jpg';
import bannerRed from '../assets/banner-red.png';
import bannerBlue from '../assets/banner-blue.png';
import akshaya8L from '../new/eight .png';
import akshaya4L from '../new/four copy.png';



export const products = [
    {
        id: 'akshaya-tritiya-4l',
        name: 'Akshaya Tritiya Dhamaka Offer (4 Litres)',
        subtitle: '2 Red + 2 Blue Liquids',
        description: 'Celebrate Akshaya Tritiya with our special Dhamaka Offer! Contains 2 Litres of Red and 2 Litres of Blue YahYah Sparkle liquids.',
        price: '₹1100',
        unit: '4 Litres',
        image: akshaya4L,
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'from-amber-50 to-orange-50',
        isSpecialOffer: true,
        offerPeriod: '18/04/2026 - 30/04/2026',
        features: [
            '2 Red yah yah Sparkle (for Deep Clean)',
            '2 Blue yah yah Sparkle (for Stubborn Stains)',
            'Red liquid: Rs.350/litre, Blue liquid: Rs.250/litre'
        ],
        useCases: [
            'Complete Home Cleaning',
            'Bathroom & Toilet Deep Cleaning',
            'Floor & Tiles Cleaning'
        ],
        instructions: [
            'Use Red liquid for hard stains and marble',
            'Use Blue liquid for tiles and general bathroom cleaning',
        ],
        precautions: [
            'Wear gloves during use',
            'Keep out of reach of children',
            'Store in a cool, dry place'
        ]
    },
    {
        id: 'akshaya-tritiya-8l',
        name: 'Akshaya Tritiya Dhamaka Offer (8 Litres)',
        subtitle: '4 Red + 4 Blue Liquids',
        description: 'Mega Akshaya Tritiya Dhamaka Offer! Contains 4 Litres of Red and 4 Litres of Blue YahYah Sparkle liquids.',
        price: '₹1700',
        unit: '8 Litres',
        image: akshaya8L,
        color: 'from-orange-500 to-red-600',
        bgColor: 'from-orange-50 to-red-50',
        isBestValue: true,
        isBumperOffer: true,
        offerPeriod: '18/04/2026 - 30/04/2026',
        features: [
            '4 Red yah yah Sparkle (for Deep Clean)',
            '4 Blue yah yah Sparkle (for Stubborn Stains)',
            'Red liquid: Rs.350/litre, Blue liquid: Rs.250/litre'
        ],
        useCases: [
            'Complete Home Cleaning',
            'Bathroom & Toilet Deep Cleaning',
            'Floor & Tiles Cleaning'
        ],
        instructions: [
            'Use Red liquid for hard stains and marble',
            'Use Blue liquid for tiles and general bathroom cleaning',
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
    }
];

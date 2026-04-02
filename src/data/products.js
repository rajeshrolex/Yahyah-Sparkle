import redCleaner from '../assets/red-cleaner.jpg';
import blueCleaner from '../assets/blue-cleaner.jpg';
import comboPack from '../assets/combo-pack.png';
import bulkOffer from '../assets/bulk-offer.jpg';
import bannerRed from '../assets/banner-red.png';
import bannerBlue from '../assets/banner-blue.png';



export const products = [
    {
        id: 'super-special-combo-4l',
        name: 'Super Special Combo Offer (4 Litres)',
        subtitle: '2 Red + 2 Blue Liquids with Free Gifts',
        description: 'Get our Super Special Combo containing 2 Litres of Red and 2 Litres of Blue YahYah Sparkle liquids along with 5 free cleaning accessories.',
        price: '₹1200',
        unit: '4 Litres',
        image: comboPack,
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'from-amber-50 to-orange-50',
        isSpecialOffer: true,
        offerPeriod: '01/04/2026 - 10/04/2026',
        features: [
            '2 Red yah yah Sparkle (for Deep Clean)',
            '2 Blue yah yah Sparkle (for Stubborn Stains)',
            'Free: Hand gloves, Steel scrubber, Handle blade, Green scrubber, Sand paper',
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
            'Use the provided scrubbers and accessories for best results'
        ],
        precautions: [
            'Wear the provided gloves during use',
            'Keep out of reach of children',
            'Store in a cool, dry place'
        ]
    },
    {
        id: 'super-special-combo-8l',
        name: 'Super Special Combo Offer (8 Litres)',
        subtitle: '4 Red + 4 Blue Liquids with Free Gifts',
        description: 'Get our Mega Super Special Combo containing 4 Litres of Red and 4 Litres of Blue YahYah Sparkle liquids along with 5 free cleaning accessories.',
        price: '₹1900',
        unit: '8 Litres',
        image: bulkOffer,
        color: 'from-orange-500 to-red-600',
        bgColor: 'from-orange-50 to-red-50',
        isBestValue: true,
        isBumperOffer: true,
        offerPeriod: '01/04/2026 - 10/04/2026',
        features: [
            '4 Red yah yah Sparkle (for Deep Clean)',
            '4 Blue yah yah Sparkle (for Stubborn Stains)',
            'Free: Hand gloves, Steel scrubber, Handle blade, Green scrubber, Sand paper',
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
            'Use the provided scrubbers and accessories for best results'
        ],
        precautions: [
            'Wear the provided gloves during use',
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

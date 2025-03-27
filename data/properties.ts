import { Property } from "@/types/property"

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury Penthouse with City Views",
    description: "Stunning penthouse apartment with panoramic views of London's skyline. Features high-end finishes, open-plan living, and a private terrace.",
    price: 2500000,
    location: {
      city: "London",
      area: "Canary Wharf",
      postcode: "E14"
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      squareFootage: 2000,
      propertyType: "penthouse",
      yearBuilt: 2020
    },
    amenities: ["Concierge", "Gym", "Parking", "Balcony", "Air Conditioning"],
    images: ["/property-1.jpg", "/property-1-2.jpg", "/property-1-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "A"
  },
  {
    id: "2",
    title: "Modern Family Home in Greenwich",
    description: "Beautiful family home with a landscaped garden, modern kitchen, and excellent transport links.",
    price: 1200000,
    location: {
      city: "London",
      area: "Greenwich",
      postcode: "SE10"
    },
    features: {
      bedrooms: 4,
      bathrooms: 2,
      squareFootage: 1800,
      propertyType: "house",
      yearBuilt: 2015
    },
    amenities: ["Garden", "Parking", "Storage", "Central Heating"],
    images: ["/property-2.jpg", "/property-2-2.jpg", "/property-2-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "B"
  },
  {
    id: "3",
    title: "Charming Victorian Apartment",
    description: "Beautifully renovated Victorian apartment with period features and modern amenities.",
    price: 850000,
    location: {
      city: "London",
      area: "Islington",
      postcode: "N1"
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      squareFootage: 900,
      propertyType: "apartment",
      yearBuilt: 1890
    },
    amenities: ["High Ceilings", "Period Features", "Garden Access"],
    images: ["/property-3.jpg", "/property-3-2.jpg", "/property-3-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "C"
  },
  {
    id: "4",
    title: "Luxury Villa with Pool",
    description: "Exceptional villa with indoor pool, cinema room, and landscaped gardens.",
    price: 4500000,
    location: {
      city: "London",
      area: "Hampstead",
      postcode: "NW3"
    },
    features: {
      bedrooms: 6,
      bathrooms: 5,
      squareFootage: 4500,
      propertyType: "villa",
      yearBuilt: 2018
    },
    amenities: ["Swimming Pool", "Cinema Room", "Wine Cellar", "Smart Home System", "Security System"],
    images: ["/property-4.jpg", "/property-4-2.jpg", "/property-4-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "A"
  },
  {
    id: "5",
    title: "Modern City Apartment",
    description: "Stylish apartment in the heart of the city with stunning views and modern amenities.",
    price: 1500000,
    location: {
      city: "London",
      area: "City of London",
      postcode: "EC2"
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      propertyType: "apartment",
      yearBuilt: 2019
    },
    amenities: ["Concierge", "Gym", "Roof Terrace", "Bike Storage"],
    images: ["/property-5.jpg", "/property-5-2.jpg", "/property-5-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "A"
  },
  {
    id: "6",
    title: "Elegant Georgian Townhouse",
    description: "Beautiful Georgian townhouse with original features, high ceilings, and a private garden. Recently renovated to combine period charm with modern luxury.",
    price: 2800000,
    location: {
      city: "Edinburgh",
      area: "New Town",
      postcode: "EH3"
    },
    features: {
      bedrooms: 5,
      bathrooms: 3,
      squareFootage: 3200,
      propertyType: "house",
      yearBuilt: 1820
    },
    amenities: ["Period Features", "Garden", "Wine Cellar", "Fireplaces", "Home Office"],
    images: ["/property-6.jpg", "/property-6-2.jpg", "/property-6-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "C"
  },
  {
    id: "7",
    title: "Modern Docklands Apartment",
    description: "Stunning waterfront apartment with floor-to-ceiling windows offering panoramic views of the Thames. Features state-of-the-art home automation.",
    price: 1250000,
    location: {
      city: "London",
      area: "Canary Wharf",
      postcode: "E14"
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1100,
      propertyType: "apartment",
      yearBuilt: 2019
    },
    amenities: ["River Views", "Concierge", "Gym", "Parking", "Balcony"],
    images: ["/property-7.jpg", "/property-7-2.jpg", "/property-7-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "A"
  },
  {
    id: "8",
    title: "Converted Victorian School",
    description: "Unique conversion of a Victorian school building into a spectacular modern home. Double-height ceilings and original arched windows.",
    price: 1850000,
    location: {
      city: "Manchester",
      area: "Didsbury",
      postcode: "M20"
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2800,
      propertyType: "house",
      yearBuilt: 1880
    },
    amenities: ["Character Features", "Gated Parking", "Garden", "Home Cinema"],
    images: ["/property-8.jpg", "/property-8-2.jpg", "/property-8-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "D"
  },
  {
    id: "9",
    title: "Luxury Birmingham Penthouse",
    description: "Spectacular penthouse apartment in Birmingham's most prestigious development. Wraparound terrace with city views.",
    price: 895000,
    location: {
      city: "Birmingham",
      area: "City Centre",
      postcode: "B1"
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1500,
      propertyType: "penthouse",
      yearBuilt: 2021
    },
    amenities: ["24/7 Concierge", "Roof Terrace", "Parking", "Smart Home System"],
    images: ["/property-9.jpg", "/property-9-2.jpg", "/property-9-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "A"
  },
  {
    id: "10",
    title: "Cotswold Stone Villa",
    description: "Charming Cotswold stone villa with beautiful gardens and countryside views. Perfect blend of traditional architecture and modern comfort.",
    price: 1650000,
    location: {
      city: "Birmingham",
      area: "Edgbaston",
      postcode: "B15"
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      squareFootage: 3500,
      propertyType: "villa",
      yearBuilt: 1925
    },
    amenities: ["Tennis Court", "Swimming Pool", "Landscaped Gardens", "Double Garage"],
    images: ["/property-10.jpg", "/property-10-2.jpg", "/property-10-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "D"
  },
  {
    id: "11",
    title: "Contemporary City Loft",
    description: "Industrial-style loft apartment with exposed brick walls and steel beams. Open-plan living at its finest.",
    price: 750000,
    location: {
      city: "Manchester",
      area: "Northern Quarter",
      postcode: "M4"
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      propertyType: "apartment",
      yearBuilt: 2015
    },
    amenities: ["High Ceilings", "Original Features", "Secure Parking", "Bike Storage"],
    images: ["/property-11.jpg", "/property-11-2.jpg", "/property-11-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "B"
  },
  {
    id: "12",
    title: "Royal Crescent Residence",
    description: "Prestigious apartment in Edinburgh's historic Royal Crescent. Combines Georgian grandeur with contemporary luxury.",
    price: 1450000,
    location: {
      city: "Edinburgh",
      area: "West End",
      postcode: "EH3"
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1800,
      propertyType: "apartment",
      yearBuilt: 1850
    },
    amenities: ["Period Features", "Communal Gardens", "Cellar", "Resident Parking"],
    images: ["/property-12.jpg", "/property-12-2.jpg", "/property-12-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "E"
  },
  {
    id: "13",
    title: "Riverside Development Penthouse",
    description: "Luxurious penthouse in Manchester's newest riverside development. Stunning river views and premium specifications throughout.",
    price: 995000,
    location: {
      city: "Manchester",
      area: "Salford Quays",
      postcode: "M50"
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      squareFootage: 1600,
      propertyType: "penthouse",
      yearBuilt: 2022
    },
    amenities: ["River Views", "Concierge", "Gym", "Private Terrace", "Parking"],
    images: ["/property-13.jpg", "/property-13-2.jpg", "/property-13-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "A"
  },
  {
    id: "14",
    title: "Mediterranean Style Villa",
    description: "Stunning Mediterranean-inspired villa with extensive gardens and pool. Perfect for luxury family living.",
    price: 3500000,
    location: {
      city: "London",
      area: "Hampstead",
      postcode: "NW3"
    },
    features: {
      bedrooms: 6,
      bathrooms: 5,
      squareFootage: 4800,
      propertyType: "villa",
      yearBuilt: 2010
    },
    amenities: ["Swimming Pool", "Tennis Court", "Wine Cellar", "Staff Quarters", "Security System"],
    images: ["/property-14.jpg", "/property-14-2.jpg", "/property-14-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "B"
  },
  {
    id: "15",
    title: "Converted Church Apartment",
    description: "Unique apartment in a converted Gothic church. Features original stained glass windows and dramatic high ceilings.",
    price: 685000,
    location: {
      city: "Edinburgh",
      area: "Morningside",
      postcode: "EH10"
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1100,
      propertyType: "apartment",
      yearBuilt: 1875
    },
    amenities: ["Character Features", "Parking", "Communal Gardens", "Storage"],
    images: ["/property-15.jpg", "/property-15-2.jpg", "/property-15-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "D"
  },
  {
    id: "16",
    title: "Smart Home Townhouse",
    description: "Contemporary townhouse with cutting-edge smart home technology. Sustainable features and modern design throughout.",
    price: 1250000,
    location: {
      city: "Manchester",
      area: "Chorlton",
      postcode: "M21"
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2200,
      propertyType: "house",
      yearBuilt: 2021
    },
    amenities: ["Smart Home System", "Solar Panels", "EV Charging", "Garden"],
    images: ["/property-16.jpg", "/property-16-2.jpg", "/property-16-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "A"
  },
  {
    id: "17",
    title: "Historic Merchant's House",
    description: "Grade II listed merchant's house with original Tudor features. Extensively restored while preserving historic character.",
    price: 1750000,
    location: {
      city: "Birmingham",
      area: "Moseley",
      postcode: "B13"
    },
    features: {
      bedrooms: 5,
      bathrooms: 3,
      squareFootage: 3800,
      propertyType: "house",
      yearBuilt: 1580
    },
    amenities: ["Period Features", "Walled Garden", "Wine Cellar", "Original Fireplaces"],
    images: ["/property-17.jpg", "/property-17-2.jpg", "/property-17-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "F"
  },
  {
    id: "18",
    title: "Sky Garden Apartment",
    description: "Modern apartment with private sky garden offering panoramic city views. Part of an award-winning development.",
    price: 825000,
    location: {
      city: "London",
      area: "Shoreditch",
      postcode: "EC2A"
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 950,
      propertyType: "apartment",
      yearBuilt: 2020
    },
    amenities: ["Sky Garden", "Concierge", "Gym", "Bike Storage"],
    images: ["/property-18.jpg", "/property-18-2.jpg", "/property-18-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "A"
  },
  {
    id: "19",
    title: "Waterfront Penthouse",
    description: "Spectacular three-story penthouse with private elevator and 360-degree views of the city and waterfront.",
    price: 2950000,
    location: {
      city: "Edinburgh",
      area: "Leith",
      postcode: "EH6"
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      squareFootage: 2800,
      propertyType: "penthouse",
      yearBuilt: 2018
    },
    amenities: ["Private Elevator", "Roof Terrace", "Wine Room", "Home Cinema", "Parking"],
    images: ["/property-19.jpg", "/property-19-2.jpg", "/property-19-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "A"
  },
  {
    id: "20",
    title: "Arts & Crafts Villa",
    description: "Stunning Arts & Crafts villa with original features and beautiful landscaped gardens. A rare find in prime location.",
    price: 2250000,
    location: {
      city: "Birmingham",
      area: "Harborne",
      postcode: "B17"
    },
    features: {
      bedrooms: 6,
      bathrooms: 4,
      squareFootage: 4200,
      propertyType: "villa",
      yearBuilt: 1901
    },
    amenities: ["Period Features", "Landscaped Gardens", "Coach House", "Wine Cellar"],
    images: ["/property-20.jpg", "/property-20-2.jpg", "/property-20-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "E"
  },
  {
    id: "21",
    title: "Eco-Friendly Family Home",
    description: "Contemporary eco-home with exceptional energy efficiency. Features include ground source heat pump and solar panels.",
    price: 1150000,
    location: {
      city: "Manchester",
      area: "Altrincham",
      postcode: "WA14"
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2100,
      propertyType: "house",
      yearBuilt: 2022
    },
    amenities: ["Solar Panels", "Ground Source Heat Pump", "EV Charging", "Smart Home System"],
    images: ["/property-21.jpg", "/property-21-2.jpg", "/property-21-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "A"
  },
  {
    id: "22",
    title: "City Centre Studio",
    description: "Stylish studio apartment in the heart of the city. Perfect for professionals or as a pied-à-terre.",
    price: 375000,
    location: {
      city: "London",
      area: "Clerkenwell",
      postcode: "EC1"
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 450,
      propertyType: "apartment",
      yearBuilt: 2017
    },
    amenities: ["Concierge", "Bike Storage", "Communal Roof Terrace"],
    images: ["/property-22.jpg", "/property-22-2.jpg", "/property-22-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "B"
  },
  {
    id: "23",
    title: "Riverside Mansion",
    description: "Magnificent riverside mansion with private mooring and spectacular Thames views. Includes separate guest house.",
    price: 4750000,
    location: {
      city: "London",
      area: "Richmond",
      postcode: "TW9"
    },
    features: {
      bedrooms: 6,
      bathrooms: 5,
      squareFootage: 5500,
      propertyType: "house",
      yearBuilt: 1920
    },
    amenities: ["River Mooring", "Guest House", "Swimming Pool", "Tennis Court", "Wine Cellar"],
    images: ["/property-23.jpg", "/property-23-2.jpg", "/property-23-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "C"
  },
  {
    id: "24",
    title: "Modern Garden Flat",
    description: "Beautifully designed garden flat with private entrance and south-facing garden. Recently renovated throughout.",
    price: 595000,
    location: {
      city: "Edinburgh",
      area: "Stockbridge",
      postcode: "EH3"
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      squareFootage: 850,
      propertyType: "apartment",
      yearBuilt: 1890
    },
    amenities: ["Private Garden", "Period Features", "Cellar", "Home Office"],
    images: ["/property-24.jpg", "/property-24-2.jpg", "/property-24-3.jpg"],
    status: "for-sale",
    listingType: "standard",
    energyRating: "D"
  },
  {
    id: "25",
    title: "Luxury Canal-Side Penthouse",
    description: "Premium penthouse apartment overlooking the canal. Features include a wrap-around balcony and high-end finishes.",
    price: 925000,
    location: {
      city: "Birmingham",
      area: "Brindleyplace",
      postcode: "B1"
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1400,
      propertyType: "penthouse",
      yearBuilt: 2016
    },
    amenities: ["Canal Views", "24/7 Concierge", "Secure Parking", "Gym"],
    images: ["/property-25.jpg", "/property-25-2.jpg", "/property-25-3.jpg"],
    status: "for-sale",
    listingType: "featured",
    energyRating: "B"
  }
]

export const propertyTypes = ["apartment", "house", "penthouse", "villa"] as const
export const priceRanges = [
  { min: 0, max: 500000, label: "Up to £500,000" },
  { min: 500000, max: 1000000, label: "£500,000 - £1,000,000" },
  { min: 1000000, max: 2000000, label: "£1,000,000 - £2,000,000" },
  { min: 2000000, max: 5000000, label: "£2,000,000 - £5,000,000" },
  { min: 5000000, max: Infinity, label: "£5,000,000+" }
] as const

// Add common amenities for filtering
export const commonAmenities = [
  "Parking",
  "Garden",
  "Gym",
  "Concierge",
  "Swimming Pool",
  "Home Cinema",
  "Wine Cellar",
  "Smart Home System",
  "Period Features",
  "Balcony",
  "Roof Terrace",
  "EV Charging"
] as const 
export interface Property {
  _id: string;
  title: string;
  description: string;
  description_tr: string;
  price: number;
  location: {
    city: string;
    area: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    propertyType: string;
    yearBuilt: number;
  };
  amenities: string[];
  images: string[];
  listingType: 'standard' | 'featured';
  status: 'available' | 'sold' | 'pending';
  stayType: 'buy' | 'rent';
  createdAt: string;
  updatedAt: string;
}

export interface Filters {
  propertyType: string | null;
  city: string | null;
  priceRange: [number, number];
  bedrooms: [number, number];
  bathrooms: [number, number];
  amenities: string[];
  searchTerm: string;
  squareFootage: [number, number];
  stayType: 'buy' | 'rent' | null;
} 
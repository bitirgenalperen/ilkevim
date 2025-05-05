import { Property } from "@/types/property"

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
  "Concierge",
  "Parking",
  "EV Charging",
  "Garden",
  "Balcony",
  "Roof Terrace",
  "Private Elevator",
  "Gym",
  "Swimming Pool",
  "Spa/Sauna",
  "Smart Home System",
  "Security System",
  "High-Speed Internet",
  "Home Cinema",
  "Wine Cellar",
  "Chef’s Kitchen",
  "Walk-In Closet",
  "Panoramic Views",
  "Fireplace",
  "Outdoor Kitchen/BBQ",
] as const 
/** Facts that never get translated: contact details and external links. */
export const site = {
  name: 'Haus MaryLu',
  street: 'Winkel 8',
  city: '3384 Markersdorf-Haindorf',
  country: 'Österreich',
  email: 'hausmarylu@gmail.com',
  phones: [
    { number: '+40744771610', display: '+40 744 771 610', languages: 'RO / DE' },
    { number: '+40746146169', display: '+40 746 146 169', languages: 'RO / DE / EN' },
  ],
  bookingUrl: 'https://www.booking.com/hotel/at/haus-marylu.html',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Winkel+8%2C+3384+Markersdorf-Haindorf%2C+Austria',
  author: { name: 'Adrian Trif', url: 'https://trifadrian.ro' },
}

/** Amenity ids pair an icon with a label looked up from the active locale. */
export const amenities = [
  { id: 'wifi', icon: 'wifi' },
  { id: 'parking', icon: 'parking' },
  { id: 'kitchen', icon: 'kitchen' },
  { id: 'bathroom', icon: 'shower' },
  { id: 'tv', icon: 'tv' },
  { id: 'terrace', icon: 'terrace' },
  { id: 'garden', icon: 'leaf' },
  { id: 'coffee', icon: 'coffee' },
  { id: 'minibar', icon: 'fridge' },
]

/** The four facts worth putting directly under the hero. */
export const highlights = [
  { id: 'wifi', icon: 'wifi' },
  { id: 'parking', icon: 'parking' },
  { id: 'kitchen', icon: 'kitchen' },
  { id: 'melk', icon: 'pin' },
]

/** Distances quoted on the property listing. */
export const distances = [
  { id: 'danube', km: 10 },
  { id: 'melk', km: 15 },
  { id: 'lilienfeld', km: 29 },
  { id: 'ferdinand', km: 31 },
  { id: 'viennaAirport', km: 99 },
]

/** Nearby sights, named in the guest reviews. */
export const sights = ['wachau', 'schallaburg', 'aggstein', 'grafenegg', 'goettweig']

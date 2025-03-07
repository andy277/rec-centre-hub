
export interface RecCenter {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  email: string;
  website: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  amenities: string[];
  image_url: string;
  rating: number;
  reviews: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Program {
  id: string;
  rec_center_id: string;
  name: string;
  description: string;
  schedule: string;
  age_group: string;
  price: string;
}

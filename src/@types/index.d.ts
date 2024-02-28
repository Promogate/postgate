export type CouponsResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  coupons: Coupon[]
}

export type Coupon = {
  id: number;
  description: string;
  code: string;
  discount: number;
  store: {
    id: number;
    name: string;
    image: string;
    link: string;
  },
  category: {
    id: number;
    name: string;
  },
  vigency: string;
  link: string;
}

export type StoresResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  stores: Store[]
}

export type Store = {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
  hasOffer: number,
  maxCommission: number;
  events: StoreEvent[]
}

export type StoreEvent = {
  event: string;
  eventType: string;
  fixedCommission: boolean;
  commission: number;
}

export type SingleOfferResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  offers: Offer[]
}

export type OffersResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  offers: Offer[]
}

export type Offer = {
  id: string;
  image: string;
  title: string;
  old_price: string;
  price: string;
  destination_link: string;
  store_image: string | null;
  store_name: string;
  description: string;
  expiration_date: string;
  created_at: string;
  is_on_showcase: boolean;
  is_featured: boolean;
  is_free_shipping: boolean;
  resources_id: string;
  short_link: string;
  categories: [];
};

export type OfferStore = {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
  invisible: boolean;
  needPermission: boolean;
}

export type GetOffersParams = {
  size?: number;
  page?: number;
  sort?: string;
}

export type OfferDataInput = {
  image: string;
  title: string;
  price: string;
  old_price: string;
  destination_link: string;
  store_name: string;
  expiration_date: string;
  description: string;
}

export type SocialSoulOfferDataInput = {
  image: string;
  title: string;
  price: number;
  old_price: number;
  destination_link: string;
  store_name: string;
  store_image: string;
  description: string;
}

export type FetchStoreOffersResponse = {
  status: string,
  message: string,
  data: {
    id: string,
    store_image: string,
    store_name: string,
    store_name_display: string,
    lomadee_source_id: string | null,
    admitad_verification: string | null,
    role: string,
    user_id: string,
    social_media: {
      facebook?: string;
      whatsapp?: string;
      instagram?: string;
      telegram?: string;
      twitter?: string;
    },
    resources: {
      offers: OfferWithClicks[]
    }
  },
  featured: OfferWithClicks[]
}

export type APIOffer = {
  id: string;
  image: string;
  title: string;
  old_price: string;
  price: string;
  destination_link: string;
  store_image: string;
  store_name: string;
  description: string;
  expiration_date: string;
  created_at: string;
  is_on_showcase: boolean;
  is_featured: boolean;
  is_free_shipping: boolean;
  resources_id: string;
  short_link: string;
}

export type OfferWithClicks = APIOffer & {
  resources: {
    user_profile: {
      store_name: string,
      store_name_display: string,
      store_image: string,
      social_media: {
        id: string,
        facebook: string,
        whatsapp: string,
        instagram: string,
        telegram: string,
        twitter:string,
        user_profile_id: string
      }
    }
  },
  _count: {
    offer_clicks: number;
  };
}

export type MeResponse = {
	status: string,
	user: {
		id: string,
		name: string,
		email: string,
		created_at: string,
		user_profile: {
			id: string,
			store_image: string,
			store_name: string,
      store_name_display: string,
      lomadee_source_id: string,
      admitad_verification: string,
			role: string,
			user_id: string,
      resources: {
				id: string,
				created_at: string,
				user_profile_id: string,
			},
      social_media?: {
        facebook?: string;
        whatsapp?: string;
        instagram?: string;
        telegram?: string;
        twitter?: string;
      }
		}
	}
}

export type UserMeResponse = {
  id: string,
  name: string,
  email: string,
  created_at: string,
  user_profile: {
    id: string,
    store_image: string,
    store_name: string,
    role: string,
    user_id: string,
    resources: {
      id: string,
      created_at: string,
      user_profile_id: string
    }
  }
}

export type SignInFormInput = {
  email: string;
  password: string;
}

export type SignInFormOutput = {
  token: string,
	user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    user_profile: {
      id: string;
      store_image: string;
      store_name: string;
      store_name_display: string;
      lomadee_source_id: string | null;
      admitad_verification: string | null;
      payment_customer_id: string | null;
      role: string;
      user_id: string;
      social_media: any | null;
      resources: {
        id: string;
      };
    };
    agree_with_policies: boolean
  }
}

export type User = {
  id: string,
  name: string,
  email: string,
  created_at: string,
  user_profile: {
    id: string,
    store_image: string,
    store_name: string,
    store_name_display: string,
    lomadee_source_id: string,
    admitad_verification?: string,
    payment_customer_id?: string,
    role: string,
    user_id: string,
    resources: {
      id: string
    }
  },
  agree_with_policies: boolean
}

export type SetShowcaseProductInput = {
  isOnShowcase: string;
  offerId: string;
}

export type Redirector = {
  id: string;
  title: string;
  description: string;
  redirectorLink: string;
  resources_id: string;
  groups: Group[],
  totalClicks: number | null
}

export type Group = {
  id: string;
  title: string;
  destinationLink: string;
  members: number;
  limit: number;
  redirectorId: string;
}

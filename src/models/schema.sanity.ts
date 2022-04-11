import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Parent categories — `array`
   *
   *
   */
  parents?: Array<SanityKeyedReference<Category>>;
}

/**
 * Employee
 *
 *
 */
export interface Employee extends SanityDocument {
  _type: "employee";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Email — `string`
   *
   *
   */
  email: string;

  /**
   * Description — `localeBlockContent`
   *
   *
   */
  description: LocaleBlockContent;

  /**
   * Image — `image`
   *
   *
   */
  image: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Order — `number`
   *
   *
   */
  order?: number;
}

/**
 * Order
 *
 *
 */
export interface Order extends SanityDocument {
  _type: "order";

  /**
   * Session ID — `string`
   *
   *
   */
  sessionId: string;

  /**
   * Customer ID — `string`
   *
   *
   */
  customerId?: string;

  /**
   * Customer name — `string`
   *
   *
   */
  customerName?: string;

  /**
   * Customer email — `string`
   *
   *
   */
  customerEmail?: string;

  /**
   * Shipping — `object`
   *
   *
   */
  shipping: {
    _type: "shipping";
    /**
     * Name — `string`
     *
     *
     */
    name?: string;

    /**
     * Shipping rate — `object`
     *
     *
     */
    shippingRate: {
      _type: "shippingRate";
      /**
       * Shipping rate ID — `string`
       *
       *
       */
      id?: string;

      /**
       * Display name — `string`
       *
       *
       */
      displayName?: string;
    };

    /**
     * Address — `object`
     *
     *
     */
    address?: {
      _type: "address";
      /**
       * Address line 1 — `string`
       *
       *
       */
      line1?: string;

      /**
       * Address line 2 — `string`
       *
       *
       */
      line2?: string;

      /**
       * Postal code — `string`
       *
       *
       */
      postalCode?: string;

      /**
       * City — `string`
       *
       *
       */
      city?: string;

      /**
       * State — `string`
       *
       *
       */
      state?: string;

      /**
       * Country — `string`
       *
       *
       */
      country?: string;
    };
  };

  /**
   * Status — `reference`
   *
   *
   */
  status: SanityReference<OrderStatus>;

  /**
   * Amount subtotal — `number`
   *
   *
   */
  amountSubtotal: number;

  /**
   * Amount total — `number`
   *
   *
   */
  amountTotal: number;

  /**
   * Order datetime — `datetime`
   *
   *
   */
  orderDatetime: string;

  /**
   * Line items — `array`
   *
   *
   */
  lineItems?: Array<
    SanityKeyed<{
      /**
       * Description — `string`
       *
       *
       */
      description?: string;

      /**
       * Stripe ID — `string`
       *
       *
       */
      id?: string;

      /**
       * Amount total — `number`
       *
       *
       */
      amountTotal?: number;

      /**
       * Quantity — `number`
       *
       *
       */
      quantity?: number;
    }>
  >;
}

/**
 * Order status
 *
 *
 */
export interface OrderStatus extends SanityDocument {
  _type: "orderStatus";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Order — `number`
   *
   *
   */
  order?: number;
}

/**
 * Product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Stripe Product ID — `string`
   *
   *
   */
  stripeProductId: string;

  /**
   * Available — `boolean`
   *
   *
   */
  available: boolean;

  /**
   * Default variant — `productVariant`
   *
   *
   */
  defaultProductVariant: ProductVariant;

  /**
   * Variants — `array`
   *
   *
   */
  variants?: Array<SanityKeyed<ProductVariant>>;

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Tags — `array`
   *
   *
   */
  tags?: Array<SanityKeyed<string>>;

  /**
   * Vendor — `reference`
   *
   *
   */
  vendor?: SanityReference<Vendor>;

  /**
   * Blurb — `localeString`
   *
   *
   */
  blurb: LocaleString;

  /**
   * Body — `localeBlockContent`
   *
   *
   */
  body?: LocaleBlockContent;

  /**
   * Order — `number`
   *
   *
   */
  order?: number;
}

/**
 * Vendor
 *
 *
 */
export interface Vendor extends SanityDocument {
  _type: "vendor";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * logo — `image`
   *
   *
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Description — `blockContent`
   *
   *
   */
  description?: BlockContent;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type LocaleBlockContent = {
  _type: "localeBlockContent";
  /**
   * Norwegian — `blockContent`
   *
   *
   */
  nb?: BlockContent;

  /**
   * English — `blockContent`
   *
   *
   */
  en?: BlockContent;
};

export type LocaleString = {
  _type: "localeString";
  /**
   * Norwegian — `string`
   *
   *
   */
  nb?: string;

  /**
   * English — `string`
   *
   *
   */
  en?: string;
};

export type LocaleText = {
  _type: "localeText";
  /**
   * Norwegian — `text`
   *
   *
   */
  nb?: string;

  /**
   * English — `text`
   *
   *
   */
  en?: string;
};

export type ProductVariant = {
  _type: "productVariant";
  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Weight in grams — `number`
   *
   *
   */
  grams: number;

  /**
   * SKU — `string`
   *
   *
   */
  sku: string;

  /**
   * Stripe Price ID — `string`
   *
   *
   */
  stripePriceId: string;

  /**
   * Image — `image`
   *
   *
   */
  image: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type Documents =
  | Category
  | Employee
  | Order
  | OrderStatus
  | Product
  | Vendor;

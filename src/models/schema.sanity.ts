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

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

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

export type Documents = Product | Vendor | Category;

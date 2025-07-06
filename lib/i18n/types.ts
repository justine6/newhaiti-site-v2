// Defines the supported sections used for dictionary loading
export const sections = ['home', 'about', 'projects', 'blog', 'newsletter'] as const;
export type Section = typeof sections[number];


// Locale type already used in the routing and i18n logic
export type Locale = 'en' | 'fr' | 'ht' | 'es';

// About dictionary structure
export type AboutDictionary = {
  heading: string;
  intro: string;
  values: Record<string, string>;
  callToAction: string;
};

// Blog dictionary structure
export type BlogDictionary = {
  title: string;
  recentPosts: string;
  readMore: string;
};

// Projects dictionary structure
export type ProjectsDictionary = {
  title: string;
  description: string;
  categories: Record<string, string>;
};

// ✅ New: Home dictionary structure
export type HomeDictionary = {
  hero: {
    title: string;
    subtitle: string;
    button: string;
  };
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    cta: string;
    success: string;
  };
};


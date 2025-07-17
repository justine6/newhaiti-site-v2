// Defines the supported sections used for dictionary loading
export const sections = ['home', 'about', 'projects', 'blog', 'newsletter', 'join'] as const;

export type Section = typeof sections[number];

// Locale type already used in the routing and i18n logic
export type Locale = 'en' | 'fr' | 'ht' | 'es';

// ✅ About dictionary structure
export type AboutDictionary = {
  heading: string;
  intro: string;
  values: Record<string, string>;
  callToAction: string;
};

// ✅ Blog dictionary structure
export type BlogDictionary = {
  title: string;
  recentPosts: string;
  readMore: string;
};

// ✅ Projects dictionary structure
export type ProjectsDictionary = {
  heading: string;
  intro: string;
  categories: Record<string, string>;
  callToAction: string;
};

// ✅ Join dictionary structure
export type JoinDictionary = {
  heading: string;
  intro: string;
  steps: {
    step1: string;
    step2: string;
    step3: string;
  };
  callToAction: string;
  form: {
    name: string;
    email: string;
    phone: string;
    location: string;
    message: string;
    button: string;
  };
  successMessage: string;
  errorMessage: string;
};

// ✅ Home dictionary structure (updated to fix errors)
export type HomeDictionary = {
  hero: {
    title: string;
    subtitle: string;
    readMore: string;
    joinNow: string;
  };
  mission: {
    heading: string;
    paragraph: string;
  };
  newsletter: {
    title: string;
    description: string;
  };
  contact: {
    heading: string;
    paragraph: string;
  };
  footer: {
    copyright: string;
    poweredBy: string;
  };
};

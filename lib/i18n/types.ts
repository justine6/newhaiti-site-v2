/** Sections supported by the dictionary system */
export type Section =
  | "home"
  | "about"
  | "blog"
  | "projects"
  | "join"
  | "teamDocs"
  | "vision"
  | "videos";

/** Team Docs (/[locale]/team-docs) */
export type TeamDocsDictionary = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  sections: { heading: string; content: string }[];
};

/** Home (/[locale]) */
export type HomeDictionary = {
  hero: {
    title: string;
    subtitle: string;
    readMore: string;
    joinNow: string;
    watchVideos: string;
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
    description: string;
    placeholder: string;
    cta: string;
    success: string;
  };
  footer: {
    copyright: string;
    poweredBy: string;
  };
  projects: {
    title: string;
    intro: string;
    motto: string;
    items: {
      title: string;
      description: string;
      category?: string;
    }[];
  };

  /** ✅ New blog preview section */
  blogPreview: {
    title: string;
    subtitle?: string;
    readMore: string;
  };

  /** ✅ Blog section for homepage feed */
  blogSection: {
    title: string;
    paragraph: string;
    cta: string;
    readMore: string;
    fallbackNotice: string;
    blogUnavailable: string;
  };
};

/** About page (/[locale]/about) */
export type AboutDictionary = {
  heading: string;
  content: string;
};

/** Blog landing (/[locale]/blog) */
export type BlogDictionary = {
  title: string;
  posts: {
    title: string;
    date: string;
    excerpt: string;
  }[];
};

/** Projects page (/[locale]/projects) */
export type ProjectsDictionary = {
  heading: string;
  intro: string;
  /** Keys must match your categoryIcons slugs */
  categories: Record<string, string>;
  callToAction: string;
};

/** Join page (/[locale]/join) */
export type JoinDictionary = {
  title: string;
  description: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    location: string;
    message: string;
  };
  cta: string;
  success: string;
};

/** Vision page (/[locale]/vision) */
export type VisionDictionary = {
  title: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  videos?: {
    title: string;
    url: string;
    caption?: string;
  }[];
};

/** Videos page (/[locale]/videos) */
export type VideosDictionary = {
  title: string;
  intro: string;
  videos: {
    title: string;
    url: string;
    caption?: string;
  }[];
};

/** ✅ Mapping for precise return typing in getDictionary<T>() */
export type DictionaryBySection = {
  home: HomeDictionary;
  about: AboutDictionary;
  blog: BlogDictionary;
  projects: ProjectsDictionary;
  join: JoinDictionary;
  teamDocs: TeamDocsDictionary;
  vision: VisionDictionary;
  videos: VideosDictionary;
};

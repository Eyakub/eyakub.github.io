interface LocalizedString {
  en: string;
  bn: string;
}

export interface TimelineEvent {
  date: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
}

export interface GalleryImage {
  url: string;
  caption: LocalizedString;
  alt: LocalizedString;
}

export interface Reference {
  type: 'facebook' | 'youtube' | 'news' | 'image';
  title: LocalizedString;
  url: string;
  source: LocalizedString;
  date: LocalizedString;
  description?: LocalizedString;
  thumbnail?: string;
}

export interface MartyrData {
  name: LocalizedString;
  birthDate: LocalizedString;
  deathDate: LocalizedString;
  birthPlace: LocalizedString;
  portrait: string;
  shortBio: LocalizedString;
  biography: LocalizedString;
  timeline: TimelineEvent[];
  deathDetails: {
    location: LocalizedString;
    cause: LocalizedString;
    description: LocalizedString;
  };
  gallery: GalleryImage[];
  references: Reference[];
}
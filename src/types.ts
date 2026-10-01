export interface Chapter {
  id: number;
  numberString: string;
  title: string;
  subtitle: string;
  quote: string;
  content: string[];
  reflection: string;
}

export interface GalleryPhoto {
  id: number;
  src: string;
  title: string;
  caption: string;
  dateOrTag: string;
  aspect: string;
}

export interface BirthdayWish {
  id: number;
  title: string;
  subtitle: string;
  message: string;
  blessing: string;
}

export interface ManganatoSearch {
  title?: string;
  id?: string;
  image?: string;
}

export interface ManganatoInfo {
  title?: string;
  image?: string;
  description?: string;
  author?: string[];
  genres?: string[];
  status?: string;
  chapters?: ManganatoChapterList[];
  alternate_names?: string[];
}

export interface ManganatoChapterList {
  title?: string;
  id?: string;
  date?: string;
}

interface ManganatoImages {
  
}
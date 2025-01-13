export interface SearchResults {
  title?: string;
  image?: string | string[];
  id?: string;
}

export interface MangaSearch {
  title?: string;
  description?: string;
  image?: string;
  alternate_names?: string | string[];
  authors?: string[];
  type?: string;
  status?: string;
  chapters?: chapter_list[];
  genres?: string[];
}

export interface chapter_list {
  id?: string;
  title?: string;
  date?: string;
}

export interface WeebImages {
  url?: string;
}


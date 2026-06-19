import data from "./moviePrefs.json";

// 영화 선호: 주민별 사랑/좋아하는 영화·간식.
// 출처: 영화관 - Stardew Valley Wiki (progress/영화관 - Stardew Valley Wiki.html, CC BY-NC-SA 3.0).
// 데이터는 위키의 영화/매점 표(영화→반응 주민)를 주민 기준으로 역인덱싱한 것.
export interface PrefItem {
  ko: string;
  en: string;
  icon: string; // /icons/movies/* | /icons/snacks/*
}

export interface MoviePref {
  lovedMovies: PrefItem[];
  likedMovies: PrefItem[];
  lovedSnacks: PrefItem[];
  likedSnacks: PrefItem[];
}

const prefs = data as Record<string, MoviePref>;

// 선호 데이터가 있는 주민 id(표시 순서는 호출부에서 이름순 정렬).
export const MOVIE_PREF_VILLAGERS: string[] = Object.keys(prefs);

export function getMoviePref(id: string): MoviePref | undefined {
  return prefs[id];
}

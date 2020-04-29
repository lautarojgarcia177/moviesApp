export interface MoviesQueryRes {
    page:          number;
    total_results: number;
    total_pages:   number;
    results:       MoviesQueryResResult[];
}

export interface MoviesQueryResResult {
    popularity:        number;
    id:                number;
    video:             boolean;
    vote_count:        number;
    vote_average:      number;
    title:             string;
    release_date:      Date;
    original_language: OriginalLanguage;
    original_title:    string;
    genre_ids:         number[];
    backdrop_path:     null | string;
    adult:             boolean;
    overview:          string;
    poster_path:       null | string;
}

export enum OriginalLanguage {
    En = "en",
    Fr = "fr",
}
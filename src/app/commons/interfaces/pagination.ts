interface Link {
    url: string;
    label: string;
    active: boolean;
}
export interface Pagination<DATA> {
    current_page: number;
    data: DATA,
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: number;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number
}
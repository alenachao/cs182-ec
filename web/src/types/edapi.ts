export interface Interaction {
    id: number;
    user_id: number;
    course_id: number;
    number: number;
    type: string;
    title: string;
    content: string;
    document: string;
    category: string;
    subcategory: string;
    subsubcategory: string;
    flag_count: number;
    star_count: number;
    view_count: number;
}

interface Author {
    id: string;
    username: string;
    email: string;
    profilePicture: string | null;
    password: string;
    reputation: number;
    createdAt: string;
    roles: string[];
}

interface Question {
    id: string;
    title: string | null;
    body: string | null;
    voteCount: number;
    author: Author | null;
    tags: string[] | null;
    createdAt: string;
}


export type {Question , Author}
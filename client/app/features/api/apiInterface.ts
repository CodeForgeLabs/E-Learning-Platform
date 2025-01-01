interface Author {
    id: string;
    username: string;
    email: string
    profilePicture: string;
    questions_asked: number;
    shared_idea: number;
    password: string;
    reputation: number;
    createdAt: string;
    roles: string[];
}

interface Question {
    id: string;
    title: string 
    body: string 
    voteCount: number;
    author: Author 
    tags: string[] 
    createdAt: string;
}


interface Answer {
    id: string;
    body: string;
    voteCount: number;
    accepted: boolean;
    question: Question;
    author: Author;
    createdAt: string;
  }

  interface Reply {
    id: string;
    body: string;
    voteCount: number;
    
    question: Question;
    author: Author;
    createdAt: string;
  }
interface Comment {
    id: string;
    body: string;
    createdAt: string;
    author: Author;
    question: Question;
  }




export type {Question , Author , Answer , Comment , Reply}
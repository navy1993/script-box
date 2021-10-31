export class Idea {
    title?: string;
    desc?: string;
    tags?: string;
    upVote?: number = 0;
    creationDate?: Date;
}

export class User {
    employeeId?: string;
    hasVoted?: boolean = false;
}

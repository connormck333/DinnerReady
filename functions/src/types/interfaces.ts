import QueryStatus from "./query_status"

interface UserFamily {
    firstName: string,
    surname: string,
    email: string | undefined,
    familyData: Family
}

interface Family {
    familyId: string,
    name: string,
    members: User[]
}

interface User {
    firstName: string,
    surname: string,
    familyId: string | undefined,
    email: string | undefined,
    admin: boolean | undefined
}

interface QueryResponse {
    status: QueryStatus,
    data: any
}

interface Dinner {
    dinnerId: string | undefined,
    announcedAtTimestamp: number,
    startsAtTimestamp: number,
    endsAtTimestamp: number,
    description: string,
    date: string
}

interface DinnerStatus {
    dinner: Dinner,
    attendance: Attendee[]
}

interface Attendee {
    user: User,
    attending: boolean
}

export {
    User,
    Family,
    UserFamily,
    QueryResponse,
    Dinner,
    DinnerStatus,
    Attendee
}
import QueryStatus from "./query_status"

interface UserFamily {
    firstName: string,
    lastName: string,
    email: string | undefined,
    admin: boolean | undefined,
    hasCompletedOnboarding?: boolean,
    familyData: Family | undefined
}

interface Family {
    familyId: string,
    name: string,
    members: User[]
}

interface User {
    firstName: string,
    lastName: string,
    familyId: string | undefined,
    email: string | undefined,
    admin: boolean | undefined,
    hasCompletedOnboarding?: boolean
}

interface QueryResponse {
    status: QueryStatus,
    data?: any
}

interface QueryResponseExists {
    status: QueryStatus,
    data?: any,
    exists?: boolean
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
    dinner: Dinner | undefined,
    attendance: Attendee[]
}

interface Attendee {
    user: User,
    attending: boolean | undefined
}

export {
    User,
    Family,
    UserFamily,
    QueryResponse,
    QueryResponseExists,
    Dinner,
    DinnerStatus,
    Attendee
}
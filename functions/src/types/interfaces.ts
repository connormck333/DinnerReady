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
    email: string | undefined
}

interface QueryResponse {
    status: QueryStatus,
    data: any
}

export {
    User,
    Family,
    UserFamily,
    QueryResponse
}
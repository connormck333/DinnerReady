import { Dispatch, SetStateAction } from "react"

interface NewUser {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

interface User {
    email: string,
    firstName: string,
    lastName: string,
    familyId: string | undefined,
    familyData?: Family,
    avatarUrl?: string,
    hasCompletedOnboarding: boolean,
    admin?: boolean
}

interface Family {
    familyId: string,
    members: User[],
    name: string
}

interface Status {
    success: boolean,
    response: any
}

interface GetParam {
    key: string
    value: string
}

interface LowerContainerRef {
    closeScreen: () => void;
}

type UserContextType = [User, Dispatch<SetStateAction<User>>];

export {
    NewUser,
    Status,
    GetParam,
    LowerContainerRef,
    User,
    Family,
    UserContextType
}
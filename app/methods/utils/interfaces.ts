interface NewUser {
    email: string,
    firstName: string,
    lastName: string,
    password: string
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

export {
    NewUser,
    Status,
    GetParam,
    LowerContainerRef
}
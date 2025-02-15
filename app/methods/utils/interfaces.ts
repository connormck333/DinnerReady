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

export {
    NewUser,
    Status
}
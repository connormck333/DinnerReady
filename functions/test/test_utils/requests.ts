function createPostRequest(body : any) : any {
    return {
        method: "POST",
        headers: {
            authorization: 'fake-token'
        },
        body: body
    };
}

export {
    createPostRequest
}
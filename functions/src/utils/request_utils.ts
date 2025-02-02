function isPutReq(method: string) : boolean {
    return method === "PUT";
}

function isPostReq(method: string) : boolean {
    return method === "POST";
}

function isGetReq(method: string) : boolean {
    return method === "GET";
}

export {
    isPutReq,
    isPostReq,
    isGetReq
}
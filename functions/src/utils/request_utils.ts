function isPutReq(method: string): boolean {
    return method === "PUT";
}

function isPostReq(method: string): boolean {
    return method === "POST";
}

function isGetReq(method: string): boolean {
    return method === "GET";
}

function isDeleteReq(method: string): boolean {
    return method === "DELETE";
}

export {
    isPutReq,
    isPostReq,
    isGetReq,
    isDeleteReq
}
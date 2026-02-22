export const mockResponse=()=>{
    const res={}
    res.json=jest.fn().mockReturnValue(res)
    res.status=jest.fn().mockReturnValue(res)
    res.send=jest.fn().mockReturnValue(res)
    return res;
}

export const mockRequest=()=>{
    const req={}
    res.body=jest.fn().mockReturnValue(req)
    res.query=jest.fn().mockReturnValue(req)
    res.params=jest.fn().mockReturnValue(req)
    return req;
}
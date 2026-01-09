import { StatusCodes } from "http-status-codes";

class ServiceError extends Error{
    constructor(
        name="Service Error",
        message="Something Went Wrong",
        explanation="Service layer error",
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name=name;
        this.message=message;
        this.explanation=explanation;
        this.statusCode=statusCode;
    }
}

export default ServiceError
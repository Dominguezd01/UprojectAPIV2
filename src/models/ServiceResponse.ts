import { ServiceResponseError } from "./ServiceResponseError"

export type ServiceResponse<T> = {
    success: boolean,
    data: T | null,
    message: string | null,
    errors: ServiceResponseError[] | null
}
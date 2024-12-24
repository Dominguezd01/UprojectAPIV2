import { Context } from "hono";

import { z } from "zod";
import logger from "../modules/logger";
import { BAD_PARSE, EMAIL_OR_USERNAME_ALREADY_USED, GENERIC_ERROR } from "../models/Constants";
import { AuthService } from "../services/AuthService";
import { ServiceResponse } from "../models/ServiceResponse";
import { RegisterUser, RegisterUserType } from "../models/RegisterUser.dto";
export class AuthController {
    static async register(c: any) {
        try {
            const userData = c.req.valid('json');

            let response: ServiceResponse<boolean> = await AuthService.register(userData)

            if (!response.success && response.data == null && response.message != null) {
                c.status(500)
                return c.json({ msg: GENERIC_ERROR })
            }

            if (response.success && response.data == null) {
                c.status(409)
                return c.json({ msg: EMAIL_OR_USERNAME_ALREADY_USED })
            }


            return c.status(201)

        } catch (err) {
            if (err instanceof z.ZodError) {
                logger.error(err.issues)

                c.status(201)
                return c.json({ message: BAD_PARSE })
            }
        }
    }

    static async login() {

    }
}
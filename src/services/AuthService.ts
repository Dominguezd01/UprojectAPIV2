import { env, password } from "bun"
import { EMAIL_OR_USERNAME_ALREADY_USED, USER_NAME_OR_PASSWORD_WRONG } from "../models/Constants"
import { RegisterUser, RegisterUserType } from "../models/RegisterUser.dto"
import { ServiceResponse } from "../models/ServiceResponse"
import logger from "../modules/logger"
import { PrismaClient, users } from '@prisma/client'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { LoginData } from "../models/LoginData"
import isEmail from "../utils/isEmail"
import { LoginResponse } from "../models/LoginResponse"
const prisma = new PrismaClient()
const hashOptions: any = {
    algorithm: "argon2id", // "argon2id" | "argon2i" | "argon2d"
    memoryCost: 4, // memory usage in kibibytes
    timeCost: 3, // the number of iterations
}

export class AuthService {
    static async register(registerUserData: RegisterUserType): Promise<ServiceResponse<boolean>> {
        let response: ServiceResponse<boolean>
        try {
            let userExists = await prisma.users.findFirst({
                where: {
                    OR: [
                        { email: registerUserData.email },
                        { userName: registerUserData.userName },
                    ]
                },
                select: {
                    userId: true, // Select just the ID (you could also select other fields)
                },
            })

            if (userExists) {
                return {
                    success: true,
                    data: null,
                    errors: [
                        {
                            entity: null,
                            error: EMAIL_OR_USERNAME_ALREADY_USED
                        }
                    ],
                    message: null
                }
            }
            let hashPass: string = await Bun.password.hash(registerUserData.password, hashOptions)
            let createData = new Date()

            let created = await prisma.users.create({
                data: {
                    email: registerUserData.email,
                    userName: registerUserData.userName,
                    profilePicture: registerUserData.profilePicture,
                    password: hashPass,
                    userUuid: crypto.randomUUID(),
                    createdAt: createData,
                    deleted: false,
                }
            })

            return {
                success: true,
                data: true,
                errors: null,
                message: null
            }

        } catch (err: any) {
            logger.error(err)
            return {
                success: false,
                data: null,
                errors: null,
                message: err.toString()
            }
        }
    }

    static async login(loginData: LoginData): Promise<ServiceResponse<LoginResponse>> {
        try {
            let identityIsEmail: boolean = isEmail(loginData.identity)



            let user = identityIsEmail == true ?
                await this.getUserByUserEmail(loginData.identity)
                : await this.getUserByUserName(loginData.identity)

            if (user == null) {
                return {
                    success: true,
                    data: null,
                    errors: [
                        {
                            entity: null,
                            error: USER_NAME_OR_PASSWORD_WRONG
                        }
                    ],
                    message: null
                }
            }

            let passValid: boolean = await Bun.password.verify(loginData.password, user.password)

            if (!passValid) {
                return {
                    success: true,
                    data: null,
                    errors: [
                        {
                            entity: null,
                            error: USER_NAME_OR_PASSWORD_WRONG
                        }
                    ],
                    message: null
                }
            }

            let token: string = await sign({ userName: user.userName, userId: user.userUuid, exp: Math.floor(Date.now() / 1000) + 60 * 5, }, env.TOKEN_SECRET || "")

            return {
                success: true,
                data: {
                    ssid: token,
                }
            }



        } catch (ex: any) {
            return {
                success: false,
                data: null,
                errors: null,
                message: ex
            }
        }
    }



    private static async getUserByUserName(userName: string) {
        return await prisma.users.findFirst({
            where: {
                userName: userName
            }
        })
    }

    private static async getUserByUserEmail(email: string) {
        return await prisma.users.findFirst({
            where: {
                email: email
            }
        })
    }
}
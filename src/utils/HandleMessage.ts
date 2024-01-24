import { MongoProfile, MongoUser, ProfileResponse, UserResponse } from "@/utils/Type-Interface";
import * as yup from "yup";



export const getUserErrorResponse = (
    error: unknown,
    defaultErrorMessage: string
): UserResponse => {
    if (error instanceof yup.ValidationError) {
        let errors: any[] = [];
        error.inner.forEach((e) => {
            errors.push(e.message)
        });
        return {
            code: 400,
            messages: errors ? errors : [defaultErrorMessage],
            success: false,
        };
    } else {
        return {
            code: 400,
            message: error instanceof Error ? error.message : defaultErrorMessage,
            success: false,
        };
    }
}

export const getUserSuccessResponse = (user: MongoUser,
    message: string
): UserResponse => {
    return {
        code: 200,
        message,
        success: true,
        user,
    };
}

export const getProfileSuccessResponse = (profile: MongoProfile[],
    message: string
): ProfileResponse => {
    return {
        code: 200,
        message,
        success: true,
        profile,
    };
}

export const getProfileErrorResponse = (
    error: unknown,
    defaultErrorMessage: string
): ProfileResponse => {
    if (error instanceof yup.ValidationError) {
        let errors: any[] = [];
        error.inner.forEach((e) => {
            errors.push(e.message)
        });
        return {
            code: 400,
            messages: errors ? errors : [defaultErrorMessage],
            success: false,
        };
    } else {
        return {
            code: 400,
            message: error instanceof Error ? error.message : defaultErrorMessage,
            success: false,
        };
    }
}

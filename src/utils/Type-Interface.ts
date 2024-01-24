import { MongoUserType } from '@/models/User';
import { MongoProfileType } from '@/models/profile';
import { Types } from 'mongoose';


export type MongoUser = MongoUserType & {
    _id: Types.ObjectId;
};


export type UserResponse = {
    code: Number;
    success: Boolean;
    message?: String;
    messages?:String | any[];
    user?: MongoUser;
}

export type UserSession = {
    user:{
        name?:string | undefined;
        email:string;
        image?:string|undefined;
    }
}

export type MongoProfile = MongoProfileType & {
    _id: Types.ObjectId;
};

export type ProfileResponse = {
    code: Number;
    success: Boolean;
    message?: String;
    messages?:String | any[];
    profile?: MongoProfile[];
}


import { Schema, models, model, Model } from "mongoose";

export type MongoUserType = {
    email: string;
    password: string;
    role:string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserModelType = Model<MongoUserType>;


const userSchema = new Schema<MongoUserType>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type :String ,
        default:"USER"
    }

},
    {
        timestamps: true,
    }
);

const UserModel: UserModelType = models.User || model<MongoUserType>('User', userSchema);

export default UserModel
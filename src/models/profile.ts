import { Model, Schema, model, models } from "mongoose";

export type MongoProfileType = {
    title: string;
    description: string;
    location: string;
    phone: string;
    price: number;
    realState: string;
    constructionDate: Date;
    category: string;
    rules: string[];
    amenities: string[];
    userId: Schema.Types.ObjectId;
    published:boolean
};
export type ProfileModelType = Model<MongoProfileType>;


const profileSchema = new Schema<MongoProfileType>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        realState: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        constructionDate: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
            enum: ["villa", "apartment", "store", "office"],
            required: true,
        },
        amenities: {
            type: [String],
            default: [],
        },
        rules: {
            type: [String],
            default: [],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        published:{
            type: Boolean,
            default:false
        }
    },
    { timestamps: true }
);

const ProfileModel: ProfileModelType = models.Profile || model<MongoProfileType>("Profile", profileSchema);

export default ProfileModel;

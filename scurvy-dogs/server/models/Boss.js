import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const BossSchema = new Schema (
    {
        health: { type: Number, required: true },
        creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);
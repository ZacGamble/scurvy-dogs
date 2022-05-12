import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const LobbySchema = new Schema (
    {
        statsMultiplier: { type: Number, default: 1 },
        creatorId: { types: Schema.Types.ObjectId, ref: "Account", required: true },
        isStarted: { type: Boolean, required: false },
        isFinished: { type: Boolean, default: false },
        bossId: { type: Schema.Types.ObjectId, ref: "Boss", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

LobbySchema.virtual("boss",
{
    localField: "bossId",
    foreignField: "_id",
    ref: "Boss",
    justOne: true
});
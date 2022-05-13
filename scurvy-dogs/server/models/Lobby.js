import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const LobbySchema = new Schema (
    {
        statsMultiplier: { type: Number, default: 1 },
        creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
        isStarted: { type: Boolean, required: false },
        isFinished: { type: Boolean, default: false },
       
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

// LobbySchema.virtual("boss",
// {
//     localField: "bossId",
//     foreignField: "_id",
//     ref: "Boss",
//     justOne: true
// });
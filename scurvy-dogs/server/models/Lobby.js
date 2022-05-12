import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const LobbySchema = new Schema (
    {
        statsMultiplier: { type: Number, default: 1 },
        creatorId: { types: Schema.Types.ObjectId, ref: "Account", required: true },
        isStarted: { type: Boolean, required: false },
        isFinished: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);
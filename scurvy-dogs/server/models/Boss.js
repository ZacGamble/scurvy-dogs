import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const BossSchema = new Schema (
    {
        durability: { type: Number, required: true },
        power: { type: Number, required: true },
        hull: { type: Number, required: true },
        speed: { type: Number, required: true },        
        creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
        isDefeated: { type: Boolean, default: false },
        lobbyId: { type: Schema.Types.ObjectId, ref: "Lobby", required: true}
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const HistorySchema = new Schema (
    {
        accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
        shipId: { type: Schema.Types.ObjectId, ref: "Ship", required: true },
        lobbyId: { type: Schema.Types.ObjectId, ref: "Lobby", required: true },

        damageDone: { type: Number, default: 0 },
        participationTime: { type: Number, default: 0 },
        startTime: { type: Date, required: true },
        largestHit: { type: Number, default: 0 },
        damageTaken: { type: Number, default: 0 },
        damageDodged: { type: Number, default: 0 }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

// TODO boss virtual
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const EntrySchema = new Schema (
    {
        lobbyId: { type: Schema.Types.ObjectId, ref: "Lobby", required: true },
        accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
        shipId: { type: Schema.Types.ObjectId, ref: "Ship", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

EntrySchema.virtual("ship",
{
    localField: "shipId",
    foreignField: "_id",
    ref: "Ship",
    justOne: true
});

EntrySchema.virtual("creator",
{
    localField: "accountId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
});

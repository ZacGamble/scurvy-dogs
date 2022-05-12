import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ShipUpgradeSchema = new Schema (
    {
        shipId: { type: Schema.Types.ObjectId, ref: "Ship", required: true },
        upgradeId: { type: Schema.Types.ObjectId, ref: "Upgrade", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

ShipUpgradeSchema.virtual("upgrade", 
{
    localField: "shipId",
    foreignField: "_id",
    ref: "Ship",
    justOne: true
});
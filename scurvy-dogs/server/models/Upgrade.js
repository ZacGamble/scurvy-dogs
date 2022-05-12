import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UpgradeSchema = new Schema (
    {
        value: { type: Number, required: true },
        cost: { type: Number, required: true },
        // REVIEW change types of upgrades
        type: { type: String, required: true, enum: ["cannon", "crew", "sails", "hull"]}
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);
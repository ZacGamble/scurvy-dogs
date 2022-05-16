import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ShipSchema = new Schema (
    {
        name: { type: String, default: "new ship" },
        durability: { type: Number, required: true },
        power: { type: Number, required: true },
        hull: { type: Number, required: true },
        speed: { type:Number, required: true },
        accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
        isSunk: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

ShipSchema.virtual("creator",
{
    localField: "accountId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
});

// TODO add stats virtual
// ShipSchema.virtual("stats")
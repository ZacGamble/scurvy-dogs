import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { HistorySchema } from '../models/History.js';
import { ShipSchema } from '../models/Ship.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Ships = mongoose.model("Ship", ShipSchema);
  Histories = mongoose.model("History", HistorySchema);
}

export const dbContext = new DbContext()

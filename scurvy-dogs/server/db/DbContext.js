import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()

import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const pirateApi = Axios.create({
  baseUrl: 'https://pirate.monkeyness.com/api/insult',
  timeout: 8000
})

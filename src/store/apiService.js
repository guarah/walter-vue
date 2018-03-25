import axios from 'axios'
import { firebaseConfig } from '../lib/constants'

export const http = axios.create({
  baseURL: firebaseConfig.databaseURL
})

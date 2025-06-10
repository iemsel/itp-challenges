import { Request, Response } from 'express';
import { ArticleResponse } from '../utils/interfaces.js';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import { getDataFromAuthenticatedApi } from '../utils/ajax.js';
import { statusDescriptions } from '../utils/statusDescriptions.js';


/**
 * All routes to the external Api are authenticated
 * using the Bearer token stored in the .env file.
 * In order to use the token safely do not
 * expose it in the client-side code.
 */

const apiUrl: string = process.env.API_URL;



export function getCategoryCodes(req: Request, res: Response) {
  const group = req.query.group;

  // Narrow down type to string before using charAt
  let prefix: string | null = null;

  if (typeof group === 'string') {
    prefix = group.charAt(0);
  }

  // Get all codes from statusDescriptions, convert to number and sort
  const allCodes = Object.keys(statusDescriptions)
    .map(code => Number(code))
    .sort((a, b) => a - b);

  let filteredCodes = allCodes;

  if (prefix) {
    filteredCodes = allCodes.filter(code => code.toString().startsWith(prefix));
  }

  res.render('index', { codes: filteredCodes, category: group || 'all' });
}


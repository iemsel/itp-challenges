import { Request, Response } from 'express';
import { ArticleResponse } from '../utils/interfaces.js';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import { getData } from '../utils/ajax.js';
import { statusDescriptions } from '../utils/statusDescriptions.js';

const apiUrl: string = process.env.API_URL;

export function getIndex(req: Request, res: Response) {
  // Extract all status codes (keys) from statusDescriptions, convert to number and sort
  const codes = Object.keys(statusDescriptions)
    .map(code => Number(code))
    .sort((a, b) => a - b);

  res.render('index', { codes, category: 'all' });
}


export function getCodeDetail(req: Request, res: Response) {
  const { code } = req.params;
  const description = statusDescriptions[code] || "No description available.";
  const category = `${code.charAt(0)}xx`;
  res.render('detail', { code, description, category });
}

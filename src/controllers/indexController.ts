import { Request, Response } from 'express';
import { statusDescriptions } from '../utils/statusDescriptions.js';
import { fetchCatImages } from '../utils/ajax.js';

export async function getIndex(req: Request, res: Response) {
  const codes = Object.keys(statusDescriptions)
    .map(Number)
    .sort((a, b) => a - b);

  const catImages = await fetchCatImages(codes);

  res.render('index', {
    codes: catImages.filter((img) => img.available),
    category: 'all',
  });
}

export async function getCodeDetail(req: Request, res: Response) {
  const { code } = req.params;
  const description = statusDescriptions[code] || "No description available.";
  const category = `${code.charAt(0)}xx`;

  const [catImage] = await fetchCatImages([Number(code)]);

  res.render('details', {
    code: catImage,
    description,
    category,
  });
}

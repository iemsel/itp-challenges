import { Request, Response } from 'express';
import { statusDescriptions } from '../utils/statusDescriptions.js';
import { CatImage, fetchCatImages } from '../utils/ajax.js';

/**
 *
 */
export async function getCategoryCodes(req: Request, res: Response): Promise<void | Response> {
  try {
    const group: string = req.query.group as string;

    if (!group || !/^[1-5]xx$/.test(group)) {
      return res.status(400).send('Invalid category group.');
    }

    const codes: number[] = Object.keys(statusDescriptions)
      .map(Number)
      .filter((code: number) => code.toString().startsWith(group[0]))
      .sort((a: number, b: number) => a - b);

    const catImages: CatImage[] = await fetchCatImages(codes);

    return res.render('index', {
      codes: catImages.filter((img: CatImage) => img.available),
      category: group,
    });
  } catch (error) {
    console.error('Error in getCategoryCodes:', error);
    return res.status(500).send('Internal Server Error');
  }
}


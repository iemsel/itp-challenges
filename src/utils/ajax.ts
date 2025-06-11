export interface CatImage {
  code: number;
  available: boolean;
  imageUrl: string | null;
}

export const fetchCatImages = async (codes: number[]): Promise<CatImage[]> => {
  const baseUrl: string = 'https://http.cat/';

  const promises: Promise<CatImage>[] = codes.map(async (code: number): Promise<CatImage> => {
    try {
      const response: Response = await fetch(`${baseUrl}${code}`, { method: 'HEAD' });

      return {
        code,
        available: response.ok,
        imageUrl: response.ok ? `${baseUrl}${code}` : null,
      };
    } catch {
      return {
        code,
        available: false,
        imageUrl: null,
      };
    }
  });

  return Promise.all(promises);
};

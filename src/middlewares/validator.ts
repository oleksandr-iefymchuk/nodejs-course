import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/httpError';
import { apiErrors } from '../constants';

export const genreValidation = (req: Request, res: Response, next: NextFunction): void => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const error = new HttpError(apiErrors.REQUIRED_NANE, 400);
    return next(error);
  }
  next();
};

export const movieValidation = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, releaseDate, genre } = req.body;
  const fields = [
    { name: 'Title', value: title },
    { name: 'Description', value: description },
    { name: 'ReleaseDate', value: releaseDate },
  ];
  for (const field of fields) {
    if (!field.value || typeof field.value !== 'string' || field.value.trim() === '') {
      const error = new HttpError(`${field.name} field is required`, 400);
      return next(error);
    }
  }
  if (!Array.isArray(genre) || genre.length === 0) {
    return next(new HttpError(apiErrors.REQUIRED_GENRE, 400));
  }

  const validReleaseDate = new Date(releaseDate);
  if (isNaN(validReleaseDate.getTime())) {
    const error = new HttpError(apiErrors.INVALID_DATE, 422);
    return next(error);
  }
  next();
};

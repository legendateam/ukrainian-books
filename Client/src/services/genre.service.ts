import { axiosInstance } from './axiosInstance.service';
import { IGenreResponse, IResponseOK } from '../interfaces';
import { urls } from '../constants';

class GenreService {
    public async getAll() : Promise<IResponseOK<IGenreResponse[]>> {
        return axiosInstance.get<Promise<IResponseOK<IGenreResponse[]>>>(urls.genres).then(({ data }) => data);
    }
}

export const genreService = new GenreService();

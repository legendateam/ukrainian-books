import { axiosInstance } from './axiosInstance.service';
import { IGenre, IResponseOK } from '../interfaces';
import { urls } from '../constants';

// export const genreService = {
//     getAll: (): Promise<IResponseOK<IGenre[]>> => axiosInstance.get<Promise<IResponseOK<IGenre[]>>>(urls.genres).then((response) => response.data),
// };

class GenreService {
    public async getAll() : Promise<IResponseOK<IGenre[]>> {
        return axiosInstance.get<Promise<IResponseOK<IGenre[]>>>(urls.genres).then(({ data }) => data);
    }
}

export const genreService = new GenreService();

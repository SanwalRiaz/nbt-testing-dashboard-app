/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */
import axios from 'axios';

const createAxiosInstance = (baseURL: string) => {
  const options = {
    // all axios options can be used, shown in axios documentation
    baseURL,
    // responseType: 'json' as ResponseType | undefined,
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  return axios.create(options);
};

export const apiClient = createAxiosInstance(
  process.env.REACT_APP_API_URL as string
);

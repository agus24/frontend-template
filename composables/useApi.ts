import Axios, { AxiosError, type AxiosResponse } from "axios";
import type { Meta } from "~/types/Responses";

type Request = {
  url: string;
  params?: Record<string, any>;
  type?: string;
};

type Response<T> = {
  data: T;
  response: AxiosResponse;
  meta: Meta;
};

export const useApi = defineStore("api", () => {
  const route = useRoute();
  // const config = useRuntimeConfig();
  const axios = Axios;

  // const snackbar = useSnackbar();
  // const auth = useUserData();
  // const adminUserData = useAdminUserData();

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  setHeader();

  function setHeader() {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Content-Type"] = "application/json";

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjU4MjAsImlhdCI6MTcyMjg0NTgyMywiZXhwIjoxNzIyOTMyMjIzLCJuaWsiOiIwMDA2NzAxIiwibmFtZSI6Ikd1c3RpYXdhbiBPdXdhd2kiLCJleHRyIjp7InR5cGUiOiJ0b2tlbiJ9fQ.JB0FoBM0QHNMwDu7YW0EcR5XEsZ1j1JDke_0OcyXmRY";

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  function get<T>({ url, params = {} }: Request): Promise<Response<T>> {
    setHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((response) => resolve({ data: response.data.data, response }))
        .catch((error: AxiosError) => reject(error));
    });
  }

  function post<T>({ url, params = {} }: Request): Promise<Response<T>> {
    // setHeader()
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((response) => resolve({ data: response.data.data, response }))
        .catch((error) => reject(error));
    });
  }

  function put<T>({ url, params = {} }: Request): Promise<Response<T>> {
    // setHeader()
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((response) => resolve({ data: response.data.data, response }))
        .catch((error) => reject(error));
    });
  }

  function patch<T>({ url, params = {} }: Request): Promise<Response<T>> {
    setHeader()
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((response) => resolve({ data: response.data.data, response }))
        .catch((error) => reject(error));
    });
  }

  function remove<T>({ url, params = {} }: Request): Promise<Response<T>> {
    // setHeader();
    return new Promise((resolve, reject) => {
      axios
        .delete(url, params)
        .then((response) => resolve({ data: response.data.data, response }))
        .catch((error) => reject(error));
    });
  }

  function uploadFile<T>({ url, params = {} }: Request): Promise<Response<T>> {
    setHeader();

    const formData = new FormData();
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
      formData.append(keys[i], params![keys[i]]);
    }

    return new Promise((resolve, reject) => {
      axios
        .post(url, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            ContentType: "multipart/form-data",
          },
        })
        .then((response) => {
          resolve({ data: response.data.data, response });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function uploadMultipleFile<T>({
    url,
    params = {},
    type,
  }: Request): Promise<Response<T>> {
    const formData = new FormData();
    const keys = Object.keys(params);

    for (let i = 0; i < keys.length; i++) {
      const formKeys = `${type}[${keys[i]}]`;
      const inputKeys = Object.keys(params[keys[i]]);

      inputKeys.forEach((element) => {
        formData.append(formKeys + `[${element}]`, params[keys[i]][element]);
      });
    }

    return new Promise((resolve, reject) => {
      axios
        .post(url, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            ContentType: "multipart/form-data",
          },
        })
        .then((response) => {
          resolve({ data: response.data.data, response });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function download({ url, params = {} }: Request): Promise<Response<Blob>> {
    setHeader();
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, { responseType: "blob" })
        .then((response) => resolve({ data: response.data.data, response }))
        .catch((error) => reject(error));
    });
  }

  function handleError(error: any): boolean {
    let handled = false;
    console.error(error);
    if (!error.response) {
      // snackbar.error({ title: "Failed to fetch data." });
      alert("Failed to fetch data.");
      return true;
    }

    if (error.response?.status == 422) {
      const errors = error.response.data.data;
      const message: string[] = [];

      Object.keys(errors).forEach((key) => {
        if (errors[key] instanceof Array) {
          message.push(errors[key][0]);
        }
      });

      // snackbar.error({
      //   title: `${message.join("<br>")}`,
      // });
      alert(`${message.join("<br>")}`);
      handled = true;
    } else if (error.response?.status == 503) {
      // snackbar.error({
      //   title: "Server under maintenance. Please try again later.",
      // });

      alert("Server under maintenance. Please try again later.");
      handled = true;
    } else if (error.response?.status >= 500) {
      const message = "Server error. Please try again later.";
      // snackbar.error({
      //   title: message,
      // });
      alert(message);
      handled = true;
    } else if (error.response?.status == 401) {
      const route = useRoute();

      // snackbar.error({
      //   title: "Session Expired",
      //   message: isFromApp().value ? "Please re-open app." : "Please try again.",
      //   cancellable: false,
      //   callback: () => {
      //     useUserData().value = {
      //       token: null,
      //       tokenCreatedAt: null,
      //       user: null,
      //     }
      //     isFromApp().value ?
      //       navigateTo('https://pintukeluar', { external: true }) :
      //       navigateTo(`/${route.params.outletToken}/register`);
      //   },
      // });
      handled = true;
    } else if (error.response?.status == 400) {
      const code = error.response.data.data.code;
      if (code == "refresh_required") {
        window.location.reload();
        return true;
      } else {
        // snackbar.error({
        //   title: error.response.data.data.message,
        // });

        alert(error.response.data.data.message);

        handled = true;
      }
    } else {
      // Handle other error
    }

    return handled;
  }

  return {
    get,
    post,
    put,
    patch,
    remove,
    handleError,
    uploadFile,
    uploadMultipleFile,
    download,
  };
});

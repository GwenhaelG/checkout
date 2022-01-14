import { useReducer, useCallback, useRef, useMemo } from 'react';
import axios from 'axios';
import { useApiContext } from '../contexts/apiContext';

enum Methods {
  'get',
  'put',
  'post',
  'delete',
  'options',
}

interface queryOptions {
  headers: Object;
}

type ApiProps = {
  url: string;
  options?: queryOptions;
};

interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched';
  data?: T;
  error?: string;
}

interface baseProps {
  params?: string;
  name?: string;
}

type getProps = baseProps & { fresh?: boolean };
type putProps = baseProps & { payload?: Object };
type postProps = baseProps & { payload?: Object };
type delProps = baseProps;

type ReturnType<T> = State<T> & {
  loading: boolean;
  get: (props?: getProps) => void;
  put: (props?: putProps) => void;
  post: (props?: postProps) => void;
  delete: (props?: delProps) => void;
  cancelAll: () => void;
};

interface Cache<T> {
  [url: string]: T;
}

type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
  | { type: 'failure'; payload: string };

const source = axios.CancelToken.source();

export function useApi<T = unknown>({ url, options }: ApiProps): ReturnType<T> {
  const { host } = useApiContext();
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);
  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  };
  const client = useMemo(
    () =>
      axios.create({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        baseURL: host,
      }),
    [host]
  );

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' };
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const defaultBaseProps = useMemo(() => ({ params: '', maxRetries: 0 }), []);

  const preFetch = useCallback(async () => {
    dispatch({ type: 'request' });
    let returnClient = client;
    if (options) returnClient.defaults = { ...client.defaults, ...options };
    return returnClient;
  }, [client, options]);

  type postFetchProps = {
    method?: Methods;
    response: any;
  };
  const postFetch = useCallback(
    async ({ method, response }: postFetchProps) => {
      try {
        if (response) {
          if (method === Methods.get) cache.current[url] = response.data;
          if (cancelRequest.current) return;
          dispatch({ type: 'success', payload: response.data });
          return response.data;
        }
      } catch (error) {
        if (cancelRequest.current) return;
        if (error instanceof Error) {
          dispatch({ type: 'failure', payload: error.message });
        }
        return false;
      }
    },
    [cancelRequest, url]
  );

  const defaultGetProps = useMemo(
    () => ({ ...defaultBaseProps, fresh: false }),
    [defaultBaseProps]
  );
  const get = useCallback(
    async (props: getProps = defaultGetProps) => {
      const { params, fresh } = { ...defaultGetProps, ...props };
      const client = await preFetch();
      if (cache.current[url] && !fresh) {
        dispatch({ type: 'success', payload: cache.current[url] });
        return cache.current[url];
      } else {
        const response = await client.get(url + params, {
          cancelToken: source.token,
        });
        await postFetch({ method: Methods.get, response: response });
      }
    },
    [url, defaultGetProps, cache, preFetch, postFetch]
  );

  const defaultPutProps = useMemo(
    () => ({ ...defaultBaseProps, payload: {} }),
    [defaultBaseProps]
  );
  const put = useCallback(
    async (props: putProps = defaultPutProps) => {
      const { params, payload } = { ...defaultPutProps, ...props };
      const client = await preFetch();
      const response = await client.put(url + params, payload, {
        cancelToken: source.token,
      });
      await postFetch({ method: Methods.put, response: response });
    },
    [url, defaultPutProps, preFetch, postFetch]
  );

  const defaultPostProps = useMemo(
    () => ({ ...defaultBaseProps, payload: {} }),
    [defaultBaseProps]
  );
  const post = useCallback(
    async (props: postProps = defaultPostProps) => {
      const { params, payload } = { ...defaultPostProps, ...props };
      const client = await preFetch();
      const response = await client.post(url + params, payload, {
        cancelToken: source.token,
      });
      await postFetch({ method: Methods.post, response: response });
    },
    [url, defaultPostProps, preFetch, postFetch]
  );

  const del = useCallback(
    async (props: delProps = defaultBaseProps) => {
      const { params } = { ...defaultBaseProps, ...props };
      const client = await preFetch();
      const response = await client.delete(url + params, {
        cancelToken: source.token,
      });
      await postFetch({ method: Methods.delete, response: response });
    },
    [url, defaultBaseProps, preFetch, postFetch]
  );

  return {
    ...state,
    loading: false,
    get: get,
    put: put,
    post: post,
    delete: del,
    cancelAll: () => source.cancel(),
  };
}

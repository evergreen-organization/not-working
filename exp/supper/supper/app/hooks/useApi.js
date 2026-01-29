import { useState } from "react";
import { useDispatch } from 'react-redux';

const useApi = (apiFunc) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (args) => {
    setLoading(true);
    const response = await dispatch(apiFunc(args));
    setLoading(false);

    setError(!response.payload?.ok);

    let result = {
      apiStatusCode: response.payload.status,
      data: response.payload.data,
      problem: response.payload.problem
    };

    if (result.data?.status === "E") result.problem = result.data?.message;

    setData(result.data);
    return result;
  };

  const requestIncludeHeaders = async (args) => {
    setLoading(true);
    const response = await dispatch(apiFunc(args));
    setLoading(false);

    setError(!response.payload?.ok);

    let result = {
      apiStatusCode: response.payload.status,
      headers: response.payload.headers,
      data: response.payload.data,
      problem: response.payload.problem
    };

    if (result.data?.status === "E") result.problem = result.data?.message;

    setData(result.data);
    return result;
  };

  return { data, error, loading, request, requestIncludeHeaders };
};

export default useApi;

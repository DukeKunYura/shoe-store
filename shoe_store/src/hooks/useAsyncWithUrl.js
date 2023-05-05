import { useState, useEffect, useCallback } from "react";

/**
 * Хук для выполнения асинхронных запросов
 */
const useAsyncWithUrl = (asyncFunction, url, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(() => {
        setStatus("pending");
        setValue(null);
        setError(null);
        return asyncFunction(url)
            .then((response) => {
                setValue(response);
                setStatus("success");
            })
            .catch((error) => {
                setError(error);
                setStatus("error");
            });
    }, [asyncFunction, url]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);
    return { execute, status, value, error };
};

export default useAsyncWithUrl
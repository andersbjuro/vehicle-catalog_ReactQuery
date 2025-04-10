"use server"

type FetchOptions = {
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
};

type RequestInit = {
    headers: (HeadersInit & FetchOptions) | FetchOptions;
};

const APIURL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const fetcher = async <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
) => {

    const { next, cache, ...restOptions } = options || {};
    const res = await fetch(APIURL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...restOptions,
        },
        body: JSON.stringify({ query, variables }),
        //cache: 'force-cache',
        next
    });

    const json = await res.json();

    if (json.errors) {
        const { message } = json.errors[0];
        throw new Error(message);
    }

    return json.data ;
};

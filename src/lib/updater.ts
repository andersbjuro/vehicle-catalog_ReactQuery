"use server"

type UpdateOptions = {
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
};

type RequestInit = {
    headers: (HeadersInit & UpdateOptions) | UpdateOptions;
};

const APIURL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const updater = async <TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
) => {

    const { next, cache, ...restOptions } = options || {};
    const response = await fetch(APIURL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...restOptions,
        },
        body: JSON.stringify({ query, variables }),
        next
    });

    const data = await response.json();
    return data;
};

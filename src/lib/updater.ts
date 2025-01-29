"use server"

type UpdateOptions = {
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
};

type RequestInit = {
    headers: (HeadersInit & UpdateOptions) | UpdateOptions;
};

export const updater = async <TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
) => {

    const { next, cache, ...restOptions } = options || {};
    const response = await fetch("https://gw.dev.forba.se/gateway/graphql/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...restOptions,
        },
        body: JSON.stringify({ query, variables }),
        next
    });

    // const json = await res.json();

    // if (json.errors) {
    //     const { message } = json.errors[0];
    //     throw new Error(message);
    // }

    const data = await response.json();
    return data;
};

const defaults = {
    baseUrl: 'https://api.guitargeki.com/v1/',
    queryParams: {
        limit: 20,
        page: 1,
        sort: 'id',
        reverse: false
    }
};

/**
 * 
 * @param {*} queryParams 
 */
function createQueryString(queryParams = defaults.queryParams) {
    const queryStrings = [];

    queryStrings.push(`limit=${queryParams.limit}`);
    queryStrings.push(`offset=${queryParams.limit * (queryParams.page - 1)}`);
    queryStrings.push(`sort=${queryParams.sort}`);
    queryStrings.push(`reverse=${queryParams.reverse}`);

    return `${queryStrings.join('&')}`;
}

/**
 * 
 */
function getDefaultQueryParams() {
    return defaults.queryParams;
}

/**
 * 
 * @param {*} url 
 */
function addTrailingSlash(url) {
    url += url.endsWith('/') ? '' : '/';
    return url;
}

/**
 * 
 * @param {*} resource 
 * @param {*} id 
 * @param {*} baseUrl 
 */
async function getOne(resource, id, baseUrl = defaults.baseUrl) {
    const fetchUrl = `${addTrailingSlash(baseUrl)}${resource}/${id}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
}

/**
 * 
 * @param {*} resource 
 * @param {*} queryParams 
 * @param {*} baseUrl 
 */
async function getList(resource, queryParams = defaults.queryParams, baseUrl = defaults.baseUrl) {
    const queryString = createQueryString(queryParams);
    const fetchUrl = `${addTrailingSlash(baseUrl)}${resource}?${queryString}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
}

export default {
    getDefaultQueryParams,
    getOne,
    getList
};
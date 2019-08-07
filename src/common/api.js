import $RefParser from 'json-schema-ref-parser';

class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * 
     * @param {*} queryParams 
     */
    createQueryString(queryParams = this.getDefaultQueryParams()) {
        const queryStrings = [];

        queryStrings.push(`limit=${queryParams.limit}`);
        queryStrings.push(`offset=${queryParams.limit * (queryParams.page - 1)}`);
        queryStrings.push(`sort=${queryParams.sort}`);
        queryStrings.push(`reverse=${queryParams.reverse}`);

        if (queryParams.filters) {
            for (const filter of queryParams.filters) {
                if (!filter.value) continue;
                const where = `where=${encodeURI(`${filter.column}${filter.operator}${filter.value} AND`)}`;
                queryStrings.push(where);
            }
        }

        return `${queryStrings.join('&')}`;
    }

    /**
     * 
     */
    getDefaultQueryParams() {
        return {
            limit: 20,
            page: 1,
            sort: 'id',
            reverse: false
        };
    }

    /**
     * 
     * @param {*} url 
     */
    addTrailingSlash(url) {
        url += url.endsWith('/') ? '' : '/';
        return url;
    }

    async getSwagger() {
        const fetchUrl = `${this.addTrailingSlash(this.baseUrl)}swagger.json`;
        const response = await fetch(fetchUrl);
        const data = await response.json();
        const swagger = await $RefParser.dereference(data);
        return swagger;
    }

    /**
     * 
     * @param {*} resource 
     * @param {*} id 
     * @param {*} baseUrl 
     */
    async getOne(resource, id) {
        const fetchUrl = `${this.addTrailingSlash(this.baseUrl)}${resource}/${id}`;
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
    async getList(resource, queryParams = this.getDefaultQueryParams()) {
        const queryString = this.createQueryString(queryParams);
        const fetchUrl = `${this.addTrailingSlash(this.baseUrl)}${resource}?${queryString}`;
        const response = await fetch(fetchUrl);
        const data = await response.json();
        return data;
    }
}

export default Api;
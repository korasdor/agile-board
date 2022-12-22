import qs from 'query-string'
import { SERVER_PATH } from '../defs';



class ApiCall {
    constructor(serverPath) {
        this.serverPath = serverPath;
    }

    async perform(url, data, config) {
        const request = await fetch(`${this.serverPath}/${url}`, {
            ...config,
            body: JSON.stringify(data),
            headers: {  'Content-Type': 'application/json' },
        });

        return await request.json()
    }

    async get(path, searchParams = {}) {
        return await this.perform(`${path}?${qs.stringify(searchParams)}`)
    }

    async post(path, payload) {
        return await this.perform(path, payload, {
            method: 'POST'
        })
    }

    async put(path, payload) {
        return await this.perform(path, payload, {
            method: 'PUT'
        })
    }

    async delete(path) {
        return await this.perform(path, {}, {
            method: 'DELETE'
        })
    }
}

export default new ApiCall(SERVER_PATH)
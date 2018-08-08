import * as axios from 'axios';
import { extend } from 'lodash';

class HttpService {

    constructor(options){
        options = options || {};
        this.onTokenExpired = options.onTokenExpired || function(){};
        this.server = axios;
    }

    defaultHeaders(){
        const authorization = {} ;
        return extend({}, { 'Accept': 'application/json', 'Content-Type': 'text/plain' }, authorization);
    }

    request(options) {
        return this.server.request({
            method: options.method || 'GET',
            url: options.url,
            params: options.params || {},
            data: options.data || {},
            headers: extend({}, this.defaultHeaders(), options.headers || {})
        })
        .catch( (error) => {
            console.error("Error");
        });
    }

}

export default HttpService;
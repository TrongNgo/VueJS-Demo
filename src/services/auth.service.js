import axios from 'axios';
import config from "../helpers/config";

const AuthService = {
    login: async function(resource) {
        let url = config.login_url + 'login/email';
        let result = await axios(url, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            data: resource
        })
            .catch((error) => {
                if (error.response.data) {
                    return error.response.data;
                } else if (error.response.status) {
                    return error.response.status;
                }
            });
        return result;
    }
};

export default AuthService;


let HttpHelper = {
    CREATE_HEADER: function createHeader() {
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        let token = '';
        if (loginInfo && loginInfo.token) {
            token = loginInfo.token;
        }

        return {
            'Content-Type': 'application/json',
            'Authorization' : 'bearer ' + token
        }
    }
};

export default HttpHelper;

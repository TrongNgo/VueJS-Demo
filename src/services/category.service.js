import config from "../helpers/config";
import ApiService from "./api.service";

const CategoryService = {
    get() {
        const url = config.landing_url + 'categories';
        return ApiService.get(url);
    }
};

export default CategoryService;

const env = 'dev'
export default {
    talking_url: env == 'debug'?'bot/':'omi-bot/',
    search_url: env == 'debug'?'properties/':'omi-properties/',
    property_details_url: env == 'debug'?'properties/':'omi-properties/',
    project_url: env == 'debug'?'projects/':'omi-projects/',
    valet_url: env == 'debug'?'valet/':'omi-valet/',
    booking_url: env == 'debug'?'booking/':'omi-booking/',
    login_url: env == 'debug'?'auths2/':'omi-auths2/',
    account_details: env == 'debug'?'members/':'omi-members/',
    lookup_url: env == 'debug'?'lookup/':'omi-lookup/',
    image_url: env == 'debug'?'images/':'omi-images/',
    conversation_url: env == 'debug'? 'conversations/':'omi-conversations/',
    landing_url: env =='debug'? 'landing/':'omi-landing/',
    googleplace_url: env == 'debug'?'googleplaces/':'omi-googleplaces/',
    baseUrl: env == 'debug' ? 'http://localhost:7071/api/'
                            : env == 'dev' ? 'https://omi-function.azurewebsites.net/api/'
                                           : env == 'uat' ? 'https://imomi-uat.azurewebsites.net/api/'
                                                          : 'https://imomi-prod.azurewebsites.net/api/'
}

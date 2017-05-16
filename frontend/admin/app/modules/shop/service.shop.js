export function shopService($http, MAIN_CONFIG){
    return {
        getItems,
        getDetail,
        getAWSS3URL
    };
    
    function getItems() {
        return $http.get(`${MAIN_CONFIG.PATH.APIS}/admin/shops/list`).then(
            (respond) => {
                return respond.data;
            },
            (reason) => {
                return reason.data;
            }
        );
    }
    
    function getDetail(shopID) {
        return $http.get(`${MAIN_CONFIG.PATH.APIS}/admin/shops/detail/${shopID}`).then(
            (respond) => {
                return respond.data;
            },
            (reason) => {
                return reason.data;
            }
        );
    }
    
    function getAWSS3URL(awsS3Key) {
        return $http.get(`${MAIN_CONFIG.PATH.APIS}/awsS3/url?awsS3Key=${awsS3Key}`).then(
            (respond) => {
                return respond.data;
            },
            (reason) => {
                return reason.data;
            }
        );
    }
};
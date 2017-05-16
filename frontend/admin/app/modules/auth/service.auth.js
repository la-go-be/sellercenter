export function authService($http, $q, MAIN_CONFIG){
    return {
        signin
    };
    
    function signin(user){
        let deferred = $q.defer();
        //$http.post(`${MAIN_CONFIG.PATH.APIS}/authenticate`, user).then(
        //    (respond) => {
        //        deferred.resolve(respond.data);
        //    },
        //    (reason) => {
        //        deferred.reject(reason.data);
        //    }
        //);
        if (user.username == "lagobe" && user.password == "*eb0Gal*") {
            deferred.resolve({
                id: 1
            });
        }
        else {
            deferred.reject({
                message: "Username or password incorrect"
            });
        }
        return deferred.promise;
    }
};
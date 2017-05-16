export function authConfig($stateProvider){
    "ngInject";

    $stateProvider
        .state("auth", {
            url: '/auth',
            templateUrl: "assets/templates/auth/auth.html",
            controller: "AuthController",
            controllerAs: "auth",
            data: {
                css: "assets/css/auth.css"
            }
        });
};
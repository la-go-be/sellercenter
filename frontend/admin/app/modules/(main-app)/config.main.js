export function mainConfig($urlRouterProvider, $stateProvider, $locationProvider){
    "ngInject";

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("root", {
            url: "/",
            onEnter: function($state) {
                $state.go('auth');
            }
        });
};
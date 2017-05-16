export class AuthController {
	constructor($window, $location, authService) {
		"ngInject";
		
		this._$window = $window;
        this._$location = $location;
		this._authService = authService;
		
		this.notifyError = {
            signin: false
        };
    }
    
    signin() {
        this._authService.signin(this.user)
            .then(
                (data) => {
                	this._$window.localStorage.user = JSON.stringify(data);
                	this._$location.path( '/shop');
                },
                (error) => {
                    this.notifyError.signin = true;
                    this.user.password = "";
                }
            );
    }
	
	clearNotifyError() {
        this.notifyError.signin = false;
    }
};
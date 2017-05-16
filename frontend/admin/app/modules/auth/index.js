import {authConfig} from "./config.auth";
import {AuthController} from "./controller.auth";
import {authService} from "./service.auth";
import {authPage} from "./directive.auth-page";

angular.module("Auth")
    .config(authConfig)
    .controller("AuthController", AuthController)
    .factory("authService", authService)
    .directive("authPage", authPage);
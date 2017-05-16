import {mainConstant} from "./constant.main";
import {mainConfig} from "./config.main";
import {MainController} from "./controller.main";

angular.module("MainApp")
    .constant("MAIN_CONFIG", mainConstant)
    .config(mainConfig)
    .controller("MainController", MainController);
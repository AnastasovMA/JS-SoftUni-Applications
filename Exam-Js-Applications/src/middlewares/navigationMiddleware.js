import {render} from "../../node_modules/lit-html/lit-html.js";
import { navigationView } from "../views/navigationView.js";

const headerElement = document.querySelector('.header-navigation');
const mainElement = document.querySelector('#main-content');

const ctxRender = (templateResult) => render(templateResult, mainElement);

export const renderNavigationMiddleware = (ctx, next) => {
    render(navigationView(ctx), headerElement);

    next();
}

export const renderContent = (ctx, next) => {
    ctx.render = ctxRender;

    next();
}
import page from "../node_modules/page/page.mjs";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { renderContent, renderNavigationMiddleware } from "./middlewares/navigationMiddleware.js";
import { createView } from "./views/createView.js";
import { dashboardView } from "./views/dashboardView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";
import { profileView } from "./views/myProfile.js";
import { registerView } from "./views/registerView.js";

page(authMiddleware)
page(renderNavigationMiddleware);
page(renderContent)

page('/', dashboardView)
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView)
page('/create', createView)
page('/myPosts', profileView)
page('/items/:itemId', detailsView)
page('/items/:itemId/edit', editView);

page.start();
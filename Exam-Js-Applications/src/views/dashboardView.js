import { html } from "../../node_modules/lit-html/lit-html.js";
import * as itemService from "../services/itemService.js"

const dashboardTemplate = (items) => html`
        <section id="dashboard-page">
            <h1 class="title">All Posts</h1>
            ${items.length > 0
        ? html`
            <div class="all-posts">
                ${items.map(x => itemTemplate(x))}
            </div>`
        : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
        </section>`;

const itemTemplate = (item) => html`
<div class="post">
    <h2 class="post-title">${item.title}</h2>
    <img class="post-image" src=${item.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/items/${item._id}" class="details-btn btn">Details</a>
    </div>
</div>
`

export const dashboardView = (ctx) => {
    itemService.getAll()
    .then(items => {
        ctx.render(dashboardTemplate(items));
    })
    .catch(err => {
        return alert(err);
    })

}
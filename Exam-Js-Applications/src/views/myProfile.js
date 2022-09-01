import { html } from "../../node_modules/lit-html/lit-html.js";
import * as itemService from "../services/itemService.js"

const profileTemplate = (items) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    ${items.length > 0
        ? html`
    <div class="my-posts">
        ${items.map(x => postTemplate(x))}
    </div>`
        : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`

const postTemplate = (item) => html`
<div class="post">
    <h2 class="post-title">${item.title}</h2>
    <img class="post-image" src=${item.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/items/${item._id}" class="details-btn btn">Details</a>
    </div>
</div>`

export const profileView = (ctx) => {
    itemService.getMyItems(ctx.user._id)
    .then(items => {
        ctx.render(profileTemplate(items))
    })
    .catch(err => {
        return alert(err);
    })
}
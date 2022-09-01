import { html } from "../../node_modules/lit-html/lit-html.js";
import * as itemService from "../services/itemService.js"
import { itemDataIsInvalid } from "../utils/utils.js";

const editTemplate = (item, submitHandler) => html`

<section id="edit-page" class="auth">
    <form id="edit" @submit=${submitHandler}>
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" value=${item.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" value=${item.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" value=${item.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" value=${item.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" value=${item.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>
`

export const editView = (ctx) => {
    let itemId = ctx.params.itemId
    const submitHandler = (e) => {
        e.preventDefault()

        const itemData = Object.fromEntries(new FormData(e.currentTarget));

        if (itemDataIsInvalid(itemData)) {
            return alert('All fields are required');
        }

        itemService.edit(itemId, itemData)
        .then(item => {
            ctx.page.redirect(`/items/${item._id}`);
        })
        .catch(err => {
            return alert(err);
        })
    }
    itemService.getOne(itemId)
    .then(item => {
        ctx.render(editTemplate(item, submitHandler));
    })
}
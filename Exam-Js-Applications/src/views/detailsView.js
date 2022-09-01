import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as itemService from "../services/itemService.js"

const detailsTemplate = (item, user, onDelete) => html`
        <section id="details-page">
            <h1 class="title">Post Details</h1>
        
            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src=${item.imageUrl} alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${item.title}</h2>
                        <p class="post-description">Description: ${item.description}</p>
                        <p class="post-address">Address: ${item.address}</p>
                        <p class="post-number">Phone number: ${item.phone}</p>
                        <p class="donate-Item">Donate Materials: 0</p>

                        ${user
                        ?html`
                        <div class="btns">
                            ${item.isOwner
                            ?html`
                            <a href="/items/${item._id}/edit" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
                            :html`<a href="#" class="donate-btn btn">Donate</a>`}
                            <!--Bonus - Only for logged-in users ( not authors )-->
                            
                        </div>`
                        :nothing}
                    </div>
                </div>
            </div>
        </section>`


export const detailsView = async (ctx) => {
    let itemId = ctx.params.itemId; 

    const item = await itemService.getOne(itemId);

    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
    }
    ctx.render(detailsTemplate(item, ctx.user, onDelete));

    async function onDelete(){

        let choice = confirm(`Are you sure you want to remove: ${item.title}`)
        if (choice) {
            await itemService.remove(itemId);
            ctx.page.redirect('/')
        }
    }

}
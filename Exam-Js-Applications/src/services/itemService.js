import * as request from "./requester.js"

const baseUrl = `http://localhost:3030/data/posts`

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (itemId) => request.get(`${baseUrl}/${itemId}`);

export const create = (itemData) => request.post(baseUrl, itemData);

export const edit = (itemId, itemData) => request.put(`${baseUrl}/${itemId}`, itemData);

export const remove = (itemId) => request.del(`${baseUrl}/${itemId}`);

export const getMyItems = (userId) => request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)

// export const getMyItems = (userId) => console.log(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

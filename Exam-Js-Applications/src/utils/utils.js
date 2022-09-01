export const itemDataIsInvalid = (itemData) => {
    const requiredFields = [
        "title",
        "description",
        "imageUrl",
        "address",
        "phone"
    ]
    return requiredFields.some(x => !itemData[x]);
}
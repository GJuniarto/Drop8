function pagination(page, size) {
    return {
        limit: size ? +size : 8,
        offset: page ? page * size : 0
    };
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, products, totalPages, currentPage };
};
module.exports = {
    pagination,
    getPagingData
};

function formatPaginatedResponse(data, page, limit, totalItems, technology) {
    const totalPages = Math.ceil(totalItems / limit);

    return {
        success: true,
        data: {
            items: data,
            technology,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }
    };
}

module.exports = {
    formatPaginatedResponse
}

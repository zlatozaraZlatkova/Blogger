function paginationMiddleware() {
    return (req, res, next) => {
       
        let page = parseInt(req.query.page) || 1;

        if (page < 1) {
            page = 1
        }

        let limit = parseInt(req.query.limit) || 3;

        if (limit < 1) { 
            limit = 3 
        };

        const skip = (page - 1) * limit;

        // create req.pagination object
        req.pagination = {
            page,
            limit,
            skip
        };
        
        next();
    }
}

module.exports = {
    paginationMiddleware
}

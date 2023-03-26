const mw = (handle) => async(req, res, next) => {
    try {
        await handle(req, res, next)
    } catch (err) {
        next(err)
    }
}

module.exports = mw
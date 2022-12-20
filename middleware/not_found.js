function notFoundMiddleWare(req,res)
{
           res.status(404).send("Route not found.");
}

export {notFoundMiddleWare}
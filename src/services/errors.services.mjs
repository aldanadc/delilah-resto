export function sendError400(response) {
  response
    .status(400)
    .json({
      status: "Request failed",
      message: "Incorrect or missing information, please check all required fields"
    })
}


export function sendError403(response) {
  response
  .status(403)
  .json({
    status: "Request failed",
    message: "User is not authorized to perform such action"
  })
}


export function sendError404(response) {
  response
    .status(404)
    .json({
      status: "Not found",
      message: "The requested resource does not exist"
    })
}


export function sendError500(response) {
  response
    .status(500)
    .json({
      status: "Request failed",
      message: "Internal server error"
    })
}



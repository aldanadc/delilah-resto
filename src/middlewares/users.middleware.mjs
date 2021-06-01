import jwt from 'jsonwebtoken';


export function verifyIfDataOwner(request, response, next) {

  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

  if ((tokenInfo.is_admin === false) && (request.params.user_id == tokenInfo.user_id)) {
    next();

  }else {
    response
      .status(403)
      .json({
        status: "Request failed",
        message: "User is not authorized to perform such action"
      })
  }
}


export function verifyIfDataOwnerOrAdmin(request, response, next) {
  
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

  if ((tokenInfo.is_admin === false) && (request.params.user_id == tokenInfo.user_id)) {
    next();

  }else if (tokenInfo.is_admin === true) {
    next();

  }else {
    response
      .status(403)
      .json({
        status: "Request failed",
        message: "User is not authorized to perform such action"
      })
  }
}

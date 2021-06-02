export function checkIfValidDate(request, response, next) {
  const date = new Date(request.params.date);
  const endOfDay = new Date(date);
  endOfDay.setHours(endOfDay.getHours() + 24);

  console.log(date);
  console.log(endOfDay);

  const dateTime = date.getTime();
  const dateCheck = date.getTime();

  if (dateTime !== dateCheck) {
    response
      .status(400)
      .json({
        status: "Failed request",
        message: "Invalid date provided in query parameters"
      })
  }else {
    next();
  }
}
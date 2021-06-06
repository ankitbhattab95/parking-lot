module.exports = {
  400: "",
  403: "",
  404: "",
  500: "",

  applicationMessages: {
    dbConnectionError     : "Failed to connect application database!",
    dbCloseConnectionError: "Failed to close application database!",
    deleteCollectionError : "Failed to clear collections from database!",
    appStarted            : "Application started at port: ",
    logDirError           : "Failed to create log directory at location "
  },
  status: {
    available: "available",
    booked   : "booked",
    occupied : "occupied"
  },
  apiResponse: {
    success            : "Success",
    alreadyBooked      : "You have already booked a parking",
    allBooked          : "No Parking available",
    error              : "Error",
    appTokenNotProvided:
      "appToken must be included in" + " querystring/params/body for request",
    errorParsingObject: "Invalid JSON provided",
    fileNotProvided   : "Valid file not provided",
    idNotProvided     : "Valid request ID not provided",
    bodyNotProvided   : "Valid request body not provided",
    statusNotProvided : "Valid status not provided",
    userNotProvided   : "Valid user not provided",
    recordFetch       : "Records fetch successfully",
    recordSaved       : "Record saved successfully",
    recordDeleted     : "Record deleted successfully",
    recordUpdated     : "Record updated successfully",
    dbError           : "Something went wrong. Please try again later",
    noRowFound        : "No record found"
  }
}

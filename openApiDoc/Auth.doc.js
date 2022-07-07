const util = require('../utils/apiBuildHandler')
const tag = "Calculator";
const schema = {
    login: {
        type: "object",
        title: "Login",
        properties: {
            username: {
                type: "string"
            },
            password: {
                type: "string"
            }
        },
        required: ["username","password"]
    },
    register: {
        type: "object",
        title: "Register",
        properties: {
            success: {
                type: "boolean"
            },
            message: {
                type: "string"
            },
            data: {
                properties: {
                    username: {},
                    password: {},
                    fullname: {},
                    timestamp: {},
                    timelogin:{},
                    timelogout:{},
                    createdAt:{},
                    updatedAt:{},
                    deletedAt:{}
                }
            }
        },
        required: ["username","password","fullname"]
    },
    registerResponse: {
        type: "object",
        title: "Register",
    },
    logout: {

    },
    token: {
        title: "UserToken",
        properties: {
            success: {
                type: "boolean"
            },
            message: {
                type: "string"
            },
            data: {
                properties: {
                    token: {
                        type: "string"
                    }
                }
            }
        },

    },
    statistik: {},
}
const paths = {
    "/login": {
        post: {
            tags:[tag],
            requestBody:{
                content: {
                    "application/json": {
                        schema: util.getSchemaRequest("login")
                    }
                }
            },
            responses: {
                200: {
                    description: "Success login",
                    content : {
                        "application/json":{
                            schema: util.getSchemaRequest("token","token","object")
                        }
                    }

                }
            }
        }
    },
    "/register": {
        post: {
            tags:[tag],
            requestBody:{
                content: {
                    "application/json": {
                        schema: util.getSchemaRequest("login")
                    }
                }
            },
            responses: {
                200: {
                    description: "Success login",
                    content : {
                        "application/json":{
                            schema: util.getSchemaRequest("token","token","object")
                        }
                    }

                }
            }
        }
    }
    
}
exports.default = { schema,paths}
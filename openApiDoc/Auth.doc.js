const util = require("../utils/apiBuildHandler");
const tag = "Calculator";
const schema = {
  login: {
    type: "object",
    title: "Login",
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    required: ["username", "password"],
  },

  register: {
    type: "object",
    title: "Register",
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
      fullname: {
        type: "string",
      },
    },
    required: ["username", "password", "fullname"],
  },
  registerResponse: {
    type: "object",
    title: "Register Response",
    properties: {
      success: {
        type: "boolean",
      },
      message: {
        type: "string",
      },
      data: {
        properties: {
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
          fullname: {
            type: "string",
          },
          timestamp: {
            type: "integer",
          },
          timelogin: {
            type: "string",
          },
          timelogout: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          deletedAt: {
            type: "string",
          },
          _id: {
            type: "string",
          },
        },
      },
    },
  },
  statistik: {
    type: "object",
    title: "Statistik",
    properties: {
      success: {
        type: "boolean",
      },
      message: {
        type: "string",
      },
      data: {
        type: "array",
        items: {
          properties: {
            id: {
              type: "string",
            },
            username: {
              type: "string",
            },
            fullname: {
              type: "string",
            },
            visited: {
              type: "integer",
            },
          },
        },
      },
    },
  },
  token: {
    title: "UserToken",
    properties: {
      success: {
        type: "boolean",
      },
      message: {
        type: "string",
      },
      data: {
        properties: {
          token: {
            type: "string",
          },
        },
      },
    },
  },
};
const paths = {
  "/login": {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          "application/json": {
            schema: util.getSchemaRequest("login"),
          },
        },
      },
      responses: {
        200: {
          description: "Success login",
          content: {
            "application/json": {
              schema: util.getSchemaRequest("token", "token", "object"),
            },
          },
        },
      },
    },
  },
  "/register": {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          "application/json": {
            schema: util.getSchemaRequest("register"),
          },
        },
      },
      responses: {
        200: {
          description: "Success login",
          content: {
            "application/json": {
              schema: util.getSchemaRequest(
                "registerResponse",
                "registerResponse",
                "object"
              ),
            },
          },
        },
      },
    },
  },
  "/statistik": {
    get: {
      tags: [tag],
      responses: {
        200: {
          description: "Success login",
          content: {
            "application/json": {
              schema: util.getSchemaRequest("statistik", "statistik", "object"),
            },
          },
        },
      },
    },
  },
};
exports.default = { schema, paths };

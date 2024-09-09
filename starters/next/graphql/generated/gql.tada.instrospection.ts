/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * You may import it to create a `graphql()` tag function with `gql.tada`
 * by importing it and passing it to `initGraphQLTada<>()`.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { introspection } from './introspection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof introspection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 * ```
 */
const introspection = {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": {
      "name": "Subscription"
    },
    "types": [
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "INTERFACE",
        "name": "Connection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "Edge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INTERFACE",
                    "name": "EdgeNode"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MediaImageConnection"
          },
          {
            "kind": "OBJECT",
            "name": "NodeArticleConnection"
          },
          {
            "kind": "OBJECT",
            "name": "NodePageConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphAuthorConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCardGroupConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCtaConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphFaqConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphHeroConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphLogoGroupConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphTestimonialConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphViewReferenceConnection"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphWebformConnection"
          },
          {
            "kind": "OBJECT",
            "name": "TermTagsConnection"
          },
          {
            "kind": "OBJECT",
            "name": "UserConnection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ConnectionPageInfo",
        "fields": [
          {
            "name": "endCursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hasNextPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hasPreviousPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "startCursor",
            "type": {
              "kind": "SCALAR",
              "name": "Cursor"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ConnectionSortKeys",
        "enumValues": [
          {
            "name": "CREATED_AT",
            "isDeprecated": false
          },
          {
            "name": "UPDATED_AT",
            "isDeprecated": false
          },
          {
            "name": "TITLE",
            "isDeprecated": false
          },
          {
            "name": "STICKY",
            "isDeprecated": false
          },
          {
            "name": "PROMOTED",
            "isDeprecated": false
          },
          {
            "name": "WEIGHT",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Cursor"
      },
      {
        "kind": "OBJECT",
        "name": "DateTime",
        "fields": [
          {
            "name": "offset",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UtcOffset"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Time"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Timestamp"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timezone",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "TimeZone"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "Edge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INTERFACE",
                "name": "EdgeNode"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MediaImageEdge"
          },
          {
            "kind": "OBJECT",
            "name": "NodeArticleEdge"
          },
          {
            "kind": "OBJECT",
            "name": "NodePageEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphAuthorEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCardGroupEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCtaEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphFaqEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphHeroEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphLogoGroupEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphTestimonialEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphViewReferenceEdge"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphWebformEdge"
          },
          {
            "kind": "OBJECT",
            "name": "TermTagsEdge"
          },
          {
            "kind": "OBJECT",
            "name": "UserEdge"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "EdgeNode",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MediaImage"
          },
          {
            "kind": "OBJECT",
            "name": "NodeArticle"
          },
          {
            "kind": "OBJECT",
            "name": "NodePage"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphAuthor"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCardGroup"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCta"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphFaq"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphHero"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphLogoGroup"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphTestimonial"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphViewReference"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphWebform"
          },
          {
            "kind": "OBJECT",
            "name": "TermTags"
          },
          {
            "kind": "OBJECT",
            "name": "User"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Email"
      },
      {
        "kind": "OBJECT",
        "name": "File",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mime",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "size",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Html"
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "OBJECT",
        "name": "Image",
        "fields": [
          {
            "name": "alt",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "height",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mime",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "size",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "variations",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ImageStyleDerivative"
                }
              }
            },
            "args": [
              {
                "name": "styles",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "ImageStyleAvailable"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "width",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ImageStyle",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ImageStyleInterface"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ImageStyleAvailable",
        "enumValues": [
          {
            "name": "UNDEFINED",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ImageStyleDerivative",
        "fields": [
          {
            "name": "height",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "width",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "ImageStyleInterface",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ImageStyle"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ImageStyleUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ImageStyle"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "KeyValueInput",
        "inputFields": [
          {
            "name": "key",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "Language",
        "fields": [
          {
            "name": "direction",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Link",
        "fields": [
          {
            "name": "internal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MediaImage",
        "fields": [
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mediaImage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Image"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "MediaInterface"
          },
          {
            "kind": "INTERFACE",
            "name": "MetaTagInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MediaImageConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MediaImageEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MediaImage"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MediaImageEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MediaImage"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "MediaInterface",
        "fields": [
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MediaImage"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "MediaUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MediaImage"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Menu",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MenuItem"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "MenuInterface"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "MenuAvailable",
        "enumValues": [
          {
            "name": "FOOTER",
            "isDeprecated": false
          },
          {
            "name": "MAIN",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "MenuInterface",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MenuItem"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Menu"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MenuItem",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MenuItemAttributes"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "children",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MenuItem"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "expanded",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "internal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "route",
            "type": {
              "kind": "UNION",
              "name": "RouteUnion"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MenuItemAttributes",
        "fields": [
          {
            "name": "class",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "MenuUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Menu"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "MetaTag",
        "fields": [
          {
            "name": "tag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MetaTagLink"
          },
          {
            "kind": "OBJECT",
            "name": "MetaTagProperty"
          },
          {
            "kind": "OBJECT",
            "name": "MetaTagScript"
          },
          {
            "kind": "OBJECT",
            "name": "MetaTagValue"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "MetaTagInterface",
        "fields": [
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MediaImage"
          },
          {
            "kind": "OBJECT",
            "name": "NodeArticle"
          },
          {
            "kind": "OBJECT",
            "name": "NodePage"
          },
          {
            "kind": "OBJECT",
            "name": "TermTags"
          },
          {
            "kind": "OBJECT",
            "name": "User"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagLink",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MetaTagLinkAttributes"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "MetaTag"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagLinkAttributes",
        "fields": [
          {
            "name": "href",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hreflang",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "media",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "rel",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sizes",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagProperty",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MetaTagPropertyAttributes"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "MetaTag"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagPropertyAttributes",
        "fields": [
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "property",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagScript",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MetaTagScriptAttributes"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "MetaTag"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagScriptAttributes",
        "fields": [
          {
            "name": "integrity",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "src",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "MetaTagUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MetaTagLink"
          },
          {
            "kind": "OBJECT",
            "name": "MetaTagProperty"
          },
          {
            "kind": "OBJECT",
            "name": "MetaTagScript"
          },
          {
            "kind": "OBJECT",
            "name": "MetaTagValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagValue",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MetaTagValueAttributes"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "MetaTag"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MetaTagValueAttributes",
        "fields": [
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "NodeArticle",
        "fields": [
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "body",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "TextSummary"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MediaUnion"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "promote",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sticky",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "summary",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tags",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "UNION",
                  "name": "TermUnion"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "MetaTagInterface"
          },
          {
            "kind": "INTERFACE",
            "name": "NodeInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NodeArticleConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NodeArticleEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NodeArticle"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NodeArticleEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NodeArticle"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "NodeInterface",
        "fields": [
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "promote",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sticky",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "NodeArticle"
          },
          {
            "kind": "OBJECT",
            "name": "NodePage"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NodePage",
        "fields": [
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "components",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "UNION",
                  "name": "ParagraphUnion"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MediaUnion"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "promote",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "showTitle",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sticky",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "summary",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "MetaTagInterface"
          },
          {
            "kind": "INTERFACE",
            "name": "NodeInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NodePageConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NodePageEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NodePage"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "NodePageEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NodePage"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "NodeUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "NodeArticle"
          },
          {
            "kind": "OBJECT",
            "name": "NodePage"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphAuthor",
        "fields": [
          {
            "name": "company",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MediaUnion"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "position",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphAuthorConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphAuthorEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphAuthor"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphAuthorEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphAuthor"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphCardGroup",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "ParagraphUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subheading",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphCardGroupConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphCardGroupEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphCardGroup"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphCardGroupEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphCardGroup"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphCta",
        "fields": [
          {
            "name": "actions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Link"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subheading",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphCtaConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphCtaEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphCta"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphCtaEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphCta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphFaq",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "ParagraphUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphFaqConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphFaqEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphFaq"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphFaqEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphFaq"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphHero",
        "fields": [
          {
            "name": "actions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Link"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MediaUnion"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphHeroConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphHeroEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphHero"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphHeroEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphHero"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ParagraphInterface",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ParagraphAuthor"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCardGroup"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCta"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphFaq"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphHero"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphLogo"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphLogoGroup"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphQuestion"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphSimpleCard"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphTestimonial"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphViewReference"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphWebform"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphLogo",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MediaUnion"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "link",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Link"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphLogoGroup",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "items",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "ParagraphUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphLogoGroupConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphLogoGroupEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphLogoGroup"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphLogoGroupEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphLogoGroup"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphQuestion",
        "fields": [
          {
            "name": "answer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Text"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "question",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphSimpleCard",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "MediaUnion"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphTestimonial",
        "fields": [
          {
            "name": "author",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "ParagraphUnion"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "quote",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphTestimonialConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphTestimonialEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphTestimonial"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphTestimonialEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphTestimonial"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ParagraphUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ParagraphAuthor"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCardGroup"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphCta"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphFaq"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphHero"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphLogo"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphLogoGroup"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphQuestion"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphSimpleCard"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphTestimonial"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphViewReference"
          },
          {
            "kind": "OBJECT",
            "name": "ParagraphWebform"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphViewReference",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "link",
            "type": {
              "kind": "OBJECT",
              "name": "Link"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reference",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "ViewResultUnion"
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "KeyValueInput"
                  }
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "sortDir",
                "type": {
                  "kind": "ENUM",
                  "name": "SortDirection"
                }
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subheading",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphViewReferenceConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphViewReferenceEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphViewReference"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphViewReferenceEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphViewReference"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphWebform",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "form",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "heading",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subheading",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "ParagraphInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphWebformConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphWebformEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ParagraphWebform"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ParagraphWebformEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphWebform"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "PhoneNumber"
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "info",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SchemaInformation"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mediaImage",
            "type": {
              "kind": "OBJECT",
              "name": "MediaImage"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "mediaImages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MediaImageConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "menu",
            "type": {
              "kind": "OBJECT",
              "name": "Menu"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "MenuAvailable"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "nodeArticle",
            "type": {
              "kind": "OBJECT",
              "name": "NodeArticle"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "nodeArticles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NodeArticleConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "nodePage",
            "type": {
              "kind": "OBJECT",
              "name": "NodePage"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "nodePages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "NodePageConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphAuthor",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphAuthor"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphAuthors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphAuthorConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphCardGroup",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphCardGroup"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphCardGroups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphCardGroupConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphCta",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphCta"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphCtas",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphCtaConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphFaq",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphFaq"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphFaqs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphFaqConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphHero",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphHero"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphHeroes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphHeroConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphLogo",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphLogo"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphLogoGroup",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphLogoGroup"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphLogoGroups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphLogoGroupConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphTestimonial",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphTestimonial"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphTestimonials",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphTestimonialConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphViewReference",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphViewReference"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphViewReferences",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphViewReferenceConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphWebform",
            "type": {
              "kind": "OBJECT",
              "name": "ParagraphWebform"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "paragraphWebforms",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ParagraphWebformConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "preview",
            "type": {
              "kind": "UNION",
              "name": "NodeUnion"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "langcode",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "token",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "route",
            "type": {
              "kind": "UNION",
              "name": "RouteUnion"
            },
            "args": [
              {
                "name": "path",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "termTags",
            "type": {
              "kind": "OBJECT",
              "name": "TermTags"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "revision",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "termTagsItems",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "TermTagsConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserConnection"
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "reverse",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                },
                "defaultValue": "false"
              },
              {
                "name": "sortKey",
                "type": {
                  "kind": "ENUM",
                  "name": "ConnectionSortKeys"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "viewBlogTeaser",
            "type": {
              "kind": "OBJECT",
              "name": "ViewBlogTeaserResult"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "viewBlogTeaserFeatured",
            "type": {
              "kind": "OBJECT",
              "name": "ViewBlogTeaserFeaturedResult"
            },
            "args": [
              {
                "name": "page",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                },
                "defaultValue": "0"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "viewer",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "Route",
        "fields": [
          {
            "name": "internal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "RouteExternal"
          },
          {
            "kind": "OBJECT",
            "name": "RouteInternal"
          },
          {
            "kind": "OBJECT",
            "name": "RouteRedirect"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RouteEntityUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MediaImage"
          },
          {
            "kind": "OBJECT",
            "name": "NodeArticle"
          },
          {
            "kind": "OBJECT",
            "name": "NodePage"
          },
          {
            "kind": "OBJECT",
            "name": "TermTags"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "RouteExternal",
        "fields": [
          {
            "name": "internal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Route"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "RouteInternal",
        "fields": [
          {
            "name": "breadcrumbs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Link"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "entity",
            "type": {
              "kind": "UNION",
              "name": "RouteEntityUnion"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "internal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Route"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "RouteRedirect",
        "fields": [
          {
            "name": "internal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "redirect",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Route"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "RouteUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "RouteExternal"
          },
          {
            "kind": "OBJECT",
            "name": "RouteInternal"
          },
          {
            "kind": "OBJECT",
            "name": "RouteRedirect"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SchemaFragment",
        "fields": [
          {
            "name": "class",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaInformation",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fragments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SchemaFragment"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "SortDirection",
        "enumValues": [
          {
            "name": "ASC",
            "isDeprecated": false
          },
          {
            "name": "DESC",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "OBJECT",
        "name": "Subscription",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "TermInterface",
        "fields": [
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Text"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parent",
            "type": {
              "kind": "UNION",
              "name": "TermUnion"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "weight",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "TermTags"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TermTags",
        "fields": [
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Text"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parent",
            "type": {
              "kind": "UNION",
              "name": "TermUnion"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "weight",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "MetaTagInterface"
          },
          {
            "kind": "INTERFACE",
            "name": "TermInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TermTagsConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TermTagsEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TermTags"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TermTagsEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "TermTags"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "TermUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "TermTags"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Text",
        "fields": [
          {
            "name": "format",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "processed",
            "type": {
              "kind": "SCALAR",
              "name": "Html"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TextSummary",
        "fields": [
          {
            "name": "format",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "processed",
            "type": {
              "kind": "SCALAR",
              "name": "Html"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "summary",
            "type": {
              "kind": "SCALAR",
              "name": "Html"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Time"
      },
      {
        "kind": "SCALAR",
        "name": "TimeZone"
      },
      {
        "kind": "SCALAR",
        "name": "Timestamp"
      },
      {
        "kind": "OBJECT",
        "name": "UnsupportedType",
        "fields": [
          {
            "name": "unsupported",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "UntypedStructuredData"
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mail",
            "type": {
              "kind": "SCALAR",
              "name": "Email"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "picture",
            "type": {
              "kind": "UNION",
              "name": "MediaUnion"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "roles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "UserRoles"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "UserStatus"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "EdgeNode"
          },
          {
            "kind": "INTERFACE",
            "name": "MetaTagInterface"
          },
          {
            "kind": "INTERFACE",
            "name": "UserInterface"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "UserConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "User"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ConnectionPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Connection"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "UserEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Cursor"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Edge"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "UserInterface",
        "fields": [
          {
            "name": "changed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "created",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DateTime"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mail",
            "type": {
              "kind": "SCALAR",
              "name": "Email"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "metatag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "MetaTagUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "roles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "UserRoles"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "UserStatus"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "User"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "UserRoles"
      },
      {
        "kind": "ENUM",
        "name": "UserStatus",
        "enumValues": [
          {
            "name": "ACTIVE",
            "isDeprecated": false
          },
          {
            "name": "BLOCKED",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "UserUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "User"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "UtcOffset"
      },
      {
        "kind": "INTERFACE",
        "name": "View",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ViewPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "view",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ViewBlogTeaserFeaturedResult"
          },
          {
            "kind": "OBJECT",
            "name": "ViewBlogTeaserResult"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ViewBlogTeaserFeaturedResult",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ViewPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "results",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "NodeUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "view",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "View"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ViewBlogTeaserResult",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "langcode",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ViewPageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "results",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "NodeUnion"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "view",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "View"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ViewFilter",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UntypedStructuredData"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "multiple",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "options",
            "type": {
              "kind": "SCALAR",
              "name": "UntypedStructuredData"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "plugin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "required",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "UntypedStructuredData"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ViewPageInfo",
        "fields": [
          {
            "name": "offset",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "page",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageSize",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "total",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ViewReference",
        "fields": [
          {
            "name": "contextualFilter",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "query",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "view",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "ViewResultUnion",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ViewBlogTeaserFeaturedResult"
          },
          {
            "kind": "OBJECT",
            "name": "ViewBlogTeaserResult"
          }
        ]
      }
    ],
    "directives": []
  }
} as const;

export { introspection };
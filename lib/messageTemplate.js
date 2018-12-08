exports.textMessage = function(text) {
  return {
    "type": "text",
    "text": text
  }
}

exports.imagemapMessage = function(messages, url) {
  return {
    "type": "imagemap",
    "baseUrl": url, // input your image path
    "altText": "This is an imagemap",
    "baseSize": {
      "height": 1040,
      "width": 1040
    },
    "actions": [{
        "type": "message",
        "text": messages[0],
        "area": {
          "x": 0,
          "y": 360,
          "width": 520,
          "height": 340
        }
      },
      {
        "type": "message",
        "text": messages[1],
        "area": {
          "x": 520,
          "y": 360,
          "width": 520,
          "height": 340
        }
      },
      {
        "type": "message",
        "text": messages[2],
        "area": {
          "x": 0,
          "y": 700,
          "width": 520,
          "height": 340
        }
      },
      {
        "type": "message",
        "text": messages[3],
        "area": {
          "x": 520,
          "y": 700,
          "width": 520,
          "height": 340
        }
      }
    ]
  }
}

exports.singleImagemapMessage = function(typeName) {
  if (typeName == "0") {
    return {
      "type": "imagemap",
      "baseUrl": 'replace your image url', // input your image path
      "altText": "診断を開始しますか？",
      "baseSize": {
        "width": 1040,
        "height": 1040
      },
      "actions": [{
        "type": "message",
        "text": "診断開始",
        "area": {
          "x": 0,
          "y": 0,
          "width": 1040,
          "height": 1040
        }
      }]
    }
  }
}

/**
 * Componse parameter for Image Message with given arguments
 * @param {string} url image url with ssl protocol
 * @param {string} previewUrl image url with ssl protocol for preview, optional
 * @return {object} object with schema defined as Image Message API parameter
 */
exports.imageMessage = function(url, previewUrl) {
  return {
    "type": "image",
    "originalContentUrl": url,
    "previewImageUrl": previewUrl || url
  }
}

exports.quickMessage = function(questionText) {
  return {
    "type": "text", // ①
    "text": questionText,
    "quickReply": { // ②
      "items": [{
          "type": "action", // ③
          //"imageUrl": "https://example.com/sushi.png",
          "action": {
            "type": "message",
            "label": "Sushi",
            "text": "Sushi"
          }
        },
        {
          "type": "action",
          //"imageUrl": "https://example.com/tempura.png",
          "action": {
            "type": "message",
            "label": "Tempura",
            "text": "Tempura"
          }
        },
        //        {
        //          "type": "action", // ④
        //          "action": {
        //            "type": "location",
        //            "label": "Send location"
        //          }
        //        }
      ]
    }
  }
}

exports.flexMessage = function() {
  return {
    "type": "flex",
    "altText": "this is a flex message",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "hello"
          },
          {
            "type": "text",
            "text": "world"
          }
        ]
      }
    }
  }
}
exports.flexMessage2 = function() {
  return {
    "type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "のび太くんはのび太くんはのび太くんはのび太くんはのび太くんはのび太くんはのび太くんは",
            "size": "md",
          },
          {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "margin": "lg",
            "contents": [{
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [{
                    "type": "text",
                    "text": "Place",
                    "flex": 3,
                    "size": "sm",
                    "color": "#AAAAAA"
                  },
                  {
                    "type": "text",
                    "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                    "flex": 3,
                    "size": "sm",
                    "color": "#666666",
                    "wrap": true
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "flex": 0,
        "spacing": "sm",
        "contents": [{
            "type": "button",
            "action": {
              "type": "message",
              "label": "YES",
              "text": "https://linecorp.com"
            },
            "height": "sm",
            "style": "primary"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "NO",
              "text": "https://linecorp.com"
            },
            "height": "sm",
            "style": "primary"
          },
          {
              "type": "button",
              "action": {
                "type": "message",
                "label": "YES",
                "text": "https://linecorp.com"
              },
              "height": "sm",
              "style": "primary"
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "NO",
                "text": "https://linecorp.com"
              },
              "height": "sm",
              "style": "primary"
            },
          {
            "type": "spacer",
            "size": "sm"
          }
        ]
      }
    }
  }
}

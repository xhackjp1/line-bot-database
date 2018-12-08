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
    "type": "text",
    "text": questionText,
    "quickReply": {
      "items": [{
          "type": "action",
          "action": {
            "type": "message",
            "label": "Sushi",
            "text": "Sushi"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "Tempura",
            "text": "Tempura"
          }
        }
      ]
    }
  }
}

exports.sample = function() {
  return {
    "type": "flex",
    "altText": "this is a flex message",
    "contents": {
      "type": "bubble",
      "styles": {
        "header": {
          "backgroundColor": "#f0f8ff"
        },
        "hero": {
          "separator": true,
          "separatorColor": "#191970"
        }
      },
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
          "type": "text",
          "text": "Classmethod,Inc."
        }]
      },
      "hero": {
        "type": "image",
        "url": "https://classmethod.jp/wp-content/themes/classmethod/img/common/ogp.png",
        "size": "full"
      }
    }
  }
}

exports.simpleQuestionMessage = function() {
  return {
    "type": "flex",
    "altText": "this is a flex message",
    "contents": func()
  }
}
exports.customQuestionMessage = function(title, imageUrl, qustions, answers) {
  return {
    "type": "flex",
    "altText": "this is a flex message",
    "contents": customFunc(title, imageUrl, qustions, answers)
  }
}

function func() {
  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "uri": "https://linecorp.com"
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "md",
      "action": {
        "type": "uri",
        "uri": "https://linecorp.com"
      },
      "contents": [{
          "type": "text",
          "wrap": true,
          "text": "マツダマツダマツダマツダマツダマツダマツダマツダマツダマツダ",
          "size": "md"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "1",
              "flex": 1
            },
            {
              "type": "text",
              "text": "りんご",
              "weight": "bold",
              "flex": 6
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "2",
              "flex": 1
            },
            {
              "type": "text",
              "text": "みかん",
              "weight": "bold",
              "flex": 6
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "3",
              "flex": 1
            },
            {
              "type": "text",
              "text": "バナナ",
              "weight": "bold",
              "flex": 6
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "4",
              "flex": 1
            },
            {
              "type": "text",
              "text": "パイナップル",
              "weight": "bold",
              "flex": 6
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [{
          "type": "button",
          "style": "primary",
          "color": "#30A9DE",
          "action": {
            "type": "message",
            "label": "1",
            "text": "aaaaa"
          }
        },
        {
          "type": "button",
          "style": "primary",
          "color": "#EFDC05",
          "action": {
            "type": "message",
            "label": "2",
            "text": "aaaaa"
          }
        },
        {
          "type": "button",
          "style": "primary",
          "color": "#E53A40",
          "action": {
            "type": "message",
            "label": "3",
            "text": "aaaaa"
          }
        },
        {
          "type": "button",
          "style": "primary",
          "color": "#5CAB7D",
          "action": {
            "type": "message",
            "label": "4",
            "text": "aaaaa"
          }
        }
      ]
    }
  }
}

function customFunc(title, imageUrl, qustions, answers) {
  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": imageUrl,
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "md",
      "action": {
        "type": "uri",
        "uri": "https://linecorp.com"
      },
      "contents": [{
          "type": "text",
          "wrap": true,
          "text": title,
          "size": "md"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "1",
              "flex": 1
            },
            {
              "type": "text",
              "text": qustions[0],
              "weight": "bold",
              "flex": 6
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "2",
              "flex": 1
            },
            {
              "type": "text",
              "text": qustions[1],
              "weight": "bold",
              "flex": 6
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "3",
              "flex": 1
            },
            {
              "type": "text",
              "text": qustions[2],
              "weight": "bold",
              "flex": 6
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [{
              "type": "text",
              "text": "4",
              "flex": 1
            },
            {
              "type": "text",
              "text": qustions[3],
              "weight": "bold",
              "flex": 6
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [{
          "type": "button",
          "style": "primary",
          "color": "#30A9DE",
          "action": {
            "type": "message",
            "label": "1",
            "text": answers[0]
          }
        },
        {
          "type": "button",
          "style": "primary",
          "color": "#EFDC05",
          "action": {
            "type": "message",
            "label": "2",
            "text": answers[1]
          }
        },
        {
          "type": "button",
          "style": "primary",
          "color": "#E53A40",
          "action": {
            "type": "message",
            "label": "3",
            "text": answers[2]
          }
        },
        {
          "type": "button",
          "style": "primary",
          "color": "#5CAB7D",
          "action": {
            "type": "message",
            "label": "4",
            "text": answers[3]
          }
        }
      ]
    }
  }
}
const { text } = require("body-parser");

module.exports = [
    {
        name: "matrix",
        type: "columns",
        variables: ["type", "name"],
        data: ["value", "text"]
    },
    {
        name: "radiogroup",
        type: "choices",
        variables: ["type", "name"],
        data: ["value", "text"]
    },
    {
        name: "rating",
        variables: ["rateMax", "minRateDescription", "maxRateDescription"],
        data: ["rateMax", "minRateDescription", "maxRateDescription"]
    },
    {
        name: "multipletext",
        type: "items",
        variables: ["name"],
        data: ["name"]
    },
    {
        name: "text",
        variables: ["description"],
        data: ["description"]
    }
]
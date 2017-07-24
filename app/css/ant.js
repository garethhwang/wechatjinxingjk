import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "my-carousel": {
        "background": "#fff"
    },
    "my-carousel img": {
        "width": "100%",
        "verticalAlign": "top"
    },
    "my-carousel v-item": {
        "height": 0.72,
        "lineHeight": 0.72,
        "paddingLeft": 0.2
    },
    "my-carousel am-carousel-wrap-dot span": {
        "width": 8,
        "height": 8,
        "border": "1px solid #fff",
        "backgroundColor": "transparent",
        "opacity": 1
    },
    "my-carousel am-carousel-wrap-dot-active span": {
        "backgroundColor": "orange"
    },
    "ant-cascader-inputant-input": {
        "border": "1px solid yellow"
    }
});
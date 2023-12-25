/**
 * 高精度定位
 * @param {*} AMap
 * @param {*} map
 */
const highAccuracyGeolocation = (AMap, map) => {
    // 初始化后定位到本地(高精度定位，chrome会失败，firefox能成功)
    var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：5s
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
    });

    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    geolocation.on('complete', onComplete);
    geolocation.on('error', onError);

    function onComplete(data) {
        // data是具体的定位信息
        console.log(data);
    }

    function onError(data) {
        // 定位出错
        console.log(data);
    }
    return geolocation;
};

export default highAccuracyGeolocation;
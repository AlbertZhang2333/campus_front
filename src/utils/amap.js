import AMapLoader from '@amap/amap-jsapi-loader';

const address = 'https://webapi.amap.com/loader.js'; // 代理服务器地址

window._AMapSecurityConfig = {
    securityJsCode: '0bfaccdd80d6468c24d7fd5b9c15410c'
};

/**
 * 载入地图
 * @param {*} plugins 地图配置项
 * @returns promise
 */
const mapLoader = plugins =>
    AMapLoader.load({
        key: '444fe777cb9145d2b6b58c321374c012', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    });

// 动态创建script标签，引入代理服务器
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = address;
document.body.appendChild(script);

// 导出用来载入地图的函数
export default mapLoader;
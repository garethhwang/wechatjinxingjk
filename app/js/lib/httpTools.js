var HTTPUtil = {};

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @param params {}
 * @param headers
 * @returns {Promise}
 */
HTTPUtil.get = function(url, params, headers) {

    url = global.MyHost + url;

    if(!headers){
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status:response.status})
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err)=> {
                reject({status:-1});
            })
    })
}


/**
 * 基于 fetch 封装的 POST请求  FormData 表单数据
 * @param url
 * @param formData
 * @param headers
 * @returns {Promise}
 */
HTTPUtil.post = function(url, formData, headers) {

    url = global.MyHost + url;

    let jsonData = JSON.stringify(formData);

    if(!headers){
        headers = {
            'Accept': 'application/json',
                'Content-Type': 'application/json',
        }
    }

    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body:jsonData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status:response.status})
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err)=> {
                reject({status:-1});
            })
    })
}


/**
 * 基于 fetch 封装的 POST请求  FormData 表单数据
 * @param url
 * @param formData
 * @param headers
 * @returns {Promise}
 */
HTTPUtil.upload = function(url,fileUri,formData) {

    url = "http://be.jinxingjk.com" + url;

    //let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};

    let timestamp = Date.parse(new Date())/1000;

    let file = {uri: fileUri, type: 'multipart/form-data', name: timestamp.toString()+'test'};

    //let file = new File([fileUri], timestamp.toString()+'test');

    //alert(file.webkitRelativePath);

    //file.name = timestamp.toString()+'test';


    // formData.append("file",fileUri);
    // let formData = {
    //     "file":file
    // }

    formData = new FormData();

    formData.append("file",file);

    return new Promise(function (resolve, reject) {

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status:response.status})
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err)=> {
                reject({status:-1});
            })

    })
}

export default HTTPUtil;
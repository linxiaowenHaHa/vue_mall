export function getCode(appid, redirect_uri){  // 此处的appid为所需绑定的微信公众号上已有的字段，redirect_uri为返回页面可以自定义，也可固定某个页面，此处由于注册、登录都需要引用所以定义了不同的回调。
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code"  + "&scope=snsapi_userinfo" + "&state=STATE#wechat_redirect";
        window.location = url;
    };
export function getUnionid(code){ 
        var url = "http://后端的接口?code="+code; // 后端接口，即回到以后步骤2-4，然后返回用户基本信息。前后端分离会出现跨域问题，需要后端做好预处理
        $.ajax({
            type: 'GET',
            url: url,
            timeout:  app.timeout,
            dataType: "json",
            success: function(r) {
                app.setItem(app.localKey.userInfo,JSON.stringify(r));//缓存用户信息
                //param = JSON.parse(app.getItem(app.localKey.param));//配合本地缓存，让微信授权成功以后页面跳转到对应的页面。
                //if(param.loginBack){ 
                    //window.location = param.loginBack;
                //}
            },
            error: function(xhr, type, errorThrown) {
                $.toast(app.ajaxErrorTip);
            }
        });
    }

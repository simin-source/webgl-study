function getImage(gl,src,location,index) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = function () {
            //创建纹理对象
            const texture = gl.createTexture();
            //翻转图片Y轴
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            //开启一个纹理单元
            gl.activeTexture(gl[`TEXTURE${index}`]);//纹理编号
            //绑定纹理对象
            gl.bindTexture(gl.TEXTURE_2D, texture);//（type,texture），type有两种gl.TEXTURE_2D,gl.TEXTURE_CUBE_MAP,texture纹理对象    
            //处理放大缩小逻辑
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);//(type,pname,param)type同上，pname四种，param两种
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);//gl.TEXTURE_MIN_FILTER缩小
            //横向，纵向，平铺
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);//gl.TEXTURE_WRAP_S横向
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);//gl.TEXTURE_WRAP_T纵向
            //配置纹理图像
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);//(type,level,internalformat,format,dataType,image),internalformat和format值一致

            gl.uniform1i(location, index);//0为纹理编号
            resolve();
        }
        //1200*675
        img.src = src;
    })
}
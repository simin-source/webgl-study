function initShader(gl, vertexSource, fragmentSource) {
    //创建着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    //指定着色器源码
    gl.shaderSource(vertexShader, vertexSource);
    gl.shaderSource(fragmentShader, fragmentSource);
    //编译着色器
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) || !gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        var info1 = gl.getShaderInfoLog(vertexShader);
        var info2 = gl.getShaderInfoLog(fragmentShader);
        throw `could not compile webgl shader<br>
        vertexShader: ${info1}<br>
        fragmentShader: ${info2}
        `;
    }

    //使用着色器，创建一个程序对象
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader,);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    return program;
}
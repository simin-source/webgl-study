//平移矩阵
function getTranslateMatrix(x = 0.0, y = 0.0, z = 0.0) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x, y, z, 1.0,
    ]);
}
//缩放矩阵
function getScaleMatrix(x = 1.0, y = 1.0, z = 1.0) {
    return new Float32Array([
        x, 0.0, 0.0, 0.0,
        0.0, y, 0.0, 0.0,
        0.0, 0.0, z, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ]);
}

//绕Z轴旋转矩阵
function getRotateMatrix(deg) {
    return new Float32Array([
        Math.cos(deg), Math.sin(deg), 0.0, 0.0,
        -Math.sin(deg), Math.cos(deg), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ]);
}

//复合函数矩阵
function mixMatrix(A,B){
    const result=new Float32Array(16);
    for (let i = 0; i < 4; i++) {
        result[i]=A[i]*B[0]+A[i+4]*B[1]+A[i+8]*B[2]+A[i+12]*B[3];//列乘行
        result[i+4]=A[i]*B[4]+A[i+4]*B[5]+A[i+8]*B[6]+A[i+12]*B[7];
        result[i+8]=A[i]*B[8]+A[i+4]*B[9]+A[i+8]*B[10]+A[i+12]*B[11];
        result[i+12]=A[i]*B[12]+A[i+4]*B[13]+A[i+8]*B[14]+A[i+12]*B[15];
    }
    return result;
}
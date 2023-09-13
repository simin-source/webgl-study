
//归一函数
function normalized(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }
    const middle = Math.sqrt(sum);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] / middle;
    }
}

//叉积
function cross(a, b) {
    return new Float32Array([
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ]);
}

//点积
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

//向量差
function minus(a, b) {
    return new Float32Array([
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2],
    ]);
}

//视图矩阵
function getViewMatrix(eyex, eyey, eyez, lookAtx, lookAty, lookAtz, upx, upy, upz) {
    //视点
    const eye = new Float32Array([eyex, eyey, eyez]);
    //目标点
    const lookAt = new Float32Array([lookAtx, lookAty, lookAtz]);
    //上方向
    const up = new Float32Array([upx, upy, upz]);
    //根据观察平面创建新坐标系
    const z = minus(eye, lookAt);
    normalized(z);
    normalized(up);
    const x = cross(z, up);
    normalized(x);
    const y = cross(x, z);

    return new Float32Array([
        x[0], y[0], z[0], 0,
        x[1], y[1], z[0], 0,
        x[2], y[2], z[2], 0,
        -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
    ])
}

//正射投影矩阵
function getOrtho(l, r, t, b, f, n) {
    return new Float32Array([
        2 / (r - l), 0, 0, 0,
        0, 2 / (t - b), 0, 0,
        0, 0, -2 / (f - n), 0,
        -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1,
    ]);
}

//透视矩阵
function getPerspective(fov, aspect, far, near) {
    fov = fov * Math.PI / 180;
    return new Float32Array([
        1 / (aspect * Math.tan(fov / 2)), 0, 0, 0,
        0, 1 / (Math.tan(fov / 2)), 0, 0,
        0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near),
        0, 0, -1, 0,
    ]);
}
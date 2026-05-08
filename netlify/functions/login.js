
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ code: 405, message: '只允许 POST 请求' })
        };
    }

    let username, password;
    try {
        const body = JSON.parse(event.body);
        username = body.username;
        password = body.password;
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ code: 400, message: '请求格式错误' })
        };
    }

    if (username === 'admin' && password === '123456') {
        return {
            statusCode: 200,
            body: JSON.stringify({ code: 200, message: '登录成功' })
        };
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ code: 401, message: '账号或密码错误' })
    };
};  

const crypto = require('crypto');

function encrypt(text, key) {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

exports.handler = async (event) => {
    // 改成 false 后所有客户端将不可用
    const allowRun = true;

    // 客户端签名校验用的预期哈希（留空则不校验）
    const validHash = "";
    const token = Math.random().toString(36).substring(2, 15);

    const payload = JSON.stringify({
        allow: allowRun,
        hash: validHash,
        token: token,
        cmd: allowRun ? "continue" : "kill"
    });

    const key = "Y7k9pL2mQ8xR4wE1"; // 必须与客户端一致
    const encrypted = encrypt(payload, key);

    return {
        statusCode: 200,
        body: encrypted
    };
};

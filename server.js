const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        return res.json({ code: 200, message: '登录成功' });
    }
    return res.json({ code: 401, message: '账号或密码错误' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Running on port ' + port));

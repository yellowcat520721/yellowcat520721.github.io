// 用户数据操作函数
function getUsers() {
    return fetch('users.txt')
        .then(response => response.text())
        .then(data => {
            return data.split('\n').filter(line => line.trim() !== '');
        });
}

function saveUser(username, password) {
    return fetch('save_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });
}

// 登录功能
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const users = await getUsers();
        const validUser = users.some(user => {
            const [storedUser, storedPass] = user.split(',');
            return username === storedUser && password === storedPass;
        });

        if (validUser) {
            alert('登录成功！');
            window.location.href = 'index.html';
        } else {
            alert('用户名或密码错误');
        }
    } catch (error) {
        console.error('登录错误:', error);
        alert('登录失败，请稍后重试');
    }
});

// 注册功能
document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (password !== confirm) {
        alert('两次输入的密码不一致');
        return;
    }

    try {
        const users = await getUsers();
        const userExists = users.some(user => {
            const [storedUser] = user.split(',');
            return username === storedUser;
        });

        if (userExists) {
            alert('用户名已存在');
        } else {
            await saveUser(username, password);
            alert('注册成功！');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('注册错误:', error);
        alert('注册失败，请稍后重试');
    }
// 在注册和登录成功的地方加点小动效
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    // ... 原有逻辑 ... 
    console.log("正在尝试登录..."); 
});
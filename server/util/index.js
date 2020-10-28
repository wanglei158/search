const Administrator = require('../db/model/administrator')

const ignoreUrl = [
    '/login',
    '/user/login',
    '/goods',
    '/user/register'
]

exports.checkLoginStatus = () => {
    return async function (ctx, next) {
        const canIgnore = ignoreUrl.findIndex(item => ctx.request.url.startsWith(item)) !== -1;
        if (!canIgnore) {
            const _id = ctx.cookies.get('uid')
            let res = null;
            try {
                res = await Administrator.find({ _id })
            } catch (e) {
                res = null;
                console.log(e)
            }

            if (!_id || !res) {
                ctx.status = 460
                return ctx.body = {
                    code: -1,
                    message: '登录失效，请重新登录'
                }
            }

        }
        return next();
    };
};
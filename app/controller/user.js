/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2021-03-22 13:13:55
 */
const Controller = require('egg').Controller;
const Users = require('../model/user.js');
class UsersController extends Controller {
    //查询用户
    async getUser() {
        const { ctx } = this;
        const { pageSize = 10, page = 1 } = ctx.request.query;
        const skip = (Number(page) - 1) * Number(pageSize);
        await Users.find().skip(skip).limit(Number(pageSize)).then(doc => {
            ctx.body = {
                code: 200,
                data: doc,
                msg: '查询成功'
            }
        })

    }
    //新增用户
    async addUser() {
        const { ctx } = this;
        const { sex, name, age, province, city, area, phone, address } = ctx.request.body;
        try {
            Object.keys(ctx.request.body).forEach(item => {
                if (!ctx.request.body[item]) throw `${item}不能为空`
            })
        } catch (error) {
            ctx.body = {
                code: 400,
                msg: error,
                data: {}
            }
            return
        }
        const use = new Users({
            sex,
            name,
            age,
            province,
            city,
            area,
            phone,
            address
        })
        await use.save().then(() => {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: {}
            }
        })
    }
    //删除单个用户
    async deleteUser() {
        const { ctx } = this;
        const { _id } = ctx.request.query;
        await Users.find({ _id }).then(async () => {
            await Users.remove({ _id }).then(() => {
                ctx.body = {
                    code: 200,
                    msg: '删除成功',
                    data: {}
                }
            })
        }).catch(() => {
            ctx.body = {
                code: 400,
                msg: '没有此数据',
                data: {}
            }
        })
    }
    //更新用户信息
    async updateUser() {
        const { ctx } = this;
        const { sex, name, age, province, city, area, phone, address, _id } = ctx.request.body;
        try {
            Object.keys(ctx.request.body).forEach(item => {
                if (!ctx.request.body[item]) throw `${item}不能为空`
            })
        } catch (error) {
            ctx.body = {
                code: 400,
                msg: error,
                data: {}
            }
            return
        }
        await Users.find({ _id }).then(async () => {
            await Users.updateOne({ _id }, { $set: { sex, name, age, province, city, area, phone, address } }).then(() => {
                ctx.body = {
                    code: 200,
                    msg: '更新成功',
                    data: {}
                }
            }).catch(() => {
                ctx.body = {
                    code: 400,
                    msg: '更新失败',
                    data: {}
                }
            })
        }).catch(() => {
            ctx.body = {
                code: 400,
                msg: '没有此数据',
                data: {}
            }
        })
    }
}

module.exports = UsersController
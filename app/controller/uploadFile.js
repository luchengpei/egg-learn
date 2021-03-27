/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2021-03-27 10:10:05
 */
const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");

class UploadFileController extends Controller {
    async index() {
        const { ctx } = this;
        let file = ctx.request.files[0];
        let fileInfo = fs.readFileSync(file.filepath);
        let name = `lcp_${new Date().getTime()}_${file.filename}`;
        let target = path.join(this.config.baseDir, `app/public/imgs/${name}`);
        try {
            await fs.writeFileSync(target, fileInfo);
        } catch (error) {
            throw error;
        } finally {
            await fs.unlink(file.filepath, (err) => {
                if (err) {
                    throw err;
                }
                console.log("删除缓存文件:" + file.filepath + "成功！");
            });
        }
        ctx.body = {
            code: 200,
            msg: "上传成功",
            data: `http://127.0.0.1:8090/public/imgs/${name}`,
        };
    }
}

module.exports = UploadFileController;

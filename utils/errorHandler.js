// utils/errorHandler.js

const logger = require('./logger');

// 自定义错误处理程序
exports.handleError = (err, req, res, next) => {
    // 记录错误详细信息
    logger.error(`错误处理: ${req.method} ${req.url} - ${err.message}`);

    // 设置响应状态码
    const statusCode = err.status || 500;

    // 如果是生产环境，只返回简短的错误信息
    const message = process.env.NODE_ENV === 'production' 
        ? '服务器内部错误' 
        : err.message;

    // 发送错误响应
    res.status(statusCode).send({ error: message });
};

// 捕获未处理的 Promise 拒绝
exports.catchUnhandledRejection = () => {
    process.on('unhandledRejection', (reason, promise) => {
        logger.error('未捕获的 Promise 拒绝:', reason);
    });
};

// 捕获未处理的异常
exports.catchUncaughtException = () => {
    process.on('uncaughtException', (error) => {
        logger.error('未捕获的异常:', error);
        process.exit(1); // 退出进程以防止不稳定状态
    });
};

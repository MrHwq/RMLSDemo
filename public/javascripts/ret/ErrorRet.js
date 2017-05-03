/**
 * Created by weiqiang on 2017/5/2.
 */
class ErrorRet {
    constructor(ret = undefined) {
        if (ret != undefined) {
            this.message = ret.message;
            this.setExceptionType(ret.exception_type);
            this.setExceptionMsg(ret.exception_msg);
            this.setStackTrace(ret.stacktrace);
        }
    }

    setMessage(message) {
        this.message = message;
    }

    setExceptionType(type) {
        this.exception_type = type;
    }

    setExceptionMsg(msg) {
        this.exception_msg = msg;
    }

    setStackTrace(trace) {
        this.stacktrace = trace;
    }

    getMessage() {
        return this.message;
    }

    getExceptionType() {
        return this.exception_type;
    }

    getExceptionMsg() {
        return this.exception_msg;
    }

    setStackTrace() {
        return this.stacktrace;
    }

    toString() {
        return `message: ${this.message},
        exception_type:${this.exception_type},
        exception_msg:${this.exception_msg},
        stacktrace:${this.stacktrace}`;
    }
}

module.exports = ErrorRet;
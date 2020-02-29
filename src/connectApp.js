//const q = require("qlik-sse");
const sessionMgr = require("../lib/qlik/qlikSession");
const config = require("../config.json")

config.test.appId = '43016407-629d-4ec2-9ed9-d4b50b1f2d3f'
const connectApp = async function(config) {
    try {
        session = sessionMgr.getSession(config.test.commonHeader, config.test.appId);
        global = await session.open();
        doc = await global.openDoc(config.test.appId);

        session.close()

    } catch(e) {
        console.log(e)
    }
}

connectApp(config)
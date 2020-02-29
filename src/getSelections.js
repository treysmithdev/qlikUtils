const sessionMgr = require("../lib/qlik/qlikSession");
const config = require("../config.json")

const connectApp = async function(config) {
    try {
        console.log(config.test.commonHeader)
        session = await sessionMgr.getSession(config.test.commonHeader, config.test.appId);
        global = await session.open();
        doc = await global.openDoc(config.test.appId);

        getSelectionDef = {"qInfo": {"qType": "CurrentSelection"},"qSelectionObjectDef": {}}

        obj = await doc.createSessionObject(getSelectionDef)


        await doc.selectAssociations( { qSearchFields: ['date_num']},['43556'],0)
        await doc.selectAssociations( { qSearchFields: ['dim']},['C'],0)

        qProperties = await obj.getLayout()

        let qSelections = qProperties.qSelectionObject.qSelections
        
        for (const s of qSelections) {

            console.log(qSelections[0])
        }
        

        session.close()

    } catch(e) {
        console.log(e)
    }
}



connectApp(config)

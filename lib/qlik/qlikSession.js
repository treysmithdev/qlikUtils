const fs = require("fs")
const path = require("path")
const WebSocket = require("ws")
const enigma = require("enigma.js")
const schema = require("enigma.js/schemas/12.170.2.json")
const qcbConfig = require("../../config.json")

let _session = null
var getSession = function(commonHeader, appId = "engineData") {
  let isDesktop = commonHeader.userId == "Personal\\Me"
  const readCert = filename =>
    fs.readFileSync(path.resolve(__dirname, qcbConfig.qlikSession.certPath, filename))

  const config = {
    schema,
    url: (isDesktop ? "ws://localhost:9076/app/" : qcbConfig.qlikSession.url) + appId,
    suspendOnClose: true
  }


  let common =
    commonHeader.userId == undefined ? commonHeader.commonHeader : commonHeader

  if (isDesktop) {
    config.createSocket = url => new WebSocket(url)
  } else {
    let valueObj = {}
    common.userId.split("; ").forEach(element => {
      let arr = element.split("=")
      valueObj[arr[0]] = arr[1]
    })

    console.log(`UserDirectory=${encodeURIComponent(
      valueObj.UserDirectory
    )}; UserId=${encodeURIComponent(valueObj.UserId)}`)
    config.createSocket = url =>
      new WebSocket(url, {
        ca: [readCert("root.pem")],
        key: readCert("client_key.pem"),
        cert: readCert("client.pem"),
        // identity: "4c51e662-23d7-431e-8d82-53eae2c2551b",
        headers: {
          "X-Qlik-User": `UserDirectory=${encodeURIComponent(
            valueObj.UserDirectory
          )}; UserId=${encodeURIComponent(valueObj.UserId)}`
        }
      })
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Required for nodejs 10
  }

  let _session = enigma.create(config)
  if (qcbConfig.qlikSession.traceSocket) {
    // bind traffic events to log what is sent and received on the socket:
    _session.on("traffic:sent", data => console.log("sent:", data))
    _session.on("traffic:received", data => console.log("received:", data))
  }
  _session.on("closed", x => (_session = null))

  return _session
}

const closeSession = async function(session) {
  if (session && session.close) {
    await session.close()
    return null
  } else {
    return session
  }
}

module.exports = {
  getSession,
  closeSession
}

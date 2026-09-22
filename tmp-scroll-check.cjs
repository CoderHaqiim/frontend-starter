/*
 * TEMPORARY browser check. Drives headless Chrome over CDP, scrolls the receipt
 * view and reports which element sits on top of the sticky header.
 */
const fs = require("node:fs")

const target = process.argv[2] || "http://127.0.0.1:3000/dashboard/tmp-scroll-check"
const outFile = process.argv[3] || "tmp-scroll-before.png"
const scrollAmount = Number(process.argv[4] || 420)
const label = process.argv[5] || "baseline"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getPageTarget = async () => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:9222/json/list")
      const targets = await response.json()
      const page = targets.find((item) => item.type === "page" && item.webSocketDebuggerUrl)

      if (page) return page
    } catch (error) {
      console.log("waiting for chrome:", error.message)
    }

    await sleep(250)
  }

  throw new Error("Chrome page target was not found")
}

const main = async () => {
  const page = await getPageTarget()
  const socket = new WebSocket(page.webSocketDebuggerUrl)
  const pending = new Map()
  let messageId = 0

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data)

    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message)
      pending.delete(message.id)
    }
  })

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve)
    socket.addEventListener("error", reject)
  })

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      messageId += 1
      pending.set(messageId, resolve)
      socket.send(JSON.stringify({ id: messageId, method, params }))
    })

  const evaluate = async (expression) => {
    const response = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    const result = response.result

    if (result && result.exceptionDetails) {
      throw new Error(JSON.stringify(result.exceptionDetails))
    }

    return result && result.result ? result.result.value : undefined
  }

  await send("Page.enable")
  await send("Runtime.enable")
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1400,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await send("Page.navigate", { url: target })

  for (let attempt = 0; attempt < 160; attempt += 1) {
    await sleep(500)

    try {
      const state = await evaluate(`(() => {
        const main = document.querySelector("main")

        if (!main) return { main: false }

        return {
          main: true,
          receiptRendered: document.body.innerText.includes("RCP-0001"),
          sections: main.querySelectorAll("section").length,
        }
      })()`)

      if (state && state.receiptRendered && state.sections >= 2) break
    } catch (error) {
      console.log("waiting for page:", error.message)
    }
  }

  const result = await evaluate(`(() => {
    const main = document.querySelector("main")
    main.scrollTop = ${scrollAmount}

    const sections = main.querySelectorAll("section")
    const header = sections[0]
    const headerRect = header.getBoundingClientRect()
    const mainRect = main.getBoundingClientRect()
    const probeX = Math.round(mainRect.left + mainRect.width / 2)
    const probeY = Math.round(mainRect.top + 24)
    const topElement = document.elementFromPoint(probeX, probeY)
    const headerStyles = getComputedStyle(header)
    const paper = document.querySelector('[class*="148mm"]')
    const paperRect = paper ? paper.getBoundingClientRect() : null

    return {
      scrollTop: Math.round(main.scrollTop),
      scrollHeight: main.scrollHeight,
      clientHeight: main.clientHeight,
      mainTop: Math.round(mainRect.top),
      mainLeft: Math.round(mainRect.left),
      mainWidth: Math.round(mainRect.width),
      headerTop: Math.round(headerRect.top),
      headerHeight: Math.round(headerRect.height),
      headerBottom: Math.round(headerRect.bottom),
      headerPosition: headerStyles.position,
      headerTopCss: headerStyles.top,
      headerZIndex: headerStyles.zIndex,
      headerBackground: headerStyles.backgroundColor,
      probeX,
      probeY,
      topElementTag: topElement ? topElement.tagName : null,
      topElementText: topElement ? (topElement.textContent || "").trim().slice(0, 60) : null,
      probeInsideHeader: topElement ? header.contains(topElement) : null,
      paperTop: paperRect ? Math.round(paperRect.top) : null,
      paperBottom: paperRect ? Math.round(paperRect.bottom) : null,
    }
  })()`)

  await sleep(600)
  const shot = await send("Page.captureScreenshot", { format: "png" })
  fs.writeFileSync(outFile, Buffer.from(shot.result.data, "base64"))

  console.log("=== " + label + " ===")
  console.log(JSON.stringify(result, null, 2))
  socket.close()
}

main().catch((error) => {
  console.error("FAILED:", error.message)
  process.exit(1)
})
/* This is NOT a default hook, it requires a wrapper method to be executed
 afterChange: [
    ({doc}) => {
        createStaticHTML(doc.path + ".html")
    }
]
****************************************************/
import _ from "lodash"
import fs from "fs/promises"


const createStaticHTML = (path: string) => {
    let destination = process.env.FRONT_END_DIST_DIR

    if (!destination) {
        console.error("FRONT_END_DIST_DIR should be set in .env file")
    }

    if (destination.slice(-1) === "/")  {
        destination = destination.slice(0,-1)
    }

    if (path[0] === "/") {
        path = path.slice(1, path.length)
    }

    destination = `${destination}/${path}`
    const destArray = destination.split("/")
    let currentDestPath = "/"
    let filename = ""

    _.each(destArray, async (p,index) => {
        if (index === 0) {
            return
        }

        if (destArray.length-1 != index) {
            currentDestPath += `${p}/`
            try {
                await fs.access(currentDestPath)
            } catch {
                await fs.mkdir(currentDestPath)
            } 
        } else {
            filename = p
            try {
                fetch(`${process.env.PAYLOAD_PUBLIC_CLIENT_URI}/${path}`).then((response) => {
                    try {
                        response.text().then(async data => {
                            fs.writeFile(`${currentDestPath}${filename}`, data)
                        })
                    } catch(err) {
                        console.error(err)
                    }
                })

            } catch {
                console.error("Can't reach front-end")
            }
        }
    })
}

export { createStaticHTML }
export default createStaticHTML
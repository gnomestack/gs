import fs from "node:fs"
import path from "node:path"

const rd = path.resolve(path.join(__dirname, ".."))
const jsonPath = path.join(rd, "package.json");
const pkg = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))

console.log(pkg);

pkg.exports = {}

const files = fs.readdirSync(path.join(rd, "esm"), { withFileTypes: true })
for (const file of files) {
    console.log(file.name);
    if (file.isFile() && file.name.endsWith(".js")) {
        let key = file.name.replace(/\.js$/, "").replace(/_/g, "-")
        if (key === "index" || key === "mod") {
            key = "."
        } else {
            key = `./${key}`
        }

        const importPath = `./esm/${file.name}`
        const typePath = `./esm/${file.name.replace(/\.js$/, ".d.ts")}`
        pkg.exports[key] = {
            import: importPath,
            types: typePath
        }
    }
}

fs.writeFileSync(jsonPath, JSON.stringify(pkg, null, 4))
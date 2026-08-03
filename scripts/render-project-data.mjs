import { readFile, writeFile } from "node:fs/promises";

const source = new URL("../data/projects.json", import.meta.url);
const destination = new URL("../app/projects.generated.ts", import.meta.url);
const projects = JSON.parse(await readFile(source, "utf8"));
const output = `// 此文件由 scripts/render-project-data.mjs 生成，请编辑 data/projects.json。\nconst projects = ${JSON.stringify(projects, null, 2)};\n\nexport default projects;\n`;

await writeFile(destination, output, "utf8");

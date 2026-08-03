import { readFile, writeFile } from "node:fs/promises";

const token = process.env.VERCEL_TOKEN;
const teamId = process.env.VERCEL_TEAM_ID;
const outputPath = new URL("../data/projects.json", import.meta.url);

if (!token) {
  console.log("未设置 VERCEL_TOKEN，保留现有项目数据。");
  process.exit(0);
}

const headers = { Authorization: `Bearer ${token}` };
const teamQuery = teamId ? `&teamId=${encodeURIComponent(teamId)}` : "";
const excluded = new Set(
  (process.env.EXCLUDE_VERCEL_PROJECTS ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean),
);

async function vercel(path) {
  const response = await fetch(`https://api.vercel.com${path}`, { headers });
  if (!response.ok) {
    throw new Error(`Vercel API ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

const previous = JSON.parse(await readFile(outputPath, "utf8"));
const previousByName = new Map(previous.map((project) => [project.name, project]));
const previousByVercelProject = new Map(
  previous.filter((project) => project.vercelProject).map((project) => [project.vercelProject, project]),
);
const syncAll = process.env.SYNC_ALL_VERCEL_PROJECTS === "true";
const { projects } = await vercel(`/v9/projects?limit=100${teamQuery}`);

const cards = (
  await Promise.all(
    projects
      .filter(
        (project) =>
          !excluded.has(project.name) && (syncAll || previousByVercelProject.has(project.name)),
      )
      .map(async (project) => {
        const result = await vercel(
          `/v6/deployments?projectId=${encodeURIComponent(project.id)}&state=READY&target=production&limit=1${teamQuery}`,
        );
        const deployment = result.deployments?.[0];
        if (!deployment) return null;

        const old = previousByVercelProject.get(project.name) ?? previousByName.get(project.name);
        const alias = deployment.alias?.find((item) => item.endsWith(".vercel.app")) ?? deployment.alias?.[0];
        const repository =
          project.link?.type === "github" && project.link.org && project.link.repo
            ? `https://github.com/${project.link.org}/${project.link.repo}`
            : old?.repo;

        return {
          name: old?.name ?? project.name,
          vercelProject: project.name,
          description: old?.description ?? `部署在 Vercel 上的 ${project.name} 网页应用。`,
          url: old?.url ?? `https://${alias ?? deployment.url}`,
          ...(repository ? { repo: repository } : {}),
          tags: old?.tags ?? [project.framework ?? "Web App"],
          ...(old?.featured ? { featured: true } : {}),
          updatedAt: new Date(deployment.createdAt ?? project.updatedAt).toISOString(),
        };
      }),
  )
)
  .filter(Boolean)
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));

await writeFile(outputPath, `${JSON.stringify(cards, null, 2)}\n`, "utf8");
console.log(`已同步 ${cards.length} 个 Vercel 项目。`);

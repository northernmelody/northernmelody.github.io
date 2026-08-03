"use client";

import { useMemo, useState } from "react";
import projectData from "./projects.generated.ts";

type Project = {
  name: string;
  vercelProject?: string;
  description: string;
  url: string;
  repo?: string;
  tags: string[];
  featured?: boolean;
  updatedAt?: string;
};

const projects = projectData as Project[];

function formatDate(value?: string) {
  if (!value) return "持续更新";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function NMMark({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`nm-mark${footer ? " nm-mark-footer" : ""}`} aria-hidden="true">
      <span>N</span><span>M</span>
    </span>
  );
}

export default function Home() {
  const [activeTag, setActiveTag] = useState("全部");
  const tags = useMemo(
    () => ["全部", ...Array.from(new Set(projects.flatMap((project) => project.tags)))],
    [],
  );
  const visibleProjects =
    activeTag === "全部"
      ? projects
      : projects.filter((project) => project.tags.includes(activeTag));

  return (
    <main>
      <nav className="nav shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="返回首页">
          <NMMark />
          <span className="brand-title">NorthernMelody <em>Project</em></span>
        </a>
        <div className="nav-links">
          <a href="#projects">项目</a>
          <a href="https://github.com/northernmelody" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span />BUILDING ON THE OPEN WEB</div>
        <h1>
          把灵感做成
          <span>可打开的作品。</span>
        </h1>
        <div className="hero-bottom">
          <p>
            这里汇集了我的网页应用、实验与开源项目。
            每张卡片都通往一个正在运行的产品。
          </p>
          <a className="primary-button" href="#projects">浏览项目 <span>↓</span></a>
        </div>
        <div className="hero-window" aria-hidden="true">
          <div className="window-bar"><i /><i /><i /><span>northernmelody.github.io</span></div>
          <div className="window-body">
            <div className="signal-grid" />
            <strong>{String(projects.length).padStart(2, "0")}</strong>
            <span>LIVE PROJECTS</span>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="section-number">01</span>
              <h2>精选项目</h2>
            </div>
            <p>从小工具到完整产品，每个项目都记录了一次从想法到上线的过程。</p>
          </div>

          <div className="filters" aria-label="按技术筛选项目">
            {tags.map((tag) => (
              <button
                key={tag}
                className={activeTag === tag ? "active" : ""}
                onClick={() => setActiveTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className={`card-visual visual-${index % 3}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="visual-shape" />
                  {project.featured && <b>FEATURED</b>}
                </div>
                <div className="card-content">
                  <div className="card-meta">
                    <span>{formatDate(project.updatedAt)}</span>
                    <span className="status"><i />LIVE</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="card-actions">
                    <a href={project.url} target="_blank" rel="noreferrer">打开应用 <span>↗</span></a>
                    {project.repo && (
                      <a className="repo-link" href={project.repo} target="_blank" rel="noreferrer">源码</a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div className="footer-brand">
            <NMMark footer />
            <div className="footer-title">
              <strong>NorthernMelody Portfolio</strong>
              <span>NorthernMelody 作品集</span>
            </div>
          </div>
          <p>由 GitHub Pages 托管 · 项目状态自动同步</p>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}

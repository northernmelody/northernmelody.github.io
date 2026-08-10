import projectData from "./projects.generated";

type Project = {
  name: string;
  description: string;
  url: string;
  repo?: string;
  cover: string;
  tags: string[];
};

const projects = projectData as Project[];
const wallIndexes = [0, 1, 2, 5];

function NMMark({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`nm-mark${footer ? " nm-mark-footer" : ""}`} aria-hidden="true">
      NM
    </span>
  );
}

export default function Home() {
  return (
    <main id="top">
      <nav className="nav shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="返回首页">
          <NMMark />
          <span className="brand-title">NorthernMelody <em>Project</em></span>
        </a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span />BUILDING ON THE OPEN WEB</div>
          <h1>把灵感做成<br /><i>可以被打开的作品。</i></h1>
          <p className="hero-description">
            这里记录一些被真正做出来的想法。<br />
            关于 AI、学习、创作、文化与人的体验。
            它们可能从一个问题开始，最终变成一个可以被打开、使用和体验的产品。
          </p>
          <a className="primary-button" href="#projects">浏览项目 <span>↓</span></a>
          <div className="hero-note">Ideas <span>→</span> Prototypes <span>→</span> Products</div>
        </div>

        <div className="project-wall" aria-label="精选项目预览">
          <div className="wall-caption"><strong>06</strong><span>LIVE PROJECTS</span></div>
          {wallIndexes.map((projectIndex, index) => {
            const project = projects[projectIndex];
            return (
              <a
                className={`wall-card wall-card-${index}`}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                key={project.name}
              >
                <img src={project.cover} alt={`${project.name} 项目封面`} />
                <span>{project.name.split(" · ")[0]}</span>
              </a>
            );
          })}
          <span className="wall-arrow" aria-hidden="true">↘</span>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="shell">
          <div className="section-heading">
            <div className="section-kicker"><span>01</span><p>SELECTED WORK</p></div>
            <p className="section-intro">从小工具到完整产品，每个项目都记录了一次从想法到上线的过程。</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.name}>
                <a className="card-visual" href={project.url} target="_blank" rel="noreferrer">
                  <img src={project.cover} alt={`${project.name} 项目封面`} loading="lazy" />
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                </a>
                <div className="card-content">
                  <div className="card-category">{project.tags.slice(0, 2).join(" · ").toUpperCase()}</div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="card-actions">
                    <a href={project.url} target="_blank" rel="noreferrer">Live Product <span>↗</span></a>
                    {project.repo && <a className="repo-link" href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="shell about-grid">
          <div>
            <div className="section-kicker"><span>02</span><p>ABOUT THIS LAB</p></div>
            <h2>Ideas should<br /><i>become things.</i></h2>
          </div>
          <div className="about-copy">
            <p>这里记录的并不是完整商业产品，而是一些值得被做出来的想法。</p>
            <p>关于 AI、学习、创作、文化以及人的体验。有些只是实验，有些会继续长大。</p>
            <div className="about-route">Explore <span>→</span> Build <span>→</span> Ship <span>→</span> Learn</div>
          </div>
          <div className="stats" aria-label="作品集统计">
            <div><strong>06</strong><span>LIVE PRODUCTS</span></div>
            <div><strong>2026</strong><span>STARTED</span></div>
            <div><strong>∞</strong><span>IDEAS TO BUILD</span></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div className="footer-brand">
            <NMMark footer />
            <div className="footer-title"><strong>NorthernMelody Project</strong><span>NorthernMelody 作品集</span></div>
          </div>
          <p>Built with curiosity.</p>
        </div>
      </footer>
    </main>
  );
}

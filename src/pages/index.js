import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import SearchBar from "@theme/SearchBar";
import styles from "./index.module.css";

/**
 * Les sections reprennent le code couleur que l'agence utilise déjà pour
 * catégoriser ses prestations dans le Devis Creator.
 * `restricted` masque la carte pour les stagiaires et les comptes en attente,
 * en cohérence avec static/auth.js (voir .no-privileged-access).
 */
const SECTIONS = [
  {
    id: "rh",
    name: "RH",
    tagline: "Ton arrivée, tes outils, tes démarches.",
    to: "/rh",
    links: [
      { label: "Starter pack", to: "/rh/category/starter-pack" },
      { label: "Directives", to: "/rh/directives" },
      { label: "Séances", to: "/rh/seance" },
    ],
  },
  {
    id: "digital",
    name: "Digital & Web",
    tagline: "Tracking, sites web, migrations, campagnes.",
    to: "/digital",
    restricted: true,
    links: [
      { label: "Tracking", to: "/digital/category/-tracking" },
      { label: "Sites web BBS", to: "/digital/category/-sites-web-bbs" },
      { label: "Migration WordPress", to: "/digital/category/-migration-site-wordpress" },
      { label: "Campagnes Meta", to: "/digital/category/-campagnes-meta" },
    ],
  },
  {
    id: "monday",
    name: "Monday 2.0",
    tagline: "Du premier lead au projet livré.",
    to: "/monday",
    restricted: true,
    links: [
      { label: "CRM, du lead au devis", to: "/monday/crm" },
      { label: "Projets, du devis à la livraison", to: "/monday/work-management" },
      { label: "Référence technique", to: "/monday/reference/boards-et-colonnes" },
    ],
  },
];

function SectionCard({ section }) {
  return (
    <article
      className={styles.card}
      data-section={section.id}
      data-restricted={section.restricted ? "true" : undefined}
    >
      <Heading as="h2" className={styles.cardTitle}>
        <Link to={section.to} className={styles.cardTitleLink}>
          {section.name}
        </Link>
      </Heading>
      <p className={styles.cardTagline}>{section.tagline}</p>
      <ul className={styles.cardLinks}>
        {section.links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={styles.cardLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Home() {
  return (
    <Layout
      title="Accueil"
      description="La documentation interne de l'agence BB® Switzerland : RH, Digital & Web, Monday."
    >
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>BB® Switzerland</p>
          <h1 className={styles.heroTitle}>
            La doc
            <br />
            de l'agence
          </h1>
          <p className={styles.heroLead}>
            Les process, les outils et les réponses, au même endroit.
          </p>
          <div className={styles.heroSearch}>
            <SearchBar />
          </div>
          <div className={styles.spectrum} aria-hidden="true">
            {SECTIONS.map((section) => (
              <span key={section.id} data-section={section.id} />
            ))}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {SECTIONS.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

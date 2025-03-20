import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import {
  BookOpen,
  Users,
  ArrowRight,
  Globe,
  Megaphone,
  BarChart3,
  FileCode,
} from "lucide-react";
import SearchBar from "@theme/SearchBar";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // si pas déjà importé ailleurs

// Custom feature component for the homepage
function FeatureCard({ title, description, icon, to }) {
  return (
    <div className="h-full" data-aos="fade-up" data-aos-duration="800">
      <div className="card padding--lg height-full">
        <div className={clsx(styles.featureIcon, "icon-feature")}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <div className={styles.cardFooter}>
          <Link className="button button--primary button--md" to={to}>
            Accéder <ArrowRight className={styles.buttonIcon} size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container"  data-aos="fade-in" data-aos-duration="800">
        <Heading as="h1" className="hero__title">
          Documentation Interne
        </Heading>
        <p className="hero__subtitle">
          Ressources, guides et processus pour l'équipe de l'agence BB.
        </p>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg btn-intro hidden"
            to="/docs"
          >
            Commencer ici
          </Link>
        </div> */}
        <div className="searchbar-header">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Layout
      title={`Accueil`}
      description="Documentation interne pour les processus, guides et ressources de l'agence"
    >
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="my-grid">
              <FeatureCard
                title="Processus Internes"
                description="Découvrez les processus et méthodologies utilisés au sein de l'agence pour assurer une qualité constante."
                icon={<BookOpen size={24} />}
                to="/onboarding"
              />
              <FeatureCard
                title="Informations RH"
                description="Guide d'accueil pour les nouveaux collaborateurs, informations pratiques et politiques RH."
                icon={<Users size={24} />}
                to="/rh"
              />
              <FeatureCard
                title="Gestion de Contenu"
                description="Procédures pour l'alimentation et la mise à jour du contenu du site internet de l'agence."
                icon={<Globe size={24} />}
                to="/digital/category/-sites-web-bbs"
              />
              <FeatureCard
                title="Migration de Sites Web"
                description="Guides et bonnes pratiques pour la migration de sites web pour nos clients."
                icon={<FileCode size={24} />}
                to="/digital/category/-migration-site-wordpress"
              />
              <FeatureCard
                title="Guide de Tracking"
                description="Instructions détaillées pour l'implémentation et la gestion du tracking sur les sites web."
                icon={<BarChart3 size={24} />}
                to="/digital/category/-tracking"
              />
              <FeatureCard
                title="Campagnes Meta"
                description="Guide pour la création et la gestion des campagnes Meta pour les clients de l'agence."
                icon={<Megaphone size={24} />}
                to="/digital/category/-campagnes-meta"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import React from 'react';
import PageShell from '../../components/Layout/PageShell';
import { Helmet } from 'react-helmet-async';

const Portfolio = () => {
    return (
        <>
            <Helmet>
                <title>Casos de Éxito - Latul Studio</title>
                <meta name="description" content="Explora nuestros casos de éxito y proyectos destacados." />
            </Helmet>
            <PageShell title="Casos de Éxito">
                <p>Portfolio.</p>
            </PageShell>
        </>
    );
};

export default Portfolio;

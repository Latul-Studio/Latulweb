import React from 'react';
import PageShell from '../../components/Layout/PageShell';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <>
            <Helmet>
                <title>Nosotros - Latul Studio</title>
                <meta name="description" content="Historia y Visión de Latul Studio." />
            </Helmet>
            <PageShell title="Nosotros">
                <p>Historia y Visión.</p>
            </PageShell>
        </>
    );
};

export default About;

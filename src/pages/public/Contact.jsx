import React from 'react';
import PageShell from '../../components/Layout/PageShell';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Contacto - Latul Studio</title>
                <meta name="description" content="Contacta con Latul Studio para transformar tu negocio." />
            </Helmet>
            <PageShell title="Contacto">
                <p>Formulario cualificado.</p>
            </PageShell>
        </>
    );
};

export default Contact;

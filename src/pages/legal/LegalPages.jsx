import React from 'react';
import PageShell from '../../components/Layout/PageShell';
import { Helmet } from 'react-helmet-async';

export const Privacy = () => (
    <>
        <Helmet><title>Política de Privacidad - Latul Studio</title></Helmet>
        <PageShell title="Política de Privacidad"><p>Texto legal de privacidad.</p></PageShell>
    </>
);

export const LegalWarning = () => (
    <>
        <Helmet><title>Aviso Legal - Latul Studio</title></Helmet>
        <PageShell title="Aviso Legal"><p>Texto de aviso legal.</p></PageShell>
    </>
);

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sodu.pe'

  // Agregar las rutas que se deben indexar y que no deben ser excluidas
  const routes = [
    '',
    '/activities',
    '/cineforum',
    '/convocatoria',
    '/directiva',
    '/lectura',
    '/sociedad',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}

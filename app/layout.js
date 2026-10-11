import './globals.css'

export const metadata = {
  title: 'Chef Cero Residuos',
  description: 'Aplicación de cocina sostenible y aprovechamiento de alimentos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-emerald-50/30 text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}

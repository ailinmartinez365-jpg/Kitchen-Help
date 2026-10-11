'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import recetasData from '../data/recetas.json'
import { Heart, Clock, BarChart, BookOpen } from 'lucide-react'

export default function HomeApp() {
  const [tabActiva, setTabActiva] = useState('menu')
  const [favoritos, setFavoritos] = useState([])
  const [recetaModal, setRecetaModal] = useState(null)

  useEffect(() => {
    async function cargarFavoritos() {
      const { data } = await supabase.from('favoritos').select('receta_nombre')
      if (data) {
        setFavoritos(data.map(item => item.receta_nombre))
      }
    }
    cargarFavoritos()
  }, [])

  const toggleFavorito = async (nombreReceta) => {
    if (favoritos.includes(nombreReceta)) {
      setFavoritos(favoritos.filter(f => f !== nombreReceta))
      await supabase.from('favoritos').delete().eq('receta_nombre', nombreReceta)
    } else {
      setFavoritos([...favoritos, nombreReceta])
      await supabase.from('favoritos').insert([{ receta_nombre: nombreReceta }])
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF8EA] text-[#4A2920] p-4 md:p-8 font-sans">
      <div className="w-full h-40 md:h-72 bg-cover bg-center rounded-2xl shadow-lg mb-6 flex items-center justify-center relative overflow-hidden bg-[#C65332]">
        <h1 className="relative text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">Chef Cero Residuos</h1>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-[#F4C95D] pb-4">
        {[
          { id: 'menu', label: '📖 Menú', icon: BookOpen },
          { id: 'favoritos', label: `❤️ Favoritos (${favoritos.length})`, icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                tabActiva === tab.id
                  ? 'bg-[#C65332] text-[#FFF8EA] shadow-md scale-105'
                  : 'bg-white text-[#4A2920] border border-[#F4C95D]'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabActiva === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recetasData.map((receta, idx) => {
            const esFav = favoritos.includes(receta.nombre)
            return (
              <div key={idx} className="bg-white border-2 border-[#F4C95D] rounded-2xl p-4 shadow-md flex flex-col justify-between">
                <div>
                  <img src={receta.imagen} alt={receta.nombre} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <h3 className="text-xl font-bold text-[#4A2920] mb-1">{receta.nombre}</h3>
                  <p className="text-sm text-stone-500 mb-4 flex items-center gap-2">
                    <Clock size={14} /> {receta.tiempo} min | <BarChart size={14} /> {receta.nivel}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => setRecetaModal(receta)}
                    className="flex-1 bg-[#C65332] text-white py-2 rounded-xl font-semibold hover:bg-[#F4C95D] hover:text-[#4A2920] transition-colors"
                  >
                    Ver receta
                  </button>
                  <button 
                    onClick={() => toggleFavorito(receta.nombre)}
                    className={`p-2 rounded-xl border-2 border-[#C65332] transition-colors ${
                      esFav ? 'bg-[#C65332] text-white' : 'bg-white text-[#C65332]'
                    }`}
                  >
                    <Heart size={20} fill={esFav ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tabActiva === 'favoritos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recetasData.filter(r => favoritos.includes(r.nombre)).map((receta, idx) => (
            <div key={idx} className="bg-white border-2 border-[#F4C95D] rounded-2xl p-4 shadow-md">
              <img src={receta.imagen} alt={receta.nombre} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold mb-2">{receta.nombre}</h3>
              <button 
                onClick={() => toggleFavorito(receta.nombre)}
                className="w-full bg-red-500 text-white py-2 rounded-xl font-semibold mt-2"
              >
                Quitar de Favoritos ❤️
              </button>
            </div>
          ))}
          {favoritos.length === 0 && (
            <p className="text-stone-500 col-span-full text-center py-10">Aún no tienes recetas favoritas guardadas.</p>
          )}
        </div>
      )}

      {recetaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FFF8EA] border-4 border-[#F4C95D] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button 
              onClick={() => setRecetaModal(null)}
              className="absolute top-4 right-4 text-xl font-bold bg-[#C65332] text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2">{recetaModal.nombre}</h2>
            <p className="text-sm text-stone-600 mb-4">{recetaModal.descripcion}</p>
            
            <h4 className="font-bold text-lg mb-2 text-[#C65332]">🛒 Ingredientes:</h4>
            <ul className="list-disc pl-5 mb-4">
              {recetaModal.ingredientes.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>

            <h4 className="font-bold text-lg mb-2 text-[#C65332]">👩‍🍳 Instrucciones:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              {recetaModal.instrucciones.map((paso, i) => <li key={i}>{paso}</li>)}
            </ol>
          </div>
        </div>
      )}
    </main>
  )
}

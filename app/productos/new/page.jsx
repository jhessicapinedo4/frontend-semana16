'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createMedicamento, getTipos } from '@/lib/api';

export default function NuevoMedicamento() {
  const router = useRouter();
  const [tipos, setTipos] = useState([]);
  
  // Estado inicial con los campos del diagrama
  const [form, setForm] = useState({
    descripcionMed: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    stock: '',
    precioVentaUni: '',
    Marca: '',
    CodTipoMed: '' // FK
  });

  useEffect(() => {
    getTipos().then(setTipos);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMedicamento(form);
    router.push('/productos'); // Redirigir a la lista
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrar Medicamento</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        <input name="descripcionMed" placeholder="Descripción (Nombre)" onChange={handleChange} className="border p-2 rounded" required />
        
        <label className="text-sm text-gray-600">Fecha Fabricación:</label>
        <input name="fechaFabricacion" type="date" onChange={handleChange} className="border p-2 rounded" />

        <label className="text-sm text-gray-600">Fecha Vencimiento:</label>
        <input name="fechaVencimiento" type="date" onChange={handleChange} className="border p-2 rounded" />

        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="border p-2 rounded" required />
        
        <input name="precioVentaUni" type="number" step="0.01" placeholder="Precio Unitario" onChange={handleChange} className="border p-2 rounded" required />
        
        <input name="Marca" placeholder="Marca" onChange={handleChange} className="border p-2 rounded" />

        {/* Selección de la Tabla Relacionada */}
        <select name="CodTipoMed" onChange={handleChange} className="border p-2 rounded bg-black" required>
          <option value="">Seleccione Tipo de Medicamento</option>
          {tipos.map((t) => (
            <option key={t.CodTipoMed} value={t.CodTipoMed}>
              {t.descripcion}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}
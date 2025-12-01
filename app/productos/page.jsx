'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMedicamentos } from '@/lib/api';

export default function ListaMedicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getMedicamentos().then(setMedicamentos);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Farmacia: Lista de Medicamentos</h1>

      <button
        onClick={() => router.push('/productos/new')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Nuevo Medicamento
      </button>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-900">
          <tr>
            <th className="border p-2">Código</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Precio Venta</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Marca</th>
            <th className="border p-2">Tipo (Relación)</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.CodMedicamento} className="text-center hover:bg-gray-50">
              <td className="border p-2">{med.CodMedicamento}</td>
              <td className="border p-2">{med.descripcionMed}</td>
              <td className="border p-2">S/ {med.precioVentaUni}</td>
              <td className="border p-2">{med.stock}</td>
              <td className="border p-2">{med.Marca}</td>
              {/* Aquí accedemos a la tabla relacionada TipoMedic */}
              <td className="border p-2">
                {med.TipoMedic ? med.TipoMedic.descripcion : 'Sin Tipo'}
              </td>
              <td className="border p-2 ">
           
                <button
                  onClick={() => router.push(`/productos/edit/${med.CodMedicamento}`)}
                  className="bg-yellow-600 text-white px-2 py-1 mr-2.5 rounded hover:bg-yellow-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => router.push(`/productos/delete/${med.CodMedicamento}`)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
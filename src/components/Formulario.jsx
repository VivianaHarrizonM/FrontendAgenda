import { useState, useEffect } from "react"
import { Alerta } from "./Alerta"
import { usePacientes } from "../hooks/usePacientes"

export const Formulario = () => {

  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({})

  const { guardarPaciente, paciente } = usePacientes()

  useEffect(() => {
    if(paciente?.nombre) {
      setNombre(paciente.nombre)
      setTipo(paciente.tipo)
      setEmail(paciente.email)
      setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'))
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  }, [paciente])
  

  const handleSubmit = e => {
    e.preventDefault()

    // Validar el formulario
    if([nombre, tipo, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    guardarPaciente({nombre, tipo, email, fecha, sintomas, id})
    setAlerta({
      msg: 'Guardado correctamente'
    })

    setNombre('')
    setTipo('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
  }

  const {msg} = alerta

  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y  {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
          >Nombre Paciente</label>
          <input 
            type="text"
            id="nombre"
            placeholder="Nombre del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="tipo"
            className="text-gray-700 uppercase font-bold"
          >Tipo</label>
          <input 
            type="text"
            id="tipo"
            placeholder="Tipo del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >Email del Paciente</label>
          <input 
            type="email"
            id="email"
            placeholder="Email del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
       
        <div className="mb-5">
          <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >Fecha Cita:</label>
          <input 
            type="date"
            id="fecha"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>
        
        <div className="mb-5">
          <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Sintomas: </label>
          <textarea 
              id="fecha"
              placeholder="Describe los sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
              value={sintomas}
              onChange={e => setSintomas(e.target.value)}
          />

          <input 
            type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
          />
        </div>
      </form>

      {msg && <Alerta alerta={alerta} />}
    </>
  )
}

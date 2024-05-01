import { useState } from "react";

const Form29 = () => {
  const [userSII, setUserSII] = useState("");
  return (
    <form>
      <section className="form-field">
        <label className="label-field">RUT para SII</label>
        <input
          className="input-field"
          placeholder="18321543-2"
          name="SII User"
          type="text"
        />
      </section>
      <section className="form-field">
        <label className="label-field">Clave para SII</label>
        <input
          className="input-field"
          placeholder=""
          name="password"
          type="password"
        />
      </section>
      <section className="form-field">
        <label className="label-field">Año de formulario</label>
        <input
          className="input-field"
          placeholder="2024"
          name="Año"
          type="date"
        />
      </section>
      <section className="form-field">
        <label className="label-field">Mes de formulario</label>
        <input
          className="input-field"
          placeholder="Marzo"
          name="Mes"
          type="date"
        />
      </section>
      <section>
        <button className="btn w-full">Generar</button>
      </section>
    </form>
  );
};

export default Form29;

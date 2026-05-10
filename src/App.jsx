import { useEffect, useState } from "react";

export default function App() {
  const numbers = Array.from({ length: 100 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const [reservedNumbers, setReservedNumbers] = useState([]);

  const availableNumbers = 100 - reservedNumbers.length;

  const bikeImages = [
    "/images/Bici1.jpeg",
    "/images/Bici2.jpeg",
    "/images/Bici3.jpeg",
    "/images/Bici4.jpeg",
    "/images/Bici5.jpeg",
    "/images/Bici6.jpeg",
    "/images/Bici7.jpeg",
    "/images/Bici8.jpeg",
    "/images/Bici9.jpeg",
    "/images/Bici10.jpeg"
  ];

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [ticketOption, setTicketOption] = useState("1");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbK-VG5lATbDEwZybKYRkJUNgtHFMravrhZAribxZQ48cEjKx7Ej7XgBAvgZLwpgxtlOzGaQ0T5yFL/pub?gid=0&single=true&output=csv"
    )
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split("\n").slice(1);
  
        const formatted = lines
          .map((line) => {
            const [numero, estado] = line.split(",");
  
            return {
              numero: numero?.trim(),
              estado: estado?.trim(),
            };
          })
          .filter((item) => item.numero);
  
        setReservedNumbers(formatted);
      });
  }, []);

  const maxSelections = ticketOption === "1" ? 1 : 2;

  const toggleNumber = (number) => {
    const reserved = reservedNumbers.find(
      (item) => item.numero === number
    );
    
    if (reserved) return;

    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
      return;
    }

    if (selectedNumbers.length >= maxSelections) return;

    setSelectedNumbers([...selectedNumbers, number]);
  };

  const totalPrice = ticketOption === "1" ? "$10.000" : "$18.000";

  const handleWhatsApp = () => {
    if (selectedNumbers.length < maxSelections) {
      alert(`Debes seleccionar ${maxSelections} número(s).`);
      return;
    }

    const message = encodeURIComponent(
      `🌸 RIFA DÍA DE LA MADRE 🌸
    
    Hola, quiero confirmar los números:
    
    🎟 ${selectedNumbers.join(", ")}
    
    💰 Total: ${totalPrice}
    
    Ya realicé el pago y adjuntaré el comprobante.`
    );

    window.open(
      `https://wa.me/573216336337?text=${message}`,
      "_blank"
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#fdf8f6] p-6">
        <div className="max-w-6xl mx-auto">

          <div className="overflow-x-auto pb-4 mb-8">
            <div className="flex gap-4 w-max px-2">
              {bikeImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Bicicleta"
                  className="w-[350px] h-[320px] object-cover rounded-3xl shadow-md border border-pink-100"
                />
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-5xl font-serif text-[#4a2c21]">
              🌸 Rifa Mes de la Madre
            </h1>

            <p className="text-pink-500 text-xl mt-3">
              Participa por esta hermosa bicicleta femenina con canasta
            </p>

            <div className="mt-6 bg-white border border-pink-100 rounded-3xl p-6 shadow-sm max-w-4xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-[#4a2c21] mb-4">
                ¿Cómo participar?
              </h2>

              <div className="space-y-3 text-[#4a2c21]">
                <p>1️⃣ Elige la cantidad de números que deseas.</p>
                <p>2️⃣ Selecciona tus números favoritos.</p>
                <p>3️⃣ Presiona “Confirmar números”.</p>
                <p>4️⃣ Realiza el pago mediante QR Bancolombia.</p>
                <p>5️⃣ Envía tu comprobante por WhatsApp.</p>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-pink-50 rounded-2xl p-4">
                  <p className="font-semibold text-[#4a2c21]">🎟 1 número</p>
                  <p className="text-pink-500 text-2xl font-bold">$10.000</p>
                </div>

                <div className="bg-pink-50 rounded-2xl p-4">
                  <p className="font-semibold text-[#4a2c21]">🎟🎟 2 números</p>
                  <p className="text-pink-500 text-2xl font-bold">$18.000</p>
                </div>

                <div className="bg-pink-50 rounded-2xl p-4">
                  <p className="font-semibold text-[#4a2c21]">📅 Sorteo esperado</p>
                  <p className="text-pink-500 text-2xl font-bold">24 Mayo 2026</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-5">
                *La fecha puede ajustarse en caso de no completarse los números disponibles.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 border border-pink-100">

          <p className="text-center text-[#4a2c21] font-semibold text-lg mb-4">
            Escoge una opción
          </p>

            <div className="flex justify-center gap-4 mb-4 flex-wrap">

              <button
                onClick={() => {
                  setTicketOption("1");
                  setSelectedNumbers([]);
                }}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  ticketOption === "1"
                    ? "bg-pink-500 text-white"
                    : "bg-pink-100 text-[#4a2c21]"
                }`}
              >
                1 número — $10.000
              </button>

              <button
                onClick={() => {
                  setTicketOption("2");
                  setSelectedNumbers([]);
                }}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  ticketOption === "2"
                    ? "bg-pink-500 text-white"
                    : "bg-pink-100 text-[#4a2c21]"
                }`}
              >
                2 números — $18.000
              </button>
            </div>

            <p className="text-center text-gray-500 mb-8">
              Selecciona {maxSelections} número(s) para continuar.
            </p>
            <p className="text-center text-pink-500 font-semibold mt-2">
              {availableNumbers} números disponibles
            </p>


            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">

              {numbers.map((number) => {
                const reserved = reservedNumbers.find(
                  (item) => item.numero === number
                );
                const selected = selectedNumbers.includes(number);

                return (
                  <button
                    key={number}
                    onClick={() => toggleNumber(number)}
                    className={`
                      h-14 rounded-2xl font-bold transition-all
                      ${
                        reserved
                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : selected
                          ? "bg-pink-500 text-white scale-105"
                          : "bg-pink-100 hover:bg-pink-200 text-[#4a2c21]"
                      }
                    `}
                  >
                    {number}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">

              <p className="text-lg text-[#4a2c21] mb-4">
                Números seleccionados:
              </p>

              <div className="flex justify-center gap-3 flex-wrap mb-6">
                {selectedNumbers.map((number) => (
                  <div
                    key={number}
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl font-bold"
                  >
                    {number}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="bg-[#4a2c21] hover:bg-[#2f1a13] text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"
              >
                Confirmar números
              </button>

              <p className="text-sm text-gray-500 mt-5">
                Los números serán confirmados una vez validado el pago.
              </p>

            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-[#4a2c21] text-center mb-6">
              Confirmar números 🌸
            </h2>

            <div className="space-y-4 text-center">
              <div>
                <p className="text-gray-500">Números seleccionados</p>
                <div className="flex justify-center gap-2 mt-3 flex-wrap">
                  {selectedNumbers.map((number) => (
                    <div
                      key={number}
                      className="bg-pink-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                      {number}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pink-50 rounded-2xl p-4">
                <p className="text-gray-500">Total a pagar</p>
                <p className="text-3xl font-bold text-pink-500">
                  {totalPrice}
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#4a2c21] mb-3">
                  Escanea el QR Bancolombia
                </p>

                <img
                 src="/images/qr-bancolombia.jpeg"
                  alt="QR Bancolombia"
                 className="w-52 h-52 rounded-2xl mx-auto object-cover"
                />

                <p className="text-sm text-gray-500 mt-3">
                  Envía el comprobante al WhatsApp:
                </p>

                <p className="text-xl font-bold text-pink-500 mt-1">
                  321 633 6337
                </p>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                  Cuenta de ahorros Bancolombia
                 </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText("91257872381");
                    alert("Número de cuenta copiado");
                  }}
                  className="mt-2 bg-pink-100 hover:bg-pink-200 text-[#4a2c21] px-4 py-2 rounded-xl font-semibold transition"
                >
                  📋 Copiar cuenta: 912-578723-81
                </button>
              </div>



              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-2xl font-semibold"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-2xl font-semibold"
                >
                  Enviar WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

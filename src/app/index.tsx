import { useState } from "react";

export default function Index() {
  const [area, setArea] = useState("");
  const [department, setDepartment] = useState("");
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // DATE AUTOMATIQUE
  // =========================

  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // =========================
  // CALCUL DE LA DURÉE
  // =========================

  const calculateHours = () => {
    if (!start || !end) {
      return "0.00";
    }

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    let startMinutes = sh * 60 + sm;
    let endMinutes = eh * 60 + em;

    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }

    return ((endMinutes - startMinutes) / 60).toFixed(2);
  };

  const targetHours = calculateHours();

  // =========================
  // ENREGISTREMENT
  // =========================

  const handleSubmit = async () => {
    setMessage("");

    if (
      !area.trim() ||
      !department.trim() ||
      !equipment.trim() ||
      !description.trim() ||
      !reason.trim() ||
      !start ||
      !end
    ) {
      setMessage("⚠️ Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/declarations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            area: area.trim(),
            department: department.trim(),
            equipment: equipment.trim(),
            description: description.trim(),
            reason: reason.trim(),
            start,
            end,
            targetHours: Number(targetHours),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("✓ Déclaration enregistrée avec succès.");

        setArea("");
        setDepartment("");
        setEquipment("");
        setDescription("");
        setReason("");
        setStart("");
        setEnd("");
      } else {
        setMessage(
          "❌ " +
            (data.message || "Erreur lors de l'enregistrement.")
        );
      }
    } catch (error) {
      console.error(error);

      setMessage("❌ Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // STYLES
  // =========================

  const inputStyle = {
    width: "100%",
    height: "48px",
    padding: "0 15px",
    border: "1px solid #dbe3ec",
    borderRadius: "10px",
    backgroundColor: "#f8fafc",
    color: "#172033",
    fontSize: "15px",
    boxSizing: "border-box" as const,
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    color: "#263449",
    fontWeight: "600",
    fontSize: "14px",
  };

  const fieldStyle = {
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef4ff 0%, #f8fafc 50%, #eef2f7 100%)",
        boxSizing: "border-box",
        overflowY: "auto",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* =========================
          NOVA TOP BAR
      ========================= */}

      <div
        style={{
          height: "64px",
          width: "100%",
          paddingLeft: "24px",
          paddingRight: "145px",
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          background:
            "linear-gradient(90deg, #061735 0%, #082552 55%, #0A2E68 100%)",
          color: "#ffffff",
          userSelect: "none",
          boxShadow: "0 3px 15px rgba(0, 0, 0, 0.18)",
        }}
      >
        {/* LOGO */}

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #1764E8, #0B3B9E)",
            color: "#FFFFFF",
            fontSize: "25px",
            fontWeight: "900",
            marginRight: "12px",
            boxShadow:
              "0 5px 18px rgba(0, 92, 255, 0.35)",
            border:
              "1px solid rgba(255,255,255,0.20)",
          }}
        >
          N
        </div>

        {/* NOVA */}

        <div
          style={{
            fontSize: "21px",
            fontWeight: "800",
            letterSpacing: "2px",
            color: "#FFFFFF",
          }}
        >
          NOVA
        </div>

        {/* SEPARATOR */}

        <div
          style={{
            height: "28px",
            width: "1px",
            backgroundColor:
              "rgba(255,255,255,0.20)",
            marginLeft: "16px",
            marginRight: "14px",
          }}
        />

        {/* DESCRIPTION */}

        <div
          style={{
            color: "#AFC4E8",
            fontSize: "12px",
          }}
        >
          Gestion des interruptions
        </div>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          padding: "40px 25px",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, #263b80, #3f5fc4)",
              color: "#ffffff",
              fontSize: "25px",
              fontWeight: "800",
              marginBottom: "14px",
              boxShadow:
                "0 10px 25px rgba(38,59,128,0.25)",
            }}
          >
            N
          </div>

          <h1
            style={{
              margin: "0",
              color: "#172033",
              fontSize: "32px",
              fontWeight: "800",
              letterSpacing: "1px",
            }}
          >
            NOVA
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#718096",
              fontSize: "15px",
            }}
          >
            Déclaration d'interruption de service
          </p>
        </div>

        {/* FORM CARD */}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "35px",
            boxShadow:
              "0 15px 45px rgba(35, 52, 80, 0.10)",
            border: "1px solid #e7edf5",
          }}
        >
          {/* SECTION INFORMATIONS */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "25px",
                borderRadius: "5px",
                backgroundColor: "#3f5fc4",
              }}
            />

            <h2
              style={{
                margin: 0,
                color: "#172033",
                fontSize: "20px",
              }}
            >
              Informations de l'interruption
            </h2>
          </div>

          {/* DATE */}

          <div style={fieldStyle}>
            <label style={labelStyle}>Date</label>

            <input
              type="text"
              value={date}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#f1f5f9",
                color: "#64748b",
              }}
            />
          </div>

          {/* HEURES */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>
                Heure de début
              </label>

              <input
                type="time"
                value={start}
                onChange={(e) =>
                  setStart(e.target.value)
                }
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Heure de fin
              </label>

              <input
                type="time"
                value={end}
                onChange={(e) =>
                  setEnd(e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>

          {/* DURÉE */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Durée calculée automatiquement
            </label>

            <div
              style={{
                height: "48px",
                display: "flex",
                alignItems: "center",
                padding: "0 15px",
                borderRadius: "10px",
                backgroundColor: "#edf2ff",
                border: "1px solid #d9e2ff",
                color: "#304da0",
                fontSize: "16px",
                fontWeight: "700",
                boxSizing: "border-box",
              }}
            >
              {targetHours} heure(s)
            </div>
          </div>

          {/* SECTION SERVICE */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "25px",
                borderRadius: "5px",
                backgroundColor: "#3f5fc4",
              }}
            />

            <h2
              style={{
                margin: 0,
                color: "#172033",
                fontSize: "20px",
              }}
            >
              Informations du service
            </h2>
          </div>

          {/* AREA */}

          <div style={fieldStyle}>
            <label style={labelStyle}>Area</label>

            <input
              type="text"
              placeholder="Entrer l'area"
              value={area}
              onChange={(e) =>
                setArea(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* DEPARTMENT */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Department
            </label>

            <input
              type="text"
              placeholder="Entrer le département"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* EQUIPEMENT */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Équipement
            </label>

            <input
              type="text"
              placeholder="Entrer l'équipement"
              value={equipment}
              onChange={(e) =>
                setEquipment(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* DESCRIPTION */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Description
            </label>

            <textarea
              placeholder="Décrire l'interruption..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={4}
              style={{
                ...inputStyle,
                height: "105px",
                padding: "13px 15px",
                resize: "vertical",
              }}
            />
          </div>

          {/* REASON */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Reason
            </label>

            <input
              type="text"
              placeholder="Entrer la raison de l'interruption"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* MESSAGE */}

          {message && (
            <div
              style={{
                padding: "13px 15px",
                marginBottom: "20px",
                borderRadius: "10px",
                backgroundColor:
                  message.startsWith("✓")
                    ? "#ecfdf5"
                    : "#fff1f2",
                border:
                  message.startsWith("✓")
                    ? "1px solid #bbf7d0"
                    : "1px solid #fecdd3",
                color:
                  message.startsWith("✓")
                    ? "#166534"
                    : "#be123c",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}

          {/* BUTTON */}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              height: "52px",
              border: "none",
              borderRadius: "11px",
              background:
                loading
                  ? "#94a3b8"
                  : "linear-gradient(135deg, #263b80, #3f5fc4)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "700",
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
              boxShadow:
                loading
                  ? "none"
                  : "0 8px 20px rgba(38,59,128,0.25)",
            }}
          >
            {loading
              ? "Enregistrement..."
              : "Enregistrer déclaration"}
          </button>
        </div>

        {/* FOOTER */}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
          NOVA • Gestion des interruptions
        </p>
      </div>
    </div>
  );
}
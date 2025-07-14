import { format } from "date-fns"

/**
 * A timeline component displaying important dates related to the admission process.
 * 
 * @component
 * @param {Object} props - The properties for the AdmissionTimeline component.
 * @param {Object} props.admission - The admission object containing date information.
 * @param {string} props.admission.applicationStartDate - Start date for applications.
 * @param {string} props.admission.applicationLastDate - End date for applications.
 * @param {string} props.admission.examStartDate - Start date for exams.
 * @param {string} props.admission.examLastDate - End date for exams.
 * @param {string} props.admission.paymentDate - Payment due date.
 * @param {string} props.admission.conditionDate - Condition fulfillment date.
 * @param {string} props.admission.conditionExtendedDate - Extended condition date.
 * 
 * @returns {JSX.Element} A timeline component showing chronological admission events.
 */
export const AdmissionTimeline = ({ admission }) => {
  const events = [
    { label: "📥 Začátek podávání přihlášek", date: admission.applicationStartDate },
    { label: "📤 Konec podávání přihlášek", date: admission.applicationLastDate },
    { label: "📝 Začátek přijímacích zkoušek", date: admission.examStartDate },
    { label: "✅ Konec přijímacích zkoušek", date: admission.examLastDate },
    { label: "💳 Termín platby", date: admission.paymentDate },
    { label: "📄 Termín doložení podmínek", date: admission.conditionDate },
    { label: "⏳ Prodloužený termín podmínek", date: admission.conditionExtendedDate },
  ].filter(e => e.date);

  const today = new Date();
  const todayISO = today.toISOString();

  const allEvents = [
    ...events,
    { label: "📍 Dnes", date: todayISO, isToday: true }
  ];

  const sorted = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="border-start border-primary border-3 ps-4 mt-4">
      <h3 className="mb-3">🗓️ Časová osa přijímacího řízení</h3>
      {sorted.map(({ label, date, isToday }, i) => (
        <div key={i} className="mb-3 position-relative">
          <div
            className={`position-absolute rounded-circle ${isToday ? 'bg-success' : 'bg-primary'}`}
            style={{
              left: "-11px",
              top: "4px",
              width: "10px",
              height: "10px",
            }}
          />
          <strong className={isToday ? 'text-success' : ''}>{label}</strong>
          <br />
          <span className="text-dark">{format(new Date(date), "d. M. yyyy")}</span>
        </div>
      ))}
    </div>
  );
};
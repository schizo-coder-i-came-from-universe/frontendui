import { format } from "date-fns"

/**
 * A timeline component displaying important dates related to the admission process.
 * 
 * @component
 * @param {Object} props - The properties for the AdmissionTimeline component.
 * @param {Object|Array} props.admission - The admission object or array of admissions containing date information.
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
  const admissions = Array.isArray(admission) ? admission : [admission];
  
  const getAdmissionColor = (index) => {
    const colors = ['primary', 'info', 'warning', 'secondary', 'dark'];
    return colors[index % colors.length];
  };

  const events = [];
  
  admissions.forEach((adm, admissionIndex) => {
    const admissionName = adm.program?.name || `Přihláška ${admissionIndex + 1}`;
    const color = getAdmissionColor(admissionIndex);
    
    const admissionEvents = [
      { label: "📥 Začátek podávání přihlášek", date: adm.applicationStartDate },
      { label: "📤 Konec podávání přihlášek", date: adm.applicationLastDate },
      { label: "📝 Začátek přijímacích zkoušek", date: adm.examStartDate },
      { label: "✅ Konec přijímacích zkoušek", date: adm.examLastDate },
      { label: "💳 Termín platby", date: adm.paymentDate },
      { label: "📄 Termín doložení podmínek", date: adm.conditionDate },
      { label: "⏳ Prodloužený termín podmínek", date: adm.conditionExtendedDate },
    ].filter(e => e.date).map(event => ({
      ...event,
      admissionName,
      color,
      admissionIndex
    }));
    
    events.push(...admissionEvents);
  });

  const today = new Date();
  const todayISO = today.toISOString();

  const allEvents = [
    ...events,
    { label: "📍 Dnes", date: todayISO, isToday: true }
  ];

  const sorted = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="border-start border-primary border-3 ps-4 mt-4">
      <h3 className="mb-3">🗓️ Časová osa přijímacíchřízení</h3>
      {sorted.map(({ label, date, isToday, admissionName, color }, i) => (
        <div key={i} className="mb-3 position-relative">
          <div
            className={`position-absolute rounded-circle ${isToday ? 'bg-success' : `bg-${color}`}`}
            style={{
              left: "-11px",
              top: "4px",
              width: "10px",
              height: "10px",
            }}
          />
          <strong className={isToday ? 'text-success' : ''}>{label}</strong>
          {admissionName && !isToday && (
            <div className="mt-1">
              <span className={`badge bg-${color}`} style={{ fontSize: '0.7em' }}>
                {admissionName}
              </span>
            </div>
          )}
          <div className="mt-1">
            <span className="text-dark">{format(new Date(date), "d. M. yyyy")}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
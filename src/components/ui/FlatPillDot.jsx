export default function FlatPillDot(status) {
  const { statusBgColor, statusColor, statusText } = status;
  return (
    <>
      <span className={`inline-flex items-center gap-x-1.5 rounded-md ${statusBgColor} px-2 py-1 text-xs font-medium text-gray-600`}>
        <svg className={`h-1.5 w-1.5 ${statusColor}`} viewBox="0 0 6 6" aria-hidden="true">
          <circle cx={3} cy={3} r={3} />
        </svg>
        {statusText}
      </span>
    </>
  );
}


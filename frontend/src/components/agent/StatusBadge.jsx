const statusStyles = {
  APPROVED: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  PENDING: 'bg-amber-50 text-amber-600 border-amber-200',
  REJECTED: 'bg-red-50 text-red-600 border-red-200',
  DRAFT: 'bg-slate-50 text-slate-600 border-slate-200',
}

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || statusStyles.DRAFT

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${style}`}>
      {status || 'DRAFT'}
    </span>
  )
}

export default StatusBadge

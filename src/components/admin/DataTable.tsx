export interface DataTableColumn<T> {
  header: string;
  render: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return <p className="m-0 text-sm text-[#9CA3AF]">{emptyMessage ?? "No records yet."}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            {columns.map((c) => (
              <th key={c.header} className="px-3 py-2.5 text-xs font-bold tracking-wide text-neutral-500 uppercase">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#F3F4F6]">
              {columns.map((c) => (
                <td key={c.header} className="px-3 py-3 align-middle">
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

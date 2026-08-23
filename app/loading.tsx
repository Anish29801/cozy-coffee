export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-40 rounded-full bg-fog" />
        <div className="h-12 w-2/3 rounded-[16px] bg-fog" />
        <div className="h-64 rounded-[24px] bg-fog" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="h-40 rounded-[24px] bg-fog" />
          <div className="h-40 rounded-[24px] bg-fog" />
          <div className="h-40 rounded-[24px] bg-fog" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F6F8] pointer-events-none">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#56C7D9] [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#00A8CC] [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#070D0E]" />
      </div>
    </div>
  );
}
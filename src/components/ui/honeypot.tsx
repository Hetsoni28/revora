/** Hidden from people (and screen readers); spam bots fill it in, and the server then ignores the message. */
export function Honeypot({ inputRef }: { inputRef: React.Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input ref={inputRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

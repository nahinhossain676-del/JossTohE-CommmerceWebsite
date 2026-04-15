export default function TopBar() {
  return (
    <div className="bg-amber-400 text-zinc-950 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
        <span className="font-semibold tracking-wide">
          This website was created by Nahin Hossain
        </span>
        <div className="flex gap-4 font-medium">
          <a
            href="https://www.facebook.com/nahin.hossain.898980/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/in/nahinnumpy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

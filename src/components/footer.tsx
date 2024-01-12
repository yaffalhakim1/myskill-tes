export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <section className="container flex items-center justify-between pt-6 pb-8 md:py-8">
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <span className="text-xs select-none text-muted-foreground">
            &bull;
          </span>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <span className="text-xs select-none text-muted-foreground">
            &bull;
          </span>
          <span className="text-muted-foreground">
            © {new Date().getFullYear()} - All rights reserved
          </span>
        </div>
      </section>
    </footer>
  );
}


const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} RecHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-foreground/60 hover:text-primary">Terms</a>
            <a href="#" className="text-foreground/60 hover:text-primary">Privacy</a>
            <a href="#" className="text-foreground/60 hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


export default function AuthFooter() {
    return (
    <footer className={`w-full py-4 px-4 bg-brand-light `}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-8 justify-between">
            <div className="flex items-center gap-4">
                <a href="#">Privacy Policy</a> |
                <a href="#">Terms of Service</a> 
            </div>
            <span className="text-center">Copyright © 2024 Bespire Creative LLC</span>
        </div>
    </footer>
    );
  }
  

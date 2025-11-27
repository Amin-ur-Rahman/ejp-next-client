import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const categories = [
    { name: "Electronics", href: "/products?category=electronics" },
    { name: "Fashion", href: "/products?category=fashion" },
    { name: "Home & Living", href: "/products?category=home" },
    { name: "Sports", href: "/products?category=sports" },
  ];

  const support = [
    { name: "Help Center", href: "/help" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#111111] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#8AC926]">Next</span>Store
            </h3>
            <p className="text-[#C7C7C7] mb-4 leading-relaxed">
              Your trusted online shopping destination for quality products at
              great prices.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:support@nextstore.com"
                className="flex items-center text-[#C7C7C7] hover:text-[#8AC926] transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                support@nextstore.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center text-[#C7C7C7] hover:text-[#8AC926] transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                +1 (234) 567-890
              </a>
              <div className="flex items-start text-[#C7C7C7]">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>123 Commerce St, Suite 100, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#C7C7C7] hover:text-[#8AC926] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-[#C7C7C7] hover:text-[#8AC926] transition-colors duration-200"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[#C7C7C7] hover:text-[#8AC926] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[#C7C7C7]/20 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-2">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-[#C7C7C7] text-sm mb-4">
              Get the latest updates on new products and exclusive offers
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-[#C7C7C7]/20 text-white placeholder-[#C7C7C7] focus:outline-none focus:border-[#8AC926] transition-colors duration-200"
              />
              <button className="bg-[#8AC926] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7AB91F] transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#C7C7C7]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-[#C7C7C7] text-sm text-center md:text-left">
            © 2024 NextStore. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C7C7C7] hover:bg-[#8AC926] hover:text-white transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

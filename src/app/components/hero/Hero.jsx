import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-[#F3F3F3] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
              Shop Smart,
              <span className="block text-[#8AC926] mt-2">Live Better</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#C7C7C7] mb-10 leading-relaxed">
              Discover amazing products at unbeatable prices. Quality you can
              trust, delivered right to your door.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <a
                href="/products"
                className="group w-full sm:w-auto bg-[#8AC926] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#7AB91F] transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="/products"
                className="w-full sm:w-auto border-2 border-[#111111] text-[#111111] px-8 py-4 rounded-lg font-semibold hover:bg-[#111111] hover:text-white transition-all duration-200"
              >
                View Collection
              </a>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                width={100}
                height={60}
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Shopping experience"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute top-6 right-6 bg-[#8AC926] text-white px-6 py-3 rounded-full font-bold shadow-lg">
                <span className="text-sm">FREE</span>
                <span className="block text-xs font-normal">Shipping</span>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#8AC926] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-4 -right-4 w-40 h-40 bg-[#8AC926] rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

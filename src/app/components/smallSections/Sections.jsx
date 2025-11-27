import {
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  Star,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function Sections() {
  // Section 1: Features
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description:
        "On orders over $50. Fast and reliable delivery to your doorstep.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure transactions. Your data is safe with us.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day money back guarantee. Shop with confidence.",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Always here to help. Get assistance anytime you need.",
    },
  ];

  // Section 2: Categories
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      itemCount: "150+ Products",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      itemCount: "200+ Products",
    },
    {
      name: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      itemCount: "180+ Products",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      itemCount: "120+ Products",
    },
  ];

  // Section 3: Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Verified Buyer",
      rating: 5,
      comment:
        "Amazing quality and fast shipping! I'm extremely satisfied with my purchase and will definitely shop here again.",
    },
    {
      name: "Michael Chen",
      role: "Verified Buyer",
      rating: 5,
      comment:
        "Great customer service and the products exceeded my expectations. Highly recommend this store to everyone!",
    },
    {
      name: "Emma Davis",
      role: "Verified Buyer",
      rating: 5,
      comment:
        "Best online shopping experience I've had. Easy checkout process and the products arrived in perfect condition.",
    },
  ];

  return (
    <>
      {/* Section 1: Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-[#C7C7C7] max-w-2xl mx-auto">
              We provide the best shopping experience with quality products and
              excellent service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-[#F3F3F3] p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8AC926] text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#C7C7C7]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Categories */}
      <section className="py-16 bg-[#F3F3F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-[#C7C7C7] max-w-2xl mx-auto">
              Explore our wide range of products across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <a
                key={index}
                href="/products"
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    height={60}
                    width={100}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-[#8AC926]">
                      {category.itemCount}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-[#C7C7C7] max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#F3F3F3] p-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#8AC926] fill-[#8AC926]"
                    />
                  ))}
                </div>
                <p className="text-[#111111] mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#8AC926] rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#111111]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#C7C7C7]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: CTA Banner */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg text-[#C7C7C7] mb-8">
              Join thousands of happy customers and discover amazing products at
              great prices
            </p>
            <a
              href="/products"
              className="inline-flex items-center bg-[#8AC926] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#7AB91F] transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              Browse All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

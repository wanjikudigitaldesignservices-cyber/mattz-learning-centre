import { motion } from "framer-motion";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, BookOpen, Clock, Phone, Mail, MessageCircle } from "lucide-react";

export default function Landing() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-indigo-900" />
            <span className="text-xl font-bold text-indigo-950 tracking-tight">Mattz Learning Centre</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-indigo-900 transition-colors">About</a>
            <a href="#programs" className="hover:text-indigo-900 transition-colors">Programs</a>
            <a href="#testimonials" className="hover:text-indigo-900 transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-indigo-900 transition-colors">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://wa.me/254721458456" target="_blank" rel="noreferrer" className="hidden sm:flex items-center text-sm font-medium text-green-600 hover:text-green-700">
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat on WhatsApp
            </a>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
              <a href="#enquiry">Book Assessment</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-indigo-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/classroom_hero.png" alt="Classroom" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-950/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            className="max-w-2xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-300 text-sm font-semibold mb-6">
              Premier Tuition in Lavington, Nairobi
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Unlocking Every Student's <span className="text-amber-500">True Potential</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl leading-relaxed">
              Expert tutoring for Primary, Junior School (CBC), and Senior School. Small classes, personalized attention, and proven results.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-indigo-950 font-bold text-lg px-8 h-14">
                <a href="#enquiry">Book a Free Assessment</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-indigo-300 text-indigo-950 bg-white hover:bg-indigo-50 font-semibold h-14 px-8">
                <a href="https://wa.me/254721458456?text=Hi! I'm interested in learning more about your tuition programs." target="_blank" rel="noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                  Chat on WhatsApp
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-indigo-950 mb-6">Welcome to Mattz Learning Centre</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Located in the heart of Lavington, we are dedicated to providing a nurturing and academically rigorous environment. Our mission is to bridge learning gaps, challenge high achievers, and build confidence in every child.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                With a focus on the new CBC curriculum (Grade 7-9) as well as traditional primary and senior school syllabuses, our qualified tutors bring learning to life through personalized attention and small class sizes.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/tutoring_session.png" alt="Tutoring Session" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-indigo-900/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">Why Parents Choose Us</h2>
            <p className="text-slate-600 text-lg">We provide an environment where your child can thrive academically and personally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Small Class Sizes", desc: "Ensuring every student receives the individual attention they deserve." },
              { icon: BookOpen, title: "Expert Tutors", desc: "Highly qualified professionals specialized in CBC and traditional curricula." },
              { icon: Clock, title: "Personalized Reports", desc: "Regular, detailed progress tracking to keep parents informed." },
              { icon: MapPin, title: "Convenient Location", desc: "Safe, accessible centre in Lavington, perfect for Kileleshwa & Kilimani residents." },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-indigo-950 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">Our Programs</h2>
            <p className="text-slate-600 text-lg">Tailored tuition programs designed for every stage of your child's educational journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-indigo-50/50 border-b border-indigo-50 pb-6">
                <CardTitle className="text-2xl text-indigo-950">Primary Tuition</CardTitle>
                <CardDescription className="text-base text-slate-600">Grade 1 to 6</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600">Foundational support in core subjects. We build strong basics in Mathematics, Languages, and Sciences to ensure a smooth transition to Junior School.</p>
              </CardContent>
            </Card>
            
            <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-indigo-50/50 border-b border-indigo-50 pb-6">
                <CardTitle className="text-2xl text-indigo-950">Junior School (CBC)</CardTitle>
                <CardDescription className="text-base text-slate-600">Grade 7 to 9</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600">Comprehensive support for the new CBC curriculum. Focus on practical skills, core subjects, and pre-technical studies.</p>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-indigo-50/50 border-b border-indigo-50 pb-6">
                <CardTitle className="text-2xl text-indigo-950">Senior School</CardTitle>
                <CardDescription className="text-base text-slate-600">Form 1 to 4 / Year 10-13</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600">Intensive subject-specific tutoring. We help students master complex concepts and prepare effectively for national and international examinations.</p>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 shadow-md hover:shadow-lg transition-shadow bg-amber-50/30">
              <CardHeader className="bg-amber-100/50 border-b border-amber-100 pb-6">
                <CardTitle className="text-2xl text-indigo-950">Holiday & Remedial</CardTitle>
                <CardDescription className="text-base text-slate-600">Exam Prep & School-Holiday Tuition</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600">Keep minds active during breaks. Intensive exam preparation bootcamps and remedial classes to close any learning gaps before the new term begins.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-indigo-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">What Parents Say</h2>
            <p className="text-indigo-200 text-lg">Hear from the families who have experienced the Mattz Learning Centre difference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { text: "Since joining Mattz, my son's confidence in Math has skyrocketed. The tutors are incredibly patient and know exactly how to explain difficult concepts.", author: "Sarah K.", role: "Parent, Grade 5" },
              { text: "The transition to Junior Secondary was stressful until we found Mattz. The CBC support is excellent and we receive regular updates on her progress.", author: "David M.", role: "Parent, Grade 7" },
              { text: "Highly recommend their holiday tuition program. It kept my daughter engaged and she went back to school far ahead of her peers.", author: "Grace W.", role: "Parent, Form 2" }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                className="bg-indigo-900/50 p-8 rounded-2xl border border-indigo-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-amber-400 mb-6 text-4xl">"</div>
                <p className="text-indigo-50 mb-8 italic leading-relaxed">{t.text}</p>
                <div>
                  <p className="font-bold text-white">{t.author}</p>
                  <p className="text-sm text-indigo-300">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form & Contact Section */}
      <section id="enquiry" className="py-24 bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-950/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            
            {/* Contact Info (Left) */}
            <div className="lg:w-2/5 bg-indigo-900 text-white p-12 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-amber-500">Get in Touch</h2>
                <p className="text-indigo-100 mb-10 leading-relaxed">
                  Have questions about our programs or want to book a free assessment? Fill out the form or reach out to us directly.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Our Location</h4>
                      <p className="text-indigo-200 leading-relaxed">Lavington, Nairobi<br/>Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Phone / WhatsApp</h4>
                      <p className="text-indigo-200">+254 721 458 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Operating Hours</h4>
                      <p className="text-indigo-200">Mon-Fri: 3:30 PM - 6:30 PM<br/>Sat: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <Button asChild variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-indigo-950 font-bold bg-transparent">
                  <a href="https://wa.me/254721458456" target="_blank" rel="noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message us on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Form (Right) */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-indigo-950 mb-6">Enquiry Form</h3>
              <EnquiryForm />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-indigo-300 py-12 border-t border-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <BookOpen className="w-6 h-6 text-amber-500" />
            <span className="text-xl font-bold text-white tracking-tight">Mattz Learning Centre</span>
          </div>
          <p className="mb-6">Empowering students in Lavington, Nairobi through quality education.</p>
          <div className="flex justify-center space-x-6 mb-8 text-sm">
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#programs" className="hover:text-white transition-colors">Programs</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="/admin" className="hover:text-white transition-colors">Admin Portal</a>
          </div>
          <p className="text-sm text-indigo-500">© {new Date().getFullYear()} Mattz Learning Centre. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

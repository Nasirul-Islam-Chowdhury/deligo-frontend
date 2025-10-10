"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  UtensilsCrossed,
  Car,
  Clock,
  Shield,
  Zap,
  Star,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { useRouter } from "next/navigation";
import HomeHeader from "@/components/home/header";

export default function Page() {


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
    <HomeHeader/>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Food & rides,
            <br />
            <span className="text-primary">delivered instantly.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto leading-relaxed">
            Experience the fastest food delivery and ride-sharing service in
            your city. Order from your favorite restaurants or book a ride in
            seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary text-lg px-8 py-6 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Main Feature Cards */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Food Delivery Card */}
          <Link
            href="/restaurents"
            className="group relative overflow-hidden bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Food Delivery</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Order from thousands of restaurants. Fresh food delivered to
                your doorstep in minutes.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>30 min delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>Top rated</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:translate-x-1 transition-transform">
                Order Food
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Link>

          {/* Ride Sharing Card */}
          <Link
            href="/rides"
            className="group relative overflow-hidden bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Ride Sharing</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Book reliable rides anytime, anywhere. Choose from cars, bikes,
                or autos for your journey.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  <span>Instant booking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Safe & secure</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:translate-x-1 transition-transform">
                Book a Ride
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-muted-foreground">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                50K+
              </div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                1M+
              </div>
              <div className="text-muted-foreground">Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                4.8★
              </div>
              <div className="text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                Select food delivery or ride sharing based on your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Place Order</h3>
              <p className="text-muted-foreground leading-relaxed">
                Browse options and place your order in just a few taps
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Track & Enjoy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track in real-time and enjoy your food or ride
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying fast delivery and
            reliable rides every day.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6"
          >
            Download App
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground">
                D
              </div>
              <span className="text-xl font-bold">DeliGo</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 DeliGo. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Lock, 
  LogIn, 
  Github, 
  Twitter, 
  Facebook,
  Eye,
  EyeOff,
  ArrowRight,
  Building,
  Lock as LockIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle response/redirect here
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container max-w-7xl mx-auto px-4 flex-1 flex">
        {/* Left panel - decorative */}
        <div className="hidden lg:flex flex-col w-1/2 pr-8 justify-center relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 mb-8">
            <h1 className="text-4xl font-bold text-teal-950 mb-6">Welcome to <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Ilkevim</span></h1>
            <p className="text-lg text-teal-800 mb-8 max-w-md">Sign in to access your account and explore premium UK real estate opportunities.</p>
            
            <div className="space-y-6">
              {/* Features */}
              <div className="flex items-start gap-3">
                <div className="rounded-full p-2 bg-teal-100/80 text-teal-700">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-teal-900">Exclusive Properties</h3>
                  <p className="text-teal-700">Access to premium UK real estate listings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full p-2 bg-teal-100/80 text-teal-700">
                  <LockIcon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-teal-900">Secure Investments</h3>
                  <p className="text-teal-700">Trusted platform for property investments</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 w-full h-64 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-80"></div>
            <img 
              src="/hero-image.jpg" 
              alt="Luxury property" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="text-white/90 text-sm">Featured Property</span>
              <h3 className="text-white font-bold text-xl">Luxury London Penthouse</h3>
              <p className="text-white/80 text-sm">Exclusive access for members</p>
            </div>
          </div>
        </div>
        
        {/* Right panel - sign in form */}
        <div className="w-full lg:w-1/2 lg:pl-8 flex items-center justify-center">
          <Card className="w-full max-w-md p-8 rounded-xl border-teal-100 shadow-xl bg-white/90 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-teal-950">Sign In</h2>
              <p className="text-teal-700 mt-1">Access your Ilkevim account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-teal-800">Email Address</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-teal-800">Password</Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-teal-600 hover:text-teal-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 hover:text-teal-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                  className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-teal-700"
                >
                  Remember me for 30 days
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn size={18} />
                    <span>Sign in</span>
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <Separator className="absolute w-full border-t border-teal-100" />
                <span className="relative bg-white px-2 text-xs text-teal-500">OR CONTINUE WITH</span>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  className="border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700"
                >
                  <Github size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700"
                >
                  <Twitter size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700"
                >
                  <Facebook size={18} />
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm">
              <span className="text-teal-700">Don't have an account?</span>{" "}
              <Link 
                href="/register" 
                className="font-medium text-teal-600 hover:text-teal-700 inline-flex items-center"
              >
                Create an account
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 
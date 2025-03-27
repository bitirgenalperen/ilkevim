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
  User,
  Github, 
  Twitter, 
  Facebook,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Home,
  Check,
  X,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Password strength validation
  const passwordStrength = (() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  })();
  
  const passwordStrengthText = [
    'Very Weak',
    'Weak',
    'Good',
    'Strong',
    'Very Strong'
  ][passwordStrength];
  
  const passwordStrengthColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-emerald-500'
  ][passwordStrength];
  
  const passwordsMatch = password === confirmPassword && password !== '';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle response/redirect here
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white pt-24 pb-12">
      <div className="container max-w-7xl mx-auto px-4 flex-1 flex flex-col-reverse lg:flex-row">
        {/* Left panel - form */}
        <div className="w-full lg:w-3/5 lg:pr-8 flex items-center justify-center mt-8 lg:mt-0">
          <Card className="w-full max-w-2xl p-8 rounded-xl border-teal-100 shadow-xl bg-white/90 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-70"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-teal-950">Create Your Account</h2>
                <p className="text-teal-700 mt-1">Join our community of property investors</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-teal-800">Full Name</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500">
                      <User size={18} />
                    </div>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {/* Email */}
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
                
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-teal-800">Password</Label>
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
                  
                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-teal-700">Password Strength:</span>
                        <span className={cn(
                          "text-xs font-medium",
                          passwordStrength <= 1 ? "text-red-600" : 
                          passwordStrength === 2 ? "text-orange-600" : 
                          passwordStrength === 3 ? "text-green-600" : 
                          "text-emerald-600"
                        )}>
                          {passwordStrengthText}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-300",
                            passwordStrengthColor
                          )} 
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                        <li className="flex items-center gap-1">
                          {password.length >= 8 ? 
                            <Check size={12} className="text-green-500" /> : 
                            <X size={12} className="text-red-500" />
                          }
                          <span className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
                            At least 8 characters
                          </span>
                        </li>
                        <li className="flex items-center gap-1">
                          {/[A-Z]/.test(password) ? 
                            <Check size={12} className="text-green-500" /> : 
                            <X size={12} className="text-red-500" />
                          }
                          <span className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>
                            Uppercase letter
                          </span>
                        </li>
                        <li className="flex items-center gap-1">
                          {/[0-9]/.test(password) ? 
                            <Check size={12} className="text-green-500" /> : 
                            <X size={12} className="text-red-500" />
                          }
                          <span className={/[0-9]/.test(password) ? "text-green-600" : "text-red-600"}>
                            Number
                          </span>
                        </li>
                        <li className="flex items-center gap-1">
                          {/[^A-Za-z0-9]/.test(password) ? 
                            <Check size={12} className="text-green-500" /> : 
                            <X size={12} className="text-red-500" />
                          }
                          <span className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-red-600"}>
                            Special character
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-teal-800">Confirm Password</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500">
                      <Shield size={18} />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 pr-10 border-teal-200 focus:border-teal-400 focus:ring-teal-400",
                        confirmPassword && !passwordsMatch ? "border-red-300 focus:border-red-400 focus:ring-red-400" : ""
                      )}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 hover:text-teal-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                  )}
                </div>
                
                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked: boolean) => setAgreeTerms(checked)}
                    className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-teal-700"
                  >
                    I agree to the <Link href="/terms" className="text-teal-600 hover:text-teal-700 underline">Terms of Service</Link> and <Link href="/privacy" className="text-teal-600 hover:text-teal-700 underline">Privacy Policy</Link>
                  </label>
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 mt-6"
                  disabled={isLoading || !agreeTerms || !passwordsMatch}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative flex items-center justify-center">
                  <Separator className="absolute w-full border-t border-teal-100" />
                  <span className="relative bg-white px-2 text-xs text-teal-500">OR REGISTER WITH</span>
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
                <span className="text-teal-700">Already have an account?</span>{" "}
                <Link 
                  href="/signin" 
                  className="font-medium text-teal-600 hover:text-teal-700 inline-flex items-center"
                >
                  <ArrowLeft size={14} className="mr-1" />
                  Sign in
                </Link>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Right panel - illustration and benefits */}
        <div className="w-full lg:w-2/5 lg:pl-8 flex flex-col justify-center">
          <div className="relative z-10 mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-100/80 text-teal-700 text-sm font-medium mb-4">
              Join Ilkevim Today
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-teal-950 mb-4">Start Your UK Property <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Investment Journey</span></h1>
            <p className="text-teal-700 mb-8 text-lg">Create an account to access exclusive UK investment properties and personalized services.</p>
            
            {/* Benefits */}
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-3 bg-white/80 p-4 rounded-lg border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full p-2 bg-teal-100/80 text-teal-700 mt-1">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-teal-900">Personalized Property Alerts</h3>
                  <p className="text-teal-700 text-sm">Get notified about properties matching your investment criteria</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/80 p-4 rounded-lg border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full p-2 bg-teal-100/80 text-teal-700 mt-1">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-teal-900">Save Favorite Properties</h3>
                  <p className="text-teal-700 text-sm">Create and manage your portfolio of interested properties</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/80 p-4 rounded-lg border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full p-2 bg-teal-100/80 text-teal-700 mt-1">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-teal-900">Access Market Insights</h3>
                  <p className="text-teal-700 text-sm">Exclusive reports and data on UK property investment trends</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <Link 
                href="/"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
              >
                <Home size={16} className="mr-2" />
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
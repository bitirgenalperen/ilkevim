"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Info, 
  BarChart3, 
  Settings2
} from "lucide-react";
import { badge as badgeStyles, button as buttonStyles, formElements } from "@/styles/theme";

// Define the UserData type
interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  avatar: string;
  location: string;
  role: string;
  favoriteCount: number;
  viewedCount: number;
  notifications: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
  verifiedAccount: boolean;
  cookies: {
    name: string;
    purpose: string;
    expires: string;
    essential: boolean;
  }[];
}

// Mock user data with explicit type
const userData: UserData = {
  id: "u123456",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+90 555 123 4567",
  joinDate: "March 15, 2023",
  avatar: "/images/avatar-placeholder.svg",
  location: "Istanbul, Turkey",
  role: "Tenant",
  favoriteCount: 12,
  viewedCount: 34,
  notifications: {
    email: true,
    sms: false,
    app: true
  },
  verifiedAccount: true,
  cookies: [
    { name: "session_id", purpose: "Authentication", expires: "2 days", essential: true },
    { name: "language_pref", purpose: "User preferences", expires: "1 year", essential: false },
    { name: "theme_mode", purpose: "User preferences", expires: "1 year", essential: false },
    { name: "_ga", purpose: "Analytics", expires: "2 years", essential: false }
  ]
};

export default function UserDetailsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'cookies'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  
  return (
    <div className="container pt-24 pb-10 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Card className="sticky top-24">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-teal-500">
                <Image
                  src={userData.avatar}
                  alt={userData.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <CardDescription className="text-lg">{userData.email}</CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className={badgeStyles.outline()}>
                  {userData.role}
                </Badge>
                {userData.verifiedAccount && (
                  <Badge className={badgeStyles.primary("ml-2")}>
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <nav className="flex flex-col space-y-1">
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                  <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                    <TabsTrigger
                      value="profile"
                      className={`justify-start w-full p-3 ${
                        activeTab === "profile" ? "bg-teal-50 text-teal-700" : ""
                      }`}
                    >
                      Profile Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="cookies"
                      className={`justify-start w-full p-3 ${
                        activeTab === "cookies" ? "bg-teal-50 text-teal-700" : ""
                      }`}
                    >
                      Cookies
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="profile" className="mt-0">
              <ProfileTab userData={userData} />
            </TabsContent>
            <TabsContent value="cookies" className="mt-0">
              <CookiesTab userData={userData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ userData }: { userData: UserData }) { // Use UserData type instead of unknown
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700">Profile Information</CardTitle>
          <CardDescription>
            View and manage your personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <InfoCard title="Account Details" items={[
              { label: "Full Name", value: userData.name },
              { label: "Email Address", value: userData.email },
              { label: "Phone Number", value: userData.phone },
              { label: "Member Since", value: userData.joinDate }
            ]} />
            
            <InfoCard title="Notification Preferences" items={[
              { label: "Email Notifications", value: userData.notifications.email ? "Enabled" : "Disabled" },
              { label: "SMS Notifications", value: userData.notifications.sms ? "Enabled" : "Disabled" },
              { label: "App Notifications", value: userData.notifications.app ? "Enabled" : "Disabled" }
            ]} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CookiesTab({ userData }: { userData: UserData }) { // Use UserData type instead of unknown
  const essentialCookies = true;
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  
  const handleSavePreferences = () => {
    console.log('Cookie preferences saved:', {
      essential: essentialCookies, 
      functional: functionalCookies,
      analytics: analyticsCookies
    });
    alert('Your cookie preferences have been saved.');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700">Cookies Information</CardTitle>
          <CardDescription>
            View all cookies stored in your browser while using our website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <p className="text-slate-600">
              Cookies are small text files that websites place on your device to store information about your preferences, 
              login status, and other browsing activity. Below is a list of cookies we use.
            </p>
            
            <div className="bg-white rounded-lg border border-teal-100 p-5">
              <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
                <Settings2 size={20} className="mr-2 text-teal-600" />
                Cookie Preferences Manager
              </h3>
              <p className="text-gray-700 mb-4">
                Use this tool to customize your cookie preferences on our website. Please note that essential cookies cannot be disabled as they are necessary for the website to function properly.
              </p>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between p-3 bg-teal-50/50 rounded-lg border border-teal-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-teal-600 mt-0.5 shrink-0" size={18} />
                    <div>
                      <Label htmlFor="essential-cookies" className="font-medium text-teal-900">Essential Cookies</Label>
                      <p className="text-sm text-teal-700">These cookies are necessary for the website to function and cannot be switched off.</p>
                    </div>
                  </div>
                  <Switch 
                    id="essential-cookies" 
                    checked={essentialCookies} 
                    disabled={true}
                    className={formElements.switch}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-teal-100">
                  <div className="flex items-start gap-3">
                    <Info className="text-teal-600 mt-0.5 shrink-0" size={18} />
                    <div>
                      <Label htmlFor="functional-cookies" className="font-medium text-teal-900">Functional Cookies</Label>
                      <p className="text-sm text-teal-700">These cookies enable personalized features and functionality.</p>
                    </div>
                  </div>
                  <Switch 
                    id="functional-cookies" 
                    checked={functionalCookies} 
                    onCheckedChange={setFunctionalCookies}
                    className={formElements.switch}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-teal-100">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="text-teal-600 mt-0.5 shrink-0" size={18} />
                    <div>
                      <Label htmlFor="analytics-cookies" className="font-medium text-teal-900">Analytics Cookies</Label>
                      <p className="text-sm text-teal-700">These cookies help us improve our website by collecting anonymous information.</p>
                    </div>
                  </div>
                  <Switch 
                    id="analytics-cookies" 
                    checked={analyticsCookies} 
                    onCheckedChange={setAnalyticsCookies}
                    className={formElements.switch}
                  />
                </div>
                
                <Button 
                  onClick={handleSavePreferences}
                  className={buttonStyles.primary()}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-medium text-slate-700">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700">Purpose</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700">Expires</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {userData.cookies.map((cookie, index) => (  // Type inference works now with UserData
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium">{cookie.name}</td>
                      <td className="px-4 py-3 text-slate-600">{cookie.purpose}</td>
                      <td className="px-4 py-3 text-slate-600">{cookie.expires}</td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant={cookie.essential ? "default" : "outline"} 
                          className={cookie.essential ? badgeStyles.primary() : badgeStyles.outline()}
                        >
                          {cookie.essential ? "Essential" : "Optional"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
              <h3 className="text-lg font-medium text-teal-700 mb-2">Cookie Policy</h3>
              <p className="text-teal-600">
                Essential cookies are necessary for the website to function properly. Optional cookies help us improve our 
                website and provide personalized services. You can manage your cookie preferences in your browser settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function InfoCard({ title, items }: { title: string, items: { label: string, value: string }[] }) {
  return (
    <div className="bg-slate-50 p-5 rounded-lg">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-slate-500 font-medium">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { Link } from "react-router";

const Header: React.FC = () => {
  return (
    <header
      className={`h-20 border-b border-border bg-gray-50 px-6 flex justify-end items-center gap-6`}
    >
      {/* User Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            1
          </Badge>
        </Button>

        <Link to="/settings/personal-information">
          <div className="flex items-center gap-3 border-l-2 border-border pl-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" />
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">Guy Hawkins</span>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;

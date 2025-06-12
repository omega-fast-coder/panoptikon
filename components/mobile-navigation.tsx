"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  ChevronDown,
  Home,
  Info,
  MessageCircle,
  Grid3X3,
  Sparkles,
} from "lucide-react";
import { ProductsCategories } from "@/lib/generated/prisma";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface MobileNavigationProps {
  categories: ProductsCategories[];
}

export const MobileNavigation = ({ categories }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-accent/50 transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Åbn menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[380px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        <SheetHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <SheetTitle className="text-xl font-bold text-left">
              Menu
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-2">
          {/* Quick Navigation */}
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 group"
            >
              <div className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">Hjem</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 group"
            >
              <div className="p-1.5 bg-blue-500/10 rounded-md group-hover:bg-blue-500/20 transition-colors">
                <Info className="h-4 w-4 text-blue-500" />
              </div>
              <span className="font-medium text-foreground">Om os</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 group"
            >
              <div className="p-1.5 bg-green-500/10 rounded-md group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="h-4 w-4 text-green-500" />
              </div>
              <span className="font-medium text-foreground">Kontakt</span>
            </Link>
          </div>

          <Separator className="my-4" />

          {/* Categories Section */}
          <div className="space-y-2">
            <Collapsible
              open={isCategoriesOpen}
              onOpenChange={setIsCategoriesOpen}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto rounded-lg hover:bg-accent/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-purple-500/10 rounded-md">
                      <Grid3X3 className="h-4 w-4 text-purple-500" />
                    </div>
                    <span className="text-base font-medium">Kategorier</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {categories.length}
                    </Badge>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2 ml-4 pl-4 border-l-2 border-muted">
                {categories.map((category: ProductsCategories, index) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-lg hover:bg-accent/30 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          index % 4 === 0
                            ? "bg-red-400"
                            : index % 4 === 1
                            ? "bg-blue-400"
                            : index % 4 === 2
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </div>
                        {category.description && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {category.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

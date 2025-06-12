import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import ListItem from "./list-item";
import { getCategories } from "@/lib/actions/categories";
import { ProductsCategories } from "@/lib/generated/prisma";
import EmptyState from "./empty-state";
import { CircleHelpIcon } from "lucide-react";
import { ModeToggle } from "./theme-switcher";
import { MobileNavigation } from "./mobile-navigation";

const Navbar = async () => {
  const categories = await getCategories();

  if (!categories) {
    return (
      <EmptyState
        title="Ingen kategorier fundet"
        description="Vi har ingen kategorier tilgængelige i øjeblikket."
        icon={CircleHelpIcon}
      />
    );
  }

  return (
    <div className="w-full flex items-center justify-center pt-5 sticky top-0 z-50 bg-background">
      <div className="container bg-background w-full max-w-3xl mx-4 md:mx-auto  h-16 rounded-full border border-border">
        <div className="h-full flex px-4 md:px-5 items-center justify-between">
          {/* Logo section */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="logo"
                width={28}
                height={28}
                className="md:w-8 md:h-8"
              />
              <h1 className="text-sm md:text-md font-bold">Panoptikon</h1>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Kategorier</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category: ProductsCategories) => (
                        <ListItem
                          key={category.id}
                          title={category.name}
                          href={`/category/${category.id}`}
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/about">Om os</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/contact">Kontakt</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <ModeToggle />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation - Only visible on mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <MobileNavigation categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

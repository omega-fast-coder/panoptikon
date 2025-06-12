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
      <div className="bg-background w-2xl h-16 rounded-full border border-border">
        <div className="h-full flex px-5 items-center justify-between">
          {/* Logo section */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={32} height={32} />
              <h1 className="text-md font-bold">Panoptikon</h1>
            </div>
          </Link>

          {/* Navigation items */}
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { ShoppingBasketIcon } from "lucide-react";

import { Button } from "../button";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";

{
  /* salvando carrinho no banco*/
}

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
};

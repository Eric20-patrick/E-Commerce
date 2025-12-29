import { categoryTable } from "@/db/schema";

import { Button } from "../button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategotySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((categories) => (
          <Button
            key={categories.id}
            variant="ghost"
            className="cursor-pointer rounded-full bg-white text-xs font-semibold"
          >
            {categories.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategotySelector;

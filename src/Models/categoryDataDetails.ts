export interface CategoryEdditProps {
  id: string | null;
  title: string;
  icon: string;
  color: string;
  category: string[];
}

export class CategoryDataDetails implements CategoryEdditProps {
  id: string;
  title: string;
  icon: string;
  color: string;
  category: string[];

  constructor(data: CategoryEdditProps) {
    if (typeof data.category === "string") {
      const oldValue: string = data.category;
      (data.category as string[]) = oldValue.split(",");
    }

    this.id = data.id ?? crypto.randomUUID();
    this.title = data.title;
    this.icon = data.icon;
    this.color = data.color;
    this.category = data.category;
  }

  toSheetRow(): Record<string, string | number> {
    return {
      id: this.id,
      title: this.title.toLocaleLowerCase(),
      icon: this.icon,
      color: this.color,
      category: this.category.map((s) => s.toLocaleLowerCase()).join(","),
    };
  }
}

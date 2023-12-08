"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debouncedValue = useDebounce(value);
  const currentCategoryId = searchParams.get("categoryId");
  const router = useRouter();

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      },
    },{skipEmptyString:true, skipNull:true});

    router.push(url);
  }, [debouncedValue, currentCategoryId, pathname, router]);

  return (
    <div className=" w-80">
      <Search className="absolute text-slate-600 ml-3 mt-3 h-4 w-4" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full transition bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-slate-200 pl-9"
        placeholder="Search for a course"
      />
    </div>
  );
};

export default SearchInput;
